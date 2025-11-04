import { update, remove } from "@/db/dbMock";
import { GuestSchema } from "@/model/guestValidation";

/**
 *
 * em desenvolvimento
 */
export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  return Response.json({ id, nome: "Convidado exemplo" });
}
//=========================
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params; //parametro
  const dados = await request.json(); //corpo

  const parsed = GuestSchema.safeParse({ id, ...dados });
  if (!parsed.success)
    return new Response(JSON.stringify({ error: "Dados inválidos" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  const data = parsed.data;
  update({ id, ...data });

  return Response.json({
    message: `Convidado ${id} atualizado com sucesso!`,
    data,
  });
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params; //parametro
  console.log(id);
  remove(id);
  return Response.json({
    message: `Convidado ${id} removido com sucesso!`,
  });
}
