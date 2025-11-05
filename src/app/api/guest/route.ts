import { GuestSchema } from "@/model/guestValidation";
import { connectDB } from "@/db/connection";
import GuestModel from "@/model/Guest";
/**
 * Metodo GET
 * @returns Retorna todos os convidados
 */
export async function GET() {
  await connectDB();

  const convidados = await GuestModel.find();

  return Response.json(convidados);
}

/**
 *
 * @param request
 * @returns Cria um novo convidado
 */
export async function POST(request: any) {
  await connectDB();

  const { name, email, status } = await request.json();

  const parsed = GuestSchema.safeParse({ name, email, status });
  if (!parsed.success)
    return new Response(JSON.stringify({ error: "Dados inválidos" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });

  const data = parsed.data;

  const newGuest = await GuestModel.create(data);
  if (!newGuest)
    return new Response(JSON.stringify({ error: "Error ao salvar dados" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });

  return Response.json({
    message: "Convidado cadastrado com sucesso!",
    data,
  });
}
