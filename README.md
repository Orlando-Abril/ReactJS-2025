# 🛒 E-commerce App - ReactJS 2025

Aplicación web de comercio electrónico desarrollada como proyecto final para el curso de **React JS**. 
El sistema simula una tienda online completa con gestión de usuarios, carrito de compras persistente y un panel de administración para la gestión de productos (CRUD).

## 🚀 Demo y Características

### Funcionalidades para Usuarios:
* **Navegación de Productos:** Catálogo visual con opción de ver detalles específicos de cada ítem.
* **Carrito de Compras Inteligente:**
    * Persistencia de datos mediante `localStorage` (no se pierde tu carrito al recargar).
    * Control de stock: agregar, restar cantidades y eliminar ítems.
    * Cálculo automático de subtotales y totales con formato de moneda local.
* **Autenticación:** Sistema de Login simulado con generación de tokens.
* **Checkout:** Proceso de pago protegido (requiere inicio de sesión).

### Funcionalidades para Administradores (Dashboard):
* **Rutas Protegidas:** Acceso exclusivo para usuarios con rol `admin`.
* **Gestión de Productos:**
    * Alta de nuevos productos (Formulario validado).
    * Baja (Eliminación) de productos.
    * Edición de inventario.
* **Visualización de Token:** Panel técnico para ver el estado de la sesión.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido con **Vite** para un entorno de desarrollo rápido.

* **Core:** [React v19](https://react.dev/)
* **Enrutamiento:** [React Router DOM v7](https://reactrouter.com/) (Manejo de rutas públicas, privadas y 404).
* **Estado Global:** React Context API (`CartContext`, `AuthContext`, `ProductsContext`).
* **Estilos y UI:** * [Bootstrap 5](https://getbootstrap.com/) (Componentes y sistema de grillas).
    * [React Icons](https://react-icons.github.io/react-icons/) (Iconografía).
    * [React Toastify](https://fkhadra.github.io/react-toastify/) (Notificaciones flotantes).
* **Persistencia:** LocalStorage.

## 📂 Estructura del Proyecto

El código está organizado modularmente:

```text
src/
├── components/      # Componentes reutilizables (Formularios, Layout, Botones)
├── context/         # Lógica de estado global (Auth, Carrito, Productos)
├── pages/           # Vistas principales (Inicio, Dashboard, Checkout)
├── App.jsx          # Configuración de Rutas y Providers
└── main.jsx         # Punto de entrada

## Intrucciones de uso:
git clone <URL_DE_TU_REPO>
cd nombre-del-proyecto
npm install
npm run dev

