import {Link} from "react-router-dom";

const CargoItem = ({ cargo, onDelete }) => {
    return (
        <div className="user-item">     
            <div className="user-details">
                <p><strong>ID:</strong> {cargo.id}</p>
                <p><strong>Cargo:</strong> {cargo.cargo}</p>
                <p><strong>Sueldo:</strong> {cargo.sueldo}</p>
            </div>
            <div className="user-actions">
                <Link to={`/cargos/edit/${cargo.id}`} className="btn btn-secondary">Editar</Link>
                <Link to={`/cargos/delete/${cargo.id}`} className="btn btn-danger">Eliminar</Link>
            </div>
        </div>
    );
}

export default CargoItem;