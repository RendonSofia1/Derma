
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

    const filteredData = allData.filter(item => item.clasificacion === 'Exfoliante');

    return filteredData;
}


const Limpiadores = async () => {
    try {
        const data = await getData();

        return (
            <div className={styles.main}>
                <div class="card" style={{ width: '100%', marginBottom: '20px', border: 'dashed 3px #366DB4' }}>
                    <div class="card-body" style={{ textAlign: 'center' }}>
                        <h5 class="card-title" style={{ backgroundColor: '#AFCAED', padding: '5px', marginBottom: '20px' }}>Exfoliantes</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary" >Limpieza de la piel</h6>
                        <p class="card-text" style={{ textAlign: 'justify' }} >Los exfoliantes son productos diseñados para eliminar las células muertas de la piel, revelando una piel más suave y renovada. Hay dos tipos principales de exfoliantes: los exfoliantes físicos, que contienen partículas pequeñas o granos para frotar y eliminar las células muertas, y los exfoliantes químicos, que utilizan ácidos o enzimas para disolver y desprender las células muertas de la piel. Estos productos ayudan a mejorar la textura de la piel, reducir los poros obstruidos y estimular la renovación celular. Es esencial elegir un exfoliante adecuado para el tipo de piel y usarlo con moderación, ya que el exceso de exfoliación puede causar irritación. Se recomienda incorporar la exfoliación en la rutina de cuidado de la piel una o dos veces por semana, dependiendo de la tolerancia de la piel y las necesidades individuales.</p>
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


