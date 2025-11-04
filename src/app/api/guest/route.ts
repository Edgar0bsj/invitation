import { findAll, create } from "@/db/dbMock";
import { GuestSchema } from "@/model/guestValidation";
/**
 * Metodo GET
 * @returns Retorna todos os convidados
 */
export async function GET() {
  const convidados = await findAll();

  return Response.json(convidados);
}

/**
 *
 * @param request
 * @returns Cria um novo convidado
 */
export async function POST(request: any) {
  const { name, email, status } = await request.json();

  const parsed = GuestSchema.safeParse({ name, email, status });
  if (!parsed.success)
    return new Response(JSON.stringify({ error: "Dados inválidos" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });

  const data = parsed.data;
  create(data);

  console.log("Novo convidado:", data);

  return Response.json({
    message: "Convidado cadastrado com sucesso!",
    convidado: data,
  });
}
