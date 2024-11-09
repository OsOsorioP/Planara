import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const cargando = (
    <div className="loader-background"><i className="loader fa-solid fa-spinner fa-spin-pulse"></i></div>
)

const LazyNoEncontrado = lazy(() => import('../../pages/shared/NoEncontrado') .then(module => ({ default: module.NoEncontrado })) )

const LazyAcercaDe = lazy(() => import('../../pages/shared/AcercaDe') .then(module => ({ default: module.AcercaDe })) )

const LazyDashboard = lazy(() => import('../../components/Dashboard') .then(module => ({ default: module.Dashboard })) )

const LazyProfile= lazy(() => import('../../components/Profile') .then(module => ({ default: module.Profile })) )

/* Profiles Lazy Ruteo */

const LazyPerfilListado = lazy(() => import('../../pages/private/profiles/PerfilListado') .then(module => ({ default: module.PerfilListado })) )

const LazyPerfilActual = lazy(() => import('../../pages/private/profiles/PerfilActual') .then(module => ({ default: module.PerfilActual })) )

const LazyPerfilAdmin = lazy(() => import('../../pages/private/profiles/PerfilAdmin') .then(module => ({ default: module.PerfilAdmin })) )

const LazyPerfilCrear = lazy(() => import('../../pages/private/profiles/PerfilCrear') .then(module => ({ default: module.PerfilCrear })) )

/* Users Lazy Ruteo */

const LazyUsuarioListado = lazy(() => import('../../pages/private/users/UsuarioListado') .then(module => ({ default: module.UsuarioListado })) )

const LazyUsuarioActual = lazy(() => import('../../pages/private/users/UsuarioActual') .then(module => ({ default: module.UsuarioActual })) )

const LazyUsuarioAdmin = lazy(() => import('../../pages/private/users/UsuarioAdmin') .then(module => ({ default: module.UsuarioAdmin })) )

const LazyUsuarioCrear = lazy(() => import('../../pages/private/users/UsuarioCrear') .then(module => ({ default: module.UsuarioCrear })) )

const LazyUsuarioDetalle = lazy(() => import('../../pages/private/users/UsuarioDetalle') .then(module => ({ default: module.UsuarioDetalle })) )

/* Tasks Lazy Ruteo */

const LazyTareaListado = lazy(() => import('../../pages/private/tasks/TareaListado') .then(module => ({ default: module.TareaListado })) )

const LazyTareaActual = lazy(() => import('../../pages/private/tasks/TareaActual') .then(module => ({ default: module.UsuarioActual })) )

const LazyTareaAdmin = lazy(() => import('../../pages/private/tasks/TareaAdmin') .then(module => ({ default: module.TareaAdmin })) )

const LazyTareaCrear = lazy(() => import('../../pages/private/tasks/TareaCrear') .then(module => ({ default: module.TareaCrear })) )

const LazyTareaDetalle = lazy(() => import('../../pages/private/tasks/TareaDetalle') .then(module => ({ default: module.TareaDetalle })) )




export const RuteoTablero = () => {
    return (
        <Suspense fallback={cargando}>
            <Routes>
                <Route path='/' element={<LazyDashboard />} />
                <Route path='/about' element={<LazyAcercaDe />} />
                <Route path='/profile' element={<LazyProfile />} />

                <Route path='/listprofiles' element={<LazyPerfilListado />} />
                <Route path='/updateprofile/:id' element={<LazyPerfilActual />} />
                <Route path='/admprofile' element={<LazyPerfilAdmin />} />
                <Route path='/addprofile' element={<LazyPerfilCrear />} />

                <Route path='/listuser' element={<LazyUsuarioListado />} />
                <Route path='/updateuser/:id' element={<LazyUsuarioActual />} />
                <Route path='/admuser' element={<LazyUsuarioAdmin />} />
                <Route path='/adduser' element={<LazyUsuarioCrear />} />
                <Route path='/detailuser/:id' element={<LazyUsuarioDetalle />} />

                <Route path='/listtask' element={<LazyTareaListado />} />
                <Route path='/addtask' element={<LazyTareaCrear />} />
                <Route path='/admtask' element={<LazyTareaAdmin />} />
                <Route path='/updatetask/:id' element={<LazyTareaActual />} />
                <Route path='/detailtask/:id' element={<LazyTareaDetalle />} />

                <Route path='*' element={<LazyNoEncontrado />} />
            </Routes>
        </Suspense>
    )
}