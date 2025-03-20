import { useEffect } from "react";

// ****************** hooks ******************
import useApp from "../../hooks/useApp";

// ****************** Styles ******************
import styles from "./FloatAlert.module.css";

const FloatAlert = () => {
    const { alert, setAlert } = useApp();

    useEffect(() => {
        if (alert.message) {
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    }, []);


    return (
        <div className={`${styles.alert} ${styles[alert?.type]}`}>
            <p>{alert?.message}</p>
        </div>
    );
}

export default FloatAlert
