import Image from 'next/image';
import styles from './page.module.css';


export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.titulosCarrusel}>
        <div className={styles.tituloCar}>
          <h3>Productos Nuevos</h3>
        </div>
        <div className={styles.tituloCar}>
          <h3>Productos del Mes</h3>
        </div>
      </div>

      <div className={styles.contenedorCarrusel}>

        <div id="carouselExampleControls" className={`carousel slide ${styles.carousel1}`}
          data-bs-ride="carousel">
          <div className={`carousel-inner ${styles.carouselInner}`}>
            <div className={`carousel-item active ${styles.carouselItem}`}>
              <Image src={"/img1.jpg"}
                className="d-block w-100" width={400} height={400} />
            </div>
            <div className={`carousel-item ${styles.carouselItem}`}>
              <Image src={"/img2.jpg"}
                className="d-block w-100" width={400} height={400} />
            </div>
            <div className={`carousel-item ${styles.carouselItem}`}>
              <Image src={"/img3.jpg"}
                className="d-block w-100" width={400} height={400} />
            </div>
          </div>
          <button className="carousel-control-prev"
            type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next"
            type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" ariahidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


        <div id="carouselExampleControls2" className={`carousel slide ${styles.carousel2}`}
          data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className={`carousel-item active ${styles.carouselItem}`}>
              <Image src={"https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg"} className='d-block w-100' width={400} height={400} />
            </div>
            <div className={`carousel-item ${styles.carouselItem}`}>
            <Image src={"https://images.pexels.com/photos/2697786/pexels-photo-2697786.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                className="d-block w-100" width={400} height={400} />
            </div>
            <div className={`carousel-item ${styles.carouselItem}`}>
            <Image src={"/img3.jpg"}
                className="d-block w-100" width={400} height={400} />
            </div>
          </div>
          <button className="carousel-control-prev"
            type="button" data-bs-target="#carouselExampleControls2"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next"
            type="button" data-bs-target="#carouselExampleControls2"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className={styles.divFranja}>
        <h3>Favoritos</h3>
      </div>

      <div className={styles.productos}>
        <div className={styles.prod}>
          <Image src={"/prod1.jpg"} height={200} width={100} />
        </div>
        <div className={styles.prod}>
          <Image src={"/prod4.jpg"} height={200} width={100} />
        </div>
        <div className={styles.prod}>
          <Image src={"/prod3.jpg"} height={200} width={100} />
        </div>
        <div className={styles.prod}>
          <Image src={"/prod4.jpg"} height={200} width={100} />
        </div>
      </div>
    </div>
  )
}