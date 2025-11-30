function Logout() {
  function salir() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <button onClick={salir} className="btn btn-danger">
      Cerrar sesión
    </button>
  );
}
export default Logout;
