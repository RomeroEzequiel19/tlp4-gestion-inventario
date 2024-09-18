import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { Auth } from "../types/type";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const initialState = {
        isAuthenticated: localStorage.getItem("token") ? true : false,
        token: localStorage.getItem("token") || null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    console.log("Estado: ",state)

    const login = (token) => {
        localStorage.setItem("token", token);
        dispatch({
            type: Auth.LOGIN,
            payload: {token}
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
