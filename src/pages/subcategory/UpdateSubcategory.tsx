import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subCategoriaSchema, type SubCategoryFormData } from "@/schemas/SubcategorySchema";
import { useSubCategoria } from "@/contexts/SubcategoryContext";
import { useCategoria } from "@/contexts/CategoryContext";



export function UpdateSubcategory() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        atualizarSubCategoria,
        getSubCategoriaById,
        loading,
    } = useSubCategoria();

    const { categorias, getAllCategorias } = useCategoria();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SubCategoryFormData>({
        resolver: zodResolver(subCategoriaSchema),
    });

    useEffect(() => {
        async function loadData() {
            if (!id) return;

            const sub = await getSubCategoriaById(id);
            reset({
                nome: sub.nome,
                categoriaId: sub.categoriaId,
            });
        }

        loadData();
        getAllCategorias();
    }, [id]);

    async function onSubmit(data: SubCategoryFormData) {
        if (!id) return;

        await atualizarSubCategoria(id, data);
        navigate("/subcategorias");
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
                    <h1 className="text-center font-medium text-xl">Atualizar Subcategoria</h1>
                </div>
            </header>

            <main className="sm:w-[35%] w-full mx-auto mb-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                    <div className="space-y-4">
                        <div>
                            <Label>Nome</Label>
                            <Input placeholder="Nome" {...register("nome")} />
                            {errors.nome && <span className="text-red-600 dark:text-red-800  text-sm">{errors.nome.message}</span>}
                        </div>
                        <div>
                            <Label>Subcategoria</Label>
                            <select {...register("categoriaId")} className="w-full border p-2 rounded">
                                <option value="">Selecione a categoria</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.categoriaId && <span className="text-red-600 dark:text-red-800  text-sm">{errors.categoriaId.message}</span>}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-red-900 dark:text-white dark:hover:text-black cursor-pointer">
                        Atualizar
                    </Button>
                </form>
            </main>

        </section >
    )
}