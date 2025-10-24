import { useCartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

function Carrito() {
  const { 
    carrito, 
    total, 
    vaciarCarrito, 
    agregarCantidad,
    quitarCantidad
  } = useCartContext();
  
  const navigate = useNavigate();

  const handlePagar = () => {
    navigate('/pagar'); 
  };

  return (
    // Card fija para el sidebar
    <div className="card shadow-sm position-sticky" style={{ top: '20px' }}>
      <div className="card-header">
        <h5 className="m-0">Carrito</h5>
      </div>
      <div className="card-body">
        {carrito.length === 0 ? (
          <p className="text-center">El carrito está vacío</p>
        ) : (
          <>
            {/* Lista de productos en el carrito */}
            <ul className="list-group list-group-flush">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item px-0">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold small">{item.nombre}</span>
                    <span className="text-muted">${item.precio}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-end mt-1">
                    <div className="btn-group btn-group-sm">
                      <button onClick={() => quitarCantidad(item.id)} className="btn btn-outline-secondary">-</button>
                      <span className="btn btn-outline-secondary disabled">{item.cantidad}</span>
                      <button onClick={() => agregarCantidad(item.id)} className="btn btn-outline-secondary">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <hr />
            
            <h5 className="text-end mb-3">
              Total: ${total.toFixed(2)}
            </h5>
            
            <button onClick={handlePagar} className="btn btn-success w-100 mb-2">
              Ir a Pagar
            </button>
            <button onClick={vaciarCarrito} className="btn btn-outline-danger w-100">
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Carrito;