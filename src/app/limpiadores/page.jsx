
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

    // Filtrar datos basados en el campo 'clasificacion' igual a 
    const filteredData = allData.filter(item => item.clasificacion === 'Limpiador');

    return filteredData;
}


const Limpiadores = async () => {
    try {
        const data = await getData();

        return (
            <div className={styles.main}>
                <div class="card" style={{ width: '100%', marginBottom: '20px', border:'dashed 3px #366DB4' }}>
                    <div class="card-body" style={{ textAlign: 'center' }}>
                        <h5 class="card-title" style={{backgroundColor: '#AFCAED', padding: '5px', marginBottom: '20px'}}>Limpiadores</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary" >Limpieza de la piel</h6>
                        <p class="card-text" style={{textAlign: 'justify'}} >Los limpiadores faciales son productos diseñados para limpiar la piel del rostro, eliminando impurezas, exceso de grasa, maquillaje y otras partículas que se acumulan a lo largo del día. Estos productos suelen contener ingredientes que ayudan a disolver la suciedad y el sebo, así como a mantener el equilibrio natural de la piel. Pueden venir en diversas formas, como geles, espumas, lociones o aceites, y están formulados para diferentes tipos de piel, desde seca hasta grasa. La limpieza facial regular con estos productos es parte fundamental de una rutina de cuidado de la piel para mantenerla saludable y prevenir problemas como el acné.</p>
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

export default Limpiadores;


