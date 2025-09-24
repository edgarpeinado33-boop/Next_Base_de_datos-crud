import { useParams, useNavigate } from "react-router-dom";
import HorarioForm from "../components/HorarioForm";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const EditHorarioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [horario, setHorario] = useState(null);

  useEffect(() => {
    getHorario();
  }, []);

  const getHorario = async () => {
    const { data, error } = await supabase
      .from("horarios")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
    setHorario(data);
  };

  const updateHorario = async (horarioData) => {
    const { data, error } = await supabase
      .from("horarios")
      .update(horarioData)
      .eq("id", id);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };

  const handleSubmit = (horarioData) => {
    console.log("Actualizando horario:", horarioData);
    updateHorario(horarioData).then(() => {
      navigate("/horarios");
    });
  };

  return (
    <div>
      <h2>Editar Horario</h2>
      {horario ? (
        <HorarioForm
          onSubmit={handleSubmit}
          editingHorario={horario}
          isEditing={true}
        />
      ) : (
        <p>Loading horario data...</p>
      )}
    </div>
  );
};

export default EditHorarioPage;
