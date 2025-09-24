import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';
import CargoUsuarioForm from "../components/CargoUsuarioForm";

const EditCargoUsuarioPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cargoUsuario, setCargoUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // Traer el registro
        const { data: cuData, error: errorCU } = await supabase.from("cargos_usuarios").select("*").eq("id", id).single();
        if (errorCU) { console.error(errorCU); setLoading(false); return; }

        // Traer usuarios
        const { data: usuariosData, error: errorUsuarios } = await supabase.from("usuarios").select();
        if (errorUsuarios) { console.error(errorUsuarios); setLoading(false); return; }

        // Traer cargos
        const { data: cargosData, error: errorCargos } = await supabase.from("cargos").select();
        if (errorCargos) { console.error(errorCargos); setLoading(false); return; }

        setCargoUsuario(cuData);
        setUsuarios(usuariosData);
        setCargos(cargosData);
        setLoading(false);
    }

    const updateCargoUsuario = async (cargoUsuarioData) => {
        cargoUsuarioData.id_usuario = parseInt(cargoUsuarioData.id_usuario);
        cargoUsuarioData.id_cargo = parseInt(cargoUsuarioData.id_cargo);

        const { data, error } = await supabase.from("cargos_usuarios").update(cargoUsuarioData).eq("id", id);
        if (error) {
            console.error("Error Supabase:", error);
            return { success: false, error };
        }
        return { success: true, data };
    }

    const handleSubmit = async (cargoUsuarioData) => {
        const result = await updateCargoUsuario(cargoUsuarioData);
        if (!result.success) {
            alert("No se pudo actualizar el registro:\n" + result.error.message);
            return;
        }
        navigate('/cargos_usuarios');
    }

    if (loading) return <p>Loading data...</p>;

    return (
        <div>
            <h1>Editar Cargo de Usuario</h1>
            <CargoUsuarioForm
                onSubmit={handleSubmit}
                editingCargoUsuario={cargoUsuario}
                isEditing={true}
                usuarios={usuarios}
                cargos={cargos}
            />
        </div>
    );
};

export default EditCargoUsuarioPage;
