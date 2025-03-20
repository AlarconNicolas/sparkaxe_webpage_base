import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import clientAxios from "../../config/clientAxios.jsx";

// ******************* images *******************
import Logo from "../../assets/Logo-Oral.png";

// ****************** helpers ******************
import generateHash from "../../helpers/generateHash.js";
import encryptWord from "../../helpers/encryptWord.js";

// ******************* Styles *******************
import styles from "./Login.module.css";

// ****************** hooks ******************
import useApp from "../../hooks/useApp";


const ConfirmAccount = () => {
    const { setAlert } = useApp();
    const { token } = useParams();
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const confirmAccount = async () => {
            const hash = generateHash();
            const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'x-client-hash': `${hash}`,
                    'x-client-website': `${encryptedName}`,
                }
            };
            try {
                const response = await clientAxios.post(`/api/customers/confirm-account`, { token }, config);
                setAlert({message: "Cuenta confirmada correctamente", type: "success"});
                setValid(true);
            } catch (error) {
                setValid(false);
                if(error.response.data.msg === 'Invalid token'){
                    setAlert({message: "El enlace de confirmación ha expirado", type: "error"});
                } else {
                    setAlert({message: "Ha ocurrido un error", type: "error"});
                }
            }
        };
        confirmAccount();
    }, []);


    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <div className={styles.image}>
                    <img className={styles.logo} src={Logo} />
                </div>
                <h3 className={styles.formtitleicon}>
                    {valid ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i>}
                </h3>
                {valid ? (
                    <h3 className={styles.formtitle}>Cuenta confirmada con exito</h3>
                ) : (
                    <h3 className={styles.formtitle}>El token ya fue utilizado o ha expirado</h3>
                )}
                {valid && <p className={styles.recovertext}>
                    Ahora puedes iniciar sesión
                </p>}

                <Link to="/login" className={styles.submit}>Iniciar Sesión</Link>
            </div>
        </div>
    )
}

export default ConfirmAccount
