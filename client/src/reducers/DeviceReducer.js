import { ACTIONS } from "../types/type";

export const DeviceReducer = (state, action) => {
  switch (action.ACTIONS) {
    case ACTIONS.ADD:
      return [...state, action.payload];

    case ACTIONS.DELETE:
      return state.filter((device) => device.id !== action.payload);

    case ACTIONS.UPDATE:
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