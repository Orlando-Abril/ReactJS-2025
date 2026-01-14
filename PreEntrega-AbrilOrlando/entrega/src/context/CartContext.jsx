import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [cargaCompleta, setCargaCompleta] = useState(false);

  // CARGA al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargaCompleta(true);
  }, []);

  // SOLO GUARDA después de la carga inicial
  useEffect(() => {
    if (cargaCompleta) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito, cargaCompleta]);

  // Funciones del carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
    toast.success("Producto agregado al carrito!");
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  const quitarCantidad = (idProducto) => {
    setCarrito(
      carrito
        .map(producto => {
          if (producto.id === idProducto) {
            const cantidadActual = producto.cantidad || 1;
            if (cantidadActual === 1) return null;
            return { ...producto, cantidad: cantidadActual - 1 };
          }
          return producto;
        })
        .filter(producto => producto !== null)
    );
  };

  const agregarCantidad = (idProducto) => {
    setCarrito(
      carrito.map(producto =>
        producto.id === idProducto
          ? { ...producto, cantidad: (producto.cantidad || 1) + 1 }
          : producto
      )
    );
  };

  // Función helper para convertir números argentinos (entrada → número)
  const convertirNumeroArgentino = (v) => {
    const texto = String(v || 0);
    return Number(texto.replace(/\./g, '').replace(',', '.')) || 0;
  };

  // Función para formatear números con puntos cada tres cifras (número → salida)
  const formatearNumeroArgentino = (numero, decimales = 2) => {
    // Convertir a número si es string
    const num = typeof numero === 'string' 
      ? convertirNumeroArgentino(numero) 
      : Number(numero);
    
    // Formatear con separadores de miles
    return num.toLocaleString('es-AR', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    });
  };

  // Calcular total
  const calcularTotal = () => {
    return carrito.reduce((sum, item) => {
      const precio = convertirNumeroArgentino(item.precio);
      const cantidad = item.cantidad || 1;
      return sum + (precio * cantidad);
    }, 0);
  };

  // Total numérico
  const total = calcularTotal();
  
  // Total formateado para mostrar
  const totalFormateado = formatearNumeroArgentino(total);

  // Función para obtener el subtotal de un item específico
  const obtenerSubtotalItem = (item) => {
    const precio = convertirNumeroArgentino(item.precio);
    const cantidad = item.cantidad || 1;
    return precio * cantidad;
  };

  // Función para obtener el subtotal formateado de un item
  const obtenerSubtotalItemFormateado = (item) => {
    return formatearNumeroArgentino(obtenerSubtotalItem(item));
  };

  const value = {
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito,
    agregarCantidad,
    quitarCantidad,
    total, // Número para cálculos
    totalFormateado, // String formateado para mostrar
    convertirNumeroArgentino, // Para usar en otros componentes
    formatearNumeroArgentino, // Para usar en otros componentes
    obtenerSubtotalItem,
    obtenerSubtotalItemFormateado
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}