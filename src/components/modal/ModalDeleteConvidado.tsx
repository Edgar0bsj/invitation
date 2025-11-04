"use client";

import { toast } from "react-toastify";
import { FormEvent, useEffect, useState } from "react";

/**
 * ============================================
 * TYPES
 * ============================================
 */
type ModalDeleteConvidadoProps = {
  id: string;
  name: string;
};

type GuestData = {
  id: string;
  name: string;
};

/**
 * ============================================
 * UTILITY (API)
 * ============================================
 */
async function deleteGuestAPI(id: string) {
  const response = await fetch(`/api/guest/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response.status;
}
/**
 * ============================================
 * HOOKS
 * ============================================
 */
function useModalDeleteConvidado(id: string, name: string) {
  // Estados
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState<GuestData>({
    id: "",
    name: "",
  });

  // Sincroniza props
  useEffect(() => {
    setData({ id, name });
  }, [id, name]);

  // Handlers
  const handleOpenModal = () => setIsActive(true);
  const handleCloseModal = () => setIsActive(false);

  const handleCancel = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await deleteGuestAPI(data.id);
      if (result === 200) toast.success("Convidado retirado com sucesso!");
      handleCloseModal();
    } catch (err) {
      toast.error("Erro ao retirar o convidado");
    }
  };

  return {
    isActive,
    guestName: data.name,
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
export default function ModalDeleteConvidado({
  id,
  name,
}: ModalDeleteConvidadoProps) {
  const {
    isActive,
    guestName,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleCancel,
  } = useModalDeleteConvidado(id, name);

  return (
    <>
      <button className="button" onClick={handleOpenModal}>
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
                    <div className="notification is-danger">
                      <strong>{guestName} será retirado da lista.</strong>
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
                      type="submit"
                    >
                      Retirar da lista
                    </button>
                  </div>
                  <div className="column is-4 is-flex is-justify-content-end">
                    <button
                      className="button is-link"
                      onClick={handleCancel}
                      type="button"
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
          onClick={handleCloseModal}
        ></button>
      </div>
    </>
  );
}
