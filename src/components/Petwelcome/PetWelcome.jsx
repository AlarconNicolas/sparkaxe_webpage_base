import { useState, useEffect } from "react";
import styles from "./Petwelcome.module.css";

const WelcomeScreen = ({ onFinish }) => {
    useEffect(() => {
        // Ocultar la pantalla después de 3 segundos
        const timer = setTimeout(() => {
            onFinish();
        }, 1500);
        return () => clearTimeout(timer); // Limpiar el temporizador
    }, [onFinish]);

    return (
        <div className={`${styles.WelcomeScreen} ${styles.fadeInOut}`}>
            <i className={`fa-solid fa-paw ${styles.pawIcon}`}></i>
            <h1>Para Mascotas</h1>
        </div>
    );
};

export default WelcomeScreen;
