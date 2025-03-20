import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LogoOral from "../../assets/Logo-Therbal.png";
import useApp from "../../hooks/useApp";
import styles from "./Accordion.module.css";
import Skeleton from "@mui/material/Skeleton";

const Accordion = () => {
    const { pos, loading } = useApp();
    const [activeIndex, setActiveIndex] = useState(null);
    const [posCategory, setPosCategory] = useState("Humanos");
    const [animateCategory, setAnimateCategory] = useState(false);

    const toggleCategory = (category) => {
        if (category !== posCategory) {
            setAnimateCategory(true); // Activate animation
            setTimeout(() => {
                setPosCategory(category);
                setAnimateCategory(false); // Deactivate animation after the change
            }, 300);
        }
        toggleAccordion(null);
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const posFiltered = pos
        .map((cityObj) => {
            const filteredPos = cityObj.pos.filter(
                (posEntry) => posEntry?.pos_category?.name === posCategory
            );
            return filteredPos.length > 0
                ? { city: cityObj.city, pos: filteredPos }
                : null;
        })
        .filter((cityObj) => cityObj);

    return (
        <div
            className={`${styles.States} ${animateCategory ? styles.animate : ""}`}
        >
            <div className={styles.logoOral}>
                <img src={LogoOral} alt="Logo Oralpeace" />
            </div>
            {/* Render the dog bone when Mascotas is active */}
            {posCategory === "Mascotas" && (
    <i className={`fa-solid fa-bone ${styles.boneIcon}`}></i>
)}
 {posCategory === "Humanos" && (
    <i className={`fa-solid fa-user ${styles.boneIcon}`}></i>
)}

            <h2 className={styles.heading}>
                Puntos de venta:{" "}
                <span
                    className={`${styles.HeadingD1} ${
                        posCategory === "Humanos" ? styles.active1 : ""
                    }`}
                >
                    Sucursales
                </span>
                <span
                    className={`${styles.HeadingD2} ${
                        posCategory === "Mascotas" ? styles.active : ""
                    }`}
                >
                    Mascotas
                </span>
            </h2>
            <div className={styles.POStypes}>
                <button
                    className={`${styles.buttonhumanos} ${
                        posCategory === "Humanos" ? styles.active1 : ""
                    }`}
                    onClick={() => toggleCategory("Humanos")}
                >
                    <i className="fa-solid fa-shop"></i> Humanos
                </button>
                <button
                    className={`${styles.buttonvets} ${
                        posCategory === "Mascotas" ? styles.active : ""
                    }`}
                    onClick={() => toggleCategory("Mascotas")}
                >
                    <i className="fa-solid fa-paw"></i> Mascotas
                </button>
            </div>
            <p className={styles.Link}>
                ¿Quieres ser distribuidor?{" "}
                <Link to="/contact" className={styles.Link}>
                    Contáctanos
                </Link>
            </p>
            {loading ? (
                [1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} variant="rounded" width={'100%'} height={48} style={{marginBottom: '1rem'}} />
                ))
            ) : posFiltered.map((state, index) => (
                <Fragment key={index}>
                    <button
                        className={`${styles.accordion} ${activeIndex === index ? styles.active : ""}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        {state.city} <i className="fa-solid fa-caret-down"></i>
                    </button>
                    <div className={`${styles.panel} ${activeIndex === index ? styles["panel-active"] : ""}`}>
                        {state.pos.map((pos, idx) => (
                            <div className={styles.pos} key={idx}>
                                <div className={styles["pos-content"]}>
                                    <div className={styles.POSmap}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            referrerPolicy="no-referrer-when-downgrade"
                                            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&q=${pos.address}&zoom=15&center=${pos.latitude},${pos.longitude}`}
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                    <div className={styles.panelcontent}>
                                        <div className={styles.logo}>
                                            <img
                                                src={`${pos.image}`}
                                                alt={`${pos.name} Product`}
                                            />
                                        </div>
                                        <div className={styles.POSinfo}>
                                            <h3>{pos.name}</h3>
                                            <a 
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pos.address)}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <span>Ubicación: </span>
                                            {pos.address}
                                        </a>
                                            <a href={`mailto:${pos.email}`}>
                                                <span>Mail: </span>
                                                {pos.email}
                                            </a>
                                            <a href={`tel:${pos.phone}`}>
                                                <span>Teléfono: </span>
                                                {pos.phone}
                                            </a>
                                            {pos.whatsapp && (
                                                <a href={`https://wa.me/${pos.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                                    <span>Whatsapp: </span>
                                                    {pos.whatsapp}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {state.pos.length > idx + 1 && <div className={styles.break}></div>}
                            </div>
                        ))}
                    </div>
                </Fragment>
            ))}
        </div>
    );
};

export default Accordion;
