import styles from "./Footer.module.css";
import Logo from "../../assets/Logo-Therbal.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div className={styles.footerContent}>
                <div className={styles.FooterRow}>
                    {/* Logo Section */}
                    <div className={styles.logocont}>
                        <img src={Logo} className={styles.logo} alt="NanoPhos" />
                    </div>

                    {/* Menu Section */}
                    <div className={styles.footermenus}>
                        <h3>Menú</h3>
                        <div className={styles.footermenu}>
                            <ul>
                                <li><Link to="/">Inicio</Link></li>
                                <li><Link to="/store">Tienda</Link></li>
                                <li><Link to="/about">Nosotros</Link></li>
                                <li><Link to="/pos">Puntos de Venta</Link></li>                          
                                <li><Link to="/orders">Pedidos</Link></li>
                                <li><Link to="/contact">Contacto</Link></li>
                                <li><Link to="/signup">Crear Cuenta</Link></li>
                                <li><Link to="/login">Iniciar Sesión</Link></li>   
                                </ul>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className={styles.footercontact}>
                        <h3>Redes Sociales</h3>
                        <p>Contáctanos</p>
                        <div className={styles.icons}>
                            <a href="https://www.facebook.com/therbalmexico/">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/therbalmexico/">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://wa.me/">
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className={styles.footerLocation}>
                        <h3>Therbal</h3>
                        <p>Cuidado bucal, todo el tiempo, para todos</p>
                        <p>Sin flúor, Sin derivados del petróleo</p>
                        <p>Sin etanol ni abrasivos, Sin ácido sórbico</p>
                    </div>
                </div>
            </div>
            
            {/* Copyright */}
            <div className={styles.Copyright}>
                <p>Copyright © {new Date().getFullYear()} Therbal</p>
            </div>
        </div>
    );
};

export default Footer;
