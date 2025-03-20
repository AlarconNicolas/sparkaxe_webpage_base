import React, { useState } from "react";
import styles from "./Accordion.module.css";
import { Link } from "react-router-dom";
import LogoNic from "../../assets/Logo-Nic.png";
import LogoOral from "../../assets/Logo-Oral.png";

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isActive, setIsActive] = useState(false); // Veterinarias active state
    const [isActive1, setIsActive1] = useState(true); // Humanos active state, default true

    // Toggle Veterinarias and deactivate Humanos
    const toggleVets = () => {
        setIsActive(true); // Activate Veterinarias
        setIsActive1(false); // Deactivate Humanos
    };

    // Toggle Humanos and deactivate Veterinarias
    const toggleHumans = () => {
        setIsActive1(true); // Activate Humanos
        setIsActive(false); // Deactivate Veterinarias
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const pos = [
        {
            city: "Ciudad de Mexico",
            pos: [
                {
                    company: "NICLAUGER DE MÉXICO, S.A. DE C.V.",
                    address: "Mártires de Tacubaya 70, Col. Tacubaya. CDMX",
                    email: "info@niclauger.com.mx",
                    phone: "(55) 5687-7877",
                    whatsapp: "+52 1 (55) 2558-4773",
                },
                {
                    company: "Soltech Internacional",
                    address:
                        "Chimalcoyotl No.151, Col. Toriello Guerra, Tlalpan C.P 14050, Ciudad de México",
                    mail: "servicioalcliente@soltech.com.mx",
                    phone: "(55) 5528-3786",
                    whatsapp: "+52 1 (55) 2558-4773",
                },
            ],
        },
        {
            city: "Guanajuato",
            pos: [
                {
                    company: "Soltech Internacional",
                    address:
                        "Chimalcoyotl No.151, Col. Toriello Guerra, Tlalpan C.P 14050, Ciudad de México",
                    email: "servicioalcliente@soltech.com.mx",
                    phone: "(55) 5528-3786",
                    whatsapp: "+52 1 (55) 2558-4773",
                },
            ],
        },
        {
            city: "Veracruz",
            pos: [
                {
                    company: "Soltech Internacional",
                    address:
                        "Chimalcoyotl No.151, Col. Toriello Guerra, Tlalpan C.P 14050, Ciudad de México",
                    email: "servicioalcliente@soltech.com.mx",
                    phone: "(55) 5528-3786",
                    whatsapp: "+52 1 (55) 2558-4773",
                },
            ],
        },
    ];

    return (
        <div className={styles.States}>
            <div className={styles.logoOral}>
                <img src={LogoOral} alt="Logo Oralpeace" />
            </div>
            <h2 className={styles.heading}>
                Puntos de venta
                <span
                    className={`${styles.HeadingD1}  ${
                        isActive1 ? styles.active1 : ""
                    }`}
                >
                    {" "}
                    Sucursales
                </span>
                <span
                    className={`${styles.HeadingD2} ${
                        isActive ? styles.active : ""
                    }`}
                >
                    {" "}
                    Veterinarias
                </span>
            </h2>
            <div className={styles.POStypes}>
                <button
                    className={`${styles.buttonhumanos} ${
                        isActive1 ? styles.active1 : ""
                    }`}
                    onClick={toggleHumans}
                >
                    <i className="fa-solid fa-shop"></i> Humanos
                </button>
                <button
                    className={`${styles.buttonvets} ${
                        isActive ? styles.active : ""
                    }`}
                    onClick={toggleVets}
                >
                    <i className="fa-solid fa-paw"></i> Veterinarias
                </button>
            </div>
            <p className={styles.Link}>
                ¿Quieres ser distribuidor?{" "}
                <Link to="/posregister" className={styles.Link}>
                    Regístrate
                </Link>
            </p>
            <div className={styles.accordions}>
                {pos.map((state, index) => (
                    <>
                        <button
                            className={`${styles.accordion} ${
                                activeIndex === index ? styles.active : ""
                            }`}
                            onClick={(e) => {
                                toggleAccordion(index);
                            }}
                        >
                            {state.city}{" "}
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                        <div
                            className={`${styles.panel} ${
                                activeIndex === index
                                    ? styles["panel-active"]
                                    : ""
                            }`}
                        >
                            {state.pos.map((pos, index) => (
                                <>
                                    <div className={styles.pos}>
                                        <div className={styles["pos-content"]}>
                                            <div className={styles.POSmap}>
                                                <p>google maps</p>
                                                <p>{pos.address}</p>
                                            </div>
                                            <div
                                                className={styles.panelcontent}
                                            >
                                                <div className={styles.logo}>
                                                    <img
                                                        src={LogoNic}
                                                        alt="Logo Niclauger"
                                                        className={
                                                            styles.logoimg
                                                        }
                                                    />
                                                </div>

                                                <div className={styles.POSinfo}>
                                                    <h3>{pos.company}</h3>
                                                    <p>
                                                        <span>Dirección: </span>
                                                        {pos.address}
                                                    </p>
                                                    <a href="mailto:correo@gmail.com">
                                                        <span>Mail: </span>
                                                        {pos.email}
                                                    </a>
                                                    <a href="tel:+1234567890">
                                                        <span>Telefono: </span>
                                                        {pos.phone}
                                                    </a>
                                                    <a
                                                        href="https://wa.me/1234567890"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span>Whatsapp: </span>
                                                        {pos.whatsapp}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {state.pos.length > index + 1 && (
                                            <div className={styles.break}></div>
                                        )}
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default Accordion;
