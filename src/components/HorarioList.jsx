import { Link } from 'react-router-dom';
import HorarioItem from './HorarioItem';

const HorarioList = ({ horarios, onDelete, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>Lista de Horarios ({horarios.length})</h2>
        <Link to="/horarios/create" className="btn btn-primary">Crear Horario</Link>
      </div>
      <div className="user-list">
        {horarios.length === 0 ? (
          <p>No hay horarios disponibles.</p>
        ) : (
          horarios.map(horario => (
            <HorarioItem key={horario.id} horario={horario} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default HorarioList;
