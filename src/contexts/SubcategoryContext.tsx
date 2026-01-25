// contexts/SubCategoriaContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { apiPrivate } from "@/server/api";
import type { SubCategoryFormData } from "../schemas/SubcategorySchema";
import axios from "axios";
import type { SubCategoria } from "@/types/SubCategory";

interface SubCategoriaContextData {
  criarSubCategoria: (data: SubCategoryFormData) => Promise<void>;
  atualizarSubCategoria: (id: string, data: SubCategoryFormData) => Promise<void>;
  getSubCategoriaById: (id: string) => Promise<SubCategoria>;
  getAllSubCategorias: () => Promise<void>;
  deletarSubCategoria: (id: string) => Promise<void>;
  subCategorias: SubCategoria[];
  errorMessage: string | null;
  clearError: () => void;
  loading: boolean;
}

const SubCategoriaContext = createContext({} as SubCategoriaContextData);

interface SubCategoriaProviderProps {
  children: ReactNode;
}

export function SubCategoriaProvider({ children }: SubCategoriaProviderProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [loading, setLoading] = useState(false);

  async function criarSubCategoria(data: SubCategoryFormData) {
    try {
      await apiPrivate.post("/subcategoria/new", data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao cadastrar subcategoria"
        );
      } else {
        setErrorMessage("Erro inesperado");
      }

      throw error;
    }
  }

  async function getAllSubCategorias() {
    try {
      setLoading(true);
      const response = await apiPrivate.get<SubCategoria[]>("/subcategoria/getAll");
      setSubCategorias(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao buscar subcategorias"
        );
      } else {
        setErrorMessage("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  async function deletarSubCategoria(id: string) {
    try {
      setLoading(true);
      await apiPrivate.delete(`/subcategoria/${id}`);

      setSubCategorias((prev) =>
        prev.filter((sub) => sub.id !== id)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao deletar subcategoria"
        );
      } else {
        setErrorMessage("Erro inesperado");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getSubCategoriaById(id: string) {
    try {
      setLoading(true);
      const response = await apiPrivate.get<SubCategoria>(
        `/subcategoria/${id}`
      );
      console.log("RETORNO API:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao buscar subcategoria"
        );
      } else {
        setErrorMessage("Erro inesperado");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function atualizarSubCategoria(
    id: string,
    data: SubCategoryFormData
  ) {
    try {
      setLoading(true);
      await apiPrivate.put(`/subcategoria/${id}`, data);

      setSubCategorias((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, ...data } : sub
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao atualizar subcategoria"
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
    <SubCategoriaContext.Provider
      value={{
        criarSubCategoria,
        atualizarSubCategoria,
        getSubCategoriaById,
        getAllSubCategorias,
        deletarSubCategoria,
        subCategorias,
        errorMessage,
        clearError,
        loading,
      }}
    >

      {children}
    </SubCategoriaContext.Provider>
  );
}

export function useSubCategoria() {
  return useContext(SubCategoriaContext);
}
