import ModalAddConvidado from "@/components/modal/ModalAddConvidado";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Home</a>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <ModalAddConvidado />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
