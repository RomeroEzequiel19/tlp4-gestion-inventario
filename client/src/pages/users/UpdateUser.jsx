import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchUser } from "../../services/UserService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/common/Header";

export const UpdateUser = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "user",
  });

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUser(
          `api/users/${userId}`,
          "GET",
          localStorage.getItem("token"),
          null
        );
        setForm(userData);
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    };

    loadUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await fetchUser(
        `api/users/${userId}`,
        "PUT",
        localStorage.getItem("token"),
        form
      );

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: `El usuario ha sido modificado exitosamente.`,
      });
      navigate("/users");
    } catch (error) {
      console.log("Error: " + error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el usuario.",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div
          className="text-center w-100 shadow-lg p-5"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="h3 mb-3 text-primary font-weight-bold">
            Actualiza los Datos del Usuario
          </h2>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={form.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="role">Rol</label>
              <select
                name="role"
                id="role"
                className="form-control"
                value={form.role}
                onChange={handleInputChange}
                required
              >
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Actualizar Usuario
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
