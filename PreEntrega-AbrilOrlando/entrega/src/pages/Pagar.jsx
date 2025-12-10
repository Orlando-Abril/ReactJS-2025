import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { FaUserCircle, FaSignOutAlt, FaCreditCard, FaTrashAlt, FaCartPlus, FaPlus, FaMinus } from 'react-icons/fa'; // Iconos

export default function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const {
    carrito,
    totalFormateado,
    vaciarCarrito,
    formatearNumeroArgentino,
    obtenerSubtotalItemFormateado,
    agregarCantidad,
    quitarCantidad,
  } = useCartContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem("authToken");

  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <>
      {/* Info del usuario */}
      <div className="container mt-5 p-4 bg-white rounded shadow-sm">
        <h2 className="h4 d-flex align-items-center gap-2 text-dark"><FaUserCircle size={20} /> Hola {usuario.nombre}</h2>
        <p className="text-muted small">Email: {usuario.email}</p>

        {usuario.nombre === 'admin' && (
            <div className="bg-light p-2 rounded small my-3 border">
              <strong>Token:</strong> 
              <code className="text-break d-block">{tokenActual}</code>
            </div>
        )}
        
        <div className="d-flex justify-content-between align-items-center mt-3">
             <button onClick={cerrarSesion} className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
                <FaSignOutAlt /> Cerrar sesión
              </button>
              <button onClick={() => navigate("/productos")} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
                <FaCartPlus /> Seguir Comprando
              </button>
        </div>
        <hr />
      </div>

      {/* Carrito */}
      <div className="container mt-4 p-4">
        <h2 className="mb-4 text-center">Resumen de tu Compra:</h2>

        {carrito.length > 0 ? (
          <>
            <div className="row">
              {carrito.map((producto) => (
                <div key={producto.id} className="col-12 mb-4">
                  <div className="card shadow-sm border-0">
                    <div className="row g-0 align-items-center">
                      
                      {/* Imagen del producto */}
                      <div className="col-md-2 p-2">
                        <img
                          src={producto.avatar}
                          alt={producto.nombre}
                          className="img-fluid rounded-start object-fit-cover w-100"
                          style={{ height: "150px" }}
                        />
                      </div>

                      {/* Información del producto */}
                      <div className="col-md-10">
                        <div className="card-body py-3">
                          <h5 className="card-title text-primary fw-bold mb-3">{producto.nombre}</h5>

                          <div className="row align-items-center">
                            
                            {/* Precio unitario */}
                            <div className="col-4 col-md-3">
                              <p className="mb-1 small text-muted">P. Unitario</p>
                              <p className="text-success fw-bold m-0">
                                ${formatearNumeroArgentino(producto.precio)}
                              </p>
                            </div>

                            {/* Cantidad con controles */}
                            <div className="col-4 col-md-4">
                              <p className="mb-1 small text-muted">Cantidad</p>
                              <div className="d-flex align-items-center gap-2">
                                <button
                                  onClick={() => quitarCantidad(producto.id)}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  <FaMinus size={10} />
                                </button>
                                
                                <span className="badge bg-dark fs-6 px-3 py-2">
                                  {producto.cantidad || 1}
                                </span>
                                
                                <button
                                  onClick={() => agregarCantidad(producto.id)}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  <FaPlus size={10} />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="col-4 col-md-5 text-end">
                              <p className="mb-1 small text-muted">Subtotal</p>
                              <h5 className="text-dark fw-bold m-0">
                                ${obtenerSubtotalItemFormateado(producto)}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-5" />

            {/* Total */}
            <div className="text-center p-4 bg-success text-white rounded shadow-lg">
              <h3 className="fs-3 fw-light mb-2">TOTAL A PAGAR</h3>
              <div className="display-4 fw-bold">
                ${totalFormateado}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="alert alert-info">
              <h4>No hay productos en el carrito</h4>
              <p>
                Agrega productos desde la tienda para continuar con tu compra
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="container mt-4 mb-5">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {carrito.length > 0 && (
            <>
              <button
                onClick={vaciarCarrito}
                className="btn btn-outline-danger px-4 d-flex align-items-center gap-2"
              >
                <FaTrashAlt /> Vaciar Carrito
              </button>

              <button
                onClick={comprar}
                className="btn btn-lg btn-success px-5 d-flex align-items-center gap-2"
              >
                <FaCreditCard /> Confirmar y Pagar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}