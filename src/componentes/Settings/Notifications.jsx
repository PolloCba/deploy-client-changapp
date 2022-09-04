import React, { useEffect } from "react";
import {useSelector, useDispatch } from 'react-redux'
import { allNotifications, deleteNotification, getUserEmail } from "../../redux/actions";
import { useAuth } from '../../context/authContext'
import { Box, Button, Typography } from "@mui/material";

export default function Notifications(){
    const {user} = useAuth()
    let notifications = useSelector(state => state.allNotifications)
    const userState = useSelector((state) => state.filter);
    const dispatch = useDispatch()
    notifications = notifications.filter(e => e.userNotificated_id === userState[0]?.id)
    useEffect(() => {
       dispatch(allNotifications())  
       dispatch(getUserEmail(user?.email)) 
    }, [dispatch, user?.email])
    
    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(deleteNotification(e.target.id))
        window.location.reload(true)
    }

    return(
        <Box sx={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'4%'}}>
            {
                notifications.length === 0 ? <p>No tienes notificaciones nuevas</p>
                : notifications.map(e => {
                    return(<Box sx={{width:'100%',display:'flex', justifyContent:'space-between', border:'solid grey 1px', borderRadius:'10px', margin:'1% 0px'}} key={e.id}>
                        <Box sx={{padding:'2%'}}>
                        <Typography sx={{fontSize:'1.3rem'}}>Notificacion de {e.userNotification.firstName} </Typography>
                        <Typography sx={{fontSize:'1.3rem'}}>{e.message}</Typography>
                        </Box>
                        <Button sx={{borderRadius:'0 10px 10px 0', backgroundColor:'#1F2937'}} variant='contained' id={e.id} onClick={handleOnClick}>X</Button>
                        
                    </Box>)
                })
            }
            </Box>
        </Box>)
}