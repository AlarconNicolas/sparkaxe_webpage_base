import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

function Login() {
    const navigate = useNavigate();
    const { setAuth, setAlert } = useApp();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.password || !user.email) {
            setAlert({
                message: "Todos los campos son obligatorios",
                type: "error",
            });
            return;
        }
        const hash = generateHash();
        const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-client-hash": `${hash}`,
                "x-client-website": `${encryptedName}`,
            },
        };
        try {
            const response = await clientAxios.post(
                "/api/customers/login",
                user,
                config
            );
            localStorage.setItem("token", response.data.token);
            setAuth({
                name: response.data.name,
                lastname: response.data.lastname,
                email: response.data.email,
                phone: response.data.phone,
            });
            setAlert({
                message: "Sesión iniciada correctamente",
                type: "success",
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.response.data.msg === "Invalid password") {
                setAlert({
                    message: "Credenciales incorrectas",
                    type: "error",
                });
            } else if (error.response.data.msg === "User not found") {
                setAlert({ message: "Usuario no encontrado", type: "error" });
            } else if (error.response.data.msg === "User is not confirmed") {
                setAlert({ message: "Usuario no confirmado", type: "error" });
            } else {
                setAlert({ message: "Ha ocurrido un error", type: "error" });
            }
        }
    };
    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.image}>
                    <img className={styles.logo} src={Logo} />
                </div>
                <h3 className={styles.formtitle}>Iniciar sesión</h3>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.required}>
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu e-mail"
                        onChange={handleChange}
                        value={user.email}
                    />
                </div>
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
                            value={user.password}
                            onChange={handleChange}
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

                <div className={styles.actions}>
                    <button type="submit" className={styles.submit}>
                        Iniciar sesión
                    </button>

                    <Link
                        to="/forgot-password"
                        className={styles.forgotPassword}
                    >
                        ¿Olvidaste la contraseña?
                    </Link>
                    <p className={styles.change}>
                        ¿No tienes cuenta?{" "}
                        <Link to="/signup">Crear cuenta</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
