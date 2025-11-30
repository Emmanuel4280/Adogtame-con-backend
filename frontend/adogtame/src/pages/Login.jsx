import React, { useState } from "react";
import { BASE_URL } from "../config"; // 🔹 Ajusta la ruta según donde esté el archivo

function Login() {
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
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        // 🔹 Usamos BASE_URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      // 🔥 Guardar token
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.usuario.id);

      alert("Sesión iniciada con éxito");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
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
        <h3 className="text-center mb-3 fw-bold">Iniciar Sesión</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@gmail.com"
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

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>

        <p className="text-center mt-3">
          ¿No tenés cuenta?{" "}
          <a href="/register" className="text-decoration-none">
            Crear una
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
