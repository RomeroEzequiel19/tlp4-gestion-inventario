import React from 'react';
import { useValidationToken } from '../../hooks/useValidationJWT';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { loading, user } = useValidationToken();

    if (loading) return <div>Cargando...</div>;
    return (
      <header className='bg-dark p-4 text-white d-flex align-items-center w-100' style={{ width: '100vw' }}>
        <p className='mb-0'><span className='fw-bold'>User:</span> {user.username}</p>
      </header>
    )
};

