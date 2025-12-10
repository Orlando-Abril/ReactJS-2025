import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaSignInAlt, FaTimesCircle, FaUserShield } from 'react-icons/fa';

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Verificar credenciales (admin/1234@admin)
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      // Guarda el email ingresado y pasa nombre para el token admin
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email );
      navigate("/dashboard");
    }
    // Lógica para usuarios normales - SOLO si NO es admin
    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {
        // Guarda el email ingresado y pasa nombre para el token user
        localStorage.setItem("authEmail", formulario.email);
        iniciarSesion(formulario.nombre, formulario.email) ;

        // Si venía del carrito, redirige a pagar
        if (ubicacion.state?.carrito) {
            navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
        } else {
            navigate("/productos");
        }
    } else {
      alert(
        "Credenciales incorrectas. Si eres administrador, usa: admin / 1234@admin. De lo contrario, rellena ambos campos."
      );
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '450px' }}>
      <h1 className="h3 text-center mb-4">Inicia sesión para continuar</h1>
      <form onSubmit={manejarEnvio} className="p-4 shadow rounded-3 bg-white">
        
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input 
            className="form-control"
            type="text"
            placeholder="Nombre completo"
            value={formulario.nombre}
            onChange={(e) =>
              setFormulario({ ...formulario, nombre: e.target.value })
            }
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={formulario.email}
            onChange={(e) =>
              setFormulario({ ...formulario, email: e.target.value })
            }
            required
          />
        </div>
        
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
            <FaSignInAlt /> Iniciar Sesión
          </button>
          <button type="button" onClick={() => navigate("/productos")} className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
            <FaTimesCircle /> Cancelar
          </button>
        </div>

      </form>
      
      <p className="text-center mt-4 small text-muted">
        <FaUserShield className="me-1" /> Credenciales de administrador: `admin` / `1234@admin`
      </p>
    </div>
  );
}