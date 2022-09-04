import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allRequest, deleteRequest } from "../../redux/actions";

export default function Request(){
    const allReq = useSelector(state => state.allRequest)
    const dispatch = useDispatch()
    console.log(allReq)
    useEffect(() => {
        dispatch(allRequest())
    }, [dispatch])

    return(
        <div>
            <div style={{textAlign: 'center'}}>
                <h2>Solicitudes de Servicios</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                {
                    allReq.length === 0 ? <div style={{textAlign: 'center'}}><p>Por el momento no se realizaron solicitudes</p></div>
                    : allReq.map(r => {
                        return(
                            <div key={r.id} style={{textAlign: 'center'}}>
                              <h5>En base al servicio: {r.services.name}</h5>
                              <p>ID: {r.id}</p>
                              <p>Estado: {r.state}</p>
                                <p>Fecha de creacion: {r.createdAt}</p>
                                <p>Ultima actualizacion: {r.updatedAt}</p>
                                <button onClick={() => dispatch(deleteRequest(r.id))}>Borrar solicitud</button>    
                            </div>)
                    })
                }
            </div>
        </div>)
}