import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../landing/LandingNav";
import { postCategory } from "../../redux/actions/index.js";


export default function CreateCategory() {
  const [category, setCategory] = useState({
    name: "",
    img: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(postCategory(category));
    setError("");
    navigate("/admin/categories");
  };

  const styles = {
    container: {
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
      height: "100vh",
    },
    login: {
      display: "flex",
      flexDirection: "column",
      width: "40%",

      alignItems: "center",
      border: "solid 3px lightblue",
      borderRadius: "15px",
      padding: "35px",
    },
    form: {
      width: "100%",
    },
    button: {
      width: "100%",
      margin: "10px 0",
    },
    input: {
      width: "100%",
      margin: "10px 0 10px 0",
    },
  };

  return (
    <div>
      <Box style={styles.container}>
        <Box style={styles.login}>
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Categoría Nueva
          </Typography>
          <form style={styles.form} onSubmit={(e) => handleSumbit(e)}>
            {error && <p>{error}</p>}
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                style={styles.input}
                type="text"
                name="name"
                value={category.name}
                onChange={handleOnChange}
              />
              <TextField
                id="outlined-basic"
                label="Imagen"
                variant="outlined"
                style={styles.input}
                type="text"
                name="img"
                value={category.img}
                onChange={handleOnChange}
              />
              <Button variant="contained" style={styles.button} type="submit">
                Crear
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          ></Box>
        </Box>
      </Box>
    </div>
  );
}
