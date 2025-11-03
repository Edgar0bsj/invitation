"use client";

import { ToastContainer, toast } from "react-toastify";
import { FormEvent, useState } from "react";

export default function ModalAddConvidado() {
  /**
   * hook state
   */
  const [isActive, setIsActive] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
  });

  /**
   * api
   */
  function createGuest(formData: any) {
    fetch("/api/guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => toast.success("Convidado adicionado com sucesso!"))
      .catch(() => toast.error("Erro ao adicionar convidado"));
  }

  /**
   * Form
   */
  function formHandle(event: FormEvent) {
    event.preventDefault(); //Interromper o reload
    createGuest(formData); // api Post
    setIsActive(false); // Fecha modal

    //Limpar os campos
    setFormData({
      name: "",
      email: "",
      status: "",
    });

    return true;
  }

  return (
    <>
      <ToastContainer />
      <button
        className="button is-medium is-fullwidth"
        onClick={() => setIsActive(true)}
      >
        Add convidado
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
