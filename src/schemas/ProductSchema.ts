import { z } from "zod";

/* =========================
   BASE
========================= */

const baseProductSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),

  preco: z.coerce.number().positive("Preço deve ser maior que zero"),

  largura: z.coerce.number().positive("Largura obrigatória"),
  altura: z.coerce.number().positive("Altura obrigatória"),

  peso: z.coerce.number().optional(),
  profundidade: z.coerce.number().optional(),

  descricao: z.string().optional(),

  emPromocao: z.boolean(),
  precoPromocional: z.coerce.number().optional(),

  estoque: z.coerce.number().positive("Estoque obrigatório"),

  quantidade_minima_estoque: z.coerce
    .number()
    .positive("Quantidade mínima obrigatória"),

  alertar_estoque: z.boolean(),

  unidade_medida: z.string().min(1, "Unidade obrigatória"),

  id_categoria: z.string().min(1, "Categoria obrigatória"),
  id_subcategoria: z.string().min(1, "Subcategoria obrigatória"),

  img_externa: z.any().optional(),
  img_interna: z.any().optional(),
});

/* =========================
   CREATE
========================= */

export const productSchema = baseProductSchema.refine(
  (data) =>
    !data.emPromocao ||
    (data.precoPromocional !== undefined &&
      data.precoPromocional < data.preco),
  {
    message: "Preço promocional deve ser menor que o preço normal",
    path: ["precoPromocional"],
  }
);

/* =========================
   UPDATE
========================= */

export const updateProductSchema = baseProductSchema
  .safeExtend({
    imgs_removidas_extenas: z.array(z.string()).optional(),
    imgs_removidas_internas: z.array(z.string()).optional(),
    img_externa_nova: z.any().optional(),
    img_interna_nova: z.any().optional(),
  })
  .refine(
    (data) =>
      !data.emPromocao ||
      (data.precoPromocional !== undefined &&
        data.precoPromocional < data.preco),
    {
      message: "Preço promocional deve ser menor que o preço normal",
      path: ["precoPromocional"],
    }
  );

export type ProductFormData = z.infer<typeof productSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;