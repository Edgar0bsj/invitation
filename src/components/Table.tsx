"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ModalUpdateConvidado from "./modal/ModalUpdateConvidado";
import ModalDeleteConvidado from "./modal/ModalDeleteConvidado";

/**
 * ============================================
 * TYPES
 * ============================================
 */
interface FindAllGuestAPI {
  status: number;
  data: [
    {
      _id: string;
      name: string;
      email: string;
      status: string;
    }
  ];
}

interface Guest {
  _id: string;
  name: string;
  email: string;
  status: string;
}
/**
 * ============================================
 * API
 * ============================================
 */
async function findAllGuestAPI(): Promise<FindAllGuestAPI> {
  const response = await fetch("/api/guest", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return { status: response.status, data };
}
/**
 * ============================================
 * UTILITY
 * ============================================
 */
function utility() {
  const textColor = {
    confirmado: "has-text-success",
    pendente: "has-text-info",
    ausente: "has-text-danger",
  };
  return { textColor };
}

/**
 * ============================================
 * HOOKS
 * ============================================
 */
function useTable() {
  const [guest, setGuest] = useState<Guest[]>([]);

  // definindo estado
  useEffect(() => {
    findAllGuestAPI()
      .then((result) => {
        setGuest(result.data);
      })
      .catch(() => {
        toast.error("ERRO! ao carregar dados");
      });
  }, []);

  return { guest };
}

/**
 * ============================================
 * RENDER
 * ============================================
 */
export default function Table() {
  const { guest } = useTable();
  const { textColor } = utility();

  return (
    <>
      <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Editar / Deletar</th>
            </tr>
          </thead>
          <tbody>
            {guest.map((el: Guest) => (
              <tr key={el._id}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td
                  className={
                    el.status === "confirmado"
                      ? textColor.confirmado
                      : el.status === "ausente"
                      ? textColor.ausente
                      : textColor.pendente
                  }
                >
                  {el.status}
                </td>
                <td>
                  <div className="columns is-0">
                    <div className="column">
                      <ModalUpdateConvidado
                        id={el._id}
                        name={el.name}
                        email={el.email}
                        status={el.status}
                      />
                    </div>
                    <div className="column">
                      <ModalDeleteConvidado id={el._id} name={el.name} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
