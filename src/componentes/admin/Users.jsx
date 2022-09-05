import React, { useEffect } from "react";
import user from "./Estilos/users";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allUsers } from "../../redux/actions";


export default function Users() {
  const dispatch = useDispatch();
  const usersDb = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);


  return (
    <div style={user.contenedor}>
      <div style={user.titulo}>
        <h2>Usuarios Registrados</h2>
      </div>
      <div style={user.gridUno}>
        <p>ID</p>
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Email</p>
        <p>Admin</p>
        <p>Banneado</p>
        <p>Detalles</p>
      </div>
      {usersDb &&
        usersDb.map((e) => {
          return (
            <div style={user.gridUno}>
              <p>{e.id}</p>
              <p>{e.firstName}</p>
              <p>{e.lastName}</p>
              <p style={user.columnas}>{e.email}</p>
              <p>{e.admin ? "true" : "false"}</p>
              <p>{e.banned ? "true" : "false"}</p>
              <button
                style={user.btn}
                onClick={() => navigate(`/admin/users/${e.id}`)}
              >
                Detalles
              </button>
            </div>
          );
        })}
    </div>
  );
}

