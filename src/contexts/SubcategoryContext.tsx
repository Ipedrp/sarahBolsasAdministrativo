import { createContext, useContext, useState, type ReactNode } from "react";
import { apiPrivate } from "@/server/api";
import type { SubCategoryFormData } from "../schemas/SubcategorySchema";
import axios from "axios";

interface SubCategoriaContext {
    criarSubCategoria: (data: SubCategoryFormData) => Promise<void>;
    errorMessage: string | null;
    clearError: () => void;
}

const SubCategoriaContext = createContext({} as SubCategoriaContext);

interface SubCategoriaProviderProps {
    children: ReactNode;
}

export function SubCategoriaProvider({ children }: SubCategoriaProviderProps) {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function criarSubCategoria(data: SubCategoryFormData) {
        try {
            await apiPrivate.post("/subcategoria/new", data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data?.message || "Error ao cadastrar subcategoria"
                );
            } else {
                setErrorMessage("Erro inesperado");
            }

            throw error; // importante para a página saber que falhou
        }
    }

    function clearError() {
        setErrorMessage(null);
    }

    return (
        <SubCategoriaContext.Provider value={{criarSubCategoria,
            clearError, errorMessage
        }}>
            {children}
        </SubCategoriaContext.Provider>
    )

}



export function useSubCategoria() {
    return useContext(SubCategoriaContext);
}













