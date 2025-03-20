import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// ******************** Styles ************************
import styles from "./Navbar.module.css";

// ******************** images ************************
import Logo from "../../assets/Logo-Therbal.png";

// ******************** Hooks ************************
import useApp from "../../hooks/useApp";

const Navbar = () => {
    const { setCartOpen, auth, handleLogout, cart } = useApp();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        // Handle overflow based on menu state
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Clean up on component unmount or when path changes
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen, location.pathname]);

    const isActive = (path) => {
        const isActiveClass = location.pathname === path ? styles.activeLink : "";
        return isActiveClass;
    };
    
    return (
        <nav className={styles.navbar}>
            <div className={styles["navbar-content"]}>
                <Link to="/" onClick={closeMenu}>
                    <div className={styles.logocont}>
                        <img src={Logo} className={styles} alt="NanoPhos" />
                    </div>
                </Link>

                <div
                    className={`${styles["mobile-menu-toggle"]} ${menuOpen ? styles["active"] : ""}`}
                    onClick={toggleMenu}
                >
                    <i className="fa-solid fa-bars"></i>
                </div>

                <ul className={`${styles.navLinks} ${menuOpen ? styles["active"] : ""}`}>
                    <li>
                        <Link to="/" className={`${styles.navLink} ${isActive("/")}`} onClick={closeMenu}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/store" className={`${styles.navLink} ${isActive("/store")}`} onClick={closeMenu}>
                            Tienda
                        </Link>
                    </li>
                    <li>
                        <Link to="/store" className={`${styles.navLink} ${isActive("/store")}`} onClick={closeMenu}>
                            Ofertas
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={`${styles.navLink} ${isActive("/about")}`} onClick={closeMenu}>
                            Mas
                        </Link>
                    </li>
                    <li>
                        <Link to="/pos" className={`${styles.navLink} ${isActive("/pos")}`} onClick={closeMenu}>
                            Buscar
                        </Link>
                    </li>
                    {auth && auth.name && (
                        <li>
                            <Link to="/orders" className={`${styles.navLink} ${isActive("/orders")}`} onClick={closeMenu}>
                                Pedidos
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/contact" className={`${styles.navLink} ${isActive("/contact")}`} onClick={closeMenu}>
                            Contacto
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => setCartOpen(true)} className={styles.cartbutton}>
                            <div className={styles.icon}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                {cart.length > 0 && (
                                    <span className={styles.cartlength}>{cart.length}</span>
                                )}
                            </div>
                            Ver Carrito
                        </button>
                    </li>
                    <li>
                        {auth && auth.name ? (
                            <div className={styles.logout}>
                                <i className="fa-solid fa-user" style={{ cursor: "pointer" }}></i>
                                <div className={styles["hover-box"]}>
                                    <div className={styles["logout-button"]}>
                                        <button onClick={handleLogout}>Cerrar Sesión</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.logout}>
                                <i className="fa-solid fa-user" style={{ cursor: "pointer" }}></i>
                                <div className={styles["hover-box"]}>
                                    <div className={styles["login-signup-button"]}>
                                        <Link to="/login">
                                            <button>Iniciar Sesión</button>
                                        </Link>
                                    </div>
                                    <div className={styles["login-signup-button"]}>
                                        <Link to="/signup">
                                            <button>Registrarse</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
