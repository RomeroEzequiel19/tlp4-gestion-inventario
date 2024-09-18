import { createContext, useReducer } from "react";
import { UserReducer } from "../reducers/UserReducer";
import { typeList } from "../types/type";
import { fetchUser } from "../services/UserService";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // UseReducer para almacenar los usuarios
  const [users, dispatchUser] = useReducer(UserReducer, []);

  const handleDone = (id) => {
    dispatchUser({
      type: typeList.LIST_DELETE,
      payload: id,
    });
  };

  const agregateUser = (data) => {
    dispatchUser({
      type: typeList.LIST,
      payload: data,
    });
  };

  const editUser = (data) => {
    dispatchUser({
      type: typeList.LIST_UPDATE,
      payload: data,
    });
  };

  const createUser = (data) => {
    dispatchUser({
      type: typeList.LIST_ADD,
      payload: data,
    });
  };

  const fetchData = async () => {
    try {
      const data = await fetchUser(
        "api/users",
        "GET",
        localStorage.getItem("token")
      );
      agregateUser(data);
      console.log(users);
    } catch (error) {
      console.error("Error al obtener datos del servidor:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        handleDone,
        agregateUser,
        editUser,
        createUser,
        fetchData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
