import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

function RutaProtegida({ children, admin = false }) {
  const { usuario } = useAuthContext();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
  }

  if (admin && usuario.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;