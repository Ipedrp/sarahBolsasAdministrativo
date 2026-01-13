import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCategoria } from "@/contexts/CategoryContext";
import { subCategoriaSchema, type SubCategoryFormData } from "@/schemas/SubcategorySchema";
import { useSubCategoria } from "@/contexts/SubcategoryContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sucess } from "@/components/notification/Sucess";
import { Error } from "@/components/notification/Error";


export function AddSubcategory() {

    const { getAllCategorias, categorias, errorMessage, clearError } = useCategoria();
    const [successOpen, setSuccessOpen] = useState(false);

    const { criarSubCategoria } = useSubCategoria();


    useEffect(() => {
        getAllCategorias();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SubCategoryFormData>({
        resolver: zodResolver(subCategoriaSchema),
    });


    async function onSubmit(data: SubCategoryFormData) {
        await criarSubCategoria(data);
        setSuccessOpen(true)
        reset();
    }

    return (
        < section className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
            {/* Header */}
            <header >
                <div className="flex items-center justify-between gap-1 cursor-pointer">
                    <Link to={"/subcategorias"}>
                        <ArrowLeft size={22} className="text-muted-foreground/80" />
                    </Link>
                </div>

                <div className="w-full mb-3">
                    <h1 className="text-center font-medium text-xl">Adicionar Subcategoria</h1>
                </div>
            </header>

            <main className="sm:w-[35%] w-full mx-auto mb-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                    <div className="space-y-4">
                        <div>
                            <Label>Nome</Label>
                            <Input className="mb-1" {...register("nome")} />
                            {errors.nome && <span className="text-red-600 dark:text-red-800  text-sm">{errors.nome.message}</span>}
                        </div>
                        {/* Select de categoria (ENVIA APENAS O ID) */}
                        <div>
                            <label className="block mb-2.5 text-sm font-medium text-heading">Categoria</label>
                            <select className="block w-full px-3 py-2.5 rounded-md
                            bg-neutral-secondary-medium
                            dark:bg-gray-500/50
                            border border-default-medium
                            dark:border-gray-100/20
                            text-heading
                            dark:text-white
                            text-sm rounded-base
                            placeholder:text-body
                            dark:placeholder:text-red-400 mb-1" {...register("categoriaId")}>
                                <option value="">Selecione uma categoria</option>

                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>

                            {errors.categoriaId && <span className="text-red-600 dark:text-red-800  text-sm">{errors.categoriaId.message}</span>}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-red-900 dark:text-white dark:hover:text-black cursor-pointer">
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