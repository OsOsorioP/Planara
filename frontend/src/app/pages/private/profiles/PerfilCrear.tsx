import { Col, Row, Form, Button } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

import { useState } from "react";
import Perfil from "../../../models/Perfil";
import ServicioPrivado from "../../../services/ServicioPrivado";
import Api from "../../../utils/domains/Api";
import { useFormulario } from "../../../utils/hooks/useFormulario";
import { MensajeToastify } from "../../../utils/functions/MensajeToastify";
import { Link } from "react-router-dom";

export const PerfilCrear = () => {
    type formaHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    let { nombrePerfil, dobleEnlace, objeto } = useFormulario<Perfil>(new Perfil("", ""));

    const limpiarCajas = (formulario: HTMLFormElement) => {
        formulario.reset();

        objeto._id = "";
        objeto.nombrePerfil = "";

        formulario.nombrePerfil.value = "";

        formulario.classList.remove("was-validated")
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
            const resultado = await ServicioPrivado.peticionPOST(Api.PERFILES_CREAR, objeto)
            console.log(resultado)
            if (resultado.id) {
                setEnProceso(false);
                MensajeToastify("success", "Perfil creado con éxito", 6000)
            } else {
                MensajeToastify("error", "No se puede crear Perfil. Posiblemente ya exista", 6000)
            }
            limpiarCajas(formularioActual);
        }
    }

    return (
        <main className="main">
            <div className="pagetitle">
                <h1>Perfiles</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/dashboard">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item active">Crear Perfil</li>
                    </ol>
                </nav>
            </div>
            <section className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Formulario de creación</h5>

                        <Form noValidate validated={enProceso} onSubmit={verificarFormulario}>
                            <Form.Group as={Row} className="mb-3" controlId="nombrePerfil">
                                <Form.Label column sm={2}>
                                    Nombre Perfil
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="nombrePerfil"
                                        value={nombrePerfil}
                                        onChange={dobleEnlace}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        El nombre es obligatorio
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">
                                        Crear Perfil
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </main>
    )
};