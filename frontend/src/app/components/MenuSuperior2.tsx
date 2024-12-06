import { Link, useNavigate } from 'react-router-dom'
import { useContext, MouseEvent, useState, useEffect } from 'react';
import { ContextoUsuario } from '../context/ContextoUsuario';
import perfilUsu from "../../assets/images/avatarDefault.png"
import { OcultarMenu } from '../utils/functions/OcultarMenu';
import '../../assets/css/navbar.css'

export const MenuSuperior2 = () => {
    const navegacion = useNavigate();
    const miUsuario = useContext(ContextoUsuario);
    const nombreUsuario = miUsuario?.autenticado.nombre;
    const [id, setId] = useState<string | undefined>(undefined); // 'undefined' es el estado inicial

    let avatarUsuario = String(localStorage.getItem("avatar"));
    
    // Verifica el token y actualiza el estado del 'id'
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
            const payloadBase64 = token.split('.')[1]; // Obtiene la parte del payload
            const decodedPayload = JSON.parse(atob(payloadBase64)); // Decodifica Base64 y convierte a JSON
            setId(decodedPayload.id); // Establece el 'id' en el estado
        } else {
            setId(undefined); // Si no hay token, restablece el 'id' a undefined
        }
    }, []); // Este useEffect solo se ejecuta una vez al montar el componente

    const cerrarSesion = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("token"); // Elimina el token del localStorage
        localStorage.removeItem("avatar"); // Elimina el avatar (si es necesario)
        setId(undefined); // Restablece el 'id' cuando se cierra sesión
        navegacion("/"); // Redirige a la página de inicio
    }

    return (
        <header className='header'>
            <div className='d-flex align-items-center justify-content-between'>
                <Link to="/dashboard" className='logo d-flex align-items-center'>
                    <div className='image'></div>
                    <h1 className='d-none d-lg-block'>Task</h1>
                </Link>
                <i onClick={OcultarMenu} className='fa-solid fa-bars toggle-sidebar-btn'></i>
            </div>

            <nav className='header-nav ms-auto'>
                <ul className='d-flex align-items-center'>
                    <li className='nav-item dropdown pe-3'>
                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            <img onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = perfilUsu }} src={avatarUsuario} alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2"></span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{nombreUsuario}</h6>
                                <span>{miUsuario?.autenticado.correo}</span>
                            </li>

                            <li>
                                <Link className="dropdown-item d-flex align-items-center" to="/dashboard/profile">
                                    <i className="fa-solid fa-user"></i>
                                    <span>Mi perfil</span>
                                </Link>
                            </li>

                            <li>
                                {/* Usamos el id solo cuando está disponible */}
                                {id && (
                                    <Link className="dropdown-item d-flex align-items-center" to={`profile-config/${id}`}>
                                        <i className="fa-solid fa-gear"></i>
                                        <span>Configuración</span>
                                    </Link>
                                )}
                            </li>

                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                    <i className="fa-solid fa-circle-question"></i>
                                    <span>¿Necesitas Ayuda?</span>
                                </a>
                            </li>

                            <li>
                                <Link className="dropdown-item d-flex align-items-center" to="/login" onClick={cerrarSesion}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <span>Cerrar Sesión</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
