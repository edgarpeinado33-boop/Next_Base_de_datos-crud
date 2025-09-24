import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
 
const CargoForm = ({ onSubmit, editingCargo, isEditing = false }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cargo: '',
    sueldo: ''
  })
 
  useEffect(() => {
    if (editingCargo) {
      setFormData({
        cargo: editingCargo.cargo || '',
        sueldo: editingCargo.sueldo || ''
      })
    }
  }, [editingCargo])
 
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()

    const dataToSubmit = {
      ...formData,
      sueldo: formData.sueldo ? Number(formData.sueldo) : 0
    }
    
    onSubmit(dataToSubmit)
  }
 
  const handleCancel = () => {
    navigate('/cargos')
  }
 
  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar Cargo' : 'Crear Nuevo Cargo'}</h2>
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="cargo">Cargo:</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="sueldo">Sueldo:</label>
          <input
            type="number"
            id="sueldo"
            name="sueldo"
            value={formData.sueldo}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Actualizar Cargo' : 'Crear Cargo'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
 
export default CargoForm
