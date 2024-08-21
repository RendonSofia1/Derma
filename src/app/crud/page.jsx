
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";

const Crud = () => {

    const [updatedData, setUpdatedData] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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



    useEffect(() => {
        if (session.status === "loading") {
            // Puedes mostrar un mensaje de carga mientras se verifica la sesión
            return;
        }
    
        if (session.status === "unauthenticated") {
            // Redirige a la página de login si el usuario no está autenticado
            router?.push("/login");
        }
    
        if (session.status === "authenticated" && !isAdmin) {
            router?.push("/bienvenida"); // Puedes ajustar la ruta según tu estructura de carpetas
        }
    }, [session.status, router, isAdmin]);


    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, mutate, error, isLoading } = useSWR(
        `/api/posts`,
        fetcher
    );



    const handleSubmit = async (e) => {
        e.preventDefault();
        const nombre = e.target[0].value;
        const descripcion = e.target[1].value;
        const precio = e.target[2].value;
        const img = e.target[3].value;
        const clasificacion = e.target[4].value;

        try {
            await fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify({
                    nombre,
                    descripcion,
                    precio,
                    img,
                    clasificacion,
                    username: session.data.user.name,
                }),
            });
            mutate();
            e.target.reset()
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            mutate();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (post) => {
        console.log("Post:", post);
        setUpdatedData({
            nombre: post.nombre,
            descripcion: post.descripcion,
            precio: post.precio,
            img: post.img,
            clasificacion: post.clasificacion,
        });
        setSelectedPost(post); // Almacena el post seleccionado en el estado
        setIsModalVisible(true);
    };


    const handleUpdate = async (e, id) => {
        e.preventDefault();

        try {
            await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            setUpdatedData({});
            setIsModalVisible(false); // Cerrar el modal después de una actualización exitosa
            mutate(); // Actualizar la lista de posts
        } catch (err) {
            console.error("Error al actualizar el post:", err);
        }
    };


    

    return (
        <div className={styles.main}>
            {/* Modal de edición */}
            <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleUpdate(e, selectedPost._id)}>
                        {/* Campos de edición */}
                        <Form.Group controlId="formNombre">
                            <Form.Label className={styles.customLabel}>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedData.nombre}
                                onChange={(e) => setUpdatedData({ ...updatedData, nombre: e.target.value })}
                                className={styles.customInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescripcion">
                            <Form.Label className={styles.customLabel}>Descripción:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={updatedData.descripcion}
                                onChange={(e) => setUpdatedData({ ...updatedData, descripcion: e.target.value })}
                                className={styles.customInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrecio">
                            <Form.Label className={styles.customLabel}>Precio:</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedData.precio}
                                onChange={(e) => setUpdatedData({ ...updatedData, precio: e.target.value })}
                                className={styles.customInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formImg">
                            <Form.Label className={styles.customLabel}>URL imagen:</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedData.img}
                                onChange={(e) => setUpdatedData({ ...updatedData, img: e.target.value })}
                                className={styles.customInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formClasificacion">
                            <Form.Label className={styles.customLabel}>Clasificación:</Form.Label>
                            <Form.Control
                                as="select"
                                value={updatedData.clasificacion}
                                onChange={(e) => setUpdatedData({ ...updatedData, clasificacion: e.target.value })}
                                className={styles.customInput}
                            >
                                <option value="Limpiador">Limpiador</option>
                                <option value="Hidratante">Hidratante</option>
                                <option value="Protector Solar">Protector Solar</option>
                                <option value="Serum">Serum</option>
                                <option value="Exfoliante">Exfoliante</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className={styles.customButton}>
                            Guardar cambios
                        </Button>
                        <Button variant="secondary" onClick={() => setIsModalVisible(false)} className={styles.customButton}>
                            Cancelar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>




            <div>
                <fieldset>
                    <legend>Agregar Producto</legend>
                    <form id="pueblo-form" onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels}>Nombre</label>
                            </div>
                            <div className={styles.col75}>
                                <input type="text" id="nombre" className={styles.inputs} required />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels} >Descripcion</label>
                            </div>
                            <div className={styles.col75}>
                                <textarea id="descripcion" cols="60" rows="4" className={styles.inputs}
                                    placeholder="Escriba aqui la descripción del producto" required></textarea>

                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels}>Precio</label>
                            </div>
                            <div className={styles.col75}>
                                <input type="text" id="precio" className={styles.inputs} required />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels} >URL imagen</label>
                            </div>
                            <div className={styles.col75}>
                                <input name="url" id="URL" required type="text" className={styles.inputs}
                                    placeholder="Escriba el link de drive de la imagen a mostrar" />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels}>Tipo</label>
                            </div>
                            <div className={styles.col75} >
                                <select id="region" className={styles.inputs}>
                                    <option value="Limpiador">Limpiador</option>
                                    <option value="Hidratante">Hidratante</option>
                                    <option value="Protector Solar">Protector Solar</option>
                                    <option value="Serum">Serum</option>
                                    <option value="Exfoliante">Exfoliante</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col25}></div>
                            <div className={styles.colBtn}>
                                <input type="submit" name="Enviar" />
                            </div>
                        </div>
                    </form>
                </fieldset>
            </div>






            <div className={styles.cont}>
                {isLoading && <p>Loading...</p>}
                {!isLoading && data && data.length > 0 && (
                    <table className={styles.tabla}>
                        <thead className={styles.headTable}>
                            <tr>
                                <th scope="col">Acciones</th>
                                <th scope="col">Clasificación</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Imagen URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((post) => (
                                <tr key={post._id}>
                                    <td>
                                        <button className={styles.btnD} onClick={() => handleDelete(post._id)}>Eliminar</button>
                                        <button className={styles.btnE} onClick={() => handleEdit(post)}>Editar</button>
                                    </td>
                                    <td>
                                        <label className={styles.labelsTable}>{post.clasificacion}</label>
                                    </td>
                                    <td>
                                        <label className={styles.labelsTable}>{post.nombre}</label>
                                    </td>
                                    <td>
                                        <label className={styles.labelsTable}>{post.descripcion}</label>
                                    </td>
                                    <td>
                                        <label className={styles.labelsTable} style={{ width: '80px' }}>{post.precio}</label>
                                    </td>
                                    <td>
                                        <label className={styles.labelsTable}>{post.img}</label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!isLoading && data && data.length === 0 && <p>No hay datos disponibles.</p>}
                {error && <p>Error al cargar los datos.</p>}
            </div>



        </div>
    );
};

export default Crud;