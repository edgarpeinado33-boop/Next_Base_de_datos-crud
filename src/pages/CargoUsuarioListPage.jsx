import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import CargoUsuarioList from "../components/CargoUsuarioList";

const CargoUsuarioListPage = () => {
    const [cargosUsuarios, setCargosUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCargosUsuarios();
    }, []);

    const getCargosUsuarios = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("cargos_usuarios").select();
        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }
        setCargosUsuarios(data);
        setLoading(false);
    }

    const handleDelete = async (id) => {
        const { error } = await supabase.from("cargos_usuarios").delete().eq('id', id);
        if (error) {
            console.error(error);
            return;
        }
        setCargosUsuarios(cargosUsuarios.filter(cu => cu.id !== id));
    }

    return (
        <div className="page-container">
            <h1>Cargos de Usuarios</h1>
            <CargoUsuarioList cargosUsuarios={cargosUsuarios} onDelete={handleDelete} loading={loading} />
        </div>
    );
};

export default CargoUsuarioListPage;
