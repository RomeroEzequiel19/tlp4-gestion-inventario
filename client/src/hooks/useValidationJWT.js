import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_PATH } from '../config/conf';
import {useNavigate} from "react-router-dom"

export const useValidationToken = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    
                    navigate("/login")
                }

                const response = await axios.get(`${SERVER_PATH.URL_PATH}api/auth/validate-token`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.valid) {
                    setUser(response.data.user);
                } else {
                    
                    navigate("/login")
                }
            } catch (err) {
                
                navigate("/login")
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    return { user, loading};
};

