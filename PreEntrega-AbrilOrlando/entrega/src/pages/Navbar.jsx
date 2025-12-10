import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import styled from 'styled-components';
import { FaShoppingCart, FaUserCircle, FaTachometerAlt, FaPlusSquare } from 'react-icons/fa';

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion, esAdmin } = useAuthContext();
  const { vaciarCarrito, carrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const manejarCerrarSesion = () => {
    navigate("/productos");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  return (
    <>
      {/* Usamos fixed-top para que el navbar siempre esté visible arriba */}
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid px-4">
          <Logo to="/" className="navbar-brand">Juegos de Mesa</Logo>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link">Servicios</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/productos" className="nav-link">Productos</NavLink>
              </li>
              {/* Opción más directa para Admin */}
              {esAdmin && (
                <li className="nav-item">
                  <NavLink to="/formulario-producto" className="nav-link d-flex align-items-center gap-1">
                    <FaPlusSquare size={16}/>
                    Agregar Producto
                  </NavLink>
                </li>
              )}
            </ul>

            <SeccionUsuario className="d-flex align-items-center gap-3">
              {/* 1. Carrito de Compras */}
              <ContenedorCarrito> 
                <IconoCarrito to="/pagar" className="nav-link d-flex align-items-center">
                  <FaShoppingCart size={20} />  
                  {totalItemsCarrito > 0 && (
                    <ContadorCarrito>
                      {totalItemsCarrito}
                    </ContadorCarrito>
                  )}
                </IconoCarrito>
              </ContenedorCarrito>

              {/* 2. Sección de Usuario/Login */}
              {isAuthenticated ? (
                <ContenedorUsuario className="d-flex align-items-center gap-3">
                  {/* Nombre y Rol */}
                  <Bienvenida className='d-flex align-items-center'>
                    <FaUserCircle size={18} className='me-1' />
                    Hola, {usuario.nombre} {esAdmin && '(Admin)'}
                  </Bienvenida>
                 
                  {/* Dashboard para Admin */}
                  {esAdmin && (
                    <NavLinkAdmin to="/dashboard" className="nav-link d-flex align-items-center gap-1">
                      <FaTachometerAlt size={14}/>
                      Dashboard
                    </NavLinkAdmin>
                  )}
                 
                  {/* Botón de Cerrar Sesión */}
                  <BotonCerrarSesion onClick={manejarCerrarSesion} className="btn btn-sm">
                    Cerrar Sesión
                  </BotonCerrarSesion>
                </ContenedorUsuario>
              ) : (
                <BotonLogin to="/iniciar-sesion" className="btn btn-sm">Iniciar Sesión</BotonLogin>
              )}
            </SeccionUsuario>
          </div>
        </div>
      </NavbarContainer>
      {/* Spacer para evitar que el contenido quede debajo del fixed-top navbar */}
      <NavbarSpacer />
    </>
  )
} 

export default Navbar;

// Styled Components
const NavbarContainer = styled.nav`
  background-color: #2F4F4F !important; /* Gris-Verde Oscuro (Dark Slate Gray) - Color más sobrio */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 1rem;
`;

const NavbarSpacer = styled.div`
  /* Ajustar el espacio para el navbar fixed-top */
  height: 65px; 

  @media (max-width: 991.98px) {
    /* Ajuste para móviles cuando el navbar se colapsa */
    height: 60px;
  }
`;

const Logo = styled(Link)`
  color: #F0E68C !important; /* Caqui Oscuro - Destaca el logo */
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
 
  &:hover {
    color: #FFD700 !important; /* Dorado en hover */
  }
`;

const NavLink = styled(Link)`
  color: #FFFFFF !important;
  font-weight: 400;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
 
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: #F0E68C !important;
  }
`;

const NavLinkAdmin = styled(NavLink)`
  color: #98FB98 !important; /* Menta para admin */
  font-weight: 600;
  border: 1px solid #98FB98;
  padding: 0.4rem 0.8rem;

  &:hover {
    background-color: #98FB98;
    color: #2F4F4F !important;
  }
`;

const Bienvenida = styled.span`
  color: #FFFFFF;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
`;

const BotonCerrarSesion = styled.button`
  background: #DC143C; /* Rojo Carmesí */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  white-space: nowrap;
 
  &:hover {
    background: #B22222; /* Rojo Ladrillo más oscuro */
  }

  @media (max-width: 991.98px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const BotonLogin = styled(Link)`
  background: #3CB371; /* Verde Medio Mar */
  color: white !important;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background: #2E8B57; /* Verde Oscuro Mar */
  }
`;

const ContenedorCarrito = styled.div`
  position: relative;
`;

const IconoCarrito = styled(Link)`
  color: #FFFFFF !important;
  transition: color 0.3s;
  
  &:hover {
    color: #F0E68C !important; 
  }
`;

const ContadorCarrito = styled.span`
  position: absolute;
  top: -5px;
  right: -15px;
  background: #FF4500; /* Rojo Naranja Brillante */
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px;
`;

const SeccionUsuario = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 991.98px) {
    /* Ajuste para que los elementos se apilen correctamente en móviles */
    flex-direction: column; 
    align-items: flex-start; 
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
    padding-bottom: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const ContenedorUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 991.98px) {
    flex-direction: column;
    align-items: flex-start; 
    gap: 0.5rem;
    width: 100%;

    ${Bienvenida} {
        width: 100%;
        text-align: left;
    }
    ${NavLinkAdmin} {
        width: 100%;
        text-align: center;
    }
    ${BotonCerrarSesion} {
        width: 100%;
    }
  }
`;