import '../../assets/css/footer.css'

export const Footer = () => {
    return (
        <>
            <footer className='main__footer'>
                <h2>Planara</h2>
                <div className="footer__icons">
                    <a href="/#"><i className="fa-brands fa-facebook"></i></a>
                    <a href="/#"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="/#"><i className="fa-brands fa-youtube"></i></a>
                    <a href="/#"><i className="fa-brands fa-instagram"></i></a>
                </div>
                <div className='footer__links'>
                    <a href="/#">Contacto</a>
                    <a href="/#">Ayuda</a>
                    <a href="/#">Política de Privacidad</a>
                    <a href="/#">Términos de Servicio</a>
                </div>
            </footer>
        </>
    )
}