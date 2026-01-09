import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCategoria } from "@/contexts/CategoryContext";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CategoryFormData, categoriaSchema } from "@/schemas/CategorySchema";
import { useForm } from "react-hook-form";
import { Sucess } from "@/components/notification/Sucess";
import { Error } from "@/components/notification/Error";


interface DialogAddCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogAddCategory({ open, onOpenChange }: DialogAddCategoryProps) {

  const { criarCategoria, errorMessage, clearError } = useCategoria();
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoriaSchema),
  });


  async function onSubmit(data: CategoryFormData) {
    try {
      await criarCategoria(data);
      setSuccessOpen(true);
      reset();
      clearError();
      onOpenChange(false);

    } catch {
      // erro já foi tratado no contexto
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="dark:bg-gray-900">
        <div className="flex flex-col items-center gap-2 dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Adicionar Categoria
            </DialogTitle>
          </DialogHeader>
        </div>

        <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input className="mb-1" {...register("nome")} />
              {errors.nome && <span className="text-red-600 dark:text-red-800  text-sm">{errors.nome.message}</span>}
            </div>
            <div>
              <Label>Tipo</Label>
              <select className="block w-full px-3 py-2.5 rounded-md
    bg-neutral-secondary-medium
    dark:bg-gray-500/50
    border border-default-medium
    dark:border-gray-100/20
    text-heading
    dark:text-white
    text-sm rounded-base
    placeholder:text-body
    dark:placeholder:text-red-400 mb-1" {...register("tipo_categoria")}>
                <option value="">Selecione</option>
                <option value="MASCULINA">Masculina</option>
                <option value="FEMININA">Feminina</option>
              </select>
              {errors.tipo_categoria && <span className="text-red-600 dark:text-red-800 text-sm">{errors.tipo_categoria.message}</span>}
            </div>
          </div>

          <Button type="submit" className="w-full bg-red-900 dark:text-white dark:hover:text-black cursor-pointer" disabled={isSubmitting}>
            Cadastrar
          </Button>
        </form>
      </DialogContent>
      <Sucess
        active={successOpen}
        onClose={() => setSuccessOpen(false)}
        text="Categoria cadastrada com sucesso!"
      />

      <Error
        active={!!errorMessage}
        onClose={clearError}
        text={errorMessage ?? ""}
      />
    </Dialog>
  );
}
