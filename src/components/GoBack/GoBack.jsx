import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ********************** Styles **********************
import styles from "./GoBack.module.css";

const GoBack = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.goback}>
                <i className="fa-solid fa-caret-left"></i> Regresar
            </button>
        </div>
    )
}

export default GoBack;