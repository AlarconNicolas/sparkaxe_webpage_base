import React from "react";
import styles from "./Link.module.css";
import Perro from "../../assets/dog.png";

const Link = () => {
    return (
        <div className={styles.container}>
            <div className={styles.brand}>
                <img src={Perro} alt="" />
            </div>
            <div className={styles.links}>
                <a href="/store" target="_blank" rel="" className={styles.linkButton}>
                    Tienda
                </a>
                <a href="https://www.facebook.com/therbalmexico/" target="_blank" rel="" className={styles.linkButton}>
                    Facebook
                </a>
                <a href="https://www.instagram.com/therbalmexico/" target="_blank" rel="" className={styles.linkButton}>
                    Instagram
                </a>
                <a href="https://wa.me/" target="_blank" rel="" className={styles.linkButton}>
                    WhatsApp
                </a>
                <a href="mailto:" className={styles.linkButton}>
                    Mail
                </a>
            </div>
        </div>
    );
};

export default Link;
