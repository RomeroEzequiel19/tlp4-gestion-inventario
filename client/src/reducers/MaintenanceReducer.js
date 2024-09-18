import { typeList } from "../types/type";

export const MaintenanceReducer = (state, action) => {
  switch (action.type) {

    case typeList.LIST:
      return action.payload;

    case typeList.LIST_ADD:
      return [...state, action.payload];

    case typeList.LIST_DELETE:
      return state.filter((maintenance) => maintenance.id !== action.payload);

    case typeList.LIST_UPDATE:
      return state.map((maintenance) => {
        if (maintenance.id === action.payload.id) {
          return {
            ...maintenance,
            ...action.payload,
          };
        }
        return maintenance;
      });

    default:
      return state;
  }
};
