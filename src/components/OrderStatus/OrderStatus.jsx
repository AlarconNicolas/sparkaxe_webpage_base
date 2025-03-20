import React from "react";
import styles from "./OrderStatus.module.css";

const OrderStatus = ({ status }) => {
    const stages = ["En proceso", "Enviado", "Completado"];

    return (
        <div className={styles["order-status"]}>
            <div className={styles["status-container"]}>
                {stages.map((stage, index) => (
                    <div
                        key={stage}
                        className={`${styles["status-item"]} ${
                            index <= status ? styles.active : ""
                        }`}
                    >
                        <div className={styles["status-circle"]}>
                            {index <= status ? "✓" : index + 1}
                        </div>
                        <div className={styles["status-label"]}>{stage}</div>
                        <div className={styles["status-container-bar"]}>
                            <div 
                                className={styles["status-container-bar-progress"]}
                                style={{width: `${index <= status ? index < status ? 100 : (status + 1) >= stages.length ? 100 : 50 : 0}%`}}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatus;
