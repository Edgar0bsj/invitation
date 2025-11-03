"use client";

import { useEffect, useState } from "react";

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
      <div className="table-container">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>
                <abbr>ID</abbr>
              </th>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {guest.map((el: any) => (
              <tr key={el.id}>
                <th>{el.id}</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
