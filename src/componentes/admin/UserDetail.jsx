import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allRequest,
  getAllServices,
  userById,
  deleteService,
  deleteRequest,
  bannedState,
  adminState,
} from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function UserDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(userById(id));
    dispatch(getAllServices());
    dispatch(allRequest());
  }, [dispatch, id]);
  const user = useSelector((state) => state.user);
  const allServices = useSelector((state) => state.services);

  const userServices = allServices?.filter((serv) => serv?.user_id === id);

  const allRequests = useSelector((state) => state.allRequest);

  const userRequest = allRequests?.filter(
    (req) => req.services?.user_id === id
  );
  
  const userRequestDone = allRequests?.filter((req) => req.requester_id === id);

  const handleBanned = (id) => {
    dispatch(bannedState(id, { banned: !user[0]?.banned }));
    window.location.reload();
  };

  const handleAdmin = (id) => {
    dispatch(adminState(id, { admin: !user[0]?.admin}))
    window.location.reload();
  }
  console.log(user)
  return (
    <Box
      component="section"
      sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
    >
      <Box component="div">
        <Typography variant="h5">Dellates del Usuario</Typography>
        <Box component="div">
          <img
            style={{ width: "15%" }}
            src={user[0]?.img}
            alt="Foto de usuario"
          />
        </Box>
        <Box component="div">
          <ul>
            <li>ID: {user[0]?.id}</li>
            <li>Nombre: {user[0]?.firstName}</li>
            <li>Apellido: {user[0]?.lastName}</li>
            <li>Edad: {user[0]?.birthDate}</li>
            <li>Email: {user[0]?.email} </li>
            <li>Ubicación: {user[0]?.location}</li>
            <li>Administrador: {user[0]?.admin ? 'true' : 'false'}</li>
            <li>Banned: {user[0]?.banned ? "true" : "false"}</li>
            <li>Description: {user[0]?.description}</li>
          </ul>
          <Button onClick={() => handleBanned(user[0]?.id)}>
            {user[0]?.banned ? "Habilitar" : "Deshabilitar"} Usuario
          </Button>
          <Button onClick={() => handleAdmin(user[0]?.id)}>
            {user[0]?.admin ? "Sacar Administrador" : "Convertir Administrador"}
          </Button>
        </Box>
      </Box>
      <Box component="div">
        <Typography variant="h4">Servicios</Typography>
        {userServices &&
          userServices.map((serv) => {
            return (
              <Box key={serv.id} component="div">
                <ul>
                  <li>ID: {serv.id}</li>
                  <li>Nombre: {serv.name}</li>
                  <li>Precio: {serv.price}</li>
                  <li>Descripción: {serv.description}</li>
                  <li>Dias/Disp: {serv.days}</li>
                  <li>Horas/Disp: {serv.hours}</li>
                </ul>
                <Button
                  onClick={() => {
                    dispatch(deleteService(serv.id))
                    window.location.reload();
                  }}
                >
                  Borrar Servicio
                </Button>
              </Box>
            );
          })}
      </Box>
      <Box component="div">
        <Typography variant="h4">Solicitudes Recibidas</Typography>
        {userRequest &&
          userRequest.map((req) => {
            return (
              <Box key={req.id} component="div">
                <ul>
                  <li>ID: {req.id}</li>
                  <li>Cliente: <Link to={`/admin/users/${req.userRequester.id}`}>{req.userRequester.firstName}</Link></li>
                  <li>Dias/Disp: {req.day}</li>
                  <li>Horas/Disp: {req.hours}</li>
                </ul>
                <Button
                  onClick={() => {
                    dispatch(deleteRequest(req.id))
                    window.location.reload();
                  }}
                >
                  Borrar Solicitud
                </Button>
              </Box>
            );
          })}
      </Box>
      <Box>
        <Typography variant="h4">Solicitudes Realizadas</Typography>
        {userRequestDone &&
          userRequestDone.map((req) => {
            return (
              <Box key={req.id} component="div">
                <ul>
                  <li>ID: {req.id}</li>
                  <li>Nombre: {req.name}</li>
                  <li>Precio: {req.price}</li>
                  <li>Descripción: {req.description}</li>
                  <li>Dias/Disp: {req.days}</li>
                  <li>Horas/Disp: {req.hours}</li>
                </ul>
                <Button onClick={deleteRequest(req.id)}>
                  Borrar Solicitud
                </Button>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
