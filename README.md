# Aplicación de Gestión de Dispositivos, Usuarios y Mantenimiento

Esta aplicación permite la gestión de dispositivos, usuarios y registros de mantenimiento. Está dividida en dos partes: el **frontend**, desarrollado con React, y el **backend**, que utiliza Express y MongoDB.

## Características principales
- **Gestión de Dispositivos**: Crear, listar, editar y eliminar dispositivos.
- **Gestión de Usuarios**: Registrar usuarios, listarlos y autenticarlos.
- **Mantenimiento**: Registrar y gestionar los mantenimientos realizados en los dispositivos.

## Iniciar la aplicación

### Backend
1. Instalar las dependencias del backend:
   ```
   pnpm install
   ```
2. Configurar las variables de entorno, incluyendo la conexión a MongoDB.
3. Iniciar el servidor:
   ```
   pnpm run dev
   ```
   El backend estará corriendo en `http://localhost:3000`.

### Frontend
1. Instalar las dependencias del frontend:
   ```
   pnpm install
   ```
2. Iniciar la aplicación de React:
   ```
   pnpm run dev
   ```
   El frontend estará disponible en `http://localhost:5173`.

### Usuario por defecto

1. Se crea un usuario por defecto con rol de Admin con las siguientes credenciales para ingresar:
* email: 'admin@admin.com',
* password: "admin123"

### Roles

1. Admin: Puede gestionar Usuarios(operadores), dispositivos y el mantenimiento
2. User: Pueden gestionar los dispositivos y su mantenimiento

### Detalles:

* No se logra implementar validaciones ni muestra de los errores en frontend