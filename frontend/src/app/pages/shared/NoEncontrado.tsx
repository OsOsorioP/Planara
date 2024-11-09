import { useNavigate } from 'react-router-dom'

export const NoEncontrado = () => {
    const back = useNavigate();
    return (
        <>
            <main className='main__notfound'>
                <section className='notfound'>
                    <h1>404</h1>
                    <h2>
                        El recurso que está solicitando <strong>NO</strong> existe
                    </h2>
                    <button className='notfound__button' onClick={() => back(-1)} >
                        Regresar
                    </button>
                    <img src="" alt="" />
                </section>
            </main>
        </>
    )
}