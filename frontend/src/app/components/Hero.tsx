import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ContextoUsuario } from '../context/ContextoUsuario';

export const Hero = () => {

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
            <article className="container__hero">
                <section className='hero__1'>
                    <h1>task</h1>
                    <p>Gestionar tus tareas es emocionante</p>
                    <div>
                        <Link to={link}>
                            <button className="hero__button">
                                Empezar
                            </button>
                        </Link>
                    </div>
                </section>

                <section className='hero__2'>
                    <h1>otro anuncio aqui</h1>
                    <p>Gestionar tus tareas es emocionante</p>
                    <div>
                        <Link to='/register'>
                            <button className="hero__button">
                                Empezar
                            </button>
                        </Link>
                    </div>
                </section>

                <section className='hero__3'>
                    <h1>ultimo anuncio aqui</h1>
                    <p>Gestionar tus tareas es emocionante</p>
                    <div>
                        <Link to='/register'>
                            <button className="hero__button">
                                Empezar
                            </button>
                        </Link>
                    </div>
                </section>
            </article>
        </>
    )
}