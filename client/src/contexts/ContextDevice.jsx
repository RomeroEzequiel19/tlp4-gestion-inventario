import { createContext, useReducer } from "react";
import { DeviceReducer } from "../reducers/DeviceReducer";
import { typeList } from "../types/type";
import { fetchDevice } from "../services/DeviceService";

export const DeviceContext = createContext(null);

export const DeviceProvider = ({ children }) => {
  // UseReducer para almacenar los dispositivos
  const [devices, dispatchDevice] = useReducer(DeviceReducer, []);

  const handleDone = (id) => {
    dispatchDevice({
      type: typeList.LIST_DELETE,
      payload: id,
    });
  };

  const agregateDevice = (data) => {
    dispatchDevice({
      type: typeList.LIST,
      payload: data,
    });
  };

  const editDevice = (data) => {
    dispatchDevice({
      type: typeList.LIST_UPDATE,
      payload: data,
    });
  };

  const createDevice = (data) => {
    dispatchDevice({
      type: typeList.LIST_ADD,
      payload: data,
    });
  };

  const fetchData = async () => {
    try {
      const data = await fetchDevice(
        "api/devices",
        "GET",
        localStorage.getItem("token")
      );
      agregateDevice(data);
    } catch (error) {
      console.error("Error al obtener datos del servidor:", error);
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        handleDone,
        agregateDevice,
        editDevice,
        createDevice,
        fetchData,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
