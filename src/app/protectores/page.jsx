
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";


async function getData() {
    const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Error al solicitar datos");
    }

    const allData = await res.json();

    // Filtrar datos basados en el campo 'clasificacion' igual a '1'
    const filteredData = allData.filter(item => item.clasificacion === 'Protector Solar');

    return filteredData;
}


const Protectores = async () => {
    try {
        const data = await getData();

        return (
            <div className={styles.main}>

                <div class="card" style={{ width: '100%', marginBottom: '20px', border: 'dashed 3px #366DB4' }}>
                    <div class="card-body" style={{ textAlign: 'center' }}>
                        <h5 class="card-title" style={{ backgroundColor: '#AFCAED', padding: '5px', marginBottom: '20px' }}>Protectores Solares</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary" >Cuidado Facial</h6>
                        <p class="card-text" style={{ textAlign: 'justify' }} >Los protectores solares son productos diseñados para proteger la piel contra los daños causados por la radiación ultravioleta (UV) del sol. Están formulados para prevenir quemaduras solares, envejecimiento prematuro de la piel y reducir el riesgo de cáncer de piel. Hay dos tipos principales de rayos UV: UVA y UVB, y los protectores solares suelen ser de amplio espectro para abordar ambos.</p>
                        {/* <button type="button" class="btn btn-outline-primary">Info</button> */}
                    </div>
                </div>
                {data.map((item) => (
                    <div key={item._id} className="card cd-sub d-flex flex-sm-row flex-column" style={{ width: '100%', marginBottom: '5px' }} >
                        <img src={item.img} className="card-img-top img-fluid" style={{ width: '300px', height: '210px' }} alt="..." />
                        <div className="card-body">
                            <p style={{fontWeight: 'bold', fontSize: '16px'}}>{item.nombre}</p>
                            <p className="card-text-sub">{item.descripcion}</p>
                            <div className={styles.precios}>
                                <label className={styles.labelPrecios}>${item.precio}</label>
                            </div>
                            <a href="#" className="btn btn-warning btn-sub">Agregar al carrito</a>
                        </div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error(error);
        // Manejar el error, puedes mostrar un mensaje de error en tu interfaz de usuario
        return <div>Error al cargar los datos.</div>;
    }
};

export default Protectores;


