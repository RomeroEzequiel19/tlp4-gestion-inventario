import React, { useState } from 'react'
import { AuthService } from '../services/AuthService';
import {useAuth} from "../contexts/ContextAuth"
import {useNavigate} from "react-router-dom"
import { useForm } from '../hooks/useForm';
import { handleLoginFailure, handleLoginSuccess } from '../handlers/handlersLogin';

export const Login = () => {
  
  const { login } = useAuth();
  const navigate = useNavigate()

  // Usamos el hook useForm con valores iniciales
  const { form, handleInputChange, reset } = useForm({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await AuthService.login(email, password);

      // Validamos si el login fue exitoso
      if (data.user) {
        handleLoginSuccess(data, reset, navigate, login);
      } else {
        handleLoginFailure(data.message || "Error desconocido");
      }

    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };
  return (
    <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="text-center w-100 shadow-lg p-5" style={{ maxWidth: '400px' }} >
        <h2 className="h3 mb-3 text-primary font-weight-bold">
          Ingresa Tus Datos
        </h2>
        <p className="lead text-muted mb-4">
          Para iniciar sesión
        </p>
        <form  className="w-100" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="text-left d-block">Email <span className="text-danger">*</span></label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su email"
              className="form-control w-100"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="d-block ">Contraseña <span className="text-danger">*</span></label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese su contraseña"
              className="form-control w-100"
              value={form.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </main>


  )
}
