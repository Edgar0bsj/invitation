"use client";

import { toast } from "react-toastify";
import { ChangeEvent, FormEvent, useState } from "react";

/**
 * ============================================
 * TYPES
 * ============================================
 */
interface Guest {
  name: string;
  email: string;
  status: string;
}

interface HandleStateGuest {
  setName(event: ChangeEvent<HTMLInputElement>): void;
  setEmail(event: ChangeEvent<HTMLInputElement>): void;
  setStatus(event: ChangeEvent<HTMLSelectElement>): void;
}

/**
 * ============================================
 * API
 * ============================================
 */
async function addGuestAPI(guestData: Guest) {
  const response = await fetch("/api/guest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(guestData),
  });
  return response.status;
}

/**
 * ============================================
 * HOOKS
 * ============================================
 */
function useModalAddConvidado() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [guest, setGuest] = useState<Guest>({
    name: "",
    email: "",
    status: "",
  });

  // Handlers
  const handleOpenModal = () => setIsActive(true);
  const handleCloseModal = () => setIsActive(false);

  const handleCancel = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleStateGuest = (): HandleStateGuest => {
    const setName = (event: ChangeEvent<HTMLInputElement>) =>
      setGuest({
        ...guest,
        name: event.target.value,
      });
    const setEmail = (event: ChangeEvent<HTMLInputElement>) =>
      setGuest({
        ...guest,
        email: event.target.value,
      });
    const setStatus = (event: ChangeEvent<HTMLSelectElement>) =>
      setGuest({
        ...guest,
        status: event.target.value,
      });
    return { setName, setEmail, setStatus };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await addGuestAPI(guest);
      if (result === 200) toast.success("Convidado adicionado com sucesso!");
      if (result === 500) toast.error("Erro ao adicionar o convidado");
      if (result === 422) throw new Error();
      handleCloseModal();
      setGuest({
        name: "",
        email: "",
        status: "",
      });
    } catch (err) {
      toast.error("Erro ao adicionar o convidado");
    }
  };

  return {
    isActive,
    guest,
    handleOpenModal,
    handleCloseModal,
    handleCancel,
    handleStateGuest,
    handleSubmit,
  };
}

/**
 * ============================================
 * RENDER
 * ============================================
 */
export default function ModalAddConvidado() {
  const {
    isActive,
    guest,
    handleStateGuest,
    handleOpenModal,
    handleCloseModal,
    handleCancel,
    handleSubmit,
  } = useModalAddConvidado();

  return (
    <>
      <button
        className="button is-success is-outlined is-focused"
        onClick={handleOpenModal}
      >
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </span>
        <span>Add convidado</span>
      </button>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={handleCloseModal}></div>

        <div className="modal-content">
          <div className="box">
            {/* from */}
            <form onSubmit={handleSubmit}>
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
                          onChange={handleStateGuest().setName}
                          value={guest.name}
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
                          onChange={handleStateGuest().setEmail}
                          value={guest.email}
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
                            onChange={handleStateGuest().setStatus}
                            value={guest.status}
                            required
                          >
                            <option value="" disabled>
                              Selecione um status
                            </option>
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
                      type="submit"
                    >
                      Salvar
                    </button>
                  </div>
                  <div className="column is-flex is-justify-content-end">
                    <button
                      type="button"
                      onClick={handleCancel}
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
          onClick={handleCloseModal}
        ></button>
      </div>
    </>
  );
}
