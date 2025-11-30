import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth.js";

function DogDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [dog, setDog] = useState(location.state || null);

  const userId = getUserId(); // viene del token

  // Si no viene por state, lo descarga del backend
  useEffect(() => {
    if (!dog && id) {
      fetch(`http://localhost:5000/api/perros/${id}`)
        .then((res) => res.json())
        .then((data) => setDog(data))
        .catch((err) => console.error("Error al obtener perro:", err));
    }
  }, [id, dog]);

  // Mientras no carga
  if (!dog) return <p className="text-center mt-5">Cargando perro...</p>;

  const { nombre, descripcion, telephone, imageUrl, creadoPor } = dog;

  const puedeEliminar =
    userId && creadoPor && String(userId) === String(creadoPor);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) return alert("Debes iniciar sesión para eliminar");
    if (!window.confirm("¿Seguro que quieres eliminar este perro?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/perros/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        return alert("Error al eliminar: " + data.error);
      }

      alert("Perro eliminado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar perro:", error);
      alert("Error al eliminar el perro");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "1rem" }}
    >
      <div
        className="card shadow-sm"
        style={{ maxWidth: "350px", width: "100%" }}
      >
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img
            src={imageUrl}
            alt={nombre}
            className="img-fluid rounded"
            style={{ maxHeight: "250px", width: "auto" }}
          />
        </div>

        <div className="card-body text-center">
          <h4 className="card-title mb-2">{nombre}</h4>
          <p className="card-text mb-2">{descripcion}</p>
          <p className="mb-1">
            <strong>Teléfono:</strong>
          </p>
          <h5>{telephone}</h5>

          {puedeEliminar && (
            <button
              onClick={handleDelete}
              className="btn btn-danger mt-2 w-100"
            >
              Eliminar publicación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DogDetail;
