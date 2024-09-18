import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/ContextUser";
import { fetchUser } from "../../services/UserService";
import { Header } from "../../components/common/Header";

export const CreateUser = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(UserContext);
  const { form, handleInputChange, reset } = useForm({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await fetchUser("api/auth/register", "POST", null, form);
      createUser(newUser);
      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: newUser.message,
      });
      navigate("/users");
      reset();
    } catch (error) {
        console.log("Error: " + error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el usuario",
      });
    }
  };

  return (
    <>
    <Header />
    <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="text-center w-100 shadow-lg p-5" style={{ maxWidth: '400px' }}>
            <h2 className="h3 mb-3 text-primary font-weight-bold">
            Crear Usuario
            </h2>
            <p className="lead text-muted mb-4">
            Completa los campos para crear un nuevo usuario
            </p>
            <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="username" className="text-left d-block">Nombre de usuario <span className="text-danger">*</span></label>
                <input
                type="text"
                name="username"
                id="username"
                placeholder="Ingrese su nombre de usuario"
                className="form-control w-100"
                value={form.username}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email" className="text-left d-block">Email <span className="text-danger">*</span></label>
                <input
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese su email"
                className="form-control w-100"
                value={form.email}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="d-block">Contraseña <span className="text-danger">*</span></label>
                <input
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese su contraseña"
                className="form-control w-100"
                value={form.password}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                Crear Usuario
                </button>
            </div>
            </form>
        </div>
    </main>
    </>

  );
};
