import axios from "axios"
import { SERVER_PATH } from "../config/conf";

export const AuthService = {

    login: async (email, password) => {
        try {
          const response = await axios.post(`${SERVER_PATH.URL_PATH}api/auth/login`, { email, password });
          return response.data;
        } catch (error)
        {
          console.error("Login error:", error);
          throw new Error("Login failed");
        }
    },

}
