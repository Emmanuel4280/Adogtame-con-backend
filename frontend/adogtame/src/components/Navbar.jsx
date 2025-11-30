import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirigir
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Adogtame
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">
                Inicio
              </Link>

              <Link className="nav-link" to="/publicar">
                Publicar perro
              </Link>

              {!token ? (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              ) : (
                <button
                  className="nav-link btn btn-link text-danger"
                  onClick={handleLogout}
                  style={{ textDecoration: "none" }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
