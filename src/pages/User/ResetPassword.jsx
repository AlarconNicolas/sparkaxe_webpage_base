import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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


const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const { setAlert } = useApp();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !password2) {
            setAlert({ message: "Todos los campos son obligatorios", type: "error" });
            return;
        }
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
            const response = await clientAxios.post("/api/customers/reset-password", { token, password }, config);
            // console.log(response);
            setAlert({ message: "Contraseña cambiada correctamente", type: "success" });
            navigate("/login");
        } catch (error) {
            console.log(error);
            if(error.response.data.msg === 'User not found'){
            
            }
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.image}>
                    <img className={styles.logo} src={Logo} />
                </div>
                <h3 className={styles.formtitle}>Reestablece tu contraseña</h3>
                <p className={styles.recovertext}>
                    Reestablece tu contraseña y recupera tu acceso
                </p>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.required}>
                        Contraseña
                    </label>
                    <div className={styles["input-pass"]}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles["show-pass"]}
                            >
                                <i className="fa-solid fa-eye-slash"></i>
                            </div>
                        ) : (
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles["show-pass"]}
                            >
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password2" className={styles.required}>
                        Confirmar Contraseña
                    </label>
                    <div className={styles["input-pass"]}>
                        <input
                            type={showPassword2 ? "text" : "password"}
                            id="password2"
                            name="password2"
                            placeholder="Confirma tu contraseña"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        {showPassword2 ? (
                            <div
                                onClick={() => setShowPassword2(!showPassword2)}
                                className={styles["show-pass"]}
                            >
                                <i className="fa-solid fa-eye-slash"></i>
                            </div>
                        ) : (
                            <div
                                onClick={() => setShowPassword2(!showPassword2)}
                                className={styles["show-pass"]}
                            >
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        )}
                    </div>
                </div>
                <button type="submit" className={styles.submit}>
                    Cambiar Contraseña
                </button>

                <p className={styles.change}>
                    ¿No tienes cuenta? <Link to="/signup">Crear cuenta</Link>
                </p>
            </form>
        </div>
    )
}

export default ResetPassword
