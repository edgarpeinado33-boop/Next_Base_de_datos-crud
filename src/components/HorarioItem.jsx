
import { Link } from 'react-router-dom';

const HorarioItem = ({ horario, onDelete }) => {
  return (
    <div className="user-item">
      <div className="user-details">
        <p><strong>ID:</strong> {horario.id}</p>
        <p><strong>Ingreso:</strong> {horario.hora_ingreso}</p>
        <p><strong>Salida:</strong> {horario.hora_salida}</p>
      </div>
      <div className="user-actions">
        <Link to={`/horarios/edit/${horario.id}`} className="btn btn-secondary">
          Editar
        </Link>
        <button onClick={() => onDelete(horario.id)} className="btn btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default HorarioItem;
