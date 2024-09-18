import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../services/UserService";
import { Header } from "../../components/common/Header";
import { DeviceContext } from "../../contexts/ContextDevice";
import { useValidationToken } from "../../hooks/useValidationJWT";

export const CreateDevice = () => {
  const navigate = useNavigate();
  const { createDevice } = useContext(DeviceContext);
  const { loading, user } = useValidationToken();

  const { form, handleInputChange, reset } = useForm({
    name: "",
    type: "Laptop",
    brand: "",
    deviceModel: "",
    serialNumber: "",
    purchaseDate: "",
    warrantyExpiration: "",
    location: "",
    status: "activo",
    assignedTo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDevice = await fetchUser(
        "api/devices",
        "POST",
        localStorage.getItem("token"),
        form
      );
      createDevice(newDevice);
      Swal.fire({
        icon: "success",
        title: "Dispositivo creado",
        text: newDevice.message,
      });
      navigate("/devices");
      reset();
    } catch (error) {
      console.error("Error: " + error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el dispositivo",
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  return (
    <>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div
          className="text-center w-100 shadow-lg p-5"
          style={{ maxWidth: "600px" }}
        >
          <h2 className="h3 mb-3 text-primary font-weight-bold">
            Crear Dispositivo
          </h2>
          <p className="lead text-muted mb-4">
            Completa los campos para crear un nuevo dispositivo
          </p>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="text-left d-block">
                Nombre <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ingrese el nombre del dispositivo"
                className="form-control w-100"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="type" className="text-left d-block">
                Tipo <span className="text-danger">*</span>
              </label>
              <select
                name="type"
                id="type"
                className="form-control w-100"
                value={form.type}
                onChange={handleInputChange}
                required
              >
                <option value="Laptop">Laptop</option>
                <option value="PC">PC</option>
                <option value="Monitor">Monitor</option>
                <option value="Impresora">Impresora</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="brand" className="text-left d-block">
                Marca <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Ingrese la marca"
                className="form-control w-100"
                value={form.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="deviceModel" className="text-left d-block">
                Modelo <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="deviceModel"
                id="deviceModel"
                placeholder="Ingrese el modelo del dispositivo"
                className="form-control w-100"
                value={form.deviceModel}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="serialNumber" className="text-left d-block">
                Número de Serie <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="serialNumber"
                id="serialNumber"
                placeholder="Ingrese el número de serie"
                className="form-control w-100"
                value={form.serialNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="purchaseDate" className="text-left d-block">
                Fecha de Compra <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                name="purchaseDate"
                id="purchaseDate"
                className="form-control w-100"
                value={form.purchaseDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="warrantyExpiration" className="text-left d-block">
                Fecha de Expiración de Garantía{" "}
                <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                name="warrantyExpiration"
                id="warrantyExpiration"
                className="form-control w-100"
                value={form.warrantyExpiration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="location" className="text-left d-block">
                Ubicación <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Ingrese la ubicación del dispositivo"
                className="form-control w-100"
                value={form.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status" className="text-left d-block">
                Estado <span className="text-danger">*</span>
              </label>
              <select
                name="status"
                id="status"
                className="form-control w-100"
                value={form.status}
                onChange={handleInputChange}
                required
              >
                <option value="activo">Activo</option>
                <option value="en reparación">En reparación</option>
                <option value="dado de baja">Dado de baja</option>
              </select>
            </div>
            <div className="form-group mb-3 d-none">
              <label htmlFor="assignedTo" className="text-left d-block">
                Asignado a (ID de Usuario)
              </label>
              <input
                type="text"
                name="assignedTo"
                id="assignedTo"
                placeholder="Ingrese el ID del usuario asignado"
                className="form-control w-100"
                value={user._id}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Crear Dispositivo
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
