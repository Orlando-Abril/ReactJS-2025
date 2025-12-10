import { useCartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa'; // Iconos

function Carrito() {
  const { 
    carrito, 
    total, 
    vaciarCarrito, 
    agregarCantidad,
    quitarCantidad,
    formatearNumeroArgentino
  } = useCartContext();
  
  const navigate = useNavigate();

  const handlePagar = () => {
    navigate('/pagar'); 
  };

  return (
    <div className="card shadow-lg border-0" style={{ top: '20px' }}>
      <div className="card-header bg-dark text-white d-flex align-items-center gap-2">
        <FaShoppingCart size={20} />
        <h5 className="m-0">Tu Carrito</h5>
      </div>
      <div className="card-body">
        {carrito.length === 0 ? (
          <p className="text-center text-muted m-0 p-3">El carrito está vacío. ¡Agrega productos!</p>
        ) : (
          <>

            <ul className="list-group list-group-flush mb-3">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                  <div className='d-flex flex-column me-2'>
                    <span className="fw-bold small text-truncate" style={{maxWidth: '120px'}}>{item.nombre}</span>
                    <span className="text-muted small">${formatearNumeroArgentino(item.precio)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="btn-group btn-group-sm">
                      <button onClick={() => quitarCantidad(item.id)} className="btn btn-outline-secondary d-flex align-items-center"><FaMinus size={10} /></button>
                      <span className="btn btn-secondary disabled px-2">{item.cantidad}</span>
                      <button onClick={() => agregarCantidad(item.id)} className="btn btn-outline-secondary d-flex align-items-center"><FaPlus size={10} /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <hr className="my-3" />
            
            <h5 className="text-end mb-3 d-flex justify-content-between">
                <span>Total:</span>
                <span className='fw-bold text-success'>${formatearNumeroArgentino(total)}</span>
            </h5>
            
            <button onClick={handlePagar} className="btn btn-success w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
              <FaCreditCard /> Ir a Pagar
            </button>
            <button onClick={vaciarCarrito} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2">
              <FaTrashAlt /> Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Carrito;