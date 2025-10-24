import { useParams, useLocation, Link } from 'react-router-dom';

function DetalleProdutos() {
  const { id, categoria } = useParams();
  const location = useLocation();
  const { producto } = location.state; 

  return (
    <div className="card shadow-sm p-4">
      <div className="row g-4">
        {/* Columna de la Imagen */}
        <div className="col-md-6 text-center">
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        
        {/* Columna de la Info */}
        <div className="col-md-6">
          <span className="badge bg-secondary mb-2">{producto.categoria}</span>
          <h2>{producto.nombre}</h2>
          <p className="lead">{producto.descripcion}</p>
          <h3 className="my-3 text-primary">${producto.precio.toFixed(2)}</h3>
          
          <p className="text-muted small">ID del producto: {id}</p>
          
          <Link to="/productos" className="btn btn-primary mt-3">
            Volver a Productos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetalleProdutos;