import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Vigilante } from '../../context/Vigilante';
import UsuarioSesion from '../../context/UsuarioSesion';

const LazyHomePage = lazy(() => import('../../pages/public/Inicio') .then(module => ({ default: module.Inicio })) );

const LazyLoginPage = lazy(() => import('../../pages/public/IniciaSesion') .then(module => ({ default: module.IniciaSesion })) );

const LazyRegisterPage = lazy(() => import('../../pages/public/RegistroSesion') .then(module => ({ default: module.RegistroSesion })) );

const LazyNoEncontrado = lazy(() => import('../../pages/shared/NoEncontrado') .then(module => ({ default: module.NoEncontrado })) );

const LazyTableroPrincipal = lazy(() => import('../../components/TableroPrincipal') .then(module => ({ default: module.TableroPrincipal })) );

export const RuteoCompleto = () => {
    return (
        <UsuarioSesion>
            <Routes>
                <Route path='/' element={<LazyHomePage />} />
                <Route path='/login' element={<LazyLoginPage />} />
                <Route path='/register' element={<LazyRegisterPage />} />

                <Route element={<Vigilante />}>
                    <Route path='/dashboard/*' element={<LazyTableroPrincipal />} />
                </Route>

                <Route path='*' element={<LazyNoEncontrado />} />
            </Routes>
        </UsuarioSesion>
    )
}
