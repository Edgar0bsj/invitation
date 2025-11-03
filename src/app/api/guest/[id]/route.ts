export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  return Response.json({ id, nome: "Convidado exemplo" });
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const dados = await request.json();

  return Response.json({
    message: `Convidado ${id} atualizado com sucesso!`,
    dados,
  });
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  return Response.json({
    message: `Convidado ${id} removido com sucesso!`,
  });
}
