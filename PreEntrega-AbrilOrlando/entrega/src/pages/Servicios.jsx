function Servicios() {
  return (
    <div className="card shadow-sm p-4">
      <h2 className="mb-4">Nuestros Servicios</h2>
      <p>
        Ofrecemos una variedad de servicios para mejorar tu experiencia de juego.
      </p>
      
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Organización de Torneos:</strong>
          <p>Participa en torneos locales y en línea.</p>
        </li>
        <li className="list-group-item">
          <strong>Alquiler de Juegos:</strong>
          <p>Prueba juegos antes de comprarlos con nuestro servicio de alquiler.</p>
        </li>
        <li className="list-group-item">
          <strong>Mesas de Juego:</strong>
          <p>Reserva una mesa en nuestra tienda para jugar con amigos.</p>
        </li>
      </ul>
    </div>
  );
}

export default Servicios;