"use client";

import { useEffect, useState } from "react";

export default function ConfirmarPresenca({
  params,
}: {
  params: { id: string };
}) {
  const [mensagem, setMensagem] = useState("Confirmando presença...");

  useEffect(() => {
    async function confirmar() {
      const res = await fetch(`/api/guests/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmado: true }),
      });
      if (res.ok) setMensagem("Presença confirmada! Obrigado!");
      else setMensagem("Error ao confirmar presença.");
    }

    confirmar();
  }, [params.id]);

  return (
    <main className="section has-text-centered">
      <h1 className="title">{mensagem}</h1>
    </main>
  );
}
