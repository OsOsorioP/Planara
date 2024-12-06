import { useContext } from "react";
import { ContextoUsuario } from "../context/ContextoUsuario";
import { Link } from "react-router-dom";


export const Profile = () => {
    const miUsuario = useContext(ContextoUsuario);
    const nombreUsuario = miUsuario?.autenticado.nombre
    const correoUsuario = miUsuario?.autenticado.correo

    let avatarUsuario = String(localStorage.getItem("avatar"));

    return (
        <>
            <main className="main">
                <div className="pagetitle">
                    <h1>Perfil</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Inicio</Link></li>
                            <li className="breadcrumb-item active">Perfil</li>
                        </ol>
                    </nav>
                </div>

                <section className="profile">
                    <div className="row">
                        <div className="">
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                    <img onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = avatarUsuario }} src={avatarUsuario} alt="Profile" className="rounded-circle" width={100} />
                                    <h2>{nombreUsuario}</h2>
                                    <h3>{correoUsuario}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}