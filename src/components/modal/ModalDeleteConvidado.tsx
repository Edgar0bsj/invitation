"use client";

import { ToastContainer, toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";

export default function ModalDeleteConvidado({ id, name }: any) {
  /**
   * hook state
   */
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState({
    id: "",
    name: "",
  });

  /**
   * api
   */
  function updateGuest({ id, name, email, status }: any) {
    fetch(`/api/guest/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, status }),
    })
      .then(() => toast.success("Convidado editado com sucesso!"))
      .catch(() => toast.error("Erro ao editar convidado"));
  }

  /**
   * Form
   */
  function formHandle(event: FormEvent) {
    event.preventDefault(); //Interromper o reload
    updateGuest(data); // api Post
    setIsActive(false); // Fecha modal

    return true;
  }
  /**
   * hook Effect
   */
  useEffect(() => {
    setData({
      id,
      name,
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <button className="button" onClick={() => setIsActive(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style={{ width: "1.0rem", height: "1.0rem" }}
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setIsActive(false)}
        ></div>

        <div className="modal-content">
          <div className="box">
            {/* from */}
            <form>
              {/* grid */}
              <div className="container is-fullwidth">
                {/* Row 1 */}
                <div className="columns">
                  <div className="column">
                    <div className="notification is-danger">
                      <strong>{data.name} será retirado da lista.</strong>
                    </div>
                  </div>
                </div>
                {/* //// Row 1 */}
                {/* Row 2 */}
                <div className="columns">
                  <div className="column is-8 is-flex is-justify-content-center">
                    <button
                      className="button is-danger is-dark"
                      style={{ width: "30rem" }}
                    >
                      Retirar da lista
                    </button>
                  </div>
                  <div className="column is-4 is-flex is-justify-content-end">
                    <button
                      className="button is-link"
                      onClick={(e: FormEvent) => {
                        e.preventDefault();
                        setIsActive(false);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
                {/* //// Row 2 */}
              </div>
              {/* /// grid */}
            </form>
            {/* //// from */}
          </div>
        </div>

        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setIsActive(false)}
        ></button>
      </div>
    </>
  );
}
