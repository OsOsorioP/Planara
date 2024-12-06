import { Link } from 'react-router-dom'
import '../../assets/css/navbar.css'
import { useContext } from 'react'
import { ContextoUsuario } from '../context/ContextoUsuario';

export const MenuSuperior = () => {

    const miUsuario = useContext(ContextoUsuario);
    const nombreUsuario = miUsuario?.autenticado
    let link = "";

    if (nombreUsuario) {
        link = "/dashboard"
    } else {
        link = "/login"
    }

    return (
        <>
            <header className='header'>

                <div className='d-flex align-items-center justify-content-between'>
                    <Link to="/dashboard" className='logo d-flex align-items-center'>
                        <div className='image'></div>
                        <h1 className='d-none d-lg-block'>Planara</h1>
                    </Link>
                </div>

                <div className='d-flex align-items-center links'>
                    <span><Link to="/" className='d-flex align-items-center px-3'>Inicio</Link></span>
                    <span><Link to="/dashboard" className='d-flex align-items-center px-3'>Sobre Nosotros</Link></span>
                    <span><Link to="/dashboard" className='d-flex align-items-center px-3'>Funcionamiento</Link></span>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className='d-flex align-items-center'>
                        <li className='nav-item'>
                            <span><i className="fa-solid fa-language"></i></span>
                        </li>
                        <li className='nav-item px-5'>
                            <span><i className="fa-solid fa-sun"></i></span>
                        </li>
                        <li className='nav-item'>
                            <span><Link to={link} className='nav-link'>
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </Link>
                            </span>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}