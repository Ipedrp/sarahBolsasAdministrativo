import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCategoria } from "@/contexts/CategoryContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CategoryFormData, categoriaSchema } from "@/schemas/CategorySchema";
import { useForm } from "react-hook-form";
import { Sucess } from "@/components/notification/Sucess";
import { Error } from "@/components/notification/Error";
import { useState } from "react";

export function AddCategory() {

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
        } catch {
            // erro já foi tratado no contexto
        }
    }



    return (
        < section className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
            {/* Header */}
            <header >
                <div className="flex items-center justify-between gap-1 cursor-pointer">
                    <Link to={"/categorias"}>
                        <ArrowLeft size={22} className="text-muted-foreground/80" />
                    </Link>
                </div>

                <div className="w-full mb-3">
                    <h1 className="text-center font-medium text-xl">Adicionar Categoria</h1>
                </div>
            </header>

            <main className="sm:w-[35%] w-full mx-auto mb-3">
                <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <Label>Nome</Label>
                            <Input className="mb-1" {...register("nome")} />
                            {errors.nome && <span className="text-red-600 dark:text-red-800  text-sm">{errors.nome.message}</span>}
                        </div>
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-heading">Tipo</label>
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
            </main>

        </section >
    )
}