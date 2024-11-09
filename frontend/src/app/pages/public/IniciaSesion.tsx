import { Form } from "react-bootstrap"
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { jwtDecode } from "jwt-decode"
import * as cifrado from "js-sha512"

import IniciarSesion from "../../models/IniciarSesion"
import CrearUsuario from "../../models/CrearUsuario"
import { propUsuario } from "../../models/Interfaces"
import ServicioPublico from "../../services/ServicioPublico"
import { ContextoUsuario } from "../../context/ContextoUsuario"
import { useFormulario } from "../../utils/hooks/useFormulario"

import { ToastContainer } from "react-toastify"
import { MensajeToastify } from "../../utils/functions/MensajeToastify"

export const IniciaSesion = () => {

    const navigate = useNavigate();
    type formularioHtml = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false);
    const { actualizar } = useContext(ContextoUsuario) as propUsuario;

    let { correoUsuario, claveUsuario, dobleEnlace, objeto } = useFormulario<CrearUsuario>(new CrearUsuario("", "", ""));

    const limpiarCajas = (formulario: HTMLFormElement) => {
        formulario.reset();

        objeto.correoUsuario = "";
        objeto.claveUsuario = "";

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
            const resultado = await ServicioPublico.iniciarSesion(objeto);

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
                MensajeToastify("error", "Credenciales incorrectas", 7000);
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
                                                <h5 className="card-title text-center pb-0 fs-4">Accede a tu cuenta</h5>
                                                <p className="text-center small">Ingresa tu correo y contraseña para iniciar sesión</p>
                                            </div>

                                            <Form
                                                className="row g-3"
                                                noValidate
                                                validated={enProceso}
                                                onSubmit={verificarFormulario}>


                                                <Form.Group controlId="correoUsuario" className="col-12">
                                                    <Form.Label className="form-label">Correo Electrónico</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="text"
                                                        name="correoUsuario"
                                                        value={correoUsuario}
                                                        onChange={dobleEnlace}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        El correo electrónico es obligatorio
                                                    </Form.Control.Feedback>
                                                </Form.Group>


                                                <Form.Group controlId="claveUsuario" className="col-12">
                                                    <Form.Label className="form-label">Contraseña</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        name="claveUsuario"
                                                        minLength={4}
                                                        value={claveUsuario}
                                                        onChange={dobleEnlace}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        La contraseña es obligatoria y debe tener un mínimo de 4 caracteres
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <div className="form__button col-12">
                                                    <button type="submit">Iniciar Sesión</button>
                                                </div>

                                                <div className="col-12">
                                                    <p className="small mb-0">¿No tienes cuenta? <Link to="/register">Create una cuenta</Link></p>
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