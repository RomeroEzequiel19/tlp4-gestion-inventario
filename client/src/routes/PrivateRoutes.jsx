import React from 'react'
import { useAuth } from '../contexts/ContextAuth'
import { Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
    const {isAuthenticated} = useAuth()

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  )
}
