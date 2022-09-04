import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { deleteService, getUserEmail } from "../../redux/actions";
import { Link, NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export default function PublicServices() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  console.log(userState);

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await toast.promise(dispatch(deleteService(e.target.id)), {
      loading: "Saving...",
      success: <b>Servicio borrado</b>,
      error: <b>No se pudo borrar el servicio</b>,
    });
    window.location.reload(true);
  };



  const styles = {
    infoText:{
      fontSize:'1.2rem',
      padding:'1%'
    }
  }
  

  return (
    <Box sx={{ width: "70%" }}>
      {userState[0]?.services?.length === 0 ? (
        <div>
          <p>Este usuario no tiene ningun servicio registrado</p>
          <p>
            Si quieres publicar servicios, dirigete a la seccion{" "}
            <Link to="/home/createService">crear servicios</Link>{" "}
          </p>
        </div>
      ) : (
        userState[0]?.services.map((e) => {
          return (              
                <Box sx={{display: 'flex',
                  border: 'solid grey 1px', 
                  flexDirection:'column',
                  borderRadius: '10px',
                  padding:'2%',
                  margin:'2%'}}>
                  <Box sx={{display:'flex'}}>
                  <Box
                    sx={{
                      width:'50%',
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection:'column',
                    }}
                  >
                    <Typography style={styles.infoText} variant="h7">{`Nombre: ${e.name}`}</Typography>
                    <Box sx={{display:'flex'}}>
                      <Typography style={styles.infoText} variant="h7">Precio:</Typography>
                      <Typography
                        sx={{ color: "green", marginLeft: "10px", fontSize:'1.2rem', padding:'1% 1% 1% 0'}}
                        variant="h7"
                      >
                        {` $${e.price}`}
                      </Typography>
                    </Box>
                    <Typography style={styles.infoText} variant="h7">{`Categoría: ${e.category.name}`}</Typography>
                    <Typography style={styles.infoText} variant="h7">{`Solicitudes: ${e.request.length}`}</Typography>
                    <Typography style={styles.infoText} variant="h7">{`Días: ${e.day.split(',').join(', ')}`}</Typography>
                    <Typography style={styles.infoText} variant="h7">{`Horarios: ${e.hours.split(',').join(', ')}`}</Typography>
                  </Box>
                  <Box sx={{display:'flex', flexDirection:'column', width:'50%'}}>
                    <Box sx={{height:'70%', display:'flex', flexDirection:'column'}}>
                      <Typography style={styles.infoText} sx={{textAlign:'center'}} variant="h7">Descripción:</Typography>
                      <Typography style={styles.infoText} sx={{textAlign:'center'}} variant="h7">{e.description}</Typography>
                    </Box>
                    <Box sx={{height:'30%',display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                    
                    <NavLink style={{textDecoration: 'none', color: 'blue'}} to={`${e.id}`}><Button variant='contained' sx={{backgroundColor:'#1F2937'}}>Modificar Servicio</Button></NavLink>
                  
                    <Button variant='contained' sx={{backgroundColor:'#1F2937'}} id={e.id} onClick={handleDelete} >Borrar Servicio</Button>
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
