import { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./OrderDone.module.css";
import Receipt from "../../assets/Receipt.png";

// Helpers and hooks
import clientAxios from "../../config/clientAxios";
import generateHash from "../../helpers/generateHash";
import encryptWord from "../../helpers/encryptWord";
import useApp from "../../hooks/useApp";

function OrderDone() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAlert, cart, clearCart } = useApp();

  // Ref to ensure order creation is only called once
  const orderCreatedRef = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get("payment");
    console.log("Payment status in OrderDone:", paymentStatus);

    // Only proceed if payment is successful and we haven't already created an order
    if (paymentStatus === "success" && !orderCreatedRef.current) {
      orderCreatedRef.current = true; // mark as already attempting creation

      const orderInfoString = localStorage.getItem("orderInfo");
      if (orderInfoString) {
        const orderInfo = JSON.parse(orderInfoString);
        const token = localStorage.getItem("token");
        const hash = generateHash();
        const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-client-hash": hash,
            "x-client-website": encryptedName,
            Authorization: `Bearer ${token}`,
          },
        };

        // Build payload
        const payload = {
          elements: cart.map((item) => ({
            id: item.id,
            quantity: item.amount,
          })),
          address: `${orderInfo.address}, ${orderInfo.state}, C.P. ${orderInfo.postalCode}`,
          notes: orderInfo.notes || "",
          promotions: orderInfo.promotions || [],
        };
        console.log("Creating order with data:", payload);

        clientAxios
          .post("/api/orders/create-order", payload, config)
          .then((res) => {
            console.log("Order created successfully:", res.data);
            setAlert({
              message: "Pedido procesado correctamente",
              type: "success",
            });
            localStorage.removeItem("orderInfo");
            clearCart();
            // Remove query parameters to avoid re-triggering on refresh
            navigate(location.pathname, { replace: true });
          })
          .catch((error) => {
            console.error("Error creating order:", error);
            setAlert({
              message: "Error al guardar el pago en la base de datos",
              type: "error",
            });
          });
      } else {
        console.log("No order information found in localStorage.");
      }
    }
  }, [location, setAlert, cart, clearCart, navigate]);

  return (
    <div className={styles.OrderDonebig}>
      <button onClick={() => navigate(-1)} className={styles.goback}>
        <i className="fa-solid fa-caret-left"></i> Go back
      </button>
      <h2 className={styles.Heading}>Pago exitoso</h2>
      <div className={styles.OrderDone}>
        <img src={Receipt} alt="Receipt" className={styles.Receipt} />
        <p>Gracias por comprar</p>
      </div>
      <Link to="/">
        <button className={styles.Paybutton}>Seguir comprando</button>
      </Link>
    </div>
  );
}

export default OrderDone;
