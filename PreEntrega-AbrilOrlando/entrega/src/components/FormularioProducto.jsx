import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import styled from 'styled-components'; // Importamos styled-components para el contenedor
import { FaSave, FaTimesCircle, FaSpinner } from 'react-icons/fa'; // Iconos

function FormularioProducto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto, validar } = useProducts();
 
  // Obtener el producto pasado por el state
  const productoRecibido = location.state?.producto;
 
  // Determina el modo
  const modo = productoRecibido ? "editar" : "agregar";
 
  // Estados del componente
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    avatar: ''
  });
 
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  // Cargar datos del producto si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && productoRecibido) {
      setProducto({
        id: productoRecibido.id || '',
        nombre: productoRecibido.nombre || '',
        precio: productoRecibido.precio || '',
        descripcion: productoRecibido.descripcion || '',
        categoria: productoRecibido.categoria || '',
        avatar: productoRecibido.avatar || ''
      });
    }
  }, [modo, productoRecibido]);

  // f(x) manejarCambios | inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
   
    // Valida longitud max. descripción
    if (name === 'descripcion' && value.length > 200) return;
   
    setProducto(prev => ({ ...prev, [name]: value }));
   
    // Limpiar error del campo si existe
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  // f(x) validarFormulario - ahora usa la validación del contexto
  const validarFormulario = () => {
    const resultado = validar(producto);
    setErrores(resultado.errores);
    return resultado.esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
   
    // Valida antes de enviar usando el contexto
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.toString().replace(',', '.')
      };

      if (modo === "agregar") {
        // Usar el contexto para agregar producto
        const nuevoProducto = await agregarProducto(productoEnviar);
        alert(`Producto "${nuevoProducto.nombre}" agregado correctamente con ID: ${nuevoProducto.id}`);
       
        // Limpiar formulario después del éxito
        setProducto({
          id: '',
          nombre: '',
          precio: '',
          descripcion: '',
          categoria: '',
          avatar: ''
        });

        setTimeout(() => {
          navigate('/productos');
        }, 100);

      } else {
        // Usar el contexto para editar producto
        await editarProducto(productoEnviar);
        alert('Producto actualizado correctamente');

        setTimeout(() => {
          navigate('/productos');
        }, 100);
      }
     
      setErrores({});
     
    } catch (error) {
      alert(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} el producto`);
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    if (modo === "editar") {
      alert('Edición cancelada');
      navigate('/productos');
    }
  };

  // Renderizado del componente
  return (
    <FormContainer className="container my-5">
      <h2 className="text-center mb-4">{modo === "editar" ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
     
      <form onSubmit={manejarEnvio} className="p-4 shadow rounded-3 bg-white">
        {modo === "editar" && productoRecibido && (
          <p className="text-muted text-center mb-3 small">
            Editando: **{productoRecibido.nombre}** (ID: {productoRecibido.id})
          </p>
        )}
       
        {/* Campo Nombre */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nombre: *
          </label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={manejarCambio}
            disabled={cargando}
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            placeholder="Ingrese el nombre del producto"
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>

        {/* Campo Precio */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Precio: *
          </label>
          <input
            type="text"
            name="precio"
            value={producto.precio}
            onChange={manejarCambio}
            disabled={cargando}
            placeholder="Ej: 40.000"
            inputMode="decimal"
            className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
          />
          <small className="form-text text-muted">
            Formato argentino: punto para miles, sin decimales.
          </small>
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>


        {/* Campo Categoría */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Categoría:
          </label>
          <input
            type="text"
            name="categoria"
            value={producto.categoria}
            onChange={manejarCambio}
            disabled={cargando}
            placeholder="Ej: Electrónica, Ropa, Hogar, etc."
            className="form-control"
          />
        </div>

        {/* Campo Avatar URL */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Imagen (URL):
          </label>
          <input
            type="text"
            name="avatar"
            value={producto.avatar}
            onChange={manejarCambio}
            disabled={cargando}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="form-control"
          />
        </div>

        {/* Campo Descripción */}
        <div className="mb-4">
          <label className="form-label fw-bold">
            Descripción: *
          </label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={manejarCambio}
            rows="4"
            disabled={cargando}
            maxLength="200"
            placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            style={{ resize: 'vertical' }}
          />
          <small 
            className={`form-text ${producto.descripcion.length > 200 ? 'text-danger' : 'text-muted'}`}
          >
            {producto.descripcion.length}/200 caracteres
          </small>
          {errores.descripcion && (
            <div className="invalid-feedback">{errores.descripcion}</div>
          )}
        </div>

        <div className="d-flex gap-2 mb-3">
          <button
            type="submit"
            disabled={cargando}
            className={`btn btn-lg flex-fill d-flex align-items-center justify-content-center gap-2 ${modo === "editar" ? 'btn-success' : 'btn-primary'}`}
          >
            {cargando 
                ? <><FaSpinner className="spin-icon" /> {modo === "editar" ? 'Actualizando...' : 'Agregando...'}</>
                : <><FaSave /> {modo === "editar" ? 'Confirmar Cambios' : 'Agregar Producto'}</>
            }
          </button>
         
          {modo === "editar" && (
            <button
              type="button"
              onClick={cancelarEdicion}
              disabled={cargando}
              className="btn btn-secondary btn-lg flex-fill d-flex align-items-center justify-content-center gap-2"
            >
              <FaTimesCircle /> Cancelar
            </button>
          )}
        </div>
       
        <p className="text-muted small text-end">(*) Campos obligatorios</p>
      </form>
    </FormContainer>
  );
} export default FormularioProducto;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  .spin-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Colores de los botones para diferenciarlos */
  .btn-primary {
    background-color: #3CB371 !important; /* Verde medio mar - para agregar */
    border-color: #3CB371 !important;
  }
  .btn-success {
    background-color: #2E8B57 !important; /* Verde oscuro mar - para editar */
    border-color: #2E8B57 !important;
  }
`;