
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Modal, Button, Form } from 'react-bootstrap';


const CrudUser = () => {

    const [updatedData, setUpdatedData] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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
        `/api/users`,
        fetcher
    );

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

    const handleDelete = async (id) => {
        try {
            //console.log("Deleting user with ID:", id);
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });
            console.log("Delete response:", response);
            mutate();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleEdit = (user) => {
        console.log("User:", user);
        setUpdatedData({
            name: user.name,
            email: user.email,
            administrador: user.administrador,
        });
        setSelectedUser(user);
        setIsModalVisible(true);
    };


    const handleUpdate = async (e, id) => {
        e.preventDefault();

        try {
            await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            setUpdatedData({});
            setIsModalVisible(false); // Cerrar el modal después de una actualización exitosa
            mutate();
        } catch (err) {
            console.error("Error al actualizar el usuario:", err);
        }
    };


    
    

    return (
        <div className={styles.main}>

            {/* Modal de edición */}
            <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleUpdate(e, selectedUser._id)}>
                        {/* Campos de edición */}
                        <Form.Group controlId="formNombre">
                            <Form.Label className={styles.customLabel}>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedData.name}
                                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                                className={styles.customInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrecio">
                            <Form.Label className={styles.customLabel}>Email:</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedData.email}
                                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                                className={styles.customInput}
                            />
                        </Form.Group>

                        <Form.Group controlId="formImg">
                            <Form.Label className={styles.customLabel}>Administrador:</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedData.administrador}
                                onChange={(e) => setUpdatedData({ ...updatedData, administrador: e.target.value })}
                                className={styles.customInput}
                            />
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
                    <legend>Agregar Usuario</legend>
                    <form id="pueblo-form" onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels}>Nombre</label>
                            </div>
                            <div className={styles.col75}>
                                <input
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    required
                                    className={styles.inputs}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels}>email</label>
                            </div>
                            <div className={styles.col75}>
                                <input
                                    type="text"
                                    placeholder="Correo electrónico"
                                    required
                                    className={styles.inputs}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col25}>
                                <label className={styles.labels} >Contraseña</label>
                            </div>
                            <div className={styles.col75}>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    required
                                    className={styles.inputs}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col25}></div>
                            <div className={styles.colBtn}>
                                <input type="submit" name="Enviar" />
                                {error && "Algo salió mal!"}
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
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Administrador</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <button className={styles.btnD} onClick={() => handleDelete(user._id)}>Eliminar</button>
                                        <button className={styles.btnE} onClick={() => handleEdit(user)}>Editar</button>
                                    </td>
                                    <td>
                                        <label className={styles.labelsTable}>{user.name}</label>
                                    </td>
                                    <td>
                                        <label className={styles.labelsTable}>{user.email}</label>
                                    </td>
                                    <td>
                                    <label className={styles.labelsTable}>{user.administrador.toString()}</label>
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

export default CrudUser;