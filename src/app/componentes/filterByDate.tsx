"use client"
import { useEffect, useState } from "react";
import { CasesByDateTime } from "../services/casesByDateTime";


const FilterByDate = () => {
    const [dataAtual, setDataAtual] = useState<string>("");
    const [dados, setDados] = useState<any[]>([]);


    useEffect(() => {
        async function fetchData() {
            if (!dataAtual) return; // Garante que não faça a requisição se a data estiver vazia
            try {
                const res = await CasesByDateTime(dataAtual);
                setDados(res.data);
                console.log("Resposta da API:", res);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, [dataAtual]);
    const formatarData = (data: string) => {     //Formata a data pq no input vem com traços 
        return data.replaceAll("-", "");
    };

    console.log("Data", dataAtual)
    return (
        <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg mt-2">
            <h2 className="text-xl font-semibold mb-4 text-red-800">Status por Data</h2>
            <input type="date" value={dataAtual} onChange={(e) => setDataAtual(formatarData(e.target.value))}></input>

            <div className="grid grid-cols-4 gap-4 mt-4">
                {dados.length > 0 ? (
                    dados.map((state) => (
                        <div key={state.uid} className="border w-[220px] p-4 rounded-lg shadow-md bg-gray-50">
                            <h3 className="text-lg font-medium truncate">{state.state} ({state.uf})</h3>
                            <p>Casos: {state.cases.toLocaleString("pt-BR")}</p>
                            <p>Mortes: {state.deaths.toLocaleString("pt-BR")}</p>
                            <p>Suspeitos: {state.suspects.toLocaleString("pt-BR")}</p>
                            <p>Data: {state.datetime.split("T")[0]}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-4 text-center">Nenhum dado disponível para essa data.</p>   //Fallback para quando nao encontra nada
                )}
            </div>
        </div>
    );
}

export default FilterByDate;