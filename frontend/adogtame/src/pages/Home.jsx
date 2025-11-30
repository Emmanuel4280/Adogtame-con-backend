import React, { useEffect, useState } from "react";
import DogCard from "../components/DogCard";
import { BASE_URL } from "../config"; // 🔹 Ajusta la ruta según donde esté tu archivo

function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/perros`); // 🔹 Usamos BASE_URL
        const data = await res.json();

        console.log("PERROS EN HOME:", data);

        setDogs(data);
      } catch (error) {
        console.error("Error al traer perros:", error);
      }
    };

    fetchDogs();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row mt-4">
        {dogs.length === 0 ? (
          <p className="text-center">No hay perros aún</p>
        ) : (
          dogs.map((dog) => (
            <div className="col-md-4 mb-3" key={dog._id}>
              <DogCard
                _id={dog._id}
                nombre={dog.nombre}
                descripcion={dog.descripcion}
                telephone={dog.telephone}
                imageUrl={dog.imageUrl}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
