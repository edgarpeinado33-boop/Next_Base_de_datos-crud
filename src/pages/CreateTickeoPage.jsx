import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import TickeoForm from '../components/TickeoForm';

const CreateTickeoPage = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    const { data, error } = await supabase.from('usuarios').select('id, nombre');
    if (error) {
      console.error(error);
      return;
    }
    setUsuarios(data);
  };

  const createTickeo = async (tickeoData) => {
    const { data, error } = await supabase
      .from('tickeos')
      .insert([tickeoData]);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };

  const handleSubmit = (tickeoData) => {
    console.log('Creando tickeo:', tickeoData);
    createTickeo(tickeoData).then(() => navigate('/tickeos'));
  };

  return (
    <div>
      <h1>Registrar Nuevo Tickeo</h1>
      <TickeoForm onSubmit={handleSubmit} usuarios={usuarios} isEditing={false} />
    </div>
  );
};

export default CreateTickeoPage;
