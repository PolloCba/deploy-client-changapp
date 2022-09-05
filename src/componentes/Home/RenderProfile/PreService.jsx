import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import Footer from "../../Footer";
import Navbar from "../../PrivateRoute/Navbar";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function PreService() {
  let userState = useSelector((state) => state.services);
  const param = useParams();
  userState = userState.filter((n) => n.name === param.id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleOnClic = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <Box>
      <Navbar />
      <Typography>
        <span onClick={handleOnClic}>{userState[0]?.category.name}</span>{" "}
        {" > "} {userState[0]?.name}
      </Typography>
      <h3>Descripcion general</h3>
      <div>
        <div>
          <img
            src={userState[0]?.user.img}
            alt={userState[0]?.user.firstName}
            width="150px"
            height="150px"
          />
          <h5>{userState[0]?.user.firstName}</h5>
          <Link to={`/home/public/${userState[0]?.user.id}`}>
            <Button variant="contained">Ver perfil</Button>
          </Link>
        </div>
        <div>
          <p>Descripcion general:</p>
          <p>{userState[0]?.description}</p>
        </div>
        <div>
          <p>Certificados </p>
          <p>Aca pondriamos los certificados solicitados</p>
        </div>
        <div>
          <p>Zona de trabajo</p>
          <p>
            Aca pondriamos <b>{userState[0]?.user.location}</b> o{" "}
            <b>El mapa con el rango, si lo implementamos</b>
          </p>
        </div>
        <div style={{ border: "1px solid black" }}>
          <h4>Contratar Servicio</h4>
          <span>
            Metodos de pago: <b>Credito / Debito</b>
          </span>
          <p>${userState[0]?.price}</p>
          <Link to={`/home/services/${userState[0]?.id}`}>
            <Button variant="contained">Reserva tu turno</Button>
          </Link>
        </div>
      </div>
      <Button variant="contained" onClick={handleOnClic}>
        Volver atras
      </Button>
      <Footer />
    </Box>
  );
}
