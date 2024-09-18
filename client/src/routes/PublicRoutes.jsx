
import React from 'react'
import { useAuth } from '../contexts/ContextAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoutes = () => {
    const { isAuthenticated } = useAuth()
  return (
    !isAuthenticated ? <Outlet />  : <Navigate to="/dashboard" />
  )
}
