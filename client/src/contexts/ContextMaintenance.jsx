import { createContext, useReducer } from "react";
import { MaintenanceReducer } from "../reducers/MaintenanceReducer";
import { typeList } from "../types/type";
import { fetchUser } from "../services/UserService";

export const MaintenanceContext = createContext(null);

export const MaintenanceProvider = ({ children }) => {
  // UseReducer para almacenar el mantenimiento
  const [maintenances, dispatchMaintenance] = useReducer(MaintenanceReducer, []);

  const handleDone = (id) => {
    dispatchMaintenance({
      type: typeList.LIST_DELETE,
      payload: id,
    });
  };

  const agregateMaintenance = (data) => {
    dispatchMaintenance({
      type: typeList.LIST,
      payload: data,
    });
  };

  const editMaintenance = (data) => {
    dispatchMaintenance({
      type: typeList.LIST_UPDATE,
      payload: data,
    });
  };

  const createMaintenance = (data) => {
    dispatchMaintenance({
      type: typeList.LIST_ADD,
      payload: data,
    });
  };

  const fetchData = async () => {
    try {
      const data = await fetchUser("api/maintenances", "GET", localStorage.getItem("token"));
      agregateMaintenance(data);
    } catch (error) {
      console.error("Error al obtener datos del servidor:", error);
    }
  };

  return (
    <MaintenanceContext.Provider
      value={{
        maintenances,
        handleDone,
        agregateMaintenance,
        editMaintenance,
        createMaintenance,
        fetchData,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};
