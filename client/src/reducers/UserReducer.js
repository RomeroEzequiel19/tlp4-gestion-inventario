import { typeList } from "../types/type";

export const UserReducer = (users, action) => {
  switch (action.type) {
    case typeList.LIST:
      return action.payload;

    case typeList.LIST_ADD:
      return [...users, action.payload];

    case typeList.LIST_DELETE:
      return users.filter(user => user._id !== action.payload);

    case typeList.LIST_UPDATE:
      return users.map(user => 
        user._id === action.payload._id ? { ...user, ...action.payload } : user
      );

    default:
      return users;
  }
};
