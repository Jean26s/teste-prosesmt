
import FilterByState from "./componentes/filterByState";
import FilterByDate from "./componentes/filterByDate";
import FilterByCountries from "./componentes/filterByCountries";

import Formulario from "./componentes/formData";


export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl border-spacing-2 font-bold text-red-600">Covid-19 por Estados Brasileiros</h1>
      </div>
      <div className="ml-3 text-xl">
        <FilterByState />
        <FilterByDate />
        <FilterByCountries />
        <Formulario />
      </div>

    </>
  );
}
