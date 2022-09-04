import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, deleteService } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Services() {
    const services = useSelector(state => state.services)
    const dispatch = useDispatch()
   

    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])


  return( 
    <div>
        <div style={{textAlign: 'center'}}>
            <h2>Servicios creados por los Usuarios</h2>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
        {
            services?.length === 0 ? <div style={{textAlign: 'center'}}><p>Por el momento no se encuntran servicios creados</p></div>
            : services?.map(s => {
                return(
                    <div key={s.id} style={{textAlign: 'center'}}>
                        <p>ID: {s.id}</p>
                        <h4>Nombre del Servicio: {s.name}</h4>
                        <h5>Creado por: <Link to={`/admin/users/${s.user?.id}`}>{s.user?.firstName} {s.user?.lastName}</Link></h5>
                        <p>Dias disponibles: {s.day}</p>
                        <p>Horas disponibles: {s.hours}</p>
                        <p>Precio: ${s.price}</p>
                        <button onClick={() => dispatch(deleteService(s.id))}>Borrar Servicio</button>
                    </div>)
            })
        }
        </div>
    </div>)
}
