import styles from "./CartItem.module.css";


// ******************* hooks *******************
import useApp from "../../hooks/useApp";


// ******************* helpers *******************
import formatToMoney from "../../helpers/formatMoney";

const CartItem = ({ item }) => {
    const { addItemAmount, restItemAmount, removeItem, changeItemAmount } = useApp();
    const { name, price, image, description, amount } = item;
    return (
        <div className={styles.item}>
            <div className={styles.fotoproducto}>
                <img
                    src={`${image}`}
                    alt="Item Image"
                />
            </div>
            <div className={styles.producto}>
                <div className={styles.descripcion}>
                    <h4>{name} <span>{formatToMoney(price)}</span></h4>
                    <p>{description}</p>
                </div>
                <div className={styles.details}>
                    <div className={styles.cantidad}>
                        <button
                            type="button"
                            onClick={() => restItemAmount(item.id)}
                            disabled={amount === 0}
                        >-</button>
                        <input 
                            type="text" 
                            value={amount}
                            onChange={(e) => changeItemAmount(e, item.id)}
                        />
                        <button
                            type="button"
                            onClick={() => addItemAmount(item.id)}
                        >+</button>
                    </div>
                    <div className={styles.subtotal}>
                        <p>Subtotal: <span>{formatToMoney(price * amount)}</span></p>
                    </div>
                </div>
            </div>
            <button 
                className={styles.delete}
                type="button"
                onClick={() => removeItem(item.id)}
            >
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    );
};

export default CartItem;
