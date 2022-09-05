import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allUsers, getAllServices } from "../../../redux/actions";
import Footer from "../../Footer";
import Navbar from "../../PrivateRoute/Navbar";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

export default function PublicProfile() {
  let userServices = useSelector((state) => state.services);
  const allUser = useSelector((state) => state.users);
  const param = useParams();
  const dispatch = useDispatch();
  const filterUser = allUser.filter((n) => n.id === param.id);
  userServices = userServices.filter((e) => e.user?.id === param.id);
  const filtrarReviews = allUser[0]?.reviews.slice(0, 2);
  //ESTADO PARA EL POP UP
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(allUsers());
  }, [dispatch]);

  const handleOnClic = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setBtn(!btn);
  };

  return (
    <div>
      <Navbar />
      <button onClick={handleOnClic}>Volver atras</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <h4>Perfil del Usuario</h4>
          <img src={filterUser[0]?.img} alt={filterUser[0]?.firstName} />
          <h4>{filterUser[0]?.firstName}</h4>
          <p>{filterUser[0]?.location}</p>
          <p>{filterUser[0]?.createdAt}</p>
          <p>Descripcion</p>
          <span>{filterUser[0]?.description}</span>
        </div>
        <div>
          <h4>Servicios publicados</h4>
          {userServices &&
            userServices.map((s) => {
              return (
                <div key={s.id}>
                  <h3>{s.name}</h3>
                  <p>{s.price}</p>
                  <p>{filterUser[0]?.location}</p>
                  <Link to={`/home/services/${s.id}`}>
                    <button>Reservar</button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {filterUser[0]?.reviews?.length === 0 ? (
          <p>Sin reseñas por el momento </p>
        ) : (
          filtrarReviews?.map((e) => {
            return (
              <div key={e.id}>
                <span>
                  <Rating defaultValue={e.rate} readOnly />{" "}
                </span>
                <p>{e.message}</p>
              </div>
            );
          })
        )}
        <button onClick={handleOpen}>Ver mas</button>
        <Dialog open={btn}>
          <span onClick={handleOpen}>
            <CloseIcon />
          </span>
          {filterUser[0]?.reviews.map((r) => {
            return (
              <div>
                <span>
                  <Rating defaultValue={r.rate} readOnly />{" "}
                </span>
                <p>{r.message}</p>
              </div>
            );
          })}
        </Dialog>
      </div>
      <Footer />
    </div>
  );
}
