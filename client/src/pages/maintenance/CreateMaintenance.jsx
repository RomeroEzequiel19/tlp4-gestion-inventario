import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/common/Header";
import { DeviceContext } from "../../contexts/ContextDevice";
import { useValidationToken } from "../../hooks/useValidationJWT";
import { fetchUser } from "../../services/UserService";
import { MaintenanceContext } from "../../contexts/ContextMaintenance";
import { useForm } from "../../hooks/useForm";

export const CreateMaintenance = () => {
  const navigate = useNavigate();
  const { createMaintenance } = useContext(MaintenanceContext);
  const { loading, user } = useValidationToken();
  const { devices, fetchData } = useContext(DeviceContext);
  const [deviceOptions, setDeviceOptions] = useState([]);

  const { form, handleInputChange, reset } = useForm({
    device: "",
    maintenanceDate: "",
    description: "",
    performedBy: "",
  });

  useEffect(() => {
    fetchData();
    if (devices.length > 0) {
      setDeviceOptions(
        devices.map((device) => ({
          id: device._id,
          name: device.name,
        }))
      );
    }
  }, [devices]);

  if (loading) return <div>Cargando...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMaintenance = await fetchUser(
        "api/maintenances",
        "POST",
        localStorage.getItem("token"),
        form
      );
      createMaintenance(newMaintenance);
      Swal.fire({
        icon: "success",
        title: "Mantenimiento creado",
        text: newMaintenance.message,
      });
      navigate("/maintenances");
      reset();
    } catch (error) {
      console.error("Error: " + error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el mantenimiento",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div
          className="text-center w-100 shadow-lg p-5"
          style={{ maxWidth: "600px" }}
        >
          <h2 className="h3 mb-3 text-primary font-weight-bold">
            Crear Mantenimiento
          </h2>
          <p className="lead text-muted mb-4">
            Completa los campos para crear un nuevo mantenimiento
          </p>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="device" className="text-left d-block">
                Dispositivo <span className="text-danger">*</span>
              </label>
              <select
                name="device"
                id="device"
                className="form-control w-100"
                value={form.device}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona un dispositivo</option>
                {deviceOptions.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="maintenanceDate" className="text-left d-block">
                Fecha de Mantenimiento <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                name="maintenanceDate"
                id="maintenanceDate"
                className="form-control w-100"
                value={form.maintenanceDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description" className="text-left d-block">
                Descripción <span className="text-danger">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Ingrese la descripción del mantenimiento"
                className="form-control w-100"
                value={form.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="performedBy" className="text-left d-block">
                Realizado Por (ID de Usuario){" "}
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="performedBy"
                id="performedBy"
                placeholder="Ingrese el ID del usuario que realiza el mantenimiento"
                className="form-control w-100"
                value={user._id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Crear Mantenimiento
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
