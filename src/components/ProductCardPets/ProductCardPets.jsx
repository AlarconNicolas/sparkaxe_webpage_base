import { Link } from "react-router-dom";

// ****************** helpers ********************
import formatToMoney from "../../helpers/formatMoney";

// ****************** styles ********************
import styles from "./ProductCardPets.module.css";

const ProductCard = ({ item }) => {
    return (
        <Link to={`/productpet/${item.name}/${item.id}`}>
            <div className={styles.Product}>
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
                        <i className="fa-solid fa-paw"></i>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
