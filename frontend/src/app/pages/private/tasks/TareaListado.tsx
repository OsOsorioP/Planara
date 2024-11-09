import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"

import Tarea from "../../../models/Tarea"
import Api from "../../../utils/domains/Api"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { obtenerFechaLocal, obtenerHora } from "../../../utils/functions/FormatoFecha"
import { ContextoUsuario } from "../../../context/ContextoUsuario"

export const TareaListado = () => {

    const miUsuario = useContext(ContextoUsuario);
    const id = miUsuario?.autenticado?.codUsuario;
    const [arregloTareas, setArregloTareas] = useState<Tarea[]>([]);

    const obtenerTareas = async () => {
        const resultado = await ServicioPrivado.peticionPOST(Api.TAREAS_OBTENER, { codUsuario: id });
        setArregloTareas(resultado);
    }

    useEffect(() => {
        obtenerTareas();
    }, []);


    return (
        <>
            <main className="main">
                <div className="pagetitle">
                    <h1>Tareas</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">Inicio</Link>
                            </li>
                            <li className="breadcrumb-item active">Tareas</li>
                        </ol>
                    </nav>
                </div>
                <section className="col-lg-12">
                    <div className="task__container">
                        {arregloTareas.map((tarea, indice) => (
                            <Link to={"/dashboard/detailtask/" + tarea._id}>
                                <div key={indice} className="task" style={{ color: tarea.color }}>
                                    <div className="task__title">
                                        <h5>{tarea.titulo}</h5>
                                    </div>
                                    <div className="task__body">
                                        <p>
                                            Estado: {tarea.estado === 1 ? 'Pendiente' : ''}
                                        </p>
                                        <p>
                                            Prioridad: {tarea.prioridad === 1 ? 'Baja' : 'Media'}
                                        </p>
                                        <p>Finaliza: {obtenerFechaLocal(tarea.fechaVencimiento)}{"-"}{obtenerHora(tarea.fechaVencimiento)}</p>
                                    </div>
                                </div>
                                </Link>
                        ))}
                        <div className="task__create">
                            <span><Link to="/dashboard/addtask"><i className="fa-solid fa-square-plus"></i></Link></span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}