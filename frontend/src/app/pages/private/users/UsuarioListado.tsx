import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import Usuario from "../../../models/Usuario"
import Api from "../../../utils/domains/Api"
import ServicioPrivado from "../../../services/ServicioPrivado"
import { obtenerFechaLocal, obtenerHora } from "../../../utils/functions/FormatoFecha"

export const UsuarioListado = () => {
    const [arregloUsuarios, setArregloUsuarios] = useState<Usuario[]>([]);

    const obtenerUsuarios = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.USUARIOS_OBTENER);
        setArregloUsuarios(resultado);
    }

    useEffect(() => {
        obtenerUsuarios();
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
                            <li className="breadcrumb-item active">Listado de Usuarios</li>
                        </ol>
                    </nav>
                </div>
                <section className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Orden</th>
                                        <th style={{ width: "34%" }}>Nombre Usuario</th>
                                        <th style={{ width: "20%" }}>Creación</th>
                                        <th className="text-center" style={{ width: "20%" }}>Perfil</th>
                                        <th style={{ width: "6%" }}> </th>
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
                                                {obtenerFechaLocal(String(usuario.fecha))}
                                                <br />
                                                <small className="align-muted">
                                                    {obtenerHora(String(usuario.fecha))}
                                                </small>
                                            </td>
                                            <td className="text-center">
                                                {usuario.codPerfil.nombrePerfil}
                                            </td>
                                            <td className="text-center align-middle">
                                                <Link to={"/dashboard/detailuser/" + usuario._id}>
                                                    <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}