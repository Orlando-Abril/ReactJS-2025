import React from "react";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Navbar from "./pages/Navbar";
import Productos from "./pages/Productos";
import DetalleProdutos from "./pages/DetalleProductos";
import Pagar from "./pages/Pagar";
import RutaProtegida from "./pages/RutaProtegida";
import IniciarSesion from "./pages/IniciarSesion";
import Footer from "./pages/Footer";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        
        <Navbar />
        
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:categoria/:id" element={<DetalleProdutos />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />

            <Route
              path="/pagar"
              element={
                <RutaProtegida>
                  <Pagar />
                </RutaProtegida>
              }
            />


            <Route path="/servicios" element={<Servicios />} />

            <Route
              path="/dashboard"
              element={
                <RutaProtegida admin={true}>
                  <Dashboard />
                </RutaProtegida>
              }
            />
            
            <Route path="*" element={<h2 className="text-center">Error 404: Página no encontrada</h2>} />
          </Routes>
        </main>
        
        <Footer />
        
      </CartProvider>
    </AuthProvider>
  );
}

export default App;