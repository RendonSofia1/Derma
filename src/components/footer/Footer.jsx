"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFacebook, faTwitter, faWhatsapp, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'; 
import Link from 'next/link';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={`bg-light text-center text-black ${styles.customFooter}`}>
      <div className="container p-4 pb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <section className="mb-4" style={{ margin: '0 !important' }}>
          <label style={{ fontFamily: 'Krona One, sans-serif', fontSize: '12px' }}>Encuéntranos en:</label>
          <a className={`btn btn-outline-dark btn-floating m-1 ${styles.socialIcon}`} href="#!">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a className={`btn btn-outline-dark btn-floating m-1 ${styles.socialIcon}`} href="#!">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a className={`btn btn-outline-dark btn-floating m-1 ${styles.socialIcon}`} href="#!">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a className={`btn btn-outline-dark btn-floating m-1 ${styles.socialIcon}`} href="#!">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a className={`btn btn-outline-dark btn-floating m-1 ${styles.socialIcon}`} href="#!">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <label style={{ fontWeight: 'bold', fontSize: '12px' }}>© 2023 Copyright</label>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
