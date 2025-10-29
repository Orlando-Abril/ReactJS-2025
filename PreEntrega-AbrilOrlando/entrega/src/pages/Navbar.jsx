import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';

function Navbar() {
  const { carrito } = useCartContext();
  const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi Tienda</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            
            <div className="text-white me-3">
              🛒 <span className="badge bg-secondary">{carrito.length}</span>
            </div>

            {isAuthenticated ? (
              <div className="text-white d-flex align-items-center">
                
                {usuario.role === 'admin' && (
                  <Link to="/dashboard" className="btn btn-outline-warning btn-sm me-3">
                    Dashboard
                  </Link>
                )}
                
                <span className="me-2">Hola, {usuario.nombre}</span>
                <button onClick={cerrarSesion} className="btn btn-outline-light btn-sm">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link to="/iniciar-sesion" className="btn btn-outline-light btn-sm">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;