import { useAuthContext } from '../context/AuthContext.jsx';

function Dashboard() {
  // Obtenemos los datos del admin logueado
  const { usuario } = useAuthContext();

  return (
    <div>
      <h2 className="mb-4">Dashboard de Administrador</h2>
      
      {/* Usamos un 'alert' de Bootstrap */}
      <div className="alert alert-success">
        <h4 className="alert-heading">¡Bienvenido, {usuario.nombre}!</h4>
        <p>Este es el panel de administración.</p>
        <hr />
        <p className="mb-0">
          Desde aquí podrás gestionar productos, ver órdenes y administrar usuarios.
        </p>
      </div>
      
      <h5>Datos del Administrador:</h5>
      <ul className="list-group">
        <li className="list-group-item">Email: {usuario.email}</li>
        <li className="list-group-item">Rol: {usuario.role}</li>
      </ul>
    </div>
  );
}

export default Dashboard;