"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const administrador = false;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          administrador,
          password,
        }),
      });
      res.status === 201 && router.push("/login?success=La cuenta ha sido creada");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear una cuenta</h1>
      <h2 className={styles.subtitle}>Porfavor registrar para ingresar al dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Correo electrónico"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          className={styles.input}
        />
        <button className={styles.button}>Registrar</button>
        {error && "Algo salió mal!"}
      </form>
      <span className={styles.or}>- ¿Ya tienes cuenta? -</span>
      <Link className={styles.link} href="/login">
        Ingresa con cuenta existente.
      </Link>
    </div>
  );
};

export default Register;
