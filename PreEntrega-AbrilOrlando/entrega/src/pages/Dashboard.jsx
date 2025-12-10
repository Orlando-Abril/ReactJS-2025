import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaListAlt, FaSignOutAlt } from 'react-icons/fa'; // Iconos

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem('authToken');


  const manejarAgregarProducto = () => {
    navigate('/formulario-producto');
  };

  return (
    <div className="container my-5" style={{ minHeight: '60vh' }}>
      <h1 className="display-5 fw-bold mb-4 text-primary">Dashboard Administrativo</h1>
      <div className="p-4 shadow-lg rounded-3 bg-light">
        <h2 className="h4 mb-3">Información del Administrador</h2>
        <p className="lead"><strong>Sesión iniciada como: </strong> <span className="badge bg-danger fs-6">{usuario.nombre}</span></p>
       
        {/* TOKEN */}
        <div className="bg-white p-3 rounded-3 my-4 border">
          <p className="mb-1 small text-muted">Token de autenticación (Solo para demostración):</p>
          <code className="text-break d-block">{tokenActual}</code>
        </div>

        {/* SECCIÓN DE ACCIONES ADMIN */}
        <div className="my-4 pt-3 border-top">
          <h3 className="h5 mb-3 text-secondary">Panel de Acciones:</h3>
          <div className="d-grid gap-3 d-md-flex justify-content-start">
            <button
              onClick={manejarAgregarProducto}
              className="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2"
            >
              <FaPlusCircle />
              Agregar Nuevo Producto
            </button>
           
            <Link
              to="/productos"
              className="btn btn-info btn-lg d-flex align-items-center justify-content-center gap-2"
            >
              <FaListAlt />
              Ver / Editar Productos
            </Link>
          </div>
        </div>
        <hr/>
       
        {/* BOTÓN CERRAR SESIÓN */}
        <button
          onClick={cerrarSesion}
          className="btn btn-danger mt-3 d-flex align-items-center gap-2"
        >
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}