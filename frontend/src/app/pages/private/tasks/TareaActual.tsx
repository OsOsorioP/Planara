import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

import { Col, Row, Form, Button } from "react-bootstrap"

import { ToastContainer } from "react-toastify"

import Tarea from "../../../models/Tarea"
import Perfil from "../../../models/Perfil"
import Usuario from "../../../models/Usuario"
import Api from "../../../utils/domains/Api"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { useFormulario } from "../../../utils/hooks/useFormulario"
import { MensajeToastify } from "../../../utils/functions/MensajeToastify"

export const TareaActual = () => {
    let { id } = useParams();

    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== false;

    const regresar = useNavigate();

    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);

    let {
        titulo,
        descripcion,
        estado,
        prioridad,
        fechaVencimiento,
        dobleEnlace,
        objeto,
    } = useFormulario<Tarea>(new Tarea("", "", "", new Date(), new Date(), 0, 0, new Usuario("", "", "", "", new Date(), "", "", new Perfil("", ""))));

    const obtenerUnaTarea = async () => {
        const urlCargarTarea = Api.TAREAS_OBTENER_UNO + "/" + id;
        const tarRecibido = await ServicioPrivado.peticionGET(urlCargarTarea);

        if (tarRecibido) {
            objeto._id = tarRecibido._id;
            objeto.titulo = tarRecibido.titulo;
            objeto.descripcion = tarRecibido.descripcion;
            objeto.estado = tarRecibido.estado;
            objeto.prioridad = tarRecibido.prioridad;
            objeto.fechaVencimiento = tarRecibido.fechaVencimiento
            setTodoListo(true);
        }
    }

    const enviarFormulario = async (fh: formaHtml) => {
        fh.preventDefault();
        setEnProceso(true);
        const formularioActual = fh.currentTarget;
        formularioActual.classList.add("was-validated");

        if (formularioActual.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {

            const urlActualizar = Api.TAREAS_ACTUALIZAR + "/" + id;
            const objetoActualizar = {
                _id: objeto._id,
                titulo: objeto.titulo,
                descripcion: objeto.descripcion,
                estado: objeto.estado,
                prioridad: objeto.prioridad,
                fechaVencimiento: objeto.fechaVencimiento
            }
            const resultado = await ServicioPrivado.peticionPUT(urlActualizar, objetoActualizar);

            if (resultado) {
                setEnProceso(false);
                MensajeToastify("success", "Tarea se actualizado correctamente", 7000)
                regresar(`/dashboard/detailtask/${id}`)
            } else {
                MensajeToastify("error", "No se puede actualizar la tarea. Verifique los campos.", 7000)
            }
        }
    }

    useEffect(() => {
        obtenerUnaTarea();
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
                            <li className="breadcrumb-item">
                                <Link to="/dashboard/listtask">Tareas</Link>
                            </li>
                            <li className="breadcrumb-item active">Administración de tareas</li>
                        </ol>
                    </nav>
                </div>

                <section className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Formulario de edición</h5>
                            {cargaFinalizada ? (
                                <Form
                                    noValidate
                                    validated={enProceso}
                                    onSubmit={enviarFormulario}
                                >
                                    <Form.Group as={Row} className="mb-3" controlId="titulo">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Titulo:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                type="text"
                                                name="titulo"
                                                value={titulo}
                                                onChange={dobleEnlace}
                                                className="form-control"
                                                maxLength={38}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                El titulo es obligatorio y maximo 16 letras
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="descripcion">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Descripción:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                as={"textarea"}
                                                name="descripcion"
                                                value={descripcion}
                                                onChange={dobleEnlace}
                                                className="form-control"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Descripción invalida
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="fechaVencimiento">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Fecha Final:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                value={String(fechaVencimiento)}
                                                type="datetime-local"
                                                name="fechaVencimiento"
                                                onChange={dobleEnlace}
                                                className="form-control"
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                La fecha final es obligatoria.
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="estado">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Estado:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Select
                                                size="sm"
                                                required
                                                name="estado"
                                                className="form-control"
                                                onChange={dobleEnlace}
                                                value={estado}
                                            >
                                                <option selected value={1}>Por Defecto</option>
                                                <option value="1">Pendiente</option>
                                                <option value="2">En curso</option>
                                                <option value="3">Completada</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Elegir el estado es obligatorio.
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="prioridad">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Prioridad:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Select
                                                size="sm"
                                                required
                                                name="prioridad"
                                                className="form-control"
                                                onChange={dobleEnlace}
                                                value={prioridad}
                                            >
                                                <option selected value={1}>Por Defecto</option>
                                                <option value="1">Baja</option>
                                                <option value="2">Media</option>
                                                <option value="3">Alta</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Elegir la prioridad es obligatorio.
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group column as={Row} className="mb-3">
                                        <Col sm={3}>
                                            <Button type="submit" className="btn btn-sm">
                                                Actualizar Tarea
                                            </Button>

                                        </Col>
                                        <Col sm={9}>
                                            <Button
                                                onClick={() => regresar(-1)}
                                                className="btn btn-sm"
                                            >
                                                Regresar
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            ) : <div>Cargando...</div>}
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </main>
        </>
    )
}