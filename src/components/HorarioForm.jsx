import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HorarioForm = ({ onSubmit, editingHorario, isEditing = false }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    hora_ingreso: '',
    hora_salida: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingHorario) {
      setFormData({
        hora_ingreso: editingHorario.hora_ingreso || '',
        hora_salida: editingHorario.hora_salida || ''
      })
    }
  }, [editingHorario])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.hora_ingreso) {
      setError('Debe ingresar la hora de ingreso.')
      return
    }

    if (!formData.hora_salida) {
      setError('Debe ingresar la hora de salida.')
      return
    }

    if (formData.hora_ingreso >= formData.hora_salida) {
      setError('La hora de salida debe ser posterior a la hora de ingreso.')
      return
    }

    onSubmit(formData)
  }

  const handleCancel = () => {
    navigate('/horarios')
  }

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar Horario' : 'Crear Nuevo Horario'}</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="hora_ingreso">Hora de ingreso:</label>
          <input
            type="time"
            id="hora_ingreso"
            name="hora_ingreso"
            value={formData.hora_ingreso}
            onChange={handleChange}
            step="1"       
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hora_salida">Hora de salida:</label>
          <input
            type="time"
            id="hora_salida"
            name="hora_salida"
            value={formData.hora_salida}
            onChange={handleChange}
            step="1"       // Permite seleccionar segundos
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Actualizar Horario' : 'Crear Horario'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default HorarioForm
