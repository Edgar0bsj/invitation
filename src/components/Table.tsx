"use client";

import { useEffect, useState } from "react";
import ModalUpdateConvidado from "./modal/ModalUpdateConvidado";
import ModalDeleteConvidado from "./modal/ModalDeleteConvidado";

export default function Table() {
  /**
   * hook State
   */
  const [guest, setGuest] = useState([]);

  /**
   * utility
   */

  const textColor = {
    confirmado: "has-text-success",
    pendente: "has-text-info",
    ausente: "has-text-danger",
  };

  /**
   * API
   */

  function findAllGuest() {
    fetch("/api/guest", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setGuest(data);
      });
  }

  /**
   * hook Effect
   */

  useEffect(() => {
    findAllGuest();
  }, []);

  return (
    <>
      {/* <ModalUpdateConvidado id="alo" name="alo" email="alo" status="" /> */}
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
            {guest.map((el: any) => (
              <tr key={el.id}>
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
                        id={el.id}
                        name={el.name}
                        email={el.email}
                        status={el.status}
                      />
                    </div>
                    <div className="column">
                      <ModalDeleteConvidado id={el.id} name={el.name} />
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
