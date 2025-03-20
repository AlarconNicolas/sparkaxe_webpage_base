import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import clientAxios from "../../config/clientAxios.jsx";

// ************ Helpers ************
import generateHash from '../../helpers/generateHash.js';
import encryptWord from '../../helpers/encryptWord.js';

// ***************** styles *****************
import styles from "./Orders.module.css";

// ***************** components *****************
import OrderTableStatus from "../../components/OrderTableStatus/OrderTableStatus";
import MainProductGrid from "../../components/MainProductGrid/MainProductGrid"; // Keeping original component
import Skeleton from '@mui/material/Skeleton';

// ***************** hooks *****************
import useApp from "../../hooks/useApp";

function Orders() {
    const { auth, setAlert } = useApp();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            const hash = generateHash();
            const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'x-client-hash': `${hash}`,
                    'x-client-website': `${encryptedName}`,
                    Authorization: `Bearer ${token}`,
                }
            };
            try {
                const response = await clientAxios.get("/api/oralpeace/orders", config);
                const sortedOrders = response.data
                    .map((order) => ({
                        ...order,
                        elements: order.elements.map((element) => ({
                            ...element,
                            amount: element.order_element.quantity,
                        }))
                    }))
                    .sort((a, b) => {
                        // Place canceled orders at the bottom
                        if (a.status === "CA" && b.status !== "CA") return 1;
                        if (a.status !== "CA" && b.status === "CA") return -1;
    
                        // Otherwise, sort by date in descending order
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });
    
                setOrders(sortedOrders);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setAlert({ message: "No se pudieron obtener tus pedidos", type: "error" });
            }
        }
        fetchOrders();
    }, []);
    

    return (
        <div>
            <h2 className={styles.Heading}>Tus pedidos</h2>
            {loading ? (
                <div className={styles.skeletons}>
                    {[1, 2, 3].map((item) => (
                        <Skeleton key={item} variant="rounded" width={'100%'} height={483} />
                    ))}
                </div>
            ) : orders.length > 0 ? (
                <div className={styles.orders}>
                    {orders.map((order, index) => (
                        <OrderTableStatus order={order} key={index} />
                    ))}
                </div>
            ) : (
                <div className={styles.NoOrders}>
                    <h3 className={styles.CartContainer}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className={styles.CartBadge}>0</span>
                    </h3>
                    <p>No tienes pedidos aún</p>
                    <Link to="/store" className={styles.Link}>
                        Ver productos
                    </Link>
                </div>
            )}
            <div className={styles.OrderHistory}>
                <h2 className={styles.Heading}>Productos más vendidos</h2>
                <MainProductGrid /> {/* Keeping original component */}
            </div>
        </div>
    );
}

export default Orders;
