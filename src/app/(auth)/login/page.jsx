"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = ({ url }) => {
 

    const session = useSession();
    const router = useRouter();
    const params = useSearchParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    useEffect(() => {
        setError(params.get("error"));
        setSuccess(params.get("success"));
    }, [params]);

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "authenticated") {
        router?.push("/bienvenida");
    }

    if (session.status === "unauthenticated") {
        router?.push("/login");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        signIn("credentials", {
            email,
            password,
        });
    };


    return (
        <section className="vh-100">
            < div class=" container py-5 h-100" >
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-xl-10">
                        <div class="card" style={{ borderRadius: '1rem' }}>
                            <div class="row g-0">
                                <div class="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                                        alt="login form" class="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div class="card-body p-4 p-lg-5 text-black">

                                        <form id="loginForm" onSubmit={handleSubmit}>

                                            <div class="d-flex align-items-center mb-3 pb-1">
                                                <i class="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span class="h1 fw-bold mb-0">DermaHealth</span>
                                            </div>

                                            <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Ingresa a tu cuenta
                                            </h5>

                                            <div class="form-outline mb-4">
                                                <input type="text" id="usernameLogin" class="form-control form-control-lg" />
                                                <label class="form-label" for="usernameLogin">Correo de Usuario</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="password" id="pass" class="form-control form-control-lg" />
                                                <label class="form-label" for="pass" required>Contraseña</label>
                                            </div>

                                            <div class="pt-1 mb-4">
                                                <button class="btn btn-dark btn-lg btn-block" >Ingresar</button>
                                                {error && error}
                                            </div>

                                            <p class="mb-5 pb-lg-2" style={{ color: '#393f81' }}>¿No tienes una cuenta? <a
                                                href="/registro" style={{ color: '#393f81' }}>Registrate aquí</a></p>
                                            <a href="#!" class="small text-muted">Terminos de uso.</a>
                                            <a href="#!" class="small text-muted">Politica de privacidad</a>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
};

export default Login;