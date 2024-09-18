import axios from "axios"

export const AuthService = () => {

    login: async (email, password) => {
        try {
          const response = await axios.post("/auth/login", { email, password });
          return response.data;
        } catch (error)
        {
          console.error("Login error:", error);
          throw new Error("Login failed");
        }
    }

}
