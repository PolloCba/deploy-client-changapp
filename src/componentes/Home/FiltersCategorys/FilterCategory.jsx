import React, { useEffect } from "react";
import Navbar from "../../PrivateRoute/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormCategory from "./FormCategory";

export default function FilterCategory() {
  const services = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const param = useParams();
  const filterUsers = services.filter((e) => e.category?.name === param.name);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  

  return (
    <div>
      <Navbar />
      
      <FormCategory />
      <h4>{param.name} {' > '}</h4>
      {filterUsers.length === 0 ? (
        <p>
          No se encuentra ningun servicio para esta categoria{" "}
          <Link to="/home/createService">Se el primero en postularte!</Link>
        </p>
      ) : (
        filterUsers?.map((e) => {
          return (
            <div
              style={{
                border: "solid black 1.5px",
                maxWidth: "300px",
                borderRadius: "20px",
                margin: "10px",
                textAlign: "center",
                padding: "10px",
              }}
              key={e.id}
            >
              <h3>Servicio: {e.name}</h3>
              <h4>{e.user?.firstName}</h4>
              <img src={e.user?.img} alt="No tiene" width='64px' height="64px"/>
              <p>{e.description}</p>
              <p>${e.price}</p>
              <Link to={`/home/user/${e.name}`}>
                <button>Haz tu reserva</button>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
