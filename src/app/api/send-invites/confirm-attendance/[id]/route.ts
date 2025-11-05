import { connectDB } from "@/db/connection";
import GuestModel from "@/model/Guest";

/**
 * ============================================
 * PUT
 * ============================================
 */
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  await connectDB();
  const { id } = await context.params; //parametro
  const dados = await request.json(); //corpo

  if (!dados.confirm) {
    const newGuest = await GuestModel.findByIdAndUpdate(id, {
      status: "ausente",
    });
    if (!newGuest)
      return new Response(
        JSON.stringify({ error: "Error ao confirmar presença" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
  } else {
    const newGuest = await GuestModel.findByIdAndUpdate(id, {
      status: "confirmado",
    });
    if (!newGuest)
      return new Response(
        JSON.stringify({ error: "Error ao confirmar presença" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
  }

  return Response.json({
    message: `Convidado ${id} atualizado com sucesso!`,
  });
}
