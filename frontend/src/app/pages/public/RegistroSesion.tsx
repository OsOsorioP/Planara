import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react";
import ServicioPublico from "../../services/ServicioPublico";
import { Form } from "react-bootstrap";

import { useFormulario } from "../../utils/hooks/useFormulario";
import CrearUsuario from "../../models/CrearUsuario";
import { ContextoUsuario } from "../../context/ContextoUsuario";

import { ToastContainer } from "react-toastify";
import { MensajeToastify } from "../../utils/functions/MensajeToastify";

import { jwtDecode } from "jwt-decode";
import * as cifrado from "js-sha512";
import IniciarSesion from "../../models/IniciarSesion";
import { propUsuario } from "../../models/Interfaces";

export const RegistroSesion = () => {
    const navigate = useNavigate();
    const { actualizar } = useContext(ContextoUsuario) as propUsuario;

    type formularioHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    let { nombreUsuario, correoUsuario, claveUsuario, dobleEnlace, objeto } = useFormulario<CrearUsuario>(new CrearUsuario("", "", ""));

    const limpiarCajas = (formulario: HTMLFormElement) => {
        formulario.reset();

        objeto.nombreUsuario = "";
        objeto.correoUsuario = "";
        objeto.claveUsuario = "";

        formulario.nombreUsuario.value = "";
        formulario.correoUsuario.value = "";
        formulario.claveUsuario.value = "";

        formulario.classList.remove("was-validated");
    }

    const verificarFormulario = async (fh: formularioHtml) => {
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
            const resultado = await ServicioPublico.crearUsuario(objeto);

            if (resultado.token) {
                const objJWTRecibido: any = jwtDecode(resultado.token);
                const usuarioCargado = new IniciarSesion(
                    objJWTRecibido.codUsuario,
                    objJWTRecibido.correo,
                    objJWTRecibido.perfil,
                    objJWTRecibido.nombre
                )
                actualizar(usuarioCargado);

                localStorage.setItem("token", resultado.token);
                localStorage.setItem("avatar", resultado.avatar)
                navigate("/dashboard");
                setEnProceso(false);
            } else {
                limpiarCajas(formularioActual);
                MensajeToastify("error", "No se puede crear el Usuario", 7000);
            }
        }
    }


    return (
        <>
            <main>
                <div className="container">

                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="logo d-flex justify-content-center py-4">
                                        <Link to="/" className="d-flex align-items-center w-auto">
                                            <div className='image'></div>
                                            <h1>Task</h1>
                                        </Link>
                                    </div>

                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Create una Cuenta</h5>
                                                <p className="text-center small">Ingresa tus datos personales para crear una cuenta</p>
                                            </div>

                                            <Form
                                                className="row g-3 needs-validation"
                                                noValidate
                                                validated={enProceso}
                                                onSubmit={verificarFormulario}
                                            >
                                                <div className="col-12">
                                                    <Form.Group controlId="nombreUsuario">
                                                        <Form.Label> Nombre Completo </Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            name="nombreUsuario"
                                                            value={nombreUsuario}
                                                            onChange={dobleEnlace}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            El nombre es obligatorio
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>

                                                <Form.Group controlId="correoUsuario">
                                                    <Form.Label> Correo electrónico </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="email"
                                                        name="correoUsuario"
                                                        value={correoUsuario}
                                                        onChange={dobleEnlace}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        El correo electrónico es obligatorio
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group controlId="claveUsuario">
                                                    <Form.Label> Contraseña </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        name="claveUsuario"
                                                        minLength={4}
                                                        value={claveUsuario}
                                                        onChange={dobleEnlace}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Mínimo 4 caracteres
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group controlId="reClaveUsuario">
                                                    <Form.Label> Confirma Contraseña </Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        name="reClaveUsuario"
                                                        pattern={claveUsuario}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Contraseñas no coinciden
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                                                        <label className="form-check-label" >Estoy de acuerdo y acepto los <a href="#">términos y condiciones</a></label>
                                                        <div className="invalid-feedback">Debes aceptar antes de enviar.</div>
                                                    </div>
                                                </div>
                                                <div className="col-12 form__button">
                                                    <button type="submit">Crear Cuenta</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
                                                </div>
                                            </Form>

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
            <ToastContainer />
        </>
    )
}