import { MenuSuperior } from '../../components/MenuSuperior';
import { Hero } from '../../components/Hero';
import { Footer } from '../../components/Footer';

export const Inicio = () => {
    return (
        <>
            <MenuSuperior/>
            <main>
                <Hero />
            </main>
            <Footer/>
        </>
    )
}