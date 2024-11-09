import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

import { Col, Row, Form, Button } from "react-bootstrap"

import { ToastContainer } from "react-toastify"

import Perfil from "../../../models/Perfil"
import Usuario from "../../../models/Usuario"
import Api from "../../../utils/domains/Api"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { useFormulario } from "../../../utils/hooks/useFormulario"
import { MensajeToastify } from "../../../utils/functions/MensajeToastify"
import { ConvertirBase64 } from "../../../utils/functions/ConvertirBase64"
import noFoto from "../../../../assets/images/avatarDefault.png"

export const UsuarioActual = () => {
    let { id } = useParams();
    const [avatarBase64, setAvatarBase64] = useState<string>("");
    const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
    const [nombreImagenTempo, setNombreImagenTempo] = useState<string>("");

    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== false;

    const regresar = useNavigate();


    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);

    // Hook para formulario
    let {
        nombreUsuario,
        correoUsuario,
        nombreImagenUsuario,
        codPerfil,
        dobleEnlace,
        objeto,
    } = useFormulario<Usuario>(new Usuario("", "", "", "", new Date(), "", "", new Perfil("", "")));

    // Obtener Usuario por id
    const obtenerUnUsuario = async () => {
        const urlCargarUsuario = Api.USUARIOS_OBTENER_UNO + "/" + id;
        const usuRecibido = await ServicioPrivado.peticionGET(urlCargarUsuario);

        if (usuRecibido) {
            objeto._id = usuRecibido._id;
            objeto.nombreUsuario = usuRecibido.nombreUsuario;
            objeto.correoUsuario = usuRecibido.correoUsuario;
            objeto.avatarUsuario = usuRecibido.avatarUsuario;
            objeto.codPerfil = usuRecibido.codPerfil;

            if (usuRecibido) {
                setAvatarBase64(usuRecibido.avatarUsuario);
                setImagenMiniatura(usuRecibido.avatarUsuario);
                setNombreImagenTempo(usuRecibido.nombreImagenUsuario);
                setTodoListo(true);
            }
        }
    }

    // Obtener perfiles a mostrar
    const obtenerPerfiles = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.PERFILES_OBTENER)
        setArregloPerfiles(resultado);
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

    const enviarFormulario = async (fh: formaHtml) => {
        fh.preventDefault();
        setEnProceso(true);
        const formularioActual = fh.currentTarget;
        formularioActual.classList.add("was-validated");

        if (formularioActual.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {
            objeto.avatarUsuario = avatarBase64;

            const urlActualizar = Api.USUARIOS_ACTUALIZAR + "/" + id;
            const objetoActualizar = {
                _id: objeto._id,
                nombreUsuario: objeto.nombreUsuario,
                correoUsuario: objeto.correoUsuario,
                fecha: new Date(),
                nombreImagenUsuario:nombreImagenUsuario !== "" ? nombreImagenUsuario : nombreImagenTempo,
                avatarUsuario:objeto.avatarUsuario,
                codPerfil: objeto.codPerfil}
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
                                    <Form.Group as={Row} className="mb-3" controlId="nombreUsuario">
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
                                                value={nombreUsuario}
                                                onChange={dobleEnlace}
                                            >

                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Nombre del usuario es obligatorio
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
                                                type="text"
                                                name="correoUsuario"
                                                className="form-control"
                                                value={correoUsuario}
                                                onChange={dobleEnlace}
                                                pattern="[a-z0-9+_.-]+@[a-z]+\.[a-z]{2,3}"
                                            >

                                            </Form.Control>
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
                                                Seleccione el perfil del usuario
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="nombreImagenUsuario">
                                        <Form.Label column sm={3}>
                                            <span className="text-success">
                                                Foto actual:
                                            </span>
                                            <span> {nombreImagenTempo}</span>

                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                size="sm"
                                                accept="image/png, image/jpeg"
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
                                            <img
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = noFoto;
                                                }}
                                                src={imagenMiniatura}
                                                alt="no foto"
                                                className="maximoTC" />
                                        </div>

                                    </div>

                                    <Form.Group column as={Row} className="mb-3">
                                        <Col  sm={3}>
                                            <Button type="submit" className="btn btn-sm">
                                                Actualizar Usuario
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