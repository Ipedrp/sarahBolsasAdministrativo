import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().nonempty("Senha obrigatória"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
