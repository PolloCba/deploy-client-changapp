import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, deleteService } from "../../redux/actions";
import { Link } from "react-router-dom";
import service from './Estilos/service'

export default function Services() {
    const services = useSelector(state => state.services)
    const dispatch = useDispatch()
   
    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteService(e.target.id))
        window.location.reload() 
    }

  return( 
    <div>
        <div style={service.titulo}>
            <h2>Servicios creados por los Usuarios</h2>
        </div>
        <div style={service.contenedorCard}>
        {
            services?.length === 0 ? <div style={service.sinSolicitudes}><p>Por el momento no se encuntran servicios creados</p></div>
            : services?.map(s => {
                return(
                    <div key={s.id} style={service.card}>
                        <p>ID: {s.id}</p>
                        <h4>Nombre del Servicio: {s.name}</h4>
                        <p>Precio: ${s.price}</p>
                        <p>Dias disponibles: {s.day}</p>
                        <p>Horas disponibles: {s.hours}</p>
                        <h5>Creado por: <Link style={service.link} to={`/admin/users/${s.user?.id}`}>{s.user?.firstName} {s.user?.lastName}</Link></h5>
                        <button id={s.id} style={service.btn} onClick={handleDelete}>Borrar Servicio</button>
                        
                    </div>)
            })
        }
        </div>
    </div>)
}
