import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import CargoUsuarioForm from '../components/CargoUsuarioForm';

const CreateCargoUsuarioPage = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // Traer usuarios
        const { data: usuariosData, error: errorUsuarios } = await supabase.from("usuarios").select();
        if (errorUsuarios) { console.error(errorUsuarios); setLoading(false); return; }

        // Traer cargos
        const { data: cargosData, error: errorCargos } = await supabase.from("cargos").select();
        if (errorCargos) { console.error(errorCargos); setLoading(false); return; }

        setUsuarios(usuariosData);
        setCargos(cargosData);
        setLoading(false);
    }

    const createCargoUsuario = async (cargoUsuarioData) => {
        // Convertir ids a enteros
        cargoUsuarioData.id_usuario = parseInt(cargoUsuarioData.id_usuario);
        cargoUsuarioData.id_cargo = parseInt(cargoUsuarioData.id_cargo);

        const { data, error } = await supabase.from("cargos_usuarios").insert([cargoUsuarioData]);
        if (error) {
            console.error("Error Supabase:", error);
            return { success: false, error };
        }
        return { success: true, data };
    }

    const handleSubmit = async (cargoUsuarioData) => {
        const result = await createCargoUsuario(cargoUsuarioData);
        if (!result.success) {
            alert("No se pudo crear el registro:\n" + result.error.message);
            return;
        }
        navigate('/cargos_usuarios');
    }

    if (loading) return <p>Loading data...</p>;

    return (
        <div>
            <h1>Asignar Nuevo Cargo a Usuario</h1>
            <CargoUsuarioForm
                onSubmit={handleSubmit}
                isEditing={false}
                usuarios={usuarios}
                cargos={cargos}
            />
        </div>
    );
};

export default CreateCargoUsuarioPage;
