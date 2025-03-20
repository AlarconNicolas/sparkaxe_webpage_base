import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatToMoney from "../../helpers/formatMoney";
import styles from "./ProductCard.module.css";

const ProductCard = ({ item }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger the animation after the component mounts
        setIsLoaded(true);
    }, []);

    return (
        <Link to={`/product/${item.name}/${item.id}`}>
            <div className={`${styles.Product} ${isLoaded ? styles.fadeInUp : ""}`}>
                <h3>{item.name}</h3>
                <div className={styles.imageContainer}>
                    {item.stock === 0 && (
                        <div className={styles.agotadodiv}>
                            <p>Agotado</p>
                        </div>
                    )}
                    <div
                        className={styles.circleBackground}
                        style={{
                            background: `radial-gradient(circle, ${item.color}, #ffffff)`,
                        }}
                    ></div>
                    <img
                        src={`${item.image}`}
                        alt={`${item.name} Product`}
                    />
                </div>

                <div className={styles.buttoncontainer}>
                    <p>{formatToMoney(parseInt(item.price))}</p>

                    <button className={styles.button}>
                        <i className="fa-solid fa-user"></i>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
