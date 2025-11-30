import { useState } from "react";
import { BASE_URL } from "../config"; // 🔹 Ajusta la ruta según donde esté tu archivo

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Datos enviados:", formData);
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        // 🔹 Aquí usamos BASE_URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      if (!res.ok) {
        alert(data.error || "Error al registrarse");
        return;
      }

      alert("Usuario creado con éxito");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error en fetch:", error);
      alert("Error al conectarse al servidor");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "1rem" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ width: "100%", maxWidth: "350px" }}
      >
        <h3 className="text-center mb-3 fw-bold">Crear Cuenta</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="correo@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Tu contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Crear Cuenta
          </button>
        </form>

        <p className="text-center mt-3">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="text-decoration-none">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
