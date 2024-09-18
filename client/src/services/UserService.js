import { SERVER_PATH } from "../config/conf";

export const fetchUser = async (route, method, payload) => {
  const url = `${SERVER_PATH.URL_PATH}${route}`;

  switch (method) {
    case "GET":
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${payload}`,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error;
      }

    case "POST":
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error en la solicitud POST:", error);
        throw error;
      }

    case "PUT":
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error en la solicitud PUT:", error);
        throw error;
      }

    case "DELETE":
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error en la solicitud DELETE:", error);
        throw error;
      }

    default:
      throw new Error("Método no admitido");
  }
};
