import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Col, Row, Form, Button } from "react-bootstrap"

import { ToastContainer } from "react-toastify"

import Perfil from "../../../models/Perfil"
import Usuario from "../../../models/Usuario"
import Tarea from "../../../models/Tarea"
import Api from "../../../utils/domains/Api"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { useFormulario } from "../../../utils/hooks/useFormulario"
import { MensajeToastify } from "../../../utils/functions/MensajeToastify"
import { ContextoUsuario } from "../../../context/ContextoUsuario"

export const TareaCrear = () => {

    const miUsuario = useContext(ContextoUsuario);
    const id = miUsuario?.autenticado?.codUsuario;

    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== false;

    const redirigir = useNavigate();

    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [usuario, setUsuario] = useState<Usuario>();

    let {
        titulo,
        descripcion,
        estado,
        prioridad,
        dobleEnlace,
        objeto,
    } = useFormulario<Tarea>(new Tarea("", "", "", new Date(), new Date(), 0, 0,new Usuario("", "", "", "", new Date(), "", "", new Perfil("", ""))));

    const obtenerUsuario = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.USUARIOS_OBTENER_UNO + "/" + id)
        setUsuario(resultado);
        if (resultado) {
            setTodoListo(true);
        }
    }

    const limpiarCajas = (formulario: HTMLFormElement) => {
        objeto.titulo = "";
        objeto.descripcion = "";

        formulario.titulo.value = "";
        formulario.descripcion.value = "";

        formulario.classList.remove("was-validated")
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

            objeto.codUsuario = usuario || objeto.codUsuario
            console.log(objeto)
            const resultado = await ServicioPrivado.peticionPOST(Api.TAREAS_CREAR, objeto);

            if (resultado.id) {
                setEnProceso(false);
                redirigir("/dashboard/detailtask/" + resultado.id)

            } else {
                limpiarCajas(formularioActual);
                MensajeToastify("error", "No se puede crear el Usuario. Posiblemente ya exista el correo en la base de datos.", 6000)
            }
        }
    }

    useEffect(() => {
        obtenerUsuario();
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
                            <li className="breadcrumb-item active">Crear Tarea</li>
                        </ol>
                    </nav>
                </div>

                <section className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Formulario de creación</h5>

                            {cargaFinalizada ? (
                                <Form noValidate validated={enProceso} onSubmit={enviarFormulario}>
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
                                                type="datetime-local"
                                                name="fechaVencimiento"
                                                onChange={dobleEnlace}
                                                className="form-control"
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                El nombre completo es obligatorio
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

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={{ span: 10, offset: 5 }}>
                                            <Button type="submit" className="btn btn-primary">
                                                Crear Tarea
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>

                            ) : (
                                <div>Cargando información de los Perfiles</div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <ToastContainer />
        </>
    )
}