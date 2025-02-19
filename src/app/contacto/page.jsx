"use client";

import React from "react";
import styles from "./page.module.css";
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Contacto = () => {


    return (
        <div className={styles.contenedor}>
            <section class="mb-4">
                <h2 class="h1-responsive font-weight-bold text-center my-4">Contáctanos</h2>
                <p class="text-center w-responsive mx-auto mb-5">¿Tienes alguna pregunta? Nuestro equipo te contestará
                    lo mas pronto posible.
                </p>

                <div class="row">
                    <div class="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                            <div class="row">

                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="name" name="name" class="form-control" />
                                        <label for="name" class="">Nombre</label>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="email" name="email" class="form-control" />
                                        <label for="email" class="">Email</label>
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="subject" name="subject" class="form-control" />
                                        <label for="subject" class="">Asunto</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">

                                <div class="col-md-12">

                                    <div class="md-form">
                                        <textarea type="text" id="message" name="message" rows="2"
                                            class="form-control md-textarea"></textarea>
                                        <label for="message">Mensaje</label>
                                    </div>

                                </div>
                            </div>

                        </form>

                        <div class="text-center text-md-left">
                            <a class="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Send</a>
                        </div>
                        <div class="status"></div>
                    </div>

                    <div class="col-md-3 text-center">
                        <ul class="list-unstyled mb-0">
                            <li>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                                <p>San Francisco, CA 94126, USA</p>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} size="2x" />
                                <p>+ 01 234 567 89</p>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                                <p>dermaH@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>

        
    );
};

export default Contacto;