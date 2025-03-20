import React from "react";
import styles from "./PaymentError.module.css";
import { Link } from "react-router-dom";

const PaymentError = () => {
    return (
        <div className={styles.PaymentErrorContainer}>
            <div className={styles.errorBox}>
                <div className={styles.iconContainer}>
                    <i className="fa-solid fa-times-circle"></i>
                </div>
                <h1>Transacción Fallida</h1>
                <p>Lamentablemente, no se pudo completar el pago con tarjeta.</p>
                <p>Por favor, verifica los datos de tu tarjeta o intenta con otro método de pago.</p>
                
                <div className={styles.suggestions}>
                    <h3>Posibles Causas:</h3>
                    <ul>
                        <li>Fondos insuficientes en la tarjeta.</li>
                        <li>Datos incorrectos en la información de pago.</li>
                        <li>Problemas temporales con el proveedor de pagos.</li>
                    </ul>
                    <p>Si el problema persiste, contacta a tu banco o usa un método de pago alternativo.</p>
                </div>
                
                <div className={styles.buttonContainer}>
                    <Link to="/" className={styles.retryButton}>
                        Reintentar Pago
                    </Link>
                    <Link to="/contact" className={styles.contactButton}>
                        Contactar Soporte
                    </Link>
                    <Link to="/" className={styles.homeButton}>
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentError;
