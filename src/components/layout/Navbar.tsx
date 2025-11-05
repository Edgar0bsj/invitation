"use client";

import ModalAddConvidado from "@/components/modal/ModalAddConvidado";
import { useState } from "react";

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

  return {
    toggleMenu,
    handleToggle,
  };
}

/**
 * ============================================
 * RENDER
 * ============================================
 */
export default function Navbar() {
  const { toggleMenu, handleToggle } = useNavbar();

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
                <a className="navbar-item">Por Email</a>
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
