"use client";

import React from "react";
import styles from "./page.module.css";
import {useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const Bienvenida = () => {

    const session = useSession();
    const router = useRouter();


    const { data: userData, error: userError } = useSWR(
        session?.data?.user?.email ? `/api/users2/${session.data.user.email}` : null,
        async (url) => {
            const response = await axios.get(url);
            return response.data;
        }
    );
    const isAdmin = userData?.administrador;
    const nombre = userData?.name;
    const mail = userData?.email;

    let puesto = "Usuario";
    if (isAdmin){
        puesto = "Administrador";
    }

    console.log(puesto);

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "unauthenticated") {
        router?.push("/login");
    }

    return (
        
        <div class="main">
            <section class="vh-100" style = {{backgroundColor: '#f4f5f7'}}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-lg-6 mb-4 mb-lg-0">
                            <div class="card mb-3" style= {{borderRadius: '.5rem'}}>
                                <div class="row g-0">
                                    <div class="col-md-4 gradient-custom text-center text-black"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src="https://images.pexels.com/photos/13037579/pexels-photo-13037579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                            alt="Avatar" class="img-fluid my-5" style={{width: '80px'}} />
                                        <h5>{nombre}</h5>
                                        <p>{puesto}</p>
                                        <i class="far fa-edit mb-5"></i>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body p-4">
                                            <h6>Información</h6>
                                            <hr class="mt-0 mb-4" />
                                            <div class="row pt-1">
                                                <div class="col-6 mb-4" style={{width: '80%'}}>
                                                    <h6>Email</h6>
                                                    <p class="text-muted">{mail}</p>
                                                </div>
                                                {/* <div class="col-6 mb-3">
                                                    <h6>Celular</h6>
                                                    <p class="text-muted">123 456 789</p>
                                                </div>
                                                <div class="col-6 mb-3">
                                                    <h6>Fecha de Nacimiento</h6>
                                                    <p class="text-muted">DD/MM/AAAA</p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default Bienvenida;