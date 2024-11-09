import { Link, useNavigate } from 'react-router-dom'
import { useContext, MouseEvent } from 'react';
import { ContextoUsuario } from '../context/ContextoUsuario';
import perfilUsu from "../../assets/images/avatarDefault.png"
import { OcultarMenu } from '../utils/functions/OcultarMenu';
import '../../assets/css/navbar.css'

export const MenuSuperior2 = () => {

    const navegacion = useNavigate();
    const miUsuario = useContext(ContextoUsuario);
    const nombreUsuario = miUsuario?.autenticado.nombre

    let avatarUsuario = String(localStorage.getItem("avatar"));

    const cerrarSesion = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        localStorage.removeItem("token");
        navegacion("/");
    }

    return (
        <>
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
                        <li className="nav-item dropdown">

                            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-bell"></i>
                                <span className="badge bg-primary badge-number">4</span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                <li className="dropdown-header">
                                    You have 4 new notifications
                                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-exclamation-circle text-warning"></i>
                                    <div>
                                        <h4>Lorem Ipsum</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>30 min. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-x-circle text-danger"></i>
                                    <div>
                                        <h4>Atque rerum nesciunt</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>1 hr. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-check-circle text-success"></i>
                                    <div>
                                        <h4>Sit rerum fuga</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>2 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-info-circle text-primary"></i>
                                    <div>
                                        <h4>Dicta reprehenderit</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>4 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="dropdown-footer">
                                    <a href="#">Show all notifications</a>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item dropdown">

                            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-message"></i>
                                <span className="badge bg-success badge-number">3</span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                <li className="dropdown-header">
                                    You have 3 new messages
                                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>Maria Hudson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>4 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>Anna Nelson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>6 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>David Muldon</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>8 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="dropdown-footer">
                                    <a href="#">Show all messages</a>
                                </li>

                            </ul>

                        </li>

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
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="fa-solid fa-gear"></i>
                                        <span>Configuración</span>
                                    </a>
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
        </>
    )
}