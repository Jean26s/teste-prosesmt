"use client";

import { useState } from "react";

export default function Formulario() {
    // Estados para cada campo do formulário
    const [estado, setEstado] = useState("");
    const [casos, setCasos] = useState("");
    const [confirmados, setConfirmados] = useState("");
    const [mortos, setMortos] = useState("");
    const [recuperados, setRecuperados] = useState("");
    const [data, setData] = useState("");
    const [erros, setErros] = useState<Record<string, string>>({}); // Estado para armazenar erros

    // Função para validar os campos
    const validarCampos = () => {
        const novosErros: Record<string, string> = {};

        if (!estado) novosErros.estado = "Estado é obrigatório";
        if (!casos) novosErros.casos = "Casos é obrigatório";
        if (!confirmados) novosErros.confirmados = "Confirmados é obrigatório";
        if (!mortos) novosErros.mortos = "Mortos é obrigatório";
        if (!recuperados) novosErros.recuperados = "Recuperados é obrigatório";
        if (!data) novosErros.data = "Data é obrigatória";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0; // Retorna true se não houver erros
    };

    // Função chamada ao enviar o formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validarCampos()) {
            const dadosFormulario = {
                estado,
                casos: Number(casos),
                confirmados: Number(confirmados),
                mortos: Number(mortos),
                recuperados: Number(recuperados),
                data,
            };

            console.log("Dados do formulário:", JSON.stringify(dadosFormulario, null, 2));
            alert("Dados enviados com sucesso!\n" + JSON.stringify(dadosFormulario, null, 2));
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-6">Formulário de Dados</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Estado */}
                <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Digite o estado"
                    />
                    {erros.estado && (
                        <span className="text-red-500 text-sm">{erros.estado}</span>
                    )}
                </div>

                {/* Campo Casos */}
                <div>
                    <label className="block text-sm font-medium mb-1">Casos</label>
                    <input
                        type="number"
                        value={casos}
                        onChange={(e) => setCasos(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Digite o número de casos"
                    />
                    {erros.casos && (
                        <span className="text-red-500 text-sm">{erros.casos}</span>
                    )}
                </div>

                {/* Campo Confirmados */}
                <div>
                    <label className="block text-sm font-medium mb-1">Confirmados</label>
                    <input
                        type="number"
                        value={confirmados}
                        onChange={(e) => setConfirmados(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Digite o número de confirmados"
                    />
                    {erros.confirmados && (
                        <span className="text-red-500 text-sm">{erros.confirmados}</span>
                    )}
                </div>

                {/* Campo Mortos */}
                <div>
                    <label className="block text-sm font-medium mb-1">Mortos</label>
                    <input
                        type="number"
                        value={mortos}
                        onChange={(e) => setMortos(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Digite o número de mortos"
                    />
                    {erros.mortos && (
                        <span className="text-red-500 text-sm">{erros.mortos}</span>
                    )}
                </div>

                {/* Campo Recuperados */}
                <div>
                    <label className="block text-sm font-medium mb-1">Recuperados</label>
                    <input
                        type="number"
                        value={recuperados}
                        onChange={(e) => setRecuperados(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Digite o número de recuperados"
                    />
                    {erros.recuperados && (
                        <span className="text-red-500 text-sm">{erros.recuperados}</span>
                    )}
                </div>

                {/* Campo Data */}
                <div>
                    <label className="block text-sm font-medium mb-1">Data</label>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                    {erros.data && (
                        <span className="text-red-500 text-sm">{erros.data}</span>
                    )}
                </div>

                {/* Botão de Enviar */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}