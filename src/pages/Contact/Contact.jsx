import { useState, useEffect } from "react";

import clientAxios from "../../config/clientAxios.jsx";

// *********************** helpers ***********************
import generateHash from "../../helpers/generateHash.js";
import encryptWord from "../../helpers/encryptWord.js";

// ******************** hooks ********************
import useApp from "../../hooks/useApp";

// ******************* images *******************
import ImageOral from "../../assets/ContactOral.png";

// ******************** styles ********************
import styles from "./Contact.module.css";

function Contact() {
    const { auth, setAlert } = useApp();
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
    });

    useEffect(() => {
        const setInfo = () => {
            setFormData({
                name: auth.name ? auth.name : "",
                lastname: auth.lastname ? auth.lastname : "",
                email: auth.email ? auth.email : "",
                phone: auth.phone ? auth.phone : "",
                message: "",
            });
        };
        setInfo();
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.name || !formData.lastname || !formData.email || !formData.message) {
            setAlert({message: "Debes llenar todos los campos obligatorios", type: "error"});
            return;
        }
        const token = localStorage.getItem("token");
        const hash = generateHash();
        const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
        const config = {
            headers: {
                "Content-Type": "application/json",
                'x-client-hash': `${hash}`,
                'x-client-website': `${encryptedName}`,
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const response = await clientAxios.post("/api/contacts", formData, config);
            setAlert({message: 'Mensaje enviado correctamente', type: "success"});
            setFormData({
                name: auth.name ? auth.name : "",
                lastname: auth.lastname ? auth.lastname : "",
                email: auth.email ? auth.email : "",
                phone: auth.phone ? auth.phone : "",
                message: "",
            });
        } catch (error) {
            console.log(error);
            setAlert({message: 'Hubo un error al enviar el mensaje', type: "error"});
        }
    };

    return (
        <div className={styles.contactContainer}>
            <h2 className={styles.heading}>Contacto</h2>
            <div className={styles.contentWrapper}>
                <div className={styles.contactImage}>
                    <img src={ImageOral} alt="Contact Image" />
                </div>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="name" className={styles.required}>
                            Nombre
                        </label>
                        {auth.name ? (
                            <p className={styles["p-disabled-input"]}>
                                {auth.name}
                            </p>
                        ) : (
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Ingrese su nombre"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="lastname" className={styles.required}>
                            Apellido(s)
                        </label>
                        {auth.lastname ? (
                            <p className={styles["p-disabled-input"]}>
                                {auth.lastname}
                            </p>
                        ) : (
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Ingrese su apellido"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <div className={styles["grid-2"]}>
                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.required}>
                                Email
                            </label>
                            {auth.name ? (
                                <p className={styles["p-disabled-input"]}>
                                    {auth.email}
                                </p>
                            ) : (
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Ingrese su email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="phone">Teléfono</label>
                            {auth.phone ? (
                                <p className={styles["p-disabled-input"]}>
                                    {auth.phone}
                                </p>
                            ) : (
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="Ingrese su número de teléfono"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="message" className={styles.required}>
                            Mensaje
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Ingrese su mensaje"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
