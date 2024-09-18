import Swal from 'sweetalert2';

// Función auxiliar para manejar un inicio de sesión exitoso
export const handleLoginSuccess = (data, reset, navigate, login) => {

    login(data.token);
  
    Swal.fire({
      icon: "success",
      title: "Excelente",
      text: "Iniciado con éxito",
    });
  
    reset();
    navigate("/dashboard");
  };
  
  // Función auxiliar para manejar un error de inicio de sesión
export const handleLoginFailure = (message) => {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: message,
    });
};