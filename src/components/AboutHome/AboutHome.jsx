import styles from "./AboutHome.module.css";
import Product from "../../assets/JengibreSabores-Therbal.png";
import { Link } from "react-router-dom";
const AboutHome = () => {
    return (
        <div className={styles.AboutHomeDiv}>
            <div className={styles.AboutHomeDiv2}>
                <div className={styles.productinfo}>
                    <h3 className={styles.ProductTitle}>Therbal</h3>
                    <p className={styles.ProductDesciption}>
                        <span>Therbal</span> Son tes
                    </p>
                    <Link to="/store" className={styles.button}>
                        Ver productos
                    </Link>
                </div>
                <div className={styles.left}>
                    <div className={styles.productImage}>
                        <img
                            src={Product}
                            alt="Product"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHome;
