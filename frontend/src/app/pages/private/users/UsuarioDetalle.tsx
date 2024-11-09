import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Usuario from "../../../models/Usuario"
import Api from "../../../utils/domains/Api"
import noFoto from "../../../../assets/images/avatarDefault.png"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { obtenerFechaLocal, obtenerHora } from "../../../utils/functions/FormatoFecha"

export const UsuarioDetalle = () => {
    let { id } = useParams();
    const regresar = useNavigate();
    const [todoListo, setTodoListo] = useState<boolean>(false);
    let cargaFinalizada = todoListo !== undefined;
    const [objUsuario, setObjUsuario] = useState<Usuario>();

    useEffect(() => {
        const obtenerUsuario = async () => {
            const urlCargarUsuario = Api.USUARIOS_OBTENER_UNO + "/" + id;
            const usuRecibido = await ServicioPrivado.peticionGET(urlCargarUsuario);
            if (usuRecibido) {
                setObjUsuario(usuRecibido);
                setTodoListo(true);
            }
        }

        obtenerUsuario();
    }, [id]);

    return (
        <>
            <main className="main">
                {cargaFinalizada ? (
                    <>
                        <div className="d_flex justify-content-center">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">Información del Usuario</div>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Nombre {objUsuario?.nombreUsuario}
                                        </h5>
                                        <p className="card-text">
                                            Correo: {objUsuario?.correoUsuario}
                                            <br />
                                            Perfil: {objUsuario?.codPerfil.nombrePerfil}
                                            <br />
                                            Fecha creación:{" "}
                                            {obtenerFechaLocal(String(objUsuario?.fecha))}
                                            <br />
                                            Hora creación:{" "}
                                            {obtenerHora(String(objUsuario?.fecha))}
                                            <br />
                                            Nombre avatar: {objUsuario?.nombreImagenUsuario}
                                            <br />
                                            <img
                                            onError={({currentTarget})=>{
                                                currentTarget.onerror = null;
                                                currentTarget.src = noFoto;
                                            }}
                                             className="maximoTC" 
                                             src={objUsuario?.avatarUsuario} 
                                             alt="Profile" 
                                             />
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            onClick={() => regresar(-1)}
                                            className="btn btn-info btn-sm"
                                        >
                                            Regresar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Carga de Usuario en proceso...</div>
                )}
            </main>
        </>
    )
}