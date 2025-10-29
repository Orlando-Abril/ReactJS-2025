import { useAuthContext } from '../context/AuthContext.jsx';
import { useCartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

function Pagar() {
  const { usuario } = useAuthContext();
  const { carrito, total, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const handleConfirmarPago = () => {
    alert(`¡Gracias por tu compra, ${usuario.nombre}! \nTotal: $${total.toFixed(2)}`);
    vaciarCarrito();
    navigate('/productos');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header">
            <h2 className="text-center m-0">Checkout</h2>
          </div>
          <div className="card-body p-4">
            
            <h5 className="card-title">Datos del Cliente:</h5>
            <p className="card-text">
              <strong>Nombre:</strong> {usuario.nombre} <br />
              <strong>Email:</strong> {usuario.email}
            </p>

            <hr />

            <h5 className="card-title">Resumen del Pedido:</h5>
            <ul className="list-group list-group-flush mb-3">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <span>{item.nombre} (x{item.cantidad})</span>
                  <span className="fw-bold">${(item.precio * item.cantidad).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-end mb-4">
              Total a Pagar: <span className="text-success">${total.toFixed(2)}</span>
            </h3>
            
            <button onClick={handleConfirmarPago} className="btn btn-success btn-lg w-100">
              Confirmar y Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagar;