import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_PATH } from '../config/conf';

export const useValidationToken = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${SERVER_PATH.URL_PATH}api/auth/validate-token`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.valid) {
                    setUser(response.data.user);
                } else {
                    setError('Token inválido');
                }
            } catch (err) {
                setError('Error al validar el token');
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    return { user, loading, error };
};

