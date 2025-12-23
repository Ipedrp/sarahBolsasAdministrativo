import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "../server/api";
import type { CategoryFormData } from "../schemas/CategorySchema";
import axios from "axios";

interface CategoriaContextData {
  criarCategoria: (data: CategoryFormData) => Promise<void>;
  errorMessage: string | null;
  clearError: () => void;
}

const CategoriaContext = createContext({} as CategoriaContextData);



interface CategoriaProviderProps {
  children: ReactNode;
}

export function CategoriaProvider({ children }: CategoriaProviderProps) {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  async function criarCategoria(data: CategoryFormData) {
    try {
      await api.post("/categoria/new", data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao cadastrar categoria"
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
    <CategoriaContext.Provider value={{
      criarCategoria,
      clearError, errorMessage,
    }}>
      {children}
    </CategoriaContext.Provider>
  );

}

export function useCategoria() {
  return useContext(CategoriaContext);
}
