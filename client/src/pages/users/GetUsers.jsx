import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../contexts/ContextUser";
import { fetchUser } from "../../services/UserService";
import { Header } from "../../components/common/Header";

export const GetUsers = () => {
  const { users, handleDone, fetchData } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const DeleteUser = (id) => {
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
            const data = await fetchUser(`api/users/${id}`, "DELETE");
            handleDone(id);
            if (data) {
              Swal.fire({
                icon: "success",
                title: "Usuario eliminado",
                text: data.message,
              });
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error("Error al eliminar el usuario:", error);
          }
        })();
      }
    });
  };

  return (
    <>
    <Header />
     <div className="main-table shadow m-5 bg-body rounded border">
      <table className="table table-striped rounded text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">Nombre de Usuario</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col" colSpan={2}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4}>No hay usuarios</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => DeleteUser(user._id)}
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
