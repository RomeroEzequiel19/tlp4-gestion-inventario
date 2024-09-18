import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchUser } from "../../services/UserService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/common/Header";

export const UpdateDevice = () => {
  const [form, setForm] = useState({
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

  const { deviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeviceData = async () => {
      try {
        const deviceData = await fetchUser(`api/devices/${deviceId}`, "GET", localStorage.getItem("token"), null);

        // Handle missing fields and format dates
        const formattedData = {
          name: deviceData.name || "",
          type: deviceData.type || "Laptop",
          brand: deviceData.brand || "",
          deviceModel: deviceData.deviceModel || "",
          serialNumber: deviceData.serialNumber || "",
          purchaseDate: deviceData.purchaseDate ? formatDate(deviceData.purchaseDate) : "",
          warrantyExpiration: deviceData.warrantyExpiration ? formatDate(deviceData.warrantyExpiration) : "",
          location: deviceData.location || "",
          status: deviceData.status || "activo",
          assignedTo: deviceData.assignedTo || "",
        };
        setForm(formattedData);
      } catch (error) {
        console.error("Error al cargar el dispositivo:", error);
      }
    };

    loadDeviceData();
  }, [deviceId]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchUser(`api/devices/${deviceId}`, "PUT", localStorage.getItem("token"), form);

      Swal.fire({
        icon: 'success',
        title: 'Dispositivo actualizado',
        text: `El dispositivo ha sido modificado exitosamente.`,
      });
      navigate("/devices");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el dispositivo.',
      });
    }
  };

  return (
    <>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="w-100 shadow-lg p-5" style={{ maxWidth: '600px' }}>
          <h2 className="h3 mb-3 text-primary font-weight-bold">
            Actualiza los Datos del Dispositivo
          </h2>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control text-center"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="type">Tipo</label>
              <select
                name="type"
                id="type"
                className="form-control text-center"
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
              <label htmlFor="brand">Marca</label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="form-control text-center"
                value={form.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="deviceModel">Modelo</label>
              <input
                type="text"
                name="deviceModel"
                id="deviceModel"
                className="form-control text-center"
                value={form.deviceModel}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="serialNumber">Número de Serie</label>
              <input
                type="text"
                name="serialNumber"
                id="serialNumber"
                className="form-control text-center"
                value={form.serialNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="purchaseDate">Fecha de Compra</label>
              <input
                type="date"
                name="purchaseDate"
                id="purchaseDate"
                className="form-control text-center"
                value={form.purchaseDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="warrantyExpiration">Fecha de Expiración de Garantía</label>
              <input
                type="date"
                name="warrantyExpiration"
                id="warrantyExpiration"
                className="form-control text-center"
                value={form.warrantyExpiration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="location">Ubicación</label>
              <input
                type="text"
                name="location"
                id="location"
                className="form-control text-center"
                value={form.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status">Estado</label>
              <select
                name="status"
                id="status"
                className="form-control text-center"
                value={form.status}
                onChange={handleInputChange}
                required
              >
                <option value="activo">Activo</option>
                <option value="en reparación">En reparación</option>
                <option value="dado de baja">Dado de baja</option>
              </select>
            </div>
            <div className="form-group mb-3 hidden">
              <label htmlFor="assignedTo">Asignado a (ID de Usuario)</label>
              <input
                type="text"
                name="assignedTo"
                id="assignedTo"
                className="form-control text-center"
                value={form.assignedTo}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Actualizar Dispositivo
            </button>
          </form>
        </div>
      </main>
    </>
  );
};
