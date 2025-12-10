import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaSearch, FaShoppingCart, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importamos más iconos

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito, formatearNumeroArgentino } = useCartContext(); 
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1); 
  const productosPorPagina = 6; // Aumentamos a 6 para un grid más agradable

  const manejarEliminar = (producto) => {
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    navigate('/formulario-producto', { state: { producto } });
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    (producto.categoria && producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
      window.scrollTo(0, 0); // Scroll al inicio al cambiar de página
    }
  };

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  // SEO nativo específico para la página Productos
  useEffect(() => {
    document.title = "Productos | Tienda de Juegos de Mesa";

    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Página de productos: catálogo de juegos de mesa históricos, clásicos y modernos. Encuentra y compra tus juegos favoritos en línea.');
    updateMetaTag('keywords', 'juegos de mesa, comprar juegos de mesa, juegos históricos, juegos clásicos, juegos modernos, tienda de juegos');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'Productos - Tienda de Juegos de Mesa', 'property');
    updateMetaTag('og:description', 'Explora nuestro catálogo de juegos de mesa. Encuentra títulos clásicos, modernos y educativos.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', window.location.origin + '/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.origin + '/productos', 'property');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + '/productos';
  }, []);

  if (cargando) return <p className="text-center my-5">Cargando productos...</p>;
  if (error) return <p className="alert alert-danger text-center my-5">{error}</p>;

  return (
    <>
      <header className="container mt-5 mb-4">
        <h1 className="display-5 fw-bold text-dark">Catálogo de Productos</h1>
        <p className="lead text-muted">Explora nuestra colección de juegos de mesa.</p>
      </header>

      <div className="container mt-4">
        {/* Barra de búsqueda */}
        <div className="row mb-5 justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-light"><FaSearch /></span>
              <input
                type="text"
                placeholder="Buscar por nombre o categoría..."
                className="form-control form-control-lg"
                value={busqueda}
                onChange={manejarBusqueda}
              />
            </div>
            {busqueda && (
              <small className="text-muted d-block text-center mt-2">
                Mostrando **{productosFiltrados.length}** de {productos.length} productos
              </small>
            )}
          </div>
        </div>
        
        {productosFiltrados.length === 0 && (
            <div className="alert alert-info text-center">
                No se encontraron productos que coincidan con la búsqueda.
            </div>
        )}

        {/* Grid de productos - Usando Grid de Bootstrap (3 columnas en lg, 2 en md) */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productosActuales.map((producto) => (
            <div key={producto.id} className="col">
              <div className="card h-100 shadow-sm border-0 transition-card">
                <img
                  src={producto.avatar}
                  alt={producto.nombre}
                  className="card-img-top object-fit-cover"
                  style={{ height: "200px" }}
                />
               
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">{producto.nombre}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {producto.descripcion}
                  </p>
                  
                  {/* Precio formateado */}
                  <p className="card-text fw-bold fs-5 text-success mb-3">
                    ${formatearNumeroArgentino(producto.precio, 0)} 
                  </p>
                 
                  <div className="mt-auto">
                    <div className="d-grid gap-2 mb-2">
                      <Link
                        to={`/productos/${producto.id}`}
                        state={{producto}}
                        className="btn btn-outline-secondary"
                      >
                        Ver detalles
                      </Link>
                      <button
                        onClick={() => agregarAlCarrito(producto)}
                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: '#556B2F', color: 'white', borderColor: '#556B2F' }}
                      >
                        <FaShoppingCart size={16} /> Agregar al carrito
                      </button>
                    </div>

                    {/* Botones de admin */}
                    {esAdmin && (
                      <div className="mt-3 pt-3 border-top d-flex gap-2">
                          <button
                            onClick={() => manejarEditar(producto)}
                            className="btn btn-sm btn-info flex-fill d-flex align-items-center justify-content-center gap-1"
                          >
                            <FaEdit size={14} /> Editar
                          </button>
                          <button
                            onClick={() => manejarEliminar(producto)}
                            className="btn btn-sm btn-danger flex-fill d-flex align-items-center justify-content-center gap-1"
                          >
                            <FaTrashAlt size={14} /> Eliminar
                          </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginador */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-5">
            <button
                className={`btn btn-outline-secondary mx-1 d-flex align-items-center gap-1 ${paginaActual === 1 ? 'disabled' : ''}`}
                onClick={() => cambiarPagina(paginaActual - 1)}
            >
                <FaArrowLeft /> Anterior
            </button>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => cambiarPagina(index + 1)}
                style={{ backgroundColor: paginaActual === index + 1 ? '#556B2F' : 'transparent', color: paginaActual === index + 1 ? 'white' : '#556B2F', borderColor: '#556B2F' }}
              >
                {index + 1}
              </button>
            ))}
            <button
                className={`btn btn-outline-secondary mx-1 d-flex align-items-center gap-1 ${paginaActual === totalPaginas ? 'disabled' : ''}`}
                onClick={() => cambiarPagina(paginaActual + 1)}
            >
                Siguiente <FaArrowRight />
            </button>
          </div>
        )}

        {/* Información de la página actual */}  
        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2 mb-5">
            <small>
              Mostrando {productosActuales.length} productos
              (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}
      </div>
    </>
  );
}