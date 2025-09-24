import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargoUsuarioForm = ({ onSubmit, editingCargoUsuario, isEditing = false, usuarios = [], cargos = [] }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_usuario: '',
        id_cargo: '',
        fecha_inicio: ''
    });

    useEffect(() => {
        if (editingCargoUsuario) {
            setFormData({
                id_usuario: editingCargoUsuario.id_usuario || '',
                id_cargo: editingCargoUsuario.id_cargo || '',
                fecha_inicio: editingCargoUsuario.fecha_inicio || ''
            });
        }
    }, [editingCargoUsuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            id_usuario: parseInt(formData.id_usuario),
            id_cargo: parseInt(formData.id_cargo)
        };
        await onSubmit(dataToSubmit);
    };

    const handleCancel = () => {
        navigate('/cargos_usuarios');
    };

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Cargo de Usuario' : 'Asignar Nuevo Cargo'}</h2>
            <form onSubmit={handleSubmit} className="cargo-usuario-form">
                <div className="form-group">
                    <label htmlFor="id_usuario">Usuario:</label>
                    <select
                        id="id_usuario"
                        name="id_usuario"
                        value={formData.id_usuario}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Seleccionar Usuario --</option>
                        {usuarios.map(u => (
                            <option key={u.id} value={u.id}>{u.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="id_cargo">Cargo:</label>
                    <select
                        id="id_cargo"
                        name="id_cargo"
                        value={formData.id_cargo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Seleccionar Cargo --</option>
                        {cargos.map(c => (
                            <option key={c.id} value={c.id}>{c.cargo}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fecha_inicio">Fecha de Inicio:</label>
                    <input
                        type="date"
                        id="fecha_inicio"
                        name="fecha_inicio"
                        value={formData.fecha_inicio}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit">{isEditing ? 'Actualizar' : 'Asignar'}</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CargoUsuarioForm;
