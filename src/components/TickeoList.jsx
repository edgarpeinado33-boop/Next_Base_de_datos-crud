import { Link } from 'react-router-dom';
import TickeoItem from './TickeoItem';

const TickeoList = ({ tickeos, onDelete, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>Lista de Tickeos ({tickeos.length})</h2>
        <Link to="/tickeos/create" className="btn btn-primary">Registrar Tickeo</Link>
      </div>
      <div className="user-list">
        {tickeos.length === 0 ? (
          <p>No hay tickeos disponibles.</p>
        ) : (
          tickeos.map((tickeo) => (
            <TickeoItem key={tickeo.id} tickeo={tickeo} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default TickeoList;
