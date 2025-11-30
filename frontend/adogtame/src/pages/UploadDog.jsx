import { useState } from "react";

function UploadDog() {
  const [dogData, setDogData] = useState({
    nombre: "",
    descripcion: "",
    foto: null,
    telephone: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDogData({
      ...dogData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", dogData.nombre);
    formData.append("descripcion", dogData.descripcion);
    formData.append("telephone", dogData.telephone);
    formData.append("foto", dogData.foto); // AQUÍ SE MANDA LA IMAGEN

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debés iniciar sesión para subir un perro");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/perros", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ❗ NO PONER Content-Type AQUÍ
        },
        body: formData, // ❗ FormData, NO JSON.stringify
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al subir perro: " + data.error);
        return;
      }

      console.log("Perro subido:", data);
      alert("Perro subido con éxito");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectarse al servidor");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Subir un perro en adopción</h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow-sm bg-light"
        >
          {/* 1) Subir foto */}
          <div className="mb-3">
            <label className="form-label fw-bold">Foto del perro</label>
            <input type="file" name="foto" onChange={handleChange} />
          </div>

          {/* 2) Nombre */}
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre del perro</label>
            <input
              type="text"
              className="form-control"
              placeholder="Firulais"
              name="nombre"
              value={dogData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* 3) Descripción */}
          <div className="mb-3">
            <label className="form-label fw-bold">Descripción</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Es juguetón, amigable, tiene 2 años..."
              name="descripcion"
              value={dogData.descripcion}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          {/*telephone */}
          <div className="mb-3">
            <label className="form-label fw-bold">Teléfono de contacto</label>
            <input
              type="text"
              className="form-control"
              placeholder="12345678"
              name="telephone"
              value={dogData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          {/* 4) Botón Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Subir perro
          </button>
        </form>
      </div>
    </>
  );
}
export default UploadDog;
