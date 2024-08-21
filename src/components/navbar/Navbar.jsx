"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faShoppingCart, faHeadset, faPersonShelter } from '@fortawesome/free-solid-svg-icons';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";

const Navbar = () => {
    const userIconRef = useRef(null);
    const divUsuarioRef = useRef(null);
    const [divUsuarioVisible, setDivUsuarioVisible] = useState(false);


    // Agrega un event listener para cerrar el div desplegable cuando se hace clic en cualquier parte del documento
    useEffect(() => {
        function handleDocumentClick(event) {
            if (divUsuarioVisible && userIconRef.current && divUsuarioRef.current) {
                if (
                    !userIconRef.current.contains(event.target) &&
                    !divUsuarioRef.current.contains(event.target)
                ) {
                    setDivUsuarioVisible(false);
                }
            }
        }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [divUsuarioVisible]);

    const session = useSession();

    const { data: userData, mutate, error: userError } = useSWR(
        session?.data?.user?.email ? `/api/users2/${session.data.user.email}` : null,
        async (url) => {
            const response = await axios.get(url);
            return response.data;
        }
    );

    const isAdmin = userData?.administrador;
    console.log("Valor de administrador:", isAdmin);

    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar" style={{ background: '#A5D8FF' }}>
            <div className="container">
                <Link href="/" legacyBehavior>
                    <a className="navbar-brand" style={{ fontFamily: 'Krona One, sans-serif' }}>DermaHealth</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} />
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">


                        <li className={`nav-item ${styles.customNavItem}`}>
                            <Link href="/limpiadores" legacyBehavior>
                                <a className={`nav-link ${styles.customNavLink}`}>Limpiadores Faciales</a>
                            </Link>
                        </li>
                        <li className={`nav-item ${styles.customNavItem}`}>
                            <Link href="/hidratantes" legacyBehavior>
                                <a className={`nav-link ${styles.customNavLink}`}>Hidratante</a>
                            </Link>
                        </li>
                        <li className={`nav-item ${styles.customNavItem}`}>
                            <Link href="/protectores" legacyBehavior>
                                <a className={`nav-link ${styles.customNavLink}`}>Protectores Solares</a>
                            </Link>
                        </li>
                        <li className={`nav-item ${styles.customNavItem}`}>
                            <Link href="/serums" legacyBehavior>
                                <a className={`nav-link ${styles.customNavLink}`}>Serums</a>
                            </Link>
                        </li>
                        <li className={`nav-item ${styles.customNavItem}`}>
                            <Link href="/exfoliantes" legacyBehavior>
                                <a className={`nav-link ${styles.customNavLink}`}>Exfoliantes</a>
                            </Link>
                        </li>

                        {session.status === "authenticated" && (
                            <>
                                {isAdmin && (
                                    <>
                                        <li className={`nav-item ${styles.customNavItem}`}>
                                            <Link href="/crud" legacyBehavior>
                                                <a className={`nav-link ${styles.customNavLink}`}>crud</a>
                                            </Link>
                                        </li>
                                        <li className={`nav-item ${styles.customNavItem}`}>
                                            <Link href="/crudUser" legacyBehavior>
                                                <a className={`nav-link ${styles.customNavLink}`}>Usuarios</a>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        )}


                        {session.status !== "authenticated" && (
                            <li className={`nav-item dropdown ${styles.customNavItem} `}>

                                <a className={`nav-link ${styles.customNavLink}`} id="userIcon"
                                    ref={userIconRef}
                                    onClick={() => setDivUsuarioVisible(!divUsuarioVisible)}>
                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '22px' }} />
                                </a>

                                <div className={`dropdown-content ${styles.customDrop}`} id="user-dropdown"
                                    ref={divUsuarioRef}
                                    style={{ display: divUsuarioVisible ? "block" : "none" }}>
                                    <Link href="/registro" legacyBehavior>
                                        <a>Registrarse</a>
                                    </Link>
                                    <Link href="/login" legacyBehavior>
                                        <a>Iniciar sesión</a>
                                    </Link>
                                </div>


                            </li>
                        )}

                        {session.status === "authenticated" && (
                            <li className={`nav-item dropdown ${styles.customNavItem} `}>

                                <a className={`nav-link ${styles.customNavLink}`} id="userIcon"
                                    ref={userIconRef}
                                    onClick={() => setDivUsuarioVisible(!divUsuarioVisible)}>
                                    <FontAwesomeIcon icon={faPersonShelter} style={{ fontSize: '22px' }} />
                                </a>

                                <div className={`dropdown-content ${styles.customDrop}`} id="user-dropdown"
                                    ref={divUsuarioRef}
                                    style={{ display: divUsuarioVisible ? "block" : "none" }}>
                                    <button className={styles.logout} onClick={signOut}>
                                        Logout
                                    </button>
                                </div>


                            </li>
                        )}



                        {session.status !== "authenticated" && (
                            <li className={`nav-item ${styles.customNavItem}`}>
                                <Link href="#" legacyBehavior>
                                    <a className={`nav-link ${styles.customNavLink}`}>
                                        <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '22px' }} />
                                    </a>
                                </Link>
                            </li>
                        )}
                        <li className={`nav-item ${styles.customNavItem}`}>
                            <Link href="/contacto" legacyBehavior>
                                <a className={`nav-link ${styles.customNavLink}`}>
                                    <FontAwesomeIcon icon={faHeadset} style={{ fontSize: '22px' }} />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};


export default Navbar;