import { useContext } from 'react';
import { ContextoUsuario } from '../context/ContextoUsuario';
import createTask from "../../assets/images/create-task.png"
import formTask from "../../assets/images/form-task.png"
import viewTask from "../../assets/images/view-task.png"
import Task from "../../assets/images/task.png"

export const Dashboard = () => {
    const miUsuario = useContext(ContextoUsuario);
    const correoUsuario = miUsuario?.autenticado?.nombre;

    return (
        <main className="main">
            <div className="pagetitle">
                <h1>Panel</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/dashboard">Inicio</a></li>
                        <li className="breadcrumb-item active">Panel</li>
                    </ol>
                </nav>
            </div>

            <section className='section'>
                <h1 className='title'>¡Bienvenido {correoUsuario}!</h1>

                <h2 className='subtitle'>¿Cómo crear mi primera tarea?</h2>
                <div>
                    <p>1. Ve al apartado de tareas, en el menú lateras de tu izquierda.</p>
                    <p>2. Al entrar encontraras el siguiente botón, da click en el.</p>
                    <img src={createTask} alt="" />
                    <p>3. Te encontras con el siguiente formulario:</p>
                    <img src={formTask} alt="" width={660}/>
                    <p>4. Llena el formulario con los datos requeridos.</p>
                    <p>5. Luego dale en el botón crear tarea.</p>
                    <h5>¡Felicidades haz creado tu primera tarea!</h5>
                    <p>Lo siguiente es visualizar la tarea, sencillamente ve al panel de tareas y haz click sobre esta.</p>
                    <img src={Task} alt="" />
                    <p>Se visualizará lo siguiente:</p>
                    <img src={viewTask} alt="" />
                    <p>Sería todo lo necesario para crear tus tareas, ahora organizate y pon en marcha tus tareas.</p>
                </div>
            </section>

        </main>
    );
};
