import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServices,
  getServiceById,
  postNotification,
  updateService,
} from "../../../redux/actions";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function validate(service) {
  let error = {};

  if (!/^[a-z ñ]+$/i.test(service.name))
    error.name = "El nombre solo puede contener letras";
  else if (service.description > 150)
    error.description =
      "La descripcion no puede contener mas de 150 caracteres";

  return error;
}

export default function UpdateService() {
  const filterService = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const param = useParams();
  const idService = filterService.filter((e) => e.id === param.id);
  const navigate = useNavigate();
  const [service, setService] = useState({
    name: "",
    day: [],
    price: "",
    description: "",
  });
  const [error, setError] = useState("");

  //PARA RECIBIR NOTIFICACION AUTOMATICA
  const [noti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });
  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getServiceById(param.id));
  }, [dispatch, param.id]);

  //PARA LEER LOS CAMBIOS
  const handleOnChange = (e) => {
    e.preventDefault();
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...service,
        [e.target.name]: e.target.value,
      })
    );
  };

  //AGREGAR DIAS DISPONIBLES
  const handleOnClick = (e) => {
    if (!service.day.includes(e.target.value)) {
      setService({
        ...service,
        day: [...service.day, e.target.value],
      });
    } else {
      console.log("Ya lo agregaste");
    }
  };

  //ENVIAR DATA DEL FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();
    service.day = service.day.join(",");
    if (service.name === "") service.name = idService[0]?.name;
    if (service.price === "") service.price = idService[0]?.price;
    if (service.description === "")
      service.description = idService[0]?.description;
    if (service.day === "") service.day = idService[0]?.day;
    if (
      noti.message === "" &&
      noti.userNotification_id === "" &&
      noti.userNotificated_id === ""
    ) {
      noti.message = `Publicacion actualizada.`;
      noti.userNotification_id = idService[0]?.user_id;
      noti.userNotificated_id = idService[0]?.user_id;
    }
    dispatch(postNotification(noti));
    dispatch(updateService(param.id, service));
    navigate("/settings/services");
  };

  return (
    <Box sx={{ width:'70%', display: "flex", flexDirection: "column", gap: "20px" }}>
      <Typography variant="h6">Modificar servicio</Typography>
      {error && <p>{error.name}</p>}
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <label>Nombre del servicio</label>
          <TextField
            type="text"
            name="name"
            placeholder={idService[0]?.name}
            value={service.name}
            onChange={handleOnChange}
          />
        </Box>
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "warp" }}>
          <label>Dias disponibles</label>
          {[
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
          ].map((e) => {
            return (
              <Button
                sx={{ maxWidth: "100px" }}
                onClick={handleOnClick}
                value={e}
                type="button"
                key={e}
              >
                {e}
              </Button>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", gap: "120px" }}>
          <label>Precio</label>
          <TextField
            type="number"
            name="price"
            placeholder={idService[0]?.price}
            value={service.price}
            onChange={handleOnChange}
          />
        </Box>
        <Box sx={{ display: "flex", gap: "80px" }}>
          <label>Descripcion</label>
          <textarea
            name="description"
            cols="40"
            rows="4"
            placeholder={idService[0]?.description}
            value={service.description}
            onChange={handleOnChange}
          />
        </Box>
        <Button type="submit">Cargar cambios</Button>
      </form>
      <NavLink style={{ textDecoration: "none" }} to="/settings/services">
        <Button>Volver Atras</Button>
      </NavLink>
    </Box>
  );
}
