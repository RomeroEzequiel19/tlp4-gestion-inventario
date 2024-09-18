import React, { useEffect } from 'react';
import { Header } from '../../components/common/Header';
import { useUsers } from '../../contexts/ContextUser';

export const GetUsers = () => {

    const { state, fetchUsers } = useUsers();
    const { users, loading, error } = state;

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
  
  return (
    <div>
      <Header />
      <div>
        <h2>Lista de Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.username}</li>
                ))}
            </ul>
        </div>
      
    </div>
  );
};
