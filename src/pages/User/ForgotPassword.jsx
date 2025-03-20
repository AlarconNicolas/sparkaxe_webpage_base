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
  const { setAlert } = useApp();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email) {
          setAlert({ message: "El email es obligatorio", type: "error" });
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
        const response = await clientAxios.post("/api/customers/forgot-password", { email }, config);
        setAlert({message: "Instrucciones enviadas correctamente", type: "success"});
        navigate("/confirm-send");
    } catch (error) {
        console.log(error);
        if(error.response.data.msg === 'User not found'){
            setAlert({message: "Usuario no encontrado", type: "error"});
        } else {
            setAlert({message: "Ha ocurrido un error", type: "error"});
        }
    }
  };

  return (
      <div className={styles.page}>
          <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.image}>
                  <img className={styles.logo} src={Logo} />
              </div>
              <h3 className={styles.formtitle}>¿Olvidaste tu contraseña?</h3>
              <p className={styles.recovertext}>
                  Ingresa tu correo electronico con el cual inicias sesión
                  para recuperar tu contraseña
              </p>
              <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.required}>
                      E-mail
                  </label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ingresa tu e-mail"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                  />
              </div>

              <button type="submit" className={styles.submit}>
                  Enviar
              </button>

              <p className={styles.change}>
                  ¿No tienes cuenta? <Link to="/signup">Crear cuenta</Link>
              </p>
          </form>
      </div>
    );
}

export default Login;
