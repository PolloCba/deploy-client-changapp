import { Box, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allRequest, allUsers, getAllCategories, getAllServices } from '../../redux/actions'
import styles from './Estilos/style'
import { Link } from 'react-router-dom'

export default function Admin() {
  const dispatch = useDispatch()
  const usersDb = useSelector(state => state.users)
  const servicesDb = useSelector(state => state.services)
  const categoriesDb = useSelector(state => state.categories)
  const requestDb = useSelector(state => state.allRequest)

  useEffect(() => {
    dispatch(getAllServices())
    dispatch(getAllCategories())
    dispatch(allUsers())
    dispatch(allRequest())
  }, [dispatch])


  return (
    <Box component='section' sx={styles.contenedor}>
      <Box sx={styles.cajas}><Typography>Usuarios Registrados</Typography><Typography>{usersDb.length}</Typography><Link to='/admin/users'>Ver todos</Link></Box>
      <Box sx={styles.cajas}><Typography>Servicios Creados</Typography><Typography>{servicesDb.length}</Typography><Link to='/admin/services'>Ver todos</Link></Box>
      <Box sx={styles.cajas}><Typography>Categorias habilitadas</Typography><Typography>{categoriesDb.length}</Typography><Link to='/admin/categories'>Ver todos</Link></Box>
      <Box sx={styles.cajas}><Typography>Solicitudes de Servicios</Typography><Typography>{requestDb.length}</Typography><Link to='/admin/requests'>Ver todos</Link></Box>

      
       
    </Box>
  )
}
