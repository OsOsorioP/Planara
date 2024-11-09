import { useState, useEffect } from "react";

import Perfil from "../../../models/Perfil";
import Api from "../../../utils/domains/Api";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { Link } from "react-router-dom";

export const PerfilListado = () => {
    const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);

    const obtenerPerfiles = async () => {
        const resultado = await ServicioPrivado.peticionGET(Api.PERFILES_OBTENER);
        setArregloPerfiles(resultado);
        return resultado;
    };

    useEffect(() => {
        obtenerPerfiles();
    }, []);

    return (
        <main className="main">
            <div className="pagetitle">
                <h1>Perfiles</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/dashboard">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item active">Listado de Perfiles</li>
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
                                    <th style={{ width: "60%" }}>Nombre Perfil</th>
                                    <th className="text-center" style={{ width: "20%" }}>Usuarios</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arregloPerfiles.map((perfil, indice)=>(
                                    <tr key={indice}>
                                        <td>{indice + 1}</td>
                                        <td>{perfil.nombrePerfil}</td>
                                        <td className="text-center">{perfil.cantUsuario}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )
};