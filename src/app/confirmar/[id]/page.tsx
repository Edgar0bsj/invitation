"use client";

import { useEffect, useState } from "react";
import * as React from "react";

/**
 * ============================================
 * TYPE
 * ============================================
 */
interface Guest {
  presenca: boolean;
  guestId: string;
}
/**
 * ============================================
 * API
 * ============================================
 */
async function confirmarApi(guest: Guest) {
  console.log(guest);
  const res = await fetch(
    `/api/send-invites/confirm-attendance/${guest.guestId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirm: guest.presenca }),
    }
  );

  return res.status;
}
/**
 * ============================================
 * UTILITY
 * ============================================
 */
function utility() {
  const HandlerPresenca = async (id: string) => {
    const dataPresenca = { confir: true, _id: "" };

    const ultimoChar = id.slice(-1);
    if (ultimoChar === "t") dataPresenca.confir = true;
    if (ultimoChar === "f") dataPresenca.confir = false;

    const _id = id.slice(0, -1);
    dataPresenca._id = _id;
    return dataPresenca;
  };

  const msgConfir = `Presença confirmada! Será uma alegria ter você conosco para celebrar este dia
                  especial!
                  Sua presença tornará este momento ainda mais memorável.`;
  const msgNotConfir = `Sentiremos sua falta por aqui. Até a próxima!`;

  return { HandlerPresenca, msgConfir, msgNotConfir };
}
/**
 * ============================================
 * HOOKS
 * ============================================
 */
function useConfirmarPresenca(params: any) {
  const [mensagem, setMensagem] = useState<string>("Confirmando presença...");
  const [presenca, setPresenca] = useState<boolean>(false);
  const { id }: any = React.use(params);
  //   const [guestId, setGuestId] = useState<string>(id.slice(0, -1));
  const { HandlerPresenca } = utility();

  // Hook Effect
  useEffect(() => {
    HandlerPresenca(id).then((result) => setPresenca(result.confir));

    confirmarApi({
      presenca,
      guestId: id.slice(0, -1),
    }).then((result) => {
      if (result === 200) setMensagem("Sua resposta foi registrada!");
      if (result === 500) setMensagem("Erro ao confirmar presença.");
    });
  }, [params, mensagem]);

  return { mensagem, presenca };
}

export default function ConfirmarPresenca({ params }: any) {
  const { mensagem, presenca } = useConfirmarPresenca(params);
  const { msgConfir, msgNotConfir } = utility();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8-tablet is-6-desktop">
            <div
              className="box"
              style={{
                background: "white",
                borderRadius: "20px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                padding: "3rem 2rem",
              }}
            >
              {/* Header */}
              <div className="has-text-centered mb-6">
                <h1
                  className="title is-1 has-text-weight-bold"
                  style={{
                    color: "#667eea",
                    marginBottom: "0.5rem",
                  }}
                >
                  {mensagem}
                </h1>
              </div>

              {/* Divider */}
              <hr
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #667eea, transparent)",
                  height: "2px",
                  border: "none",
                  margin: "2rem 0",
                }}
              />

              {/* Message */}
              <div className="content has-text-centered mb-6">
                <p
                  className="is-size-5"
                  style={{
                    color: "#555",
                    fontStyle: "italic",
                    lineHeight: "1.8",
                  }}
                >
                  {presenca ? msgConfir : msgNotConfir}
                </p>
              </div>
              <hr
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #764ba2, transparent)",
                  height: "2px",
                  border: "none",
                  margin: "2rem 0",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
