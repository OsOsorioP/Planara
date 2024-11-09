import { useContext } from "react";
import { ContextoUsuario } from "../context/ContextoUsuario";


export const Profile = () => {
    const miUsuario = useContext(ContextoUsuario);
    const nombreUsuario = miUsuario?.autenticado.nombre

    let avatarUsuario = String(localStorage.getItem("avatar"));
    
    return (
        <>
            <main className="main">
                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Inicio</a></li>
                            <li className="breadcrumb-item active">Perfil</li>
                        </ol>
                    </nav>
                </div>

                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-4">

                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                <img onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = avatarUsuario }} src={avatarUsuario} alt="Profile" className="rounded-circle" />
                                    <h2>{nombreUsuario}</h2>
                                    <h3>Web Designer</h3>
                                    <div className="social-links mt-2">
                                        <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-xl-8">

                            <div className="card">
                                <div className="card-body pt-3">

                                    <ul className="nav nav-tabs nav-tabs-bordered" role="tablist">

                                       

                                    </ul>
                                    <div className="tab-content pt-2">

                                        <div className="tab-pane fade show active profile-overview" id="profile-overview" role="tabpanel">
                                            <h5 className="card-title">About</h5>
                                            <p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p>

                                            <h5 className="card-title">Profile Details</h5>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                <div className="col-lg-9 col-md-8">Kevin Anderson</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Company</div>
                                                <div className="col-lg-9 col-md-8">Lueilwitz, Wisoky and Leuschke</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Job</div>
                                                <div className="col-lg-9 col-md-8">Web Designer</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Country</div>
                                                <div className="col-lg-9 col-md-8">USA</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Address</div>
                                                <div className="col-lg-9 col-md-8">A108 Adam Street, New York, NY 535022</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Phone</div>
                                                <div className="col-lg-9 col-md-8">(436) 486-3538 x29071</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">k.anderson@example.com</div>
                                            </div>

                                        </div>

                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit" role="tabpanel">

                                            

                                        </div>

                                        <div className="tab-pane fade pt-3" id="profile-settings" role="tabpanel">


                                            

                                        </div>

                                        <div className="tab-pane fade pt-3" id="profile-change-password" role="tabpanel">
                                        
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}