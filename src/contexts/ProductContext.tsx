import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiPrivate } from "@/server/api";
import type { Produto } from "@/types/Product";
import type { ProductFormData, UpdateProductFormData } from "@/schemas/ProductSchema";
import axios from "axios";

interface ProductContextData {
  produtos: Produto[];
  listarProdutos: () => Promise<void>;
  criarProduto: (data: ProductFormData) => Promise<void>;
  atualizarProduto: (id: string, data: UpdateProductFormData) => Promise<void>;
  getProdutoById: (id: string) => Promise<Produto>;
  inativoProduto: (id: string) => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
  clearError: () => void;
}

const ProductContext = createContext({} as ProductContextData);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function listarProdutos() {
    try {
      setLoading(true);
      const response = await apiPrivate.get<Produto[]>("/product/all");
      setProdutos(response.data);
    } catch (err) {
      setErrorMessage("Erro ao listar produtos");
    } finally {
      setLoading(false);
    }
  }

  async function getProdutoById(id: string): Promise<Produto> {
  try {
    setLoading(true);

    const response = await apiPrivate.get<Produto>(
      `/product/${id}`
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setErrorMessage(
        err.response?.data?.message || "Erro ao buscar produto"
      );
    }
    throw err;
  } finally {
    setLoading(false);
  }
}

  async function criarProduto(data: ProductFormData) {
    try {
      setLoading(true);
      setErrorMessage(null);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "img_externa" || key === "img_interna") {
            Array.from(value as FileList).forEach((file) =>
              formData.append(key, file)
            );
          } else {
            formData.append(key, String(value));
          }
        }
      });

      await apiPrivate.post("/product/newProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await listarProdutos();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data?.message || "Erro ao criar produto");
      }
    } finally {
      setLoading(false);
    }
  }

  async function inativoProduto(id: string) {
    try {
      setLoading(true);
      await apiPrivate.put(`/product/inat/${id}`);

      setProdutos((prev) =>
        prev.filter((sub) => sub.id !== id)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Erro ao deletar Produto"
        );
      } else {
        setErrorMessage("Erro inesperado");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function atualizarProduto(id: string, data: UpdateProductFormData) {
    try {
      setLoading(true);
      setErrorMessage(null);

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {

          if (key === "img_externa_nova" || key === "img_interna_nova") {
            Array.from(value as FileList).forEach((file) =>
              formData.append(key, file)
            );
          }

          else if (
            key === "imgs_removidas_extenas" ||
            key === "imgs_removidas_internas"
          ) {
            (value as string[]).forEach((img) =>
              formData.append(key, img)
            );
          }

          else {
            formData.append(key, String(value));
          }
        }
      });

      await apiPrivate.put(`/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await listarProdutos();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(
          err.response?.data?.message || "Erro ao atualizar produto"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listarProdutos();
  }, []);


  function clearError() {
    setErrorMessage(null);
  }

  return (
    <ProductContext.Provider
      value={{
        produtos,
        listarProdutos,
        criarProduto,
        inativoProduto,
        atualizarProduto,
        getProdutoById,
        loading,
        errorMessage,
        clearError
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
