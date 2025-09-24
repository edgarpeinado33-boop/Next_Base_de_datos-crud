import {useNavigate} from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import CargoForm from '../components/CargoForm';





const CreateCargoPage = () => {
    const navigate = useNavigate();

const createCargo = async(cargoData) => {
    const {data,error} = await supabase
                                .from("cargos")
                                .insert([cargoData]);
    if(error){
        console.error(error);
        return null;
    }
    return data;
}
    const handleSubmit = (cargoData) => {  
        console.log('Creando cargo:', cargoData);
        createCargo(cargoData);
        navigate('/cargos');
    };
    return (
        <div>
            <h1>Crear Nuevo Cargo</h1>
            <CargoForm onSubmit={handleSubmit} isEditing={false} />
        </div>  
    );
};

export default CreateCargoPage;