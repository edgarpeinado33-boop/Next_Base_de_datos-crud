import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TickeoForm = ({ onSubmit, editingTickeo, usuarios, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_usuario: '',
    fecha: '',
    hora: '',
    tipo: 'entrada'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTickeo) {
      setFormData({
        id_usuario: editingTickeo.id_usuario || '',
        fecha: editingTickeo.fecha || '',
        hora: editingTickeo.hora || '',
        tipo: editingTickeo.tipo || 'entrada'
      });
    }
  }, [editingTickeo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.id_usuario) {
      setError('Debe seleccionar un usuario.');
      return;
    }
    if (!formData.fecha) {
      setError('Debe ingresar la fecha.');
      return;
    }
    if (!formData.hora) {
      setError('Debe ingresar la hora.');
      return;
    }
    if (!['entrada', 'salida'].includes(formData.tipo)) {
      setError('Tipo inválido.');
      return;
    }

    onSubmit(formData);
  };

  const handleCancel = () => {
    navigate('/tickeos');
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar Tickeo' : 'Registrar Nuevo Tickeo'}</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="tickeo-form">
        <div className="form-group">
          <label htmlFor="id_usuario">Usuario:</label>
          <select
            id="id_usuario"
            name="id_usuario"
            value={formData.id_usuario}
            onChange={handleChange}
            required
          >
            <option value="">-- Seleccionar usuario --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.nombre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            id="hora"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Actualizar Tickeo' : 'Registrar Tickeo'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TickeoForm;
