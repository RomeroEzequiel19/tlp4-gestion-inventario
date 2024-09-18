import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { userReducer } from "../reducers/UserReducer";
import { ACTIONS } from "../types/type";

const UserContext = createContext();

const initialState = {
    users: [],
    loading: true,
    error: null
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const fetchUsers = async () => {
        dispatch({ type: ACTIONS.SET_LOADING });
        try {
            const response = await axios.get(`${SERVER_PATH.URL_PATH}/api/users`);
            console.log("DATOSSS: ", response)
            dispatch({ type: ACTIONS.FETCH_USERS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ACTIONS.FETCH_USERS_ERROR, payload: 'Error al obtener usuarios' });
        }
    };

    const addUser = async (user) => {
        try {
            const response = await axios.post(`${SERVER_PATH.URL_PATH}/api/users`, user);
            dispatch({ type: ACTIONS.ADD_USER_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ACTIONS.FETCH_USERS_ERROR, payload: 'Error al agregar usuario' });
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${SERVER_PATH.URL_PATH}/api/users/${userId}`);
            dispatch({ type: ACTIONS.DELETE_USER_SUCCESS, payload: userId });
        } catch (error) {
            dispatch({ type: ACTIONS.FETCH_USERS_ERROR, payload: 'Error al eliminar usuario' });
        }
    };

    return (
        <UserContext.Provider value={{ state, fetchUsers, addUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => useContext(UserContext);