import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import CargoList from "../components/CargoList";


const CargoListPage = () => {
    const [cargos,setCargos] = useState([])


useEffect(() => {
  getCargos();
}, [])

async function getCargos() {
  const {data,error} = await supabase.from("cargos").select();
  if(error){
    console.error(error);
    return;
  }
  setCargos(data);
  console.log(data);
}

return (
  <div className="page-container">
      <h1>Cargo List</h1>
      <CargoList cargos={cargos} />
  </div>
);
};

export default CargoListPage;