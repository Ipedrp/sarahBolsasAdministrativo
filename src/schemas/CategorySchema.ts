import { z } from "zod";

export const categoriaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo: z.enum(["MASCULINA", "FEMININA"], {
    message: "Tipo inválido",
  }),

});

export type CategoryFormData = z.infer<typeof categoriaSchema>;
