import { useParams,useNavigate } from "react-router-dom";
import CargoForm from "../components/CargoForm";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const EditUserPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [cargo,setCargo] = useState(null);


    useEffect(()=>{
        getCargo();
    },[]);

    const getCargo = async() => {
        const {data,error} = await supabase
                                    .from("cargos")
                                    .select("*")
                                    .eq("id",id)
                                    .single();
        if(error){
            console.error(error);
            return;
        }
        console.log(data);
        setCargo(data);
    }
    const updateCargo = async(userData) => {
        const {data,error} = await supabase
                                    .from("cargos")
                                    .update(userData)
                                    .eq("id",id);
        if(error){
            console.error(error);
            return null;
        }
        return data;
    }
    const handleSubmit = (cargoData) => {  
        console.log('Updating cargo:', cargoData);
        updateCargo(cargoData);
        navigate('/cargos');
    };

    return (
        <div>
            <h2>Edit Cargo</h2>
            {cargo ? (
                <CargoForm 
                    onSubmit={handleSubmit} 
                    editingUser={cargo}
                    isEditing={true}
                />
            ) : (
                <p>Loading cargo data...</p>
            )}
        </div>
    );
};

export default EditUserPage;