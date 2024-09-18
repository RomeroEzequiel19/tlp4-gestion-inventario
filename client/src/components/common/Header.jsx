
import { Link } from 'react-router-dom';
import { useValidationToken } from '../../hooks/useValidationJWT';
import { useAuth } from '../../contexts/ContextAuth';

export const Header = () => {
  const { loading, user } = useValidationToken();
    const {logout} = useAuth()

    if (loading) return <div>Cargando...</div>;
    return (
      <header className='bg-dark p-4 text-white d-flex align-items-center w-100 justify-content-around' style={{ width: '100vw' }}>
        <Link to="/dashboard" className='fw-bold text-white text-decoration-none'>FORMOTEX</Link>
        <p className='mb-0'><span className='fw-bold'>User:</span> {user.username}</p>
        <button onClick={logout} className='bg-dark text-white fw-bold'>Cerrar Sesión</button>
      </header>
    )
};

