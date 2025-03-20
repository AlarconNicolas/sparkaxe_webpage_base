import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";


// ***************** styles *****************
import styles from "./layout.module.css";

// ***************** hooks *****************
import useApp from "../hooks/useApp";


const ProtectedLayout = () => {
    const { auth, loadingAuth } = useApp();

    // TODO: Add loading spinner
    if (loadingAuth)
        return (
            <div className={styles.wrapper}>
                <h2>Cargando...</h2>
            </div>
        );
    return (
        <div className={styles.loaded}>
            {auth && auth.name ? <Outlet /> : <Navigate to="/login" />}
        </div>
    );
};

export default ProtectedLayout;
