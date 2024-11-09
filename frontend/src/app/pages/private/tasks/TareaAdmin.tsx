import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button, Modal } from "react-bootstrap"

import Perfil from "../../../models/Perfil"
import Usuario from "../../../models/Usuario"
import { ToastContainer } from "react-toastify"
import Api from "../../../utils/domains/Api"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { MensajeToastify } from "../../../utils/functions/MensajeToastify"
import { obtenerFechaLocal, obtenerHora } from "../../../utils/functions/FormatoFecha"

export const TareaAdmin = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [objUsu, setObjUsu] = useState<Usuario>(
        new Usuario("", "", "", "", new Date(), "", "", new Perfil("", ""))
    );
    const [arregloUsuarios, setArregloUsuarios] = useState<Usuario[]>([]);

    const obtenerUsuarios = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.USUARIOS_OBTENER);
        setArregloUsuarios(resultado);
    }

    const borrarUsuario = async (codigoUsuario: string) => {
        const urlBorrar = Api.USUARIOS_ELIMINAR + "/" + codigoUsuario;
        const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);
        if (typeof resultado.eliminado === "undefined") {
            MensajeToastify("error", "No se puede eliminar el usuario", 7000);
        } else {
            MensajeToastify(
                "success",
                "Usuario con correo: " + objUsu.correoUsuario + " ha sido eliminado.",
                7000
            );
        }
        obtenerUsuarios();
    }

    useEffect(() => {
        obtenerUsuarios();
    }, []);


    return (
        <>
            <main id="main" className="main">
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
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>
                                            {" "}
                                            Nro{" "}
                                        </th>
                                        <th style={{ width: "34%" }}>Usuario</th>
                                        <th style={{ width: "20%" }}>Creación</th>
                                        <th style={{ width: "20%" }}>Perfil</th>
                                        <th style={{ width: "16%" }}> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arregloUsuarios.map((usuario, indice) => (
                                        <tr key={indice}>
                                            <td className="text-center align-middle">
                                                <small>{indice + 1}</small>{" "}
                                            </td>
                                            <td>
                                                {usuario.nombreUsuario}
                                                <br />
                                                <small className="text-muted">
                                                    {usuario.correoUsuario}
                                                </small>
                                            </td>
                                            <td>
                                                {obtenerFechaLocal(usuario.fecha)}
                                                <br />
                                                <small className="text-muted">
                                                    {obtenerHora(usuario.fecha)}
                                                </small>
                                                </td>
                                            <td>
                                                {usuario.codPerfil.nombrePerfil}
                                            </td>
                                            <td className="text-center align-middle">
                                                    <Link to={"/dashboard/detailuser/" + usuario._id}>
                                                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                                                    </Link>{" "}
                                                    <a href="/#" onClick={(e) => {
                                                        e.preventDefault();
                                                        setObjUsu(usuario);
                                                        setShow(true);

                                                    }}
                                                    >
                                                        <i className="fa-solid fa-trash-can" style={{ color: "#9E1E17" }}></i>
                                                    </a>{" "}
                                                    <Link to={"/dashboard/updateuser/" + usuario._id}>
                                                    <i className="fa-regular fa-pen-to-square" style={{ color: "#149551" }}></i>
                                                    </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Eliminar Perfil</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    ¿Desea eliminar el perfil{" "}
                                    <strong>{objUsu.nombreUsuario} - {objUsu.correoUsuario}</strong>?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setShow(false)
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            borrarUsuario(objUsu._id);
                                            setShow(false)
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </main>
        </>
    )
}