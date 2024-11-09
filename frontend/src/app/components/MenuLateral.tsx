import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ContextoUsuario } from '../context/ContextoUsuario'

import { opcionesAdmin, opcionesUsuario } from '../utils/domains/OpcionesSistema'

export const MenuLateral = () => {
    let opciones: any[] = [];
    const miUsuario = useContext(ContextoUsuario);
    const nombrePerfil = miUsuario?.autenticado?.nombrePerfil;

    switch (nombrePerfil) {
        case "Administrador":
            opciones = opcionesAdmin;
            break;
        case "Usuario":
            opciones = opcionesUsuario;
            break;
        default:
            console.log("No hay menú...");
            break;
    }

    return (
        <>
            <aside className='sidebar'>
                <div className='rol'>
                    <span className='fs-5 fw-semibold'>{nombrePerfil}</span>
                </div>

                <ul className='sidebar-nav'>
                    {opciones.map((opcion, indice) => (
                        opcion.hijos.length ? (
                            <li
                                className='nav-item'
                                key={"li" + indice}
                            >
                                <Link
                                    className='nav-link collapsed'
                                    to={opcion.link}
                                    data-bs-toggle="collapsed"
                                    data-bs-target="#components-nav"
                                >
                                    <i className={opcion.icono}></i>
                                    <span>{opcion.nombre}</span>
                                    <i className='fa-solid fa-caret-down ms-auto'></i>
                                </Link>
                                <ul id="components-nav" className='nav-content collapsed' data-bs-parent="sidebar-nav">
                                    {opcion.hijos.map((hijo: any, subIndice: number) => (
                                        <li className='nav-item' key={"sub" + subIndice}>
                                            <Link
                                                to={hijo.ruta}
                                                className='nav-link'
                                            >
                                                <i className={hijo.icono}></i>
                                                <span>{hijo.nombre}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ) : (
                            <li className='nav-item' key={indice}>
                                <Link to={opcion.ruta} className='nav-link'>
                                    <i className={opcion.icono}></i>
                                    <span>{opcion.nombre}</span>
                                </Link>
                            </li>
                        )
                    ))}
                </ul>
            </aside>
        </>
    )
}