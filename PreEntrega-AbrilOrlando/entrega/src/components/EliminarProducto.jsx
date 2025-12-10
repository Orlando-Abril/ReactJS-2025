import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaTimesCircle, FaSpinner } from 'react-icons/fa'; // Iconos

function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto;
 
  const [cargando, setCargando] = useState(false);

  // Función para eliminar producto
  const eliminarProducto = async () => {
    if (!producto) return;
   
    setCargando(true);
    try {
      const respuesta = await
      fetch(`https://68d482e3214be68f8c696ae2.mockapi.io/api/productos/${producto.id}`, {
        method: 'DELETE',
      });
     
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto.');
      }


      alert('Producto eliminado correctamente.');
     
     navigate('/productos');
     setTimeout(() => {
      window.location.reload();
    }, 100);
     
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al eliminar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`
    );
   
    if (confirmar) {
      eliminarProducto();
    }
  };


  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <div className="p-4 shadow rounded-3 bg-white text-center">
        <h2 className="text-danger mb-4">Eliminar Producto</h2>
       
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">¡Advertencia!</h4>
          <p>Estás a punto de eliminar el siguiente producto de forma permanente:</p>
        </div>

        <div className="text-start mb-4 p-3 border rounded">
          <h3 className="h5 text-primary">Detalles del Producto:</h3>
          <p className="mb-1"><strong>Nombre:</strong> {producto?.nombre}</p>
          <p className="mb-1"><strong>Precio:</strong> ${producto?.precio}</p>
          <p className="mb-1"><strong>Categoría:</strong> {producto?.categoria || 'Sin categoría'}</p>
          <p className="mb-1"><strong>Descripción:</strong> {producto?.descripcion}</p>
          {producto?.avatar && (
            <img
              src={producto.avatar}
              alt="Producto a eliminar"
              className="img-fluid rounded mt-2"
              style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
            />
          )}
        </div>


        <p className="text-muted small fst-italic">
          Esta acción no se puede deshacer. El producto será eliminado permanentemente.
        </p>


        <div className="d-flex gap-3 justify-content-center mt-4">
          <button
            onClick={manejarEliminar}
            disabled={cargando}
            className="btn btn-danger btn-lg d-flex align-items-center gap-2"
          >
            {cargando 
              ? <><FaSpinner className="spin-icon" /> Eliminando...</> 
              : <><FaTrashAlt /> Sí, Eliminar</>
            }
          </button>
         
          <button
            onClick={() => navigate('/productos')}
            disabled={cargando}
            className="btn btn-secondary btn-lg d-flex align-items-center gap-2"
          >
            <FaTimesCircle /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
} export default EliminarProducto;