import axios from "axios"
import { SERVER_PATH } from "../config/conf";

export const AuthService = {

    login: async (email, password) => {
        try {
          const response = await axios.post(`${SERVER_PATH.URL_PATH}api/auth/login`, { email, password });
          console.log("Datos despues de consulta:", response.data)
          return response.data;
        } catch (error)
        {
          console.error("Login error:", error);
          throw new Error("Login failed");
        }
    },

    validToken: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${SERVER_PATH.URL_PATH}api/auth/validate-token`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        return response.data
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Get Data Token failed");
      }
    }

}
