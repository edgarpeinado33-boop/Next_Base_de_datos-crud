import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import HorarioList from "../components/HorarioList";

const HorarioListPage = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHorarios();
  }, []);

  async function getHorarios() {
    setLoading(true);
    const { data, error } = await supabase.from("horarios").select();
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    setHorarios(data);
    setLoading(false);
    console.log(data);
  }

  const handleDelete = async (id) => {
    if (!window.confirm("¿Desea eliminar este horario?")) return;

    const { error } = await supabase.from("horarios").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }

   
    setHorarios(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div className="page-container">
      <h1>Horarios</h1>
      <HorarioList 
        horarios={horarios} 
        onDelete={handleDelete} 
        loading={loading} 
      />
    </div>
  );
};

export default HorarioListPage;
