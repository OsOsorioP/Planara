import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";

import Perfil from "../../../models/Perfil";
import Api from "../../../utils/domains/Api";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { MensajeToastify } from "../../../utils/functions/MensajeToastify";
import { Button, Modal } from "react-bootstrap";

export const PerfilAdmin = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [arregloPerfiles, setArreglosPerfiles] = useState<Perfil[]>([]);
    const [objPer, setObjPer] = useState<Perfil>(new Perfil("", ""));

    const obternetPerfiles = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.PERFILES_OBTENER);
        setArreglosPerfiles(resultado);
        return resultado;
    }

    const eliminarPerfil = async (idPerfil: string) => {
        const urlEliminar = Api.PERFILES_ELIMINAR + "/" + idPerfil;
        const resultado = await ServicioPrivado.peticionDELETE(urlEliminar);

        if (typeof resultado.eliminado === "undefined") {
            MensajeToastify("error", "No se puede eliminar el perfil. Es posible que esté relacionado con usuarios", 6000)
        } else {
            MensajeToastify("success", "Perfil eliminado de la base de datos", 6000)
        }
        obternetPerfiles();
    }

    useEffect(() => {
        obternetPerfiles();
    }, [])

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Perfiles</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/dashboard">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item active">Administración de Perfiles</li>
                    </ol>
                </nav>
            </div>

            <section className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Orden</th>
                                    <th style={{ width: "60%" }}>Nombre Perfil</th>
                                    <th style={{ width: "10%" }}> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arregloPerfiles.map((perfil, indice) => (
                                    <tr key={indice}>
                                        <td>{indice + 1}</td>
                                        <td>{perfil.nombrePerfil}</td>
                                        <td className="text-center">{perfil.cantUsuario}</td>
                                        <td className="text-center">
                                            {perfil.cantUsuario === 0 ? (
                                                <a href="/#" onClick={(e) => {
                                                    e.preventDefault();
                                                    setObjPer(perfil);
                                                    setShow(true);

                                                }}
                                                >
                                                    <i className="fa-solid fa-trash-can" style={{ color: "#9E1E17" }}></i>
                                                </a>
                                            ) : (
                                                <i className="fa-solid fa-trash-can" style={{ color: "#908989" }}></i>
                                            )}{" "}
                                            <Link to={"/dashboard/updateprofile/" + perfil._id}>
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
                                <strong>{objPer.nombrePerfil}</strong>?
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
                                        eliminarPerfil(objPer._id);
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
    )
};