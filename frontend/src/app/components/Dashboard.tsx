import { useContext, useEffect, useRef } from 'react';
import { ContextoUsuario } from '../context/ContextoUsuario';
import Chart from 'chart.js/auto';

export const Dashboard = () => {
    const miUsuario = useContext(ContextoUsuario);
    const correoUsuario = miUsuario?.autenticado?.nombre;

    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    useEffect(() => {
        const barChartElement = document.getElementById('barChart');
        const pieChartElement = document.getElementById('pieChart');

        if (barChartElement && pieChartElement) {
            const barCtx = (barChartElement as HTMLCanvasElement).getContext('2d');
            const pieCtx = (pieChartElement as HTMLCanvasElement).getContext('2d');

            if (barCtx && pieCtx) {
                // Destruir gráficos existentes antes de crear nuevos
                if (barChartRef.current) {
                    barChartRef.current.destroy();
                }
                if (pieChartRef.current) {
                    pieChartRef.current.destroy();
                }

                barChartRef.current = new Chart(barCtx, {
                    type: 'bar',
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [{
                            label: 'Pendientes',
                            data: [65, 59, 80, 81, 56, 55, 40, 200,300,700],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                            ],
                            borderWidth: 2
                        },{
                            label:"Completadas",
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgb(255, 159, 64)',
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                pieChartRef.current = new Chart(pieCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Red', 'Blue', 'Yellow'],
                        datasets: [{
                            label: 'My First Dataset',
                            data: [300, 50, 100],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }]
                    }
                });
            }
        }

        // Cleanup function to destroy charts on component unmount
        return () => {
            if (barChartRef.current) {
                barChartRef.current.destroy();
            }
            if (pieChartRef.current) {
                pieChartRef.current.destroy();
            }
        };
    }, []);

    return (
        <main className="main">
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/dashboard">Inicio</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
            </div>
            <h1>¡Bienvenido {correoUsuario}!</h1>

            <section className='section'>
                <div className="grafica">
                    <div>
                    <h5 className="">Bar Chart</h5>
                    <canvas id="barChart"></canvas>
                    </div>
                </div>

                <div className="grafica">
                    <div>
                        <h5 className="">Pie Chart</h5>
                        <canvas id="pieChart" className='pieChart'></canvas>
                    </div>
                </div>
            </section>

        </main>
    );
};
