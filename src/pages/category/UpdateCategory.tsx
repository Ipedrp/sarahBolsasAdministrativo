import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoriaSchema,
  type CategoryFormData,
} from "@/schemas/CategorySchema";
import { useCategoria } from "@/contexts/CategoryContext";

export function UpdateCategory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { atualizarCategoria, getCategoriaById, loading } = useCategoria();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nome: "",
      tipo: undefined,
    },
  });

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      const categoria = await getCategoriaById(id);

      reset({
        nome: categoria.nome,
        tipo: categoria.tipo,
      });
    }

    loadData();
  }, [id, reset]);

  async function onSubmit(data: CategoryFormData) {
    if (!id) return;

    await atualizarCategoria(id, data);
    navigate("/categorias");
  }

  return (
    <section className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
      <header>
        <div className="flex items-center gap-1">
          <Link to="/categorias">
            <ArrowLeft size={22} className="text-muted-foreground/80" />
          </Link>
        </div>

        <div className="w-full mb-3">
          <h1 className="text-center font-medium text-xl">
            Atualizar Categoria
          </h1>
        </div>
      </header>

      <main className="sm:w-[35%] w-full mx-auto mb-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input
                placeholder="Ex: Linha Masculina"
                {...register("nome")}
              />
              {errors.nome && (
                <span className="text-red-500 text-sm">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div>
              <Label>Tipo</Label>
              <select
                {...register("tipo")}
                className="w-full border p-2 rounded"
              >
                <option value="">Selecione o tipo</option>
                <option value="MASCULINA">Masculina</option>
                <option value="FEMININA">Feminina</option>
              </select>
              {errors.tipo && (
                <span className="text-red-500 text-sm">
                  {errors.tipo.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 dark:text-white dark:hover:text-black"
          >
            Atualizar
          </Button>
        </form>
      </main>
    </section>
  );
}
