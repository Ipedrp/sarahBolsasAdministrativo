import { z } from "zod";

export const productSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    preco: z.coerce.number().positive(),
    largura: z.coerce.number().positive(),
    altura: z.coerce.number().positive(),
    peso: z.coerce.number().optional(),
    profundidade: z.coerce.number().optional(),
    descricao: z.string().optional(),

    emPromocao: z.boolean(),
    precoPromocional: z.coerce.number().optional(),

    estoque: z.coerce.number().positive(),
    quantidade_minima_estoque: z.coerce.number().positive(),
    alertar_estoque: z.boolean(),
    unidade_medida: z.string(),

    id_categoria: z.string().min(1),
    id_subcategoria: z.string().min(1),

    img_externa: z.any().optional(),
    img_interna: z.any().optional(),
  })
  .refine(
    (data) =>
      !data.emPromocao ||
      (data.precoPromocional !== undefined &&
        data.precoPromocional < data.preco),
    {
      message: "Preço promocional inválido",
      path: ["precoPromocional"],
    }
  );

export type ProductFormData = z.infer<typeof productSchema>;
