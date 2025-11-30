import { Link } from "react-router-dom";

function DogCard({ _id, nombre, descripcion, imageUrl, telephone }) {
  return (
    <div className="card h-100 shadow-sm" style={{ width: "18rem" }}>
      <img
        src={imageUrl}
        className="card-img-top"
        alt={nombre}
        style={{ objectFit: "cover", height: "250px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">{descripcion}</p>

        <Link
          to={`/dogs/${_id}`}
          className="btn btn-primary mt-auto"
          state={{ nombre, descripcion, imageUrl, telephone }}
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}

export default DogCard;
