import { Link, useParams, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { FaTag, FaInfoCircle, FaDollarSign, FaArrowLeft, FaShoppingCart } from 'react-icons/fa'; 

const ProductoDetalle = () => {
    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;
    const { agregarAlCarrito, formatearNumeroArgentino } = useCartContext(); 

    if (!producto) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning text-center">
                    <h4 className="alert-heading">Producto no encontrado</h4>
                    <p>No se pudo cargar la información del producto. El ID podría ser incorrecto.</p>
                    <Link to="/productos" className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-50 mx-auto">
                        <FaArrowLeft /> Volver a Productos
                    </Link>
                </div>
            </div>
        );
    }
 
    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Detalles del Producto</h2>
           
            <div className="card shadow-lg border-0">
                <div className="row g-0">
                   
                    <div className="col-md-6 p-4 d-flex justify-content-center align-items-center bg-light rounded-start">
                        <img
                            src={producto.avatar}
                            alt={producto.nombre}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>

  
                    <div className="col-md-6">
                        <div className="card-body p-4">
                            <h1 className="h3 text-primary mb-3">{producto.nombre}</h1>
                           
                            <div className="mb-3">
                                <h5 className="fw-bold d-flex align-items-center gap-2"><FaInfoCircle /> Descripción:</h5>
                                <p className="card-text text-muted">{producto.descripcion}</p>
                            </div>
                           
                            <div className="mb-3">
                                <h5 className="fw-bold d-flex align-items-center gap-2"><FaTag /> Categoría:</h5>
                                <span className="badge bg-secondary ms-1 fs-6">{producto.categoria || 'General'}</span>
                            </div>
                   
                            <div className="mb-4">
                                <h5 className="fw-bold d-flex align-items-center gap-2 text-success"><FaDollarSign /> Precio:</h5>
                                <div className="display-6 fw-bold text-success">
                                    ${formatearNumeroArgentino(producto.precio)}
                                </div>
                            </div>
                           
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button
                                    onClick={() => agregarAlCarrito(producto)}
                                    className="btn btn-primary btn-lg d-flex align-items-center gap-2"
                                    style={{ backgroundColor: '#556B2F', borderColor: '#556B2F' }}
                                >
                                    <FaShoppingCart /> Agregar al carrito
                                </button>
                                <Link to={`/productos`} className="btn btn-outline-secondary btn-lg d-flex align-items-center gap-2">
                                    <FaArrowLeft /> Volver
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; export default ProductoDetalle;