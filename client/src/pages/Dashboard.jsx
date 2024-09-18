import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useValidationToken } from '../hooks/useValidationJWT';

export const Dashboard = () => {
    const { user, loading } = useValidationToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (user) {
                if (user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (user.role === 'user') {
                    navigate('/user-dashboard');
                }
            }
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Cargando...</div>;

};


