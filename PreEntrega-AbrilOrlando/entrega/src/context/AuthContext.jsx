import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: `${username}@ejemplo.com`,
        role: username.toLowerCase() === 'admin' ? 'admin' : 'user'
      });
    }
  }, []);

  const iniciarSesion = (username) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);

    console.log("Token creado:", token);
    console.log("Guardado en localStorage como authToken");

    setUsuario({
      nombre: username,
      email: `${username}@ejemplo.com`,
      role: username.toLowerCase() === 'admin' ? 'admin' : 'user'
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    setUsuario(null);
  };

  const value = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    isAuthenticated: !!usuario,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro of AuthProvider");
  }
  return context;
}