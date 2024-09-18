import React from 'react';
import { useValidationToken } from '../hooks/useValidationJWT';

export const Dashboard = () => {
    const { user, loading, error } = useValidationToken();

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p>Rol: {user.role}</p>
        </div>
    );
};

