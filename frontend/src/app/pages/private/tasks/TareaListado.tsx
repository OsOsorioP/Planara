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

    const estados: Record<number, { texto: string; color: string }> = {
        1: { texto: "Pendiente", color: "blue" },
        2: { texto: "En curso", color: "purple" },
        3: { texto: "Finalizado", color: "green" },
    };

    const prioridades: Record<number, { texto: string; color: string }> = {
        1: { texto: "Baja", color: "green" },
        2: { texto: "Media", color: "orange" },
        3: { texto: "Alta", color: "red" },
    };



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
                                <div key={indice} className="task">
                                    <div className="task__title">
                                        <h5 style={{fontWeight: 'bold'}}>{tarea.titulo}</h5>
                                    </div>
                                    <div className="task__body">
                                        <p style={{fontWeight: 'bold'}}>Estado: <span style={{ color: estados[tarea.estado].color }}>{estados[tarea.estado].texto}</span></p>
                                        <p style={{fontWeight: 'bold'}}>
                                            Prioridad: <span style={{ color: prioridades[tarea.prioridad].color }}>{prioridades[tarea.prioridad].texto}</span>
                                        </p>
                                        <p style={{fontWeight: 'bold'}}>Finaliza: <span style={{color:'gray'}}>{obtenerFechaLocal(tarea.fechaVencimiento)}{"-"}{obtenerHora(tarea.fechaVencimiento)}</span></p>
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