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
                  <a className="button is-dark">Github</a>
                  <a className="button is-warning">Enviar Convites por email</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
