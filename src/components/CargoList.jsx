import {Link} from 'react-router-dom';
import CargoItem from './CargoItem';

const CargoList = ({ cargos,onDelete,Loading }) => {
    if (Loading) return <div>Loading...</div>;

    return (
        <div className="user-page">
            <div className="user-header">
                <h2>Lista de Cargos {cargos.length}</h2>
                <Link to="/cargos/create" className="btn btn-primary">Crear Cargos</Link>
            </div>
            <div className="user-list">
                {cargos.length === 0 ? (
                    <p>No hay cargos disponibles.</p>
                ) : (
                    cargos.map((cargo) => (
                        <CargoItem key={cargo.id} cargo={cargo} onDelete={onDelete} />
                    ))
                )}                        
            </div>
        </div>
    );
}

export default CargoList;