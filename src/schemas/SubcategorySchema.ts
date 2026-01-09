import { z } from "zod";

export const subCategoriaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  categoriaId: z.string().min(1, "Categoria é obrigatória"),

});


export type SubCategoryFormData = z.infer<typeof subCategoriaSchema>;
