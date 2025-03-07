"use client";

import { useEffect, useState } from "react";
import { CasesByCountries } from "../services/casesByCountries";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface CountryData {     // Interface para Tipar os dados que vem da API
    country: string;
    cases: number | null;
    confirmed: number;
    deaths: number;
    recovered: number | null;
    updated_at: string;
}

const FilterByCountry = () => {
    const [data, setData] = useState<CountryData[]>([]);   // State para guardar os dados que vem da API
    const [selectedCountry, setSelectedCountry] = useState<string | "all">("all"); // State para armazenar o país selecionado

    useEffect(() => {                       // Faz a requisição da API, usando o serviço CasesByCountries
        async function fetchData() {
            try {
                const res = await CasesByCountries();
                setData(res.data);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, []);

    console.log("PAÍSES", data);

    const filteredData =                   // Filtra os dados de acordo com o país selecionado
        selectedCountry === "all"
            ? data
            : data.filter((country) => country.country === selectedCountry);

    console.log("País selecionado", selectedCountry);

    return (
        <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg mt-2">
            <h2 className="text-xl font-semibold mb-4 text-red-700">Status por País</h2>
            <Select onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um país" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os Países</SelectItem>
                    {data.map((country) => (
                        <SelectItem key={country.country} value={country.country}>
                            {country.country}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="grid grid-cols-4 gap-4 mt-4">
                {filteredData.map((country) => (
                    <div key={country.country} className="border w-[220px] p-4 rounded-lg shadow-md bg-gray-50">
                        <h3 className="text-lg font-medium truncate">{country.country}</h3>
                        <p>Casos confirmados: {country.confirmed.toLocaleString("pt-BR")}</p>
                        <p>Mortes: {country.deaths.toLocaleString("pt-BR")}</p>
                        <p>Recuperados: {country.recovered ? country.recovered.toLocaleString("pt-BR") : "N/A"}</p>
                        <p>Última atualização: {new Date(country.updated_at).toLocaleString("pt-BR")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterByCountry;