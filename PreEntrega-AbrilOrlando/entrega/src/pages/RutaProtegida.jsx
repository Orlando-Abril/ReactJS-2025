import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

// 1. Aceptamos una nueva prop 'admin'
function RutaProtegida({ children, admin = false }) {
  const { usuario } = useAuthContext(); // Obtenemos el usuario (con el 'role')
  const location = useLocation();

  // 2. La lógica de autenticación (login) sigue igual
  if (!usuario) {
    return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
  }

  // 3. ESTA ES LA NUEVA LÓGICA PARA ADMIN
  // Si la ruta requiere admin (admin={true}) Y el rol del usuario NO es 'admin'
  if (admin && usuario.role !== 'admin') {
    // Lo redirigimos al inicio, no tiene permisos
    return <Navigate to="/" replace />;
  }

  // Si está logueado Y (si se requiere) es admin, dejamos pasar
  return children;
}

export default RutaProtegida;