"use client";

import { ToastContainer, toast } from "react-toastify";
import { FormEvent, useState } from "react";

export default function ModalUpdateConvidado({ id, name, email, status }: any) {
  /**
   * hook state
   */
  const [isActive, setIsActive] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    id,
    name,
    email,
    status,
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
    updateGuest(formData); // api Post
    setIsActive(false); // Fecha modal

    return true;
  }

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
          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
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
                    <div className="field">
                      <label className="label">Nome do convidado</label>
                      <div className="control has-icons-left has-icons-right">
                        <input
                          className="input is-success"
                          type="text"
                          placeholder="Nome"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            });
                          }}
                          value={formData.name}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //// Row 1 */}
                {/* Row 2 */}
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          name="email"
                          className="input"
                          type="email"
                          placeholder="......@gmail.com"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            });
                          }}
                          value={formData.email}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* //// Row 2 */}
                {/* Row 3 */}
                <div className="columns">
                  <div className="column is-flex is-justify-content-center">
                    <div className="field">
                      <label className="label">Status</label>
                      <div className="control">
                        <div className="select">
                          <select
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                status: e.target.value,
                              });
                            }}
                            value={formData.status}
                            required
                          >
                            <option value="pendente">Pendente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="ausente">Ausente</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //// Row 3 */}
                {/* Row 4 */}
                <div className="columns">
                  <div className="column is-flex is-justify-content-center is-three-quarters">
                    <button
                      className="button is-primary is-fullwidth"
                      onClick={formHandle}
                    >
                      Salvar
                    </button>
                  </div>
                  <div className="column is-flex is-justify-content-end">
                    <button
                      onClick={(ev) => {
                        ev.preventDefault();
                        setIsActive(false);
                      }}
                      className="button is-danger"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
                {/* //// Row 4 */}
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
