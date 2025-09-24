import {useParams, useNavigate} from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const CargoDeletePage = () => {
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

    const deleteCargo = async() => {
        const {data,error} = await supabase
                                    .from("cargos")
                                    .delete()
                                    .eq("id",id);
        if(error){
            console.error(error);
            return null;
        }
        return data;
    }

    const handleDelete = () => {
        console.log('Deleting user with id:', id);
        deleteCargo();
        navigate('/cargos');
    };

    return (
        <div>
            <h2>Borrar Cargo</h2>
            {cargo ? (
                <div>
                    <p>Are you sure you want to delete the user: <strong>{cargo.cargo}</strong>?</p>
                    <button onClick={handleDelete}>Yes, Delete</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default CargoDeletePage;  