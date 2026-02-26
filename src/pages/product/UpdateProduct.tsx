import { useEffect, useId, useState } from "react";
import { Link, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowLeft, ChartColumnStacked, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import DialogAddCategory from "@/components/dialog/DialogAddCategory";

import {
  updateProductSchema,
  type UpdateProductFormData,
} from "@/schemas/ProductSchema";

import { useProduct } from "@/contexts/ProductContext";
import { useCategoria } from "@/contexts/CategoryContext";
import { useSubCategoria } from "@/contexts/SubcategoryContext";
import type { SubCategoria } from "@/types/SubCategory";

export function UpdateProduct() {
  const { id } = useParams();
  const { atualizarProduto, getProdutoById, loading } = useProduct();
  const { getAllCategorias, categorias } = useCategoria();
  const { getAllSubCategorias, subCategorias } = useSubCategoria();

  const [open, setOpen] = useState(false);

  const [imagensExternasAtuais, setImagensExternasAtuais] = useState<string[]>([]);
  const [imagensInternasAtuais, setImagensInternasAtuais] = useState<string[]>([]);

  const [removerExternas, setRemoverExternas] = useState<string[]>([]);
  const [removerInternas, setRemoverInternas] = useState<string[]>([]);

  const radioId = useId();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      emPromocao: false,
      alertar_estoque: true,
    },
  });
  /* =========================
     Carregar Produto
  ========================= */

  useEffect(() => {
    getAllCategorias();
    getAllSubCategorias();
  }, []);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      const produto = await getProdutoById(id);

      reset({
        nome: produto.nome,
        preco: produto.preco,
        largura: produto.largura,
        altura: produto.altura,
        peso: produto.peso ?? undefined,
        profundidade: produto.profundidade ?? undefined,
        descricao: produto.descricao ?? "",
        emPromocao: produto.emPromocao,
        precoPromocional: produto.precoPromocional ?? undefined,
        estoque: produto.estoque.quantidade,
        quantidade_minima_estoque: produto.estoque.quantidadeMinima,
        alertar_estoque: produto.estoque.alertaMinimo,
        unidade_medida: produto.estoque.unidade,
        id_categoria: produto.categoriaId,
        id_subcategoria: produto.subcategoriaId,
      });

      setImagensExternasAtuais(produto.imagemExterna);
      setImagensInternasAtuais(produto.imagemInterna);
    }

    loadData();
  }, [id, reset]);

  const categoriaSelecionada = watch("id_categoria");
  const emPromocao = watch("emPromocao");

  /* =========================
     Remover imagens
  ========================= */

  function removerImagemExterna(url: string) {
    setImagensExternasAtuais((prev) => prev.filter((img) => img !== url));
    setRemoverExternas((prev) => [...prev, url]);
  }

  function removerImagemInterna(url: string) {
    setImagensInternasAtuais((prev) => prev.filter((img) => img !== url));
    setRemoverInternas((prev) => [...prev, url]);
  }

  /* =========================
     Submit
  ========================= */

  async function onSubmit(data: UpdateProductFormData) {
    if (!id) return;

    await atualizarProduto(id, {
      ...data,
      imgs_removidas_extenas: removerExternas,
      imgs_removidas_internas: removerInternas,
    });
  }

  /* =========================
     Render
  ========================= */

  if (loading) return <p>Carregando produto...</p>;

  return (
    <section className="flex flex-col gap-2 bg-gray-100/20 p-2 border-2 rounded-2xl">
      <header>
        <div className="flex justify-between">
          <Link to="/produtos">
            <ArrowLeft size={22} />
          </Link>

          <ChartColumnStacked
            size={22}
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          />
        </div>

        <h1 className="text-center font-medium text-xl mb-3">
          Atualizar Produto
        </h1>
      </header>

      <main className="sm:w-[35%] w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <Label>Nome</Label>
          <Input {...register("nome")} />
          {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}

          <Label>Preço</Label>
          <Input {...register("preco")} />

          <Label>Largura</Label>
          <Input type="number" {...register("largura")} />

          <Label>Altura</Label>
          <Input type="number" {...register("altura")} />

          <Label>Estoque</Label>
          <Input type="number" {...register("estoque")} />

          <Label>Quantidade mínima</Label>
          <Input type="number" {...register("quantidade_minima_estoque")} />

          <Label>Unidade</Label>
          <Input {...register("unidade_medida")} />

          {/* Categoria */}
          <Label>Categoria</Label>
          <select {...register("id_categoria")}>
            <option value="">Selecione</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>

          {/* Subcategoria */}
          <Label>Subcategoria</Label>
          <select {...register("id_subcategoria")} disabled={!categoriaSelecionada}>
            <option value="">Selecione</option>
            {subCategorias
              .filter((sub: SubCategoria) => sub.categoriaId === categoriaSelecionada)
              .map((sub: SubCategoria) => (
                <option key={sub.id} value={sub.id}>
                  {sub.nome}
                </option>
              ))}
          </select>

          {/* IMAGENS ATUAIS */}
          <div>
            <Label>Imagens Externas Atuais</Label>
            <div className="flex gap-2 flex-wrap">
              {imagensExternasAtuais.map((img) => (
                <div key={img} className="relative">
                  <img src={img} className="w-20 h-20 object-cover rounded" />
                  <Trash2
                    size={16}
                    className="absolute top-1 right-1 cursor-pointer text-red-600"
                    onClick={() => removerImagemExterna(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Imagens Internas Atuais</Label>
            <div className="flex gap-2 flex-wrap">
              {imagensInternasAtuais.map((img) => (
                <div key={img} className="relative">
                  <img src={img} className="w-20 h-20 object-cover rounded" />
                  <Trash2
                    size={16}
                    className="absolute top-1 right-1 cursor-pointer text-red-600"
                    onClick={() => removerImagemInterna(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Novas imagens */}
          <Label>Adicionar Imagem Externa</Label>
          <Input type="file" multiple {...register("img_externa_nova")} />

          <Label>Adicionar Imagem Interna</Label>
          <Input type="file" multiple {...register("img_interna_nova")} />

          {/* Promoção */}
          <RadioGroup
            value={emPromocao ? "sim" : "nao"}
            onValueChange={(v) => setValue("emPromocao", v === "sim")}
          >
            <div className="flex gap-2">
              <RadioGroupItem value="sim" id={`${radioId}-1`} />
              <Label htmlFor={`${radioId}-1`}>Promoção</Label>
            </div>

            <div className="flex gap-2">
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

          <Button type="submit" disabled={loading} className="w-full bg-red-900 text-white">
            {loading ? "Atualizando..." : "Atualizar"}
          </Button>
        </form>
      </main>

      <DialogAddCategory open={open} onOpenChange={setOpen} />
    </section>
  );
}