import { createContext, useContext, useState, type ReactNode } from "react";
import { apiPrivate } from "../server/api";
import type { CategoryFormData } from "../schemas/CategorySchema";
import axios from "axios";
import type { Categoria } from "@/types/Catgory";

interface CategoriaContextData {
  criarCategoria: (data: CategoryFormData) => Promise<void>;
  getAllCategorias: () => Promise<void>;
  getCategoriaById: (id: string) => Promise<void>;
  deletarCategoria: (id: string) => Promise<void>;
  categorias: Categoria[];
  errorMessage: string | null;
  clearError: () => void;
  loading: boolean;

}

const CategoriaContext = createContext({} as CategoriaContextData);

interface CategoriaProviderProps {
  children: ReactNode;
}

export function CategoriaProvider({ children }: CategoriaProviderProps) {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

  const [loading, setLoading] = useState(false);


  async function criarCategoria(data: CategoryFormData) {
    try {
      await apiPrivate.post("/categoria/new", data);
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

  async function getAllCategorias() {
    try {
      setLoading(true);
      const response = await apiPrivate.get<Categoria[]>("/categoria/getAll");
      setCategorias(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao buscar categorias"
        );
      } else {
        setErrorMessage("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  async function getCategoriaById(id: string) {
    try {
      setLoading(true);

      const response = await apiPrivate.get<Categoria>(`/categoria/getById/${id}`);

      setCategoriaSelecionada(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setErrorMessage("Categoria não encontrada");
          setCategoriaSelecionada(null);
        } else {
          setErrorMessage(
            error.response?.data?.message || "Erro ao buscar categoria"
          );
        }
      } else {
        setErrorMessage("Erro inesperado");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }


  async function deletarCategoria(id: string) {
    try {
      setLoading(true);

      await apiPrivate.delete(`/categoria/delete/${id}`);

      // remove do estado local
      setCategorias((prev) =>
        prev.filter((categoria) => categoria.id !== id)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao deletar categoria"
        );
      } else {
        setErrorMessage("Erro inesperado");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }


  function clearError() {
    setErrorMessage(null);
  }


  return (
    <CategoriaContext.Provider value={{
      criarCategoria,
      getAllCategorias,
      getCategoriaById,
      deletarCategoria,
      categorias,
      errorMessage,
      clearError,
      loading,
    }}>
      {children}
    </CategoriaContext.Provider>
  );

}

export function useCategoria() {
  return useContext(CategoriaContext);
}
