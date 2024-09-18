import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchDevice } from "../../services/DeviceService";
import { Header } from "../../components/common/Header";
import { Link } from "react-router-dom";
import { DeviceContext } from "../../contexts/ContextDevice";

export const GetDevices = () => {
  const { devices, handleDone, fetchData } = useContext(DeviceContext);

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteDevice = (id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de eliminar el dispositivo?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            const data = await fetchDevice(`api/devices/${id}`, "DELETE", localStorage.getItem("token"), null);
            handleDone(id);
            if (data) {
              Swal.fire({
                icon: "success",
                title: "Dispositivo eliminado",
                text: data.message,
              });
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error("Error al eliminar el dispositivo:", error);
          }
        })();
      }
    });
  };

  return (
    <>
      <Header />
      <div className="m-5">
        <Link to="/devices/create" className="p-2 text-decoration-none text-white fw-bold bg-dark">
          Crear Dispositivo
        </Link>
      </div>
      <div className="main-table shadow m-5 bg-body rounded border">
        <table className="table table-striped rounded text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Estado</th>
              <th scope="col">n° serial</th>
              <th scope="col" colSpan={7}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr>
                <td colSpan={7}>No hay dispositivos</td>
              </tr>
            ) : (
              devices.map((device) => (
                <tr key={device._id}>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>{device.brand}</td>
                  <td>{device.deviceModel}</td>
                  <td>{device.status}</td>
                  <td>{device.serialNumber}</td>

                  <td>
                    <Link to={`/devices/edit/${device._id}`} className="btn btn-warning btn-sm mx-1">
                      Modificar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => DeleteDevice(device._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
