import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { apiPrivate } from "@/server/api";
import type { Categoria } from "@/types/Category";
import type { CategoryFormData } from "@/schemas/CategorySchema";

interface CategoriaContextData {
  categorias: Categoria[];
  loading: boolean;
  errorMessage: string | null;

  criarCategoria: (data: CategoryFormData) => Promise<void>;
  atualizarCategoria: (id: string, data: CategoryFormData) => Promise<void>;
  deletarCategoria: (id: string) => Promise<void>;
  getAllCategorias: () => Promise<void>;
  getCategoriaById: (id: string) => Promise<Categoria>;

  clearError: () => void;
}

const CategoriaContext = createContext({} as CategoriaContextData);

export function CategoriaProvider({ children }: { children: ReactNode }) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function criarCategoria(data: CategoryFormData) {
    try {
      setLoading(true);

      const response = await apiPrivate.post<Categoria>(
        "/categoria/new",
        data
      );

      setCategorias((prev) => [...prev, response.data]);
    } catch (error) {
      handleAxiosError(error, "Erro ao criar categoria");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getAllCategorias() {
    try {
      setLoading(true);

      const response = await apiPrivate.get<Categoria[]>(
        "/categoria/getAll"
      );

      setCategorias(response.data);
    } catch (error) {
      handleAxiosError(error, "Erro ao buscar categorias");
    } finally {
      setLoading(false);
    }
  }

  async function getCategoriaById(id: string) {
    try {
      setLoading(true);

      const response = await apiPrivate.get<Categoria>(
        `/categoria/getById/${id}`
      );

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Erro ao buscar categoria");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function atualizarCategoria(id: string, data: CategoryFormData) {
    try {
      setLoading(true);

      const response = await apiPrivate.put<Categoria>(
        `/categoria/update/${id}`,
        data
      );

      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === id ? response.data : cat
        )
      );
    } catch (error) {
      handleAxiosError(error, "Erro ao atualizar categoria");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function deletarCategoria(id: string) {
    try {
      setLoading(true);

      await apiPrivate.delete(`/categoria/delete/${id}`);

      setCategorias((prev) =>
        prev.filter((cat) => cat.id !== id)
      );
    } catch (error) {
      handleAxiosError(error, "Erro ao deletar categoria");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setErrorMessage(null);
  }

  function handleAxiosError(error: unknown, fallback: string) {
    if (axios.isAxiosError(error)) {
      setErrorMessage(
        error.response?.data?.message || fallback
      );
    } else {
      setErrorMessage("Erro inesperado");
    }
  }

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        loading,
        errorMessage,
        criarCategoria,
        atualizarCategoria,
        deletarCategoria,
        getAllCategorias,
        getCategoriaById,
        clearError,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
}

export function useCategoria() {
  return useContext(CategoriaContext);
}
