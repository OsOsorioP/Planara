import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Col, Row, Form, Button } from "react-bootstrap"

import * as cifrado from 'js-sha512'
import { ToastContainer } from "react-toastify"

import Perfil from "../../../models/Perfil"
import Usuario from "../../../models/Usuario"
import Api from "../../../utils/domains/Api"
import noFoto from "../../../../assets/images/avatarDefault.png"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { useFormulario } from "../../../utils/hooks/useFormulario"
import { MensajeToastify } from "../../../utils/functions/MensajeToastify"
import { ConvertirBase64 } from "../../../utils/functions/ConvertirBase64"

export const UsuarioCrear = () => {

    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== false;

    const redirigir = useNavigate();
    const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
    const [avatarBase64, setAvatarBase64] = useState<string>("");

    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);

    // Hook para formulario se elimino el avatarUsuario cualquier cosa volver a colocar
    let {
        nombreUsuario,
        correoUsuario,
        claveUsuario,
        nombreImagenUsuario,
        codPerfil,
        dobleEnlace,
        objeto,
    } = useFormulario<Usuario>(new Usuario("", "", "", "", new Date(), "", "", new Perfil("", "")));

    // Obtener perfiles a mostrar
    const obtenerPerfiles = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.PERFILES_OBTENER)
        setArregloPerfiles(resultado);
        if (resultado) {
            setTodoListo(true);
        }
    }

    // Mostrar Imagen en pantalla
    const mostrarImagen = async (e: any) => {
        const archivos = e.target.files;
        const imagen = archivos[0];
        setImagenMiniatura(URL.createObjectURL(imagen));
        dobleEnlace(e);
        const base64 = await ConvertirBase64(imagen);
        setAvatarBase64(String(base64));
    }

    const limpiarCajas = (formulario: HTMLFormElement) => {
        objeto._id = "";
        objeto.claveUsuario = "";

        formulario.claveUsuario.value = "";
        formulario.reClaveUsuario.value = "";

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
            const claveCifrada = cifrado.sha512(objeto.claveUsuario);
            objeto.claveUsuario = claveCifrada;
            objeto.avatarUsuario = avatarBase64;
            const resultado = await ServicioPrivado.peticionPOST(Api.USUARIOS_CREAR, objeto);

            if (resultado.id) {
                setEnProceso(false);
                redirigir("/dashboard/detailuser" + resultado.id)
            } else {
                limpiarCajas(formularioActual);
                MensajeToastify("error", "No se puede crear el Usuario. Posiblemente ya exista el correo en la base de datos.", 6000)
            }
        }
    }

    // Hook

    useEffect(() => {
        obtenerPerfiles();
    }, [])

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
                            <li className="breadcrumb-item active">Crear Usuario</li>
                        </ol>
                    </nav>
                </div>

                <section className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Formulario de creación</h5>

                            {cargaFinalizada ? (
                                <Form noValidate validated={enProceso} onSubmit={enviarFormulario}>
                                    <Form.Group as={Row} className="mb-3" controlId="nombreUsuario">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Nombre Completo:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                type="text"
                                                name="nombreUsuario"
                                                value={nombreUsuario}
                                                onChange={dobleEnlace}
                                                className="form-control"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                El nombre completo es obligatorio
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="correoUsuario">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Correo Electrónico:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                type="email"
                                                name="correoUsuario"
                                                value={correoUsuario}
                                                onChange={dobleEnlace}
                                                className="form-control"
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Correo Inválido
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="codPerfil">
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
                                                value={codPerfil._id}
                                                onChange={dobleEnlace}
                                                className="form-control"
                                            >
                                                <option value="">Seleccione el perfil</option>
                                                {arregloPerfiles.map((perfil, indice) => (
                                                    <option key={indice} value={perfil._id}>
                                                        {perfil.nombrePerfil}
                                                    </option>
                                                ))}

                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                El nombre completo es obligatorio
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="claveUsuario">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Contraseña:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                type="password"
                                                name="claveUsuario"
                                                value={claveUsuario}
                                                onChange={dobleEnlace}
                                                minLength={4}
                                                className="form-control"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                El nombre completo es obligatorio
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="reClaveUsuario">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Confirmar Contraseña:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                required
                                                type="password"
                                                name="reClaveUsuario"
                                                className="form-control"
                                                minLength={4}
                                                pattern={claveUsuario}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                El nombre completo es obligatorio
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="nombreImagenUsuario">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                <small>Seleccione foto:</small>
                                            </span>
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                accept="image/png, image/jpeg"
                                                required
                                                type="file"
                                                name="nombreImagenUsuario"
                                                value={nombreImagenUsuario}
                                                onChange={mostrarImagen}
                                                className="form-control"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Debe seleccionar un avatar para el usuario.
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <div className="mb-3 row">
                                        <div className="col-sm-3"></div>
                                        <div className="d-flex justify-content-center col-sm-9">
                                            <img src={imagenMiniatura} alt="no foto" className="maximoTC" />
                                        </div>

                                    </div>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={{ span: 9, offset: 3 }}>
                                            <Button type="submit" className="btn btn-primary">
                                                Crear Usuario
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