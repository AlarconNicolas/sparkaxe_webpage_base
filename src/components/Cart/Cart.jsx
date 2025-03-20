import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import IconOral from "../../assets/IconOral.png";

// ************ Hooks ************
import useApp from "../../hooks/useApp";
import formatToMoney from "../../helpers/formatMoney.js";

const Cart = ({ cartOpen, setCartOpen }) => {
    const { cart, auth, getCartTotal } = useApp();
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        const doAnimation = () => {
            setTimeout(() => {
                setAnimation(true);
            }, 100);
        };
        doAnimation();
    }, []);

    const closeCart = () => {
        setAnimation(false);
        setTimeout(() => {
            setCartOpen(false);
        }, 100);
    };

    return (
        <div className={styles.backdrop}>
            <div className={`${styles.cartpanel} ${animation ? styles.open : ""}`}>
                <button className={styles.closebtn} onClick={closeCart}>
                    <i className="fa-solid fa-x"></i>
                </button>

                <div className={styles.titulo}>
                    <img src={IconOral} alt="Icono Oral Peace" className={styles.icon} />
                    <h2>Tu carrito</h2>
                    <div className={styles.titulocategorias}>
                        <p>Productos</p>
                    </div>
                </div>

                <div className={styles.carritoitems}>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))
                    ) : (
                        <div className={styles.emptycart}>
                            <p>No hay productos en el carrito</p>
                        </div>
                    )}
                </div>

                <div className={styles.finalcart}>
                    <div className={styles.topfinalcart}>
                        <div className={styles.finalcartotal}>Total estimado</div>
                        <div className={styles.finalcarcosto}>
                            {formatToMoney(getCartTotal())} MXN
                        </div>
                    </div>
                    <div className={styles.finalcardesc}>
                        <p>
                            Al completar tu compra, estás de acuerdo con nuestros Términos y
                            Condiciones y Política de Privacidad. Todos los productos son
                            revisados antes del envío para garantizar la máxima calidad. Tu
                            información personal es segura con nosotros y se utilizará
                            únicamente para procesar tu pedido y mejorar tu experiencia de
                            compra.
                        </p>
                    </div>
                    <div>
                        {auth && auth.name ? (
                            <Link to="/confirm-order">
                                <button className={styles.completeorder} onClick={closeCart}>
                                    Completar compra <i className="fa-regular fa-credit-card"></i>
                                </button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button className={styles.completeorder} onClick={closeCart}>
                                    Inicia sesión para comprar <i className="fa-regular fa-credit-card"></i>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
