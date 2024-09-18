import { typeList } from "../types/type";

export const DeviceReducer = (state, action) => {
  switch (action.type) {

    case typeList.LIST:
      return action.payload;

    case typeList.LIST_ADD:
      return [...state, action.payload];

    case typeList.LIST_DELETE:
      return state.filter((device) => device.id !== action.payload);

    case typeList.LIST_UPDATE:
      return state.map((device) => {
        if (device.id == action.payload.id) {
          device = {
            ...device,
            ...action.payload,
          };
          return device;
        }
        return device;
      });
    default:
      return state;
  }
};