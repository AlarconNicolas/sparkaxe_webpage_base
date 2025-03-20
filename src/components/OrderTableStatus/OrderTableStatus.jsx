import { Link } from "react-router-dom";

// ***************** styles *****************
import styles from "./OrderTableStatus.module.css";

// ***************** helpers *****************
import formatDate from "../../helpers/formatDate";
import formatToMoney from "../../helpers/formatMoney";

// ******************* hooks *******************
import useApp from "../../hooks/useApp";

// ***************** components *****************
import OrderStatus from "../OrderStatus/OrderStatus";
import OrderTable from "../OrderTable/OrderTable";

const OrderTableStatus = ({ order }) => {
    // Determine background color based on order status
    const getBackgroundColor = () => {
        switch (order.status) {
            case 'CA':
                return 'var(--white)'; // Light red for "Canceled"
            case 'S':
                return 'var(--white)'; // Light blue for "Shipped"
            case 'C':
                return 'rgb(200, 255, 200)'; // Light green for "Completed"
            default:
                return 'var(--white)'; // Default white
        }
    };

    return (
        <div 
            className={styles.Bigtable} 
            style={{ backgroundColor: getBackgroundColor() }}
        >
            <div className={styles.OrderStatus}>
                <h3 className={styles.heading}>Estado del Pedido</h3>
                <p className={styles.small}>
                    Pedido hecho el <span>{formatDate(order.createdAt)}</span>
                </p>
                <p className={styles.address}>
                    Direccion de entrega: <span>{order.address}</span>
                </p>
                
                {/* Conditionally render based on status */}
                {order.status === 'S' && (
                    <div className={styles.DelvDate}>
                        <i className="fa-solid fa-truck"></i>
                        <p><span className={styles.bold}>Fecha de entrega: </span>20 de febrero 2024</p> 
                    </div>
                )}
                {order.status === 'CA' && (
                    <div className={styles.CancelDiv}>
                        <i className="fa-solid fa-xmark"></i>
                        <p>Pedido Cancelado</p> 
                    </div>
                )}
                {order.status === 'C' && (
                    <div className={styles.CompleteDiv}>
                        <p><span className={styles.bold}>Fecha de entrega: </span>Pedido Completado</p> 
                    </div>
                )}
                
                <OrderStatus status={order.status === 'IP' ? 0 : order.status === 'S' ? 1 : 2} />
            </div>
            <div className={styles.table}>
                <OrderTable elements={order.elements} total={order.total} />
            </div>
            <p className={styles.contact}>
                ¿Tienes alguna duda? <Link to="/contact">Contactanos</Link>
            </p>
        </div>
    );
};

export default OrderTableStatus;
