
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

    const filteredData = allData.filter(item => item.clasificacion === 'Serum');

    return filteredData;
}


const Limpiadores = async () => {
    try {
        const data = await getData();

        return (
            <div className={styles.main}>
                <div class="card" style={{ width: '100%', marginBottom: '20px', border:'dashed 3px #366DB4' }}>
                    <div class="card-body" style={{ textAlign: 'center' }}>
                        <h5 class="card-title" style={{backgroundColor: '#AFCAED', padding: '5px', marginBottom: '20px'}}>Serums</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary" >Cuidado de la piel</h6>
                        <p class="card-text" style={{textAlign: 'justify'}} >Los sueros, también conocidos como serums, son productos de cuidado de la piel altamente concentrados y de textura ligera que contienen ingredientes activos diseñados para abordar problemas específicos de la piel. Estos productos suelen tener una formulación más potente que otros productos para el cuidado de la piel, ya que están destinados a ofrecer beneficios específicos, como la reducción de arrugas, la luminosidad de la piel o la hidratación profunda. Los sueros generalmente se aplican antes de la crema hidratante en la rutina de cuidado facial, permitiendo que los ingredientes activos penetren más profundamente en la piel. Algunos ingredientes comunes en los sueros incluyen ácido hialurónico, vitamina C, retinol y péptidos, cada uno dirigido a objetivos particulares para lograr una piel más saludable y revitalizada. Su inclusión en la rutina diaria puede potenciar los resultados generales del cuidado de la piel.</p>
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


