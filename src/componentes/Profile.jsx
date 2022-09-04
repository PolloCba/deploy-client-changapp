import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOMkAMbpBh8B0S8l5dvwrIhlsLqOh-rmOBw&usqp=CAU'

export default function Profilee() {
  const infoUser = useSelector((state) => state.registerUser);
  console.log(infoUser);
  return (
    <div>
      {/* SECCION PREGUNTAS FRECUENTES */}
      {/* SECCION RESEÑAS Y RAITING */}
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia component="img" height="200" image={image} alt="Profile photo" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: Raul Gonzales
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Job: Electricista
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: 
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined">
            <Link style={{ textDecoration: "none" }} to="">
              Contact
            </Link>
          </Button>
          <Button size="small" variant="outlined">
            <Link style={{ textDecoration: "none" }} to="">
              Update service
            </Link>
          </Button>
          <Button size="small" variant="outlined">
            <Link style={{ textDecoration: "none" }} to="">
              Settings
            </Link>
          </Button>
          <Button size="small" variant="outlined">
            <Link style={{ textDecoration: "none" }} to="/home">
              Volver atras
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
