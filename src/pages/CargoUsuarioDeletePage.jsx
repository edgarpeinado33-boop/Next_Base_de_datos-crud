import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from '../supabase/supabaseClient';

const DeleteCargoUsuarioPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cargoUsuario, setCargoUsuario] = useState(null);

    useEffect(() => {
        getCargoUsuario();
    }, []);

    const getCargoUsuario = async () => {
        const { data, error } = await supabase
            .from("cargos_usuarios")
            .select("*")
            .eq("id", id)
            .single();
        if (error) { 
            console.error(error); 
            return; 
        }
        setCargoUsuario(data);
    };

    const handleDelete = async () => {
        const { error } = await supabase
            .from("cargos_usuarios")
            .delete()
            .eq("id", id);
        if (error) { 
            console.error(error); 
            return; 
        }
        navigate('/cargos_usuarios');
    };

    const handleCancel = () => {
        navigate('/cargos_usuarios');
    };

    return (
        <div>
            <h1>Eliminar Cargo de Usuario</h1>
            {cargoUsuario ? (
                <div>
                    <p>
                        ¿Está seguro de eliminar el registro del 
                        usuario ID <strong>{cargoUsuario.id_usuario}</strong> con 
                        cargo ID <strong>{cargoUsuario.id_cargo}</strong>?
                    </p>
                    <button 
                        onClick={handleDelete} 
                        style={{ marginRight: "10px", backgroundColor: "red", color: "white" }}
                    >
                        Sí, Eliminar
                    </button>
                    <button onClick={handleCancel}>No, Cancelar</button>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default DeleteCargoUsuarioPage;
