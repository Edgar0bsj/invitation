import { GuestSchema } from "@/model/guestValidation";
import { connectDB } from "@/db/connection";
import GuestModel from "@/model/Guest";

/**
 * ============================================
 * GET -> EM DESENVOLVIMENTO
 * ============================================
 */
export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  return Response.json({ id, nome: "Convidado exemplo" });
}
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

  const parsed = GuestSchema.safeParse(dados);
  if (!parsed.success)
    return new Response(JSON.stringify({ error: "Dados inválidos" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  const data = parsed.data;

  const newGuest = await GuestModel.findByIdAndUpdate(id, data);
  if (!newGuest)
    return new Response(
      JSON.stringify({ error: "Error ao editar convidado" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );

  return Response.json({
    message: `Convidado ${id} atualizado com sucesso!`,
    data,
  });
}
/**
 * ============================================
 * DELETE
 * ============================================
 */
export async function DELETE(_: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = await context.params; //parametro
  const result = await GuestModel.findByIdAndDelete(id);
  if (!result) {
    return new Response(
      JSON.stringify({ error: "Error ao Excluir convidado" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return Response.json({
    message: `Convidado ${id} removido com sucesso!`,
  });
}
