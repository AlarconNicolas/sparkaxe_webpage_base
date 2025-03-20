import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo-Oral.png";

function Login() {
    return (
        <div className={styles.page}>
            <form>
                <div className={styles.form}>
                    <img className={styles.logo} src={Logo} />
                    <h3 className={styles.formtitleicon}>
                        <i className="fa-solid fa-envelope-circle-check"></i>
                    </h3>
                    <h3 className={styles.formtitle}>Enviado con exito</h3>
                    <p className={styles.recovertext}>
                        Checa tu correo para indicaciones para recuperar tu
                        cuenta
                    </p>

                    <Link to="/">
                        <button className={styles.submit}>Regresar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
