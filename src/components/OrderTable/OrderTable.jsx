// ******************* styles *******************
import styles from "./OrderTable.module.css";

// ******************* helpers *******************
import formatToMoney from "../../helpers/formatMoney";

const OrderTable = ({ elements, total, shippingCost = 0 }) => {
    return (
        <div className={styles.OrderList}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {elements.length > 0 ? (
                        <>
                            {elements.map((product) => (
                                <tr className={styles.OrderProduct} key={product.id}>
                                    <td className={styles["cell-image"]}>
                                        <img src={product.image} alt="Item Image" />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.amount}</td>
                                    <td>{formatToMoney(product.price)}</td>
                                    <td>{formatToMoney(product.price * product.amount)}</td>
                                </tr>
                            ))}
                            {Number(shippingCost) > 0 && (
                                <tr>
                                    <td colSpan="4" className={styles.total}>
                                        Costo de envío:
                                    </td>
                                    <td>${formatToMoney(shippingCost)}.00</td>
                                </tr>
                            )}
                            <tr>
                                <td className={styles.total} colSpan="5">
                                    Total: <span>{formatToMoney(total)} MXN</span>
                                </td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td colSpan="5">No hay productos en el carrito</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
