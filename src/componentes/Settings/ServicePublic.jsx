import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import {
  deleteService,
  getAllServices,
  getUserEmail,
} from "../../redux/actions";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Avatar, Button, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import "../css/empty.css";

export default function PublicServices() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  let services = useSelector((state) => state.services);
  // services = services?.filter(e => e.user_id === userState[0]?.id)
  console.log(userState);
  console.log(services);

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
    dispatch(getAllServices());
  }, [dispatch, user?.email]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteService(e.target.id));
    toast.success("Servicio borrado con exito");
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  const styles = {
    infoText: {
      fontSize: "1.2rem",
      padding: "1%",
    },
  };

  return (
    <Box sx={{ width: "70%" }}>
      <Toaster position="top-center" reverseOrder={false} />
      {userState[0]?.services?.length === 0 ? (
        <Box className="card-container">
          <Typography variant="h5">
            ¡No tenes ningun servicio registrado!
          </Typography>
          <Box className="low-section">
            <Avatar
              sx={{
                width: 182,
                height: 182,
                boxShadow:
                  " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
            >
              {
                <img
                  src="https://images.unsplash.com/photo-1505939675702-ea0ad504df86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="?"
                  width="182px"
                  height="182px"
                />
              }
            </Avatar>
            <Typography variant="p">
              Si quieres publicar servicios, dirigete a la seccion{" "}
              <NavLink className="link" to="/home/createService">
                crear servicios
              </NavLink>{" "}
            </Typography>
          </Box>
        </Box>
      ) : (
        userState[0]?.services.map((e) => {
          return (
            <Box
              sx={{
                display: "flex",

                border: "solid grey 1px",
                flexDirection: "column",
                borderRadius: "10px",
                padding: "2%",
                margin: "2%",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Nombre: ${e.name}`}</Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={styles.infoText} variant="h7">
                      Precio:
                    </Typography>
                    <Typography
                      sx={{
                        color: "green",
                        marginLeft: "10px",
                        fontSize: "1.2rem",
                        padding: "1% 1% 1% 0",
                      }}
                      variant="h7"
                    >
                      {` $${e.price}`}
                    </Typography>
                  </Box>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Categoría: ${e.category?.name}`}</Typography>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Solicitudes: ${e.request.length}`}</Typography>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Días: ${e.day.split(",").join(", ")}`}</Typography>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Horarios: ${e.hours.split(",").join(", ")}`}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <Box
                    sx={{
                      height: "70%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      style={styles.infoText}
                      sx={{ textAlign: "center" }}
                      variant="h7"
                    >
                      Descripción:
                    </Typography>
                    <Typography
                      style={styles.infoText}
                      sx={{ textAlign: "center" }}
                      variant="h7"
                    >
                      {e.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "30%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <NavLink
                      style={{ textDecoration: "none", color: "blue" }}
                      to={`${e.id}`}
                    >
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#1F2937" }}
                      >
                        Modificar Servicio
                      </Button>
                    </NavLink>

                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#1F2937" }}
                      id={e.id}
                      onClick={handleDelete}
                    >
                      Borrar Servicio
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
}
