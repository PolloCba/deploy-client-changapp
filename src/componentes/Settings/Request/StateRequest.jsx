import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import {
  getAllServices,
  postNotification,
  updateRequest,
} from "../../../redux/actions";
import { NavLink } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import userImg from "../../../user.png";
import toast, { Toaster } from "react-hot-toast";
import error from '../../../404.png'


export default function StateRequest() {
  const { user } = useAuth();
  const serviceState = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const filterEmail = serviceState.filter(
    (state) => state.user?.email === user?.email
  );
  const [btn, setBtn] = useState({
    state: "",
    id: "",
    email: "",
  });

  //ESTADO PARA LA NOTIFICACION AUTOMATICA
  const [noti, setNoti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });
  //PARA TRAER LOS SERVICIOS
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  //PARA CAMBIAR EL VALOR DEL ESTADO
  const handleOnClick = (e) => {
    if (btn.state === "") {
      setBtn({
        ...btn,
        state: e.target.name,
        id: e.target.value,
      });
      //ESTO ES PARA ENVIAR LA NOTIFICACION AUTOMATICA
      setNoti({
        message: `Tu pedido del trabajo ${filterEmail[0].name} fue aceptado.`,
        userNotification_id: filterEmail[0]?.user.id,
        userNotificated_id: e.target.className,
      });
    } else if (btn.state !== e.target.name) {
      document.getElementById(btn.state).checked = false;
      setBtn({
        ...btn,
        state: e.target.name,
        id: e.target.value,
      });
      //ESTO ES PARA ENVIAR LA NOTIFICACION AUTOMATICA
      setNoti({
        message: `Tu pedido del trabajo ${filterEmail[0]?.name} fue rechazado.`,
        userNotification_id: filterEmail[0]?.user.id,
        userNotificated_id: e.target.className,
      });
    }
  };
  // PARA ENVIAR EL FORMULARIO AL BACK
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (btn.state !== "") {
      dispatch(postNotification(noti));
      dispatch(updateRequest({ ...btn, email: e.target.name }));
      toast('Solicitud Actualizada', {
        icon: '👏',
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  };

  const styles = {
    acepted: {
      display: "flex",
      border: "solid #58CC22 2px",
      margin: "2%",
      padding: "2%",
      borderRadius: "10px",
    },
    rejected: {
      display: "flex",
      border: "solid #E00A0A 2px",
      margin: "2%",
      padding: "2%",
      borderRadius: "10px",
    },
    pending: {
      display: "flex",
      border: "solid grey 2px",
      margin: "2%",
      padding: "2%",
      borderRadius: "10px",
    },
  };

  return (
    <Box className="section" sx={{ width: "70%" }}>
      <Typography variant="h4">Estado del Servicio</Typography>
      <Toaster position="top-center" reverseOrder={false} />
      {filterEmail.length === 0 ? (
        <Box
          className="empty-container"
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="low-section" pl={2}>
              {
                <img
                  src={error}
                  alt="?"
                  width="182px"
                  height="182px"
                />
              }
            <Typography variant="h6" mb={5}>
              Para ver los estados del servicio, primero debes publicar uno,
              dirigete a la seccion{" "}
              <NavLink className="linkk" to="/home/createService">
                publicar servicio
              </NavLink>
            </Typography>
          </Box>
        </Box>
      ) : (
        filterEmail?.map((p) => {
          return p.request?.map((e) => {
            return e.state === "rechazado" || e.state === "Pagado" ? (
              <Box
                style={
                  e.state === "rechazado" ? styles.rejected : styles.acepted
                }
              >
                <Typography>
                  La orden #{e.id} del servicio {filterEmail[0].name} fue{" "}
                  {e.state === "Pagado" ? "Pagada" : "Rechazada"}
                </Typography>
              </Box>
            ) : (
              <Box
                style={
                  e.state === "rechazado"
                    ? styles.rejected
                    : e.state === "aceptado"
                    ? styles.acepted
                    : styles.pending
                }
              >
                <Box
                  sx={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ padding: "5%" }}>
                    Reservado por:{" "}
                  </Typography>
                  <img
                    style={{ width: "100px" }}
                    src={e.userRequester?.img ? e.userRequester?.img : userImg}
                    alt="asd"
                  />
                  <Typography sx={{ padding: "5%" }}>
                    {e.userRequester?.firstName.concat(
                      ` ${e.userRequester.lastName}`
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "0 2%",
                  }}
                >
                  <Typography>
                    Nombre del servicio: {filterEmail[0]?.name}
                  </Typography>
                  <Typography>Estado: {e.state}</Typography>
                  <Typography>
                    Trabajo solicitado para el dia {e.day} a las {e.hours}hs
                  </Typography>
                </Box>
                <Box sx={{ width: "25%" }}>
                  {e.state === "aceptado" ? (
                    <form
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        padding: "0 2%",
                      }}
                      name={e.userRequester.email}
                      onSubmit={(e) => handleOnSubmit(e)}
                    >
                      <Button
                        name="rechazado"
                        variant="contained"
                        value={e.id}
                        onClick={handleOnClick}
                      >
                        Cancelar
                      </Button>

                      <Button variant="contained" type="submit">
                        Actualizar
                      </Button>
                    </form>
                  ) : e.state === "pendiente" ? (
                    <form
                      name={e.userRequester.email}
                      onSubmit={(e) => handleOnSubmit(e)}
                    >
                      <label>Aceptar</label>

                      <input
                        type="checkbox"
                        className={e.requester_id}
                        id="aceptado"
                        name="aceptado"
                        value={e.id}
                        onChange={handleOnClick}
                      />
                      <label>Rechazar</label>
                      <input
                        type="checkbox"
                        className={e.requester_id}
                        id="rechazado"
                        name="rechazado"
                        email={e.userRequester.email}
                        value={e.id}
                        onChange={handleOnClick}
                      />

                      <div>
                        <button>Confirmar</button>
                      </div>
                    </form>
                  ) : e.state === "pendiente" ? (
                    <form
                      name={e.userRequester.email}
                      onSubmit={(e) => handleOnSubmit(e)}
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        padding: "0 2%",
                      }}
                    >
                      <Button
                        id="aceptado"
                        name="aceptado"
                        value={e.id}
                        onClick={handleOnClick}
                        variant="contained"
                      >
                        Aceptar
                      </Button>

                      <Button
                        id="rechazado"
                        name="rechazado"
                        email={e.userRequester.email}
                        value={e.id}
                        onClick={handleOnClick}
                        variant="contained"
                      >
                        Rechazar
                      </Button>

                      <Button type="submit" variant="contained">
                        Confirmar
                      </Button>
                    </form>
                  ) : (
                    console.log("asd")
                  )}
                </Box>
              </Box>
            );
          });
        })
      )}
    </Box>
  );
}
