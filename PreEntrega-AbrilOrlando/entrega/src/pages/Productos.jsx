import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carrito from './Carrito.jsx'; 
import { useCartContext } from '../context/CartContext.jsx';

function Productos() {
  const { agregarAlCarrito } = useCartContext();
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('No se pudo conectar a la API');
        const data = await response.json();
        
        const productosAdaptados = data.map(apiProducto => ({
          id: apiProducto.id,
          nombre: apiProducto.title,
          precio: apiProducto.price,
          descripcion: apiProducto.description,
          categoria: apiProducto.category,
          imagen: apiProducto.image
        }));
        
        setProductos(productosAdaptados);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, []);

  if (cargando) {
    return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error al cargar productos: {error}</div>;
  }

  return (
    // Sistema de Grids de Bootstrap: 9 columnas para productos, 3 para carrito
    <div className="row">
      <div className="col-lg-9">
        <h2>Productos</h2>
        {/* Grid responsivo para las cards */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productos.map(producto => (
            <div key={producto.id} className="col">
              {/* Componente Card de Bootstrap */}
              <div className="card h-100 shadow-sm">
                <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">${producto.precio.toFixed(2)}</p>
                </div>
                <div className="card-footer bg-white d-flex justify-content-between">
                  <button 
                    onClick={() => agregarAlCarrito(producto)}
                    className="btn btn-primary btn-sm"
                  >
                    Agregar
                  </button>
                  <Link 
                    to={`/productos/${encodeURIComponent(producto.categoria)}/${producto.id}`}
                    state={{ producto: producto }}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar del Carrito */}
      <div className="col-lg-3">
        <Carrito />
      </div>
    </div>
  );
}

export default Productos;