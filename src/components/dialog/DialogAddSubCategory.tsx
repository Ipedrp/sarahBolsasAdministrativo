import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";

import { useCategoria } from "@/contexts/CategoryContext";
import { useSubCategoria } from "@/contexts/SubcategoryContext";

import {
  subCategoriaSchema,
  type SubCategoryFormData,
} from "@/schemas/SubcategorySchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Sucess } from "@/components/notification/Sucess";
import { Error } from "@/components/notification/Error";


interface DialogAddSubCategoryProps {
  openSubCategory: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogAddSubCategory({
  openSubCategory,
  onOpenChange,
}: DialogAddSubCategoryProps) {

  const { getAllCategorias, categorias } = useCategoria();
  const { criarSubCategoria, errorMessage, clearError } = useSubCategoria();

  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (openSubCategory) {
      getAllCategorias();
    }
  }, [openSubCategory]);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubCategoryFormData>({
    resolver: zodResolver(subCategoriaSchema),
  });


  async function onSubmit(data: SubCategoryFormData) {
    try {
      await criarSubCategoria(data);

      setSuccessOpen(true);
      reset();
      clearError();

      onOpenChange(false);

    } catch {
      // erro tratado no contexto
    }
  }


  function handleOpenChange(isOpen: boolean) {
    onOpenChange(isOpen);

    if (!isOpen) {
      clearError();
      reset();
    }
  }


  return (
    <Dialog open={openSubCategory} onOpenChange={handleOpenChange}>
      <DialogContent className="dark:bg-gray-900">

        <DialogHeader>
          <DialogTitle className="text-center">
            Adicionar Subcategoria
          </DialogTitle>
        </DialogHeader>


        <form
          className="space-y-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="space-y-4">

            {/* Nome */}
            <div>
              <Label>Nome</Label>

              <Input
                className="mb-1"
                {...register("nome")}
                placeholder="Ex: Cinto"
              />

              {errors.nome && (
                <span className="text-red-600 text-sm">
                  {errors.nome.message}
                </span>
              )}
            </div>


            {/* Categoria */}
            <div>
              <Label>Categoria</Label>

              <select
                className="block w-full px-3 py-2.5 rounded-md
                bg-neutral-secondary-medium
                dark:bg-gray-500/50
                border border-default-medium
                dark:border-gray-100/20
                text-heading
                dark:text-white
                text-sm
                mb-1"
                {...register("categoriaId")}
              >
                <option value="">Selecione uma categoria</option>

                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>

              {errors.categoriaId && (
                <span className="text-red-600 text-sm">
                  {errors.categoriaId.message}
                </span>
              )}
            </div>

          </div>


          <Button
            type="submit"
            className="w-full bg-red-900 dark:text-white"
            disabled={isSubmitting}
          >
            Cadastrar
          </Button>

        </form>


        <Sucess
          active={successOpen}
          onClose={() => setSuccessOpen(false)}
          text="Subcategoria cadastrada com sucesso!"
        />

        <Error
          active={!!errorMessage}
          onClose={clearError}
          text={errorMessage ?? ""}
        />

      </DialogContent>
    </Dialog>
  );
}
