import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";

import Perfil from "../../../models/Perfil";
import Api from "../../../utils/domains/Api";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { MensajeToastify } from "../../../utils/functions/MensajeToastify";

import { Button, Col, Row, Form } from "react-bootstrap";
import { useFormulario } from "../../../utils/hooks/useFormulario";

export const PerfilActual = () => {
    let { id } = useParams();
    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== undefined;
    let {
        nombrePerfil,
        dobleEnlace,
        objeto
    } = useFormulario<Perfil>(new Perfil("", ""));

    const obtenerUnPerfil = async () => {
        const urlCargarPerfil = Api.PERFILES_OBTENER_UNO + "/" + id;
        const perfilRecibido = await ServicioPrivado.peticionGET(urlCargarPerfil);
        objeto._id = perfilRecibido._id;
        objeto.nombrePerfil = perfilRecibido.nombrePerfil;
        if (perfilRecibido) {
            setTodoListo(true);
        }
    }

    const verificarFormulario = async (fh: formaHtml) => {
        fh.preventDefault();
        setEnProceso(true);
        const formularioActual = fh.currentTarget;

        formularioActual.classList.add("was-validated");
        if (formularioActual.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {
            const urlActualizar = Api.PERFILES_ACTUALIZAR + "/" + objeto._id;
            const resultado = await ServicioPrivado.peticionPUT(urlActualizar, objeto);
            console.log(resultado)
            if (resultado.nuevo) {
                setEnProceso(false);
                MensajeToastify("success", "Perfil actualizado correctamente.", 6000)
            } else {
                MensajeToastify("error", "No se puede actualizar el perfil. Posiblemente el nombre ya existe.", 6000)
            }
        }
    }

    useEffect(() => {
        obtenerUnPerfil();
    }, [])


    return (
        <main className="main">
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
                        <h5 className="card-title">Formulario de edición</h5>
                        {cargaFinalizada ? (
                            <Form
                                noValidate
                                validated={enProceso}
                                onSubmit={verificarFormulario}
                            >
                                <Form.Group as={Row} className="mb-3" controlId="nombrePerfil">
                                    <Form.Label column sm={2}>
                                        Nombre Perfil
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="nombrePerfil"
                                            className="form-control"
                                            value={nombrePerfil}
                                            onChange={dobleEnlace}
                                        >

                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Nombre del perfil es obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button type="submit" className="btn btn-sm">
                                            Actualizar Perfil
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
    )
};