"use client";

import { toast } from "react-toastify";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

/**
 * ============================================
 * TYPES
 * ============================================
 */
interface Guest {
  id: string;
  name: string;
  email: string;
  status: string;
}
interface HandleStateGuestData {
  setName(event: ChangeEvent<HTMLInputElement>): void;
  setEmail(event: ChangeEvent<HTMLInputElement>): void;
  setStatus(event: ChangeEvent<HTMLSelectElement>): void;
}
/**
 * ============================================
 * UTILITY (API)
 * ============================================
 */
async function updateGuestAPI(guestData: Guest) {
  const response = await fetch(`/api/guest/${guestData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: guestData.name,
      email: guestData.email,
      status: guestData.status,
    }),
  });

  return response.status;
}
/**
 * ============================================
 * HOOKS
 * ============================================
 */
function useModalUpdateConvidado(guest: Guest) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [guestData, setGuestData] = useState<Guest>({
    id: "",
    name: "",
    email: "",
    status: "",
  });

  // Setando Props
  useEffect(() => {
    setGuestData({ ...guest });
  }, [guest]);

  // Handlers
  const handleOpenModal = () => setIsActive(true);
  const handleCloseModal = () => setIsActive(false);

  const handleCancel = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleStateGuestData = (): HandleStateGuestData => {
    const setName = (event: ChangeEvent<HTMLInputElement>) =>
      setGuestData({
        ...guestData,
        name: event.target.value,
      });
    const setEmail = (event: ChangeEvent<HTMLInputElement>) =>
      setGuestData({
        ...guestData,
        email: event.target.value,
      });
    const setStatus = (event: ChangeEvent<HTMLSelectElement>) =>
      setGuestData({
        ...guestData,
        status: event.target.value,
      });
    return { setName, setEmail, setStatus };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await updateGuestAPI(guestData);
      if (result === 200) toast.success("Convidado atualizado com sucesso!");
      if (result === 500) toast.error("Erro ao atualizar o convidado");
      if (result === 422) throw new Error();
      handleCloseModal();
    } catch (err) {
      toast.error("Erro ao atualizar o convidado");
    }
  };

  return {
    isActive,
    guestData,
    handleStateGuestData,
    handleOpenModal,
    handleCloseModal,
    handleCancel,
    handleSubmit,
  };
}

/**
 * ============================================
 * RENDER
 * ============================================
 */
export default function ModalUpdateConvidado(props: Guest) {
  const {
    isActive,
    guestData,
    handleStateGuestData,
    handleOpenModal,
    handleCloseModal,
    handleCancel,
    handleSubmit,
  } = useModalUpdateConvidado(props);
  return (
    <>
      <button className="button" onClick={handleOpenModal}>
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
                          onChange={handleStateGuestData().setName}
                          value={guestData.name}
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
                          onChange={handleStateGuestData().setEmail}
                          value={guestData.email}
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
                            onChange={handleStateGuestData().setStatus}
                            value={guestData.status}
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
                      type="submit"
                    >
                      Salvar
                    </button>
                  </div>
                  <div className="column is-flex is-justify-content-end">
                    <button
                      type="button"
                      className="button is-danger"
                      onClick={handleCancel}
                    >
                      Cancelar
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
