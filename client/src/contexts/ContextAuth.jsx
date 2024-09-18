import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { Auth } from "../types/type";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("token") || null;
    const initialState = {
        isAuthenticated: false,
        user: null,
        token
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (token, user) => {
        localStorage.setItem("token", token);
        dispatch({
            type: Auth.LOGIN,
            payload: {token, user}
        });
    }

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: Auth.LOGOUT })
    }

    return(
        <AuthContext.Provider value={{
            ...state,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};

// Para usar contexto
export const useAuth = () => useContext(AuthContext)
