import { Link } from "react-router-dom";

const TickeoItem = ({ tickeo, onDelete }) => {
  return (
    <div className="user-item">
      <div className="user-details">
        <p><strong>ID:</strong> {tickeo.id}</p>
        <p><strong>Usuario:</strong> {tickeo.usuario_nombre}</p>
        <p><strong>Fecha:</strong> {tickeo.fecha}</p>
        <p><strong>Hora:</strong> {tickeo.hora}</p>
        <p><strong>Tipo:</strong> {tickeo.tipo}</p>
      </div>
      <div className="user-actions">
        <Link to={`/tickeos/edit/${tickeo.id}`} className="btn btn-secondary">
          Editar
        </Link>
        <Link to={`/tickeos/delete/${tickeo.id}`} className="btn btn-danger">
          Eliminar
        </Link>
      </div>
    </div>
  );
};

export default TickeoItem;
