import CargoUsuarioItem from './CargoUsuarioItem';
import { Link } from 'react-router-dom';

const CargoUsuarioList = ({ cargosUsuarios, onDelete, loading }) => {
    if (loading) return <div>Loading...</div>;

    return (
        <div className="user-page">
            <div className="user-header">
                <h2>Lista de Cargos de Usuarios ({cargosUsuarios.length})</h2>
                <Link to="/cargos_usuarios/create" className="btn btn-primary">
                    Asignar Nuevo Cargo
                </Link>
            </div>
            <div className="user-list">
                {cargosUsuarios.length === 0 ? (
                    <p>No hay cargos asignados.</p>
                ) : (
                    cargosUsuarios.map(cu => (
                        <CargoUsuarioItem key={cu.id} cargoUsuario={cu} onDelete={onDelete} />
                    ))
                )}
            </div>
        </div>
    );
};

export default CargoUsuarioList;
