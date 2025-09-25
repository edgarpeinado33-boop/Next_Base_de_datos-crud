import { Link } from "react-router-dom";

const CargoUsuarioItem = ({ cargoUsuario }) => {
    return (
        <div className="user-item">
            <div className="user-details">
                <p><strong>ID:</strong> {cargoUsuario.id}</p>
                <p><strong>Usuario ID:</strong> {cargoUsuario.id_usuario}</p>
                <p><strong>Cargo ID:</strong> {cargoUsuario.id_cargo}</p>
                <p><strong>Fecha de Inicio:</strong> {cargoUsuario.fecha_inicio}</p>
            </div>
            <div className="user-actions">
                <Link to={`/cargos_usuarios/edit/${cargoUsuario.id}`} className="btn btn-secondary">
                    Editar
                </Link>
                <Link to={`/cargos_usuarios/delete/${cargoUsuario.id}`} className="btn btn-danger">
                    Eliminar
                </Link>
            </div>
        </div>
    );
};

export default CargoUsuarioItem;
