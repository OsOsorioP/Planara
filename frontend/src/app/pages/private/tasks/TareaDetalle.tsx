import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Tarea from "../../../models/Tarea";
import Api from "../../../utils/domains/Api";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { obtenerFechaLocal, obtenerHora } from "../../../utils/functions/FormatoFecha";

export const TareaDetalle = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    let { id } = useParams();
    const regresar = useNavigate();
    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== undefined;
    const [objUsuario, setObjUsuario] = useState<Tarea | undefined>();

    const estados: Record<number, { texto: string; color: string }> = {
        1: { texto: "Pendiente", color: "blue" },
        2: { texto: "En curso", color: "orange" },
        3: { texto: "Finalizado", color: "green" },
    };

    const prioridades: Record<number, { texto: string; color: string }> = {
        1: { texto: "Baja", color: "green" },
        2: { texto: "Media", color: "yellow" },
        3: { texto: "Alta", color: "red" },
    };

    const estadoActual = objUsuario?.estado
        ? estados[objUsuario.estado] || { texto: "Desconocido", color: "gray" }
        : { texto: "Desconocido", color: "gray" };

    const prioridadActual = objUsuario?.prioridad
        ? prioridades[objUsuario.prioridad] || { texto: "Desconocida", color: "gray" }
        : { texto: "Desconocida", color: "gray" };

    const borrarUsuario = async (codigoUsuario: string) => {
        const urlBorrar = Api.TAREAS_ELIMINAR + "/" + codigoUsuario;
        await ServicioPrivado.peticionDELETE(urlBorrar);
    };

    useEffect(() => {
        const obtenerUsuario = async () => {
            const urlCargarUsuario = Api.TAREAS_OBTENER_UNO + "/" + id;
            const usuRecibido = await ServicioPrivado.peticionGET(urlCargarUsuario);
            if (usuRecibido) {
                setObjUsuario(usuRecibido);
                setTodoListo(true);
            }
        };

        obtenerUsuario();
    }, [id]);

    return (
        <main className="main">
            {cargaFinalizada ? (
                <>
                    <div className="d_flex justify-content-center container">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Información de la Tarea</div>
                                <div className="card-body">
                                    <h5 className="card-title">{objUsuario?.titulo}</h5>
                                    <p>{objUsuario?.descripcion}</p>
                                    <div className="card-text">
                                        Estado:{" "}
                                        <span style={{ color: estadoActual.color }}>
                                            {estadoActual.texto}
                                        </span>
                                        <br />
                                        Prioridad: <span style={{ color: prioridadActual.color }}>{prioridadActual.texto}</span>
                                        <br />
                                        Fecha Final:{" "}
                                        {obtenerFechaLocal(String(objUsuario?.fechaVencimiento))}
                                        <br />
                                        Hora Final:{" "}
                                        {obtenerHora(String(objUsuario?.fechaVencimiento))}
                                        <br />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={() => regresar(-1)}
                                        className="btn btn-light btn-sm"
                                    >
                                        <i
                                            className="fa-solid fa-arrow-left"
                                            style={{ color: "blue" }}
                                        ></i>
                                    </button>{" "}
                                    <button
                                        onClick={() =>
                                            regresar("/dashboard/updatetask/" + objUsuario?._id)
                                        }
                                        className="btn btn-light btn-sm"
                                    >
                                        <i
                                            className="fa-regular fa-pen-to-square"
                                            style={{ color: "#149551" }}
                                        ></i>
                                    </button>{" "}
                                    <button
                                        className="btn btn-light btn-sm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShow(true);
                                        }}
                                    >
                                        <i
                                            className="fa-solid fa-trash-can"
                                            style={{ color: "#9E1E17" }}
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Tarea</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Desea eliminar la tarea <strong>{objUsuario?.titulo} </strong>?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    borrarUsuario(objUsuario?._id || "");
                                    setShow(false);
                                    regresar(-1);
                                }}
                            >
                                Eliminar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <div>Carga de Usuario en proceso...</div>
            )}
        </main>
    );
};
