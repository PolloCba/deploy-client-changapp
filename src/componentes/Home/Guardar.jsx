/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Footer from "../Footer";
import Paging from "../Paging";
import Navbar from "../PrivateRoute/Navbar";
import Reviews from "../reviews/Reviews";
import Category from "./AuxHome/Category";

import '../css/revwievs.css'


export default function Guardar() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) setLoading(false);
  }, [user, setLoading]);

  if (loading)
    return (
      <div>
        <Navbar />
        <h1>Cargando datos...</h1>
        <Footer />
      </div>
    );
  else
    return (
      <div>
        <Navbar />
        <div>
          <Category />
        </div>
        <Box className="rev-section">
          <Typography variant="h4" sx={{position: 'relative ',margin: '70px auto', borderBottom:'solid 2px black', paddingBottom: '40px', width:'700px'}}>Algunos comentarios de nuestros Usuarios</Typography>
          <Reviews />
        </Box>
        <Footer />
      </div>
    );
}
