import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

import { Col, Row, Form, Button } from "react-bootstrap"

import { ToastContainer } from "react-toastify"

import Perfil from "../../../models/Perfil"
import Usuario from "../../../models/Usuario"
import Tarea from "../../../models/Tarea"
import Api from "../../../utils/domains/Api"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { useFormulario } from "../../../utils/hooks/useFormulario"
import { MensajeToastify } from "../../../utils/functions/MensajeToastify"

export const UsuarioActual = () => {
    let { id } = useParams();

    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== false;

    const regresar = useNavigate();


    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);

    // Hook para formulario
    let {
        titulo,
        descripcion,
        estado,
        prioridad,
        color,
        dobleEnlace,
        objeto,
    } = useFormulario<Tarea>(new Tarea("", "", "", new Date(), new Date(), 0, 0, "",new Usuario("", "", "", "", new Date(), "", "", new Perfil("", ""))));

    // Obtener Usuario por id
    const obtenerUnUsuario = async () => {
        const urlCargarUsuario = Api.TAREAS_OBTENER_UNO + "/" + id;
        const usuRecibido = await ServicioPrivado.peticionGET(urlCargarUsuario);

        if (usuRecibido) {
            objeto._id = usuRecibido._id;
            objeto.titulo = usuRecibido.titulo;
            objeto.descripcion = usuRecibido.descripcion;
            objeto.estado = usuRecibido.estado;
            objeto.prioridad = usuRecibido.prioridad;

            if (usuRecibido) {
                setTodoListo(true);
            }
        }
    }

    // Obtener perfiles a mostrar
    const obtenerPerfiles = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.TAREAS_OBTENER)
        setArregloPerfiles(resultado);
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
                nombreUsuario: objeto,
                correoUsuario: objeto,
                fecha: new Date(),
                avatarUsuario:objeto,
                codPerfil: objeto}
            console.log(objetoActualizar);
            const resultado = await ServicioPrivado.peticionPUT(urlActualizar, objetoActualizar);

            if (resultado.despues) {
                setEnProceso(false);
                MensajeToastify("success", "Usuario actualizado correctamente", 7000)
            } else {
                MensajeToastify("error", "No se puede actualizar el Usuario. Verifique el correo electrónico.", 7000)
            }
        }
    }

    useEffect(() => {
        obtenerPerfiles();
        obtenerUnUsuario();
    }, []);

    return (
        <>
            <main className="main">
                <div className="pagetitle">
                    <h1>Usuarios</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">Inicio</Link>
                            </li>
                            <li className="breadcrumb-item active">Administración de Usuarios</li>
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
                                                <small>Nombre Completo:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="nombreUsuario"
                                                className="form-control"
                                                value={titulo}
                                                onChange={dobleEnlace}
                                            >

                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Nombre del usuario es obligatorio
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="descripcion">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Correo Electrónico:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                type="text"
                                                name="correoUsuario"
                                                className="form-control"
                                                value={descripcion}
                                                onChange={dobleEnlace}
                                                pattern="[a-z0-9+_.-]+@[a-z]+\.[a-z]{2,3}"
                                            >

                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Correo Inválido
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="estado">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Perfil del Usuario:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Select
                                                size="sm"
                                                required
                                                name="codPerfil"
                                                value={estado}
                                                onChange={dobleEnlace}
                                                className="form-control"
                                            >
                                                <option value="">Seleccione el estado</option>
                                                
                                                    <option value={1}>
                                                        1
                                                    </option>
                                                

                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Seleccione el perfil del usuario
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group column as={Row} className="mb-3">
                                        <Col  sm={3}>
                                            <Button type="submit" className="btn btn-sm">
                                                Actualizar Tarea
                                            </Button>
                                            
                                        </Col>
                                        <Col  sm={9}>
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