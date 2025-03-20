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


function Signup() {
  const navigate = useNavigate();
    const { setAlert } = useApp();
    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Object.values(user).includes("")){
            setAlert({message: "Todos los campos son obligatorios", type: "error"});
            return;
        }
        if(user.password !== user.password2){
            setAlert({message: "Las contraseñas no coinciden", type: "error"});
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
            const response = await clientAxios.post("/api/customers/register", user, config);
            // console.log(response);
            setAlert({message: "Usuario registrado correctamente", type: "success"});
            navigate("/login");
        } catch (error) {
            console.log(error);
            if(error.response.data.msg === 'User already exists'){
                setAlert({message: "El usuario ya existe", type: "error"});
                return;
            }
            setAlert({message: "Ha ocurrido un error", type: "error"});
        }
    };
    return (
      <div className={styles.page}>
            <form 
                className={`${styles.form} ${styles["form-signup"]}`} 
                onSubmit={handleSubmit}
            >
                <div className={styles.image}>
                    <img className={styles.logo} src={Logo} />
                </div>
                <h3 className={styles.formtitle}>Registrate</h3>

                <div className={styles["grid-2"]}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.required}>
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ingresa tu nombre"
                            onChange={handleChange}
                            value={user.name}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastname" className={styles.required}>
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Ingresa tu apellido"
                            onChange={handleChange}
                            value={user.lastname}
                        />
                    </div>
                </div>
                <div className={styles["grid-2"]}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.required}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu email"
                            onChange={handleChange}
                            value={user.email}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.required}>
                            Teléfono
                        </label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Ingresa tu teléfono"
                            onChange={handleChange}
                            value={user.phone}
                        />
                    </div>
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
                            value={user.password2}
                            onChange={handleChange}
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

                <div className={styles.actions}>
                    <button type="submit" className={styles.submit}>
                        Registrarse
                    </button>

                    <Link
                        to="/forgot-password"
                        className={styles.forgotPassword}
                    >
                        ¿Olvidaste la contraseña?
                    </Link>
                    <p className={styles.change}>
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login">Inicia Sesión</Link>
                    </p>
                </div>
            </form>
        </div>
    );
  }
  
  export default Signup;