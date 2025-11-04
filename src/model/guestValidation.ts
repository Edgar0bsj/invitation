import { z } from "zod";

export const GuestSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  status: z.enum(["confirmado", "pendente", "ausente"]),
});

// type
export type Guest = z.infer<typeof GuestSchema>;
