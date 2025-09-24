import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../supabase/supabaseClient';
import TickeoForm from '../components/TickeoForm';

const EditTickeoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tickeo, setTickeo] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
    getTickeo();
  }, []);

  const getUsuarios = async () => {
    const { data, error } = await supabase.from('usuarios').select('id, nombre');
    if (error) {
      console.error(error);
      return;
    }
    setUsuarios(data);
  };

  const getTickeo = async () => {
    const { data, error } = await supabase
      .from('tickeos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return;
    }
    setTickeo(data);
  };

  const updateTickeo = async (tickeoData) => {
    const { data, error } = await supabase
      .from('tickeos')
      .update(tickeoData)
      .eq('id', id);

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  };

  const handleSubmit = (tickeoData) => {
    console.log('Actualizando tickeo:', tickeoData);
    updateTickeo(tickeoData).then(() => navigate('/tickeos'));
  };

  return (
    <div>
      <h2>Editar Tickeo</h2>
      {tickeo && usuarios.length > 0 ? (
        <TickeoForm
          onSubmit={handleSubmit}
          editingTickeo={tickeo}
          usuarios={usuarios}
          isEditing={true}
        />
      ) : (
        <p>Loading tickeo data...</p>
      )}
    </div>
  );
};

export default EditTickeoPage;
