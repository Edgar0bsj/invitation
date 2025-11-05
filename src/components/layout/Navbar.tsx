"use client";

import ModalAddConvidado from "@/components/modal/ModalAddConvidado";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * ============================================
 * API
 * ============================================
 */
async function sendInvitesAPI() {
  const response = await fetch("/api/send-invites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return response.status;
}
/**
 * ============================================
 * HOOKS
 * ============================================
 */
function useNavbar() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  // handles
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  const handleSendInvites = () => {
    sendInvitesAPI().then((resp) => {
      if (resp === 200)
        toast.success("Convites enviado por email com sucesso!");
      if (resp === 500) toast.error("Error ao enviar Emails!");
    });
  };

  return {
    toggleMenu,
    handleToggle,
    handleSendInvites,
  };
}

/**
 * ============================================
 * RENDER
 * ============================================
 */
export default function Navbar() {
  const { toggleMenu, handleToggle, handleSendInvites } = useNavbar();

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            {/* SEM LOGO POR HORA */}
          </a>

          <a
            role="button"
            className={`navbar-burger ${toggleMenu ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={handleToggle}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${toggleMenu ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Enviar Convite</a>

              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={handleSendInvites}>
                  Por Email
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <ModalAddConvidado />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
