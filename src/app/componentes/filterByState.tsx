"use client";

import { useEffect, useState } from "react";
import { CasesByState } from "../services/casesByState";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface StateData {     //Interface para Tipar os dados que vem da API
    uid: number;
    uf: string;
    state: string;
    cases: number;
    deaths: number;
    suspects: number;
    refuses: number;
}

const FilterByState = () => {
    const [data, setData] = useState<StateData[]>([]);   // State para guardar os dados que vem da API
    const [selectedState, setSelectedState] = useState<string | "all">("all"); // State para armazenar o estado selecionado

    useEffect(() => {                       //Faz a requisição da API, usando o serviço CasesByState
        async function fetchData() {
            try {
                const res = await CasesByState();
                setData(res.data);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, []);

    const filteredData =                   //Filtra os dados de acordo com o estado selecionado
        selectedState === "all"
            ? data
            : data.filter((state) => state.uf === selectedState);

    console.log("Estado selecionado", selectedState)

    return (
        <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg mt-2">
            <h2 className="text-xl font-semibold mb-4 text-red-800">Status por Estado</h2>
            <Select onValueChange={setSelectedState}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os Estados</SelectItem>
                    {data.map((state) => (
                        <SelectItem key={state.uid} value={state.uf}>
                            {state.state}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="grid grid-cols-4 gap-4 mt-4">
                {filteredData.map((state) => (
                    <div key={state.uid} className="border w-[220px] p-4 rounded-lg shadow-md bg-gray-50">
                        <h3 className="text-lg font-medium truncate">{state.state} ({state.uf})</h3>
                        <p>Casos: {state.cases.toLocaleString("pt-BR")}</p>
                        <p>Mortes: {state.deaths.toLocaleString("pt-BR")}</p>
                        <p>Suspeitos: {state.suspects.toLocaleString("pt-BR")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterByState;
