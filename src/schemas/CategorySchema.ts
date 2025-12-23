import { z } from "zod";

export const categoriaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo_categoria: z
    .string()
    .min(1, "Tipo é obrigatório")
    .refine(
      (val) => val === "MASCULINA" || val === "FEMININA",
      "Tipo inválido"
    ),
});


export type CategoryFormData = z.infer<typeof categoriaSchema>;
