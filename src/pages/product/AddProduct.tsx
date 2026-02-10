import { useEffect, useId, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArrowLeft,
  ChartColumnStacked,
  Waypoints,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import DialogAddCategory from "@/components/dialog/DialogAddCategory";
import DialogAddSubCategory from "@/components/dialog/DialogAddSubCategory";

import { productSchema } from "@/schemas/ProductSchema";
import { useProduct } from "@/contexts/ProductContext";
import { z } from "zod";

import { useCategoria } from "@/contexts/CategoryContext";
import { useSubCategoria } from "@/contexts/SubcategoryContext";
import type { SubCategoria } from "@/types/SubCategory";


type ProductFormData = z.infer<typeof productSchema>;

export function AddProduct() {
  const { criarProduto, loading } = useProduct();
  const { getAllCategorias, categorias } = useCategoria();
  const { getAllSubCategorias, subCategorias } = useSubCategoria();


  const [open, setOpen] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);

  const radioId = useId();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      emPromocao: false,
      alertar_estoque: true,
    },
  });

  useEffect(() => {
    getAllCategorias();
    getAllSubCategorias();
  }, []);

  const categoriaSelecionada = watch("id_categoria");

  useEffect(() => {
    setValue("id_subcategoria", "");
  }, [categoriaSelecionada]);



  const emPromocao = watch("emPromocao");


  useEffect(() => {
    if (emPromocao) {
      setFocus("precoPromocional");
    }
  }, [emPromocao, setFocus]);

  async function onSubmit(data: ProductFormData) {
    console.group("📦 DEBUG - CADASTRO DE PRODUTO");
    console.log("Payload final:", data);
    console.log("Imagem externa:", data.img_externa);
    console.log("Imagem interna:", data.img_interna);
    console.groupEnd();

    try {
      await criarProduto(data);
      console.log("✅ Produto cadastrado com sucesso");
    } catch (err) {
      console.error("❌ Erro ao cadastrar produto", err);
    }
  }

  return (
    <section className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
      {/* Header */}
      <header>
        <div className="flex items-center justify-between gap-1">
          <Link to="/produtos">
            <ArrowLeft size={22} />
          </Link>

          <div className="flex gap-2">
            <ChartColumnStacked
              size={22}
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <Waypoints
              size={22}
              className="cursor-pointer"
              onClick={() => setOpenSubcategory(true)}
            />
          </div>
        </div>

        <h1 className="text-center font-medium text-xl mb-3">
          Adicionar Produto
        </h1>
      </header>

      <main className="sm:w-[35%] w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
          {/* Nome e Preço */}
          <div className="flex sm:flex-row flex-col gap-3">
            <div className="flex-1">
              <Label>Nome</Label>
              <Input {...register("nome")} />
              {errors.nome && (
                <p className="text-red-500 text-xs">{errors.nome.message}</p>
              )}
            </div>

            <div className="flex-1">
              <Label>Preço</Label>
              <Input placeholder="0.00" {...register("preco")} />
            </div>
          </div>

          {/* Dimensões */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Label>Largura (cm)</Label>
              <Input type="number" {...register("largura")} />
            </div>
            <div className="flex-1">
              <Label>Altura (cm)</Label>
              <Input type="number" {...register("altura")} />
            </div>
          </div>

          <Label>Peso (kg)</Label>
          <Input type="number" {...register("peso")} />

          <Label>Profundidade (cm)</Label>
          <Input
            type="number"
            {...register("profundidade")}
          />

          {/* Estoque */}
          <Label>Quantidade em estoque</Label>
          <Input
            type="number"
            {...register("estoque")}
          />
          <Label>Quantidade mínima em estoque</Label>
          <Input
            type="number"
            {...register("quantidade_minima_estoque")}
          />
          <Label>Unidade de medida (UN, KG)</Label>
          <Input
            {...register("unidade_medida")}
          />

          {/* Categoria / Subcategoria */}

          {/* Categoria */}
          <div>
            <Label>Categoria</Label>

            <select
              className="block w-full px-3 py-2.5 rounded-md border text-sm mb-1"
              {...register("id_categoria")}
            >
              <option value="">Selecione uma categoria</option>

              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>

            {errors.id_categoria && (
              <p className="text-red-500 text-xs">
                {errors.id_categoria.message}
              </p>
            )}
          </div>

          {/* Subcategoria */}
          <div>
            <Label>Subcategoria</Label>

            <select
              className="block w-full px-3 py-2.5 rounded-md border text-sm mb-1"
              {...register("id_subcategoria")}
              disabled={!categoriaSelecionada}
            >
              <option value="">
                {categoriaSelecionada
                  ? "Selecione uma subcategoria"
                  : "Selecione uma categoria primeiro"}
              </option>

              {subCategorias
                .filter(
                  (sub: SubCategoria) => sub.categoriaId === categoriaSelecionada
                )
                .map((sub: SubCategoria) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.nome}
                  </option>
                ))}
            </select>

            {errors.id_subcategoria && (
              <p className="text-red-500 text-xs">
                {errors.id_subcategoria.message}
              </p>
            )}
          </div>


          {/* Imagens */}
          <div>
            <Label>Imagem interna</Label>
            <Input type="file" multiple {...register("img_interna")} />
          </div>

          <div>
            <Label>Imagem externa</Label>
            <Input type="file" multiple {...register("img_externa")} />
          </div>

          {/* Descrição */}

          <Label>Descrição do produto</Label>
          <Textarea
            placeholder="Ex: Bolsa 100% couro..."
            {...register("descricao")}
          />

          {/* Promoção */}
          <RadioGroup
            value={emPromocao ? "sim" : "nao"}
            onValueChange={(v) => setValue("emPromocao", v === "sim")}
            className="gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="sim" id={`${radioId}-1`} />
              <Label htmlFor={`${radioId}-1`}>Em promoção</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="nao" id={`${radioId}-2`} />
              <Label htmlFor={`${radioId}-2`}>Sem promoção</Label>
            </div>
          </RadioGroup>

          {emPromocao && (
            <Input
              placeholder="Preço promocional"
              {...register("precoPromocional")}
            />
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 text-white"
          >
            {loading ? "Salvando..." : "Cadastrar"}
          </Button>
        </form>
      </main>

      {/* Dialogs */}
      <DialogAddCategory open={open} onOpenChange={setOpen} />
      <DialogAddSubCategory
        openSubCategory={openSubcategory}
        onOpenChange={setOpenSubcategory}
      />
    </section>
  );
}
