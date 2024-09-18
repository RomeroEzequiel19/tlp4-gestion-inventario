import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { Header } from "../../components/common/Header";
import { Link } from "react-router-dom";
import { MaintenanceContext } from "../../contexts/ContextMaintenance";
import { fetchUser } from "../../services/UserService";

export const GetMaintenances = () => {
  const { maintenances, handleDone, fetchData } = useContext(MaintenanceContext);

  useEffect(() => {
    fetchData();
  }, []);

  const deleteMaintenance = (id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de eliminar el registro?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            const data = await fetchUser(`api/maintenances/${id}`, "DELETE", localStorage.getItem("token"), null);
            handleDone(id);
            if (data) {
              Swal.fire({
                icon: "success",
                title: "Mantenimiento eliminado",
                text: data.message,
              });
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error("Error al eliminar el mantenimiento:", error);
          }
        })();
      }
    });
  };

  return (
    <>
      <Header />
      <div className="m-5">
        <Link to="/maintenances/create" className="p-2 text-decoration-none text-white fw-bold bg-dark">
          Crear Mantenimiento
        </Link>
      </div>
      <div className="main-table shadow m-5 bg-body rounded border">
        <table className="table table-striped rounded text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">Dispositivo</th>
              <th scope="col">Fecha de Mantenimiento</th>
              <th scope="col">Descripción</th>
              <th scope="col" colSpan={2}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {maintenances.length === 0 ? (
              <tr>
                <td colSpan={5}>No hay mantenimientos</td>
              </tr>
            ) : (
              maintenances.map((maintenance) => (
                <tr key={maintenance._id}>
                  <td>{maintenance.device}</td>
                  <td>{new Date(maintenance.maintenanceDate).toLocaleDateString()}</td>
                  <td>{maintenance.description}</td>
                  <td>
                    <Link to={`/maintenances/edit/${maintenance._id}`} className="btn btn-warning btn-sm mx-1">
                      Modificar
                    </Link>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => deleteMaintenance(maintenance._id)}
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
