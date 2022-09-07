/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";

import Footer from "../Footer";
import { useAuth } from "../../context/authContext";
import Navbar from "../PrivateRoute/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FormService from "./AuxService/FormService";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function Servicios() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  return (
    <Box>
      <Navbar />
      {user?.email === null ? (
        <Box sx={{textAlign: 'center', heigth: '100vh',  padding: '21%'}}>

        <Typography>
          No tienes acceso a estos datos ya que ingresaste como un usuario
          anonimo. Ve a la seccion de registrar para poder utilizar estos
          servicios.
          <NavLink style={{fontWeight: '700'}} to="/register">Registrarse</NavLink>
        </Typography>
        </Box>
      ) : (
        <FormService />
      )}
      <Footer />
    </Box>
  );
}
