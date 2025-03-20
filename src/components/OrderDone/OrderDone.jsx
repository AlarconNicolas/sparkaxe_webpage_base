/*import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import clientAxios from "../../config/clientAxios";

// *************************** Helpers ***************************
import generateHash from "../../helpers/generateHash";
import encryptWord from "../../helpers/encryptWord";

// *************************** hooks ***************************
import useApp from "../../hooks/useApp";

const PayPalPayment = ({ orderInfo, amount }) => {
  const { setAlert, cart, clearCart } = useApp();
  const navigate = useNavigate();

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "MXN",
      }}
    >
      <PayPalButtons
        key={amount}
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(_, actions) => {
          if (!actions || !actions.order) {
            setAlert({
              message: "Error en la creación de la orden de PayPal",
              type: "error",
            });
          }
          const formattedMonto = parseFloat(`${amount}`).toFixed(2);
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: { currency_code: "MXN", value: formattedMonto },
              },
            ],
          });
        }}
        onApprove={(_, actions) => {
          if (!actions || !actions.order) {
            setAlert({
              message: "Error al aprobar el pago de PayPal",
              type: "error",
            });
          }
          return actions.order
            .capture()
            .then((details) => {
              if (details.status === "COMPLETED") {
                console.log("Pago exitoso:", details);
                const token = localStorage.getItem("token");
                const hash = generateHash();
                const encryptedName = encryptWord(
                  import.meta.env.VITE_WEBSITE_NAME
                );
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                    "x-client-hash": `${hash}`,
                    "x-client-website": `${encryptedName}`,
                    Authorization: `Bearer ${token}`,
                  },
                };
                const elements = cart.map((item) => {
                  return {
                    id: item.id,
                    quantity: item.amount,
                  };
                });
                const data = {
                  elements,
                  address: `${orderInfo.address}, ${orderInfo.state}, C.P. ${orderInfo.postalCode}`,
                  notes: orderInfo.notes,
                  promotions: orderInfo.promotions,
                };
                clientAxios
                  .post("/api/orders/create-order", data, config)
                  .then(() => {
                    setAlert({
                      message: "Pedido procesado correctamente",
                      type: "success",
                    });
                    window.location.href = "/order-done";
                    clearCart();
                  })
                  .catch((err) => {
                    console.error(
                      "Error al guardar el pago en la base de datos:",
                      err
                    );
                    setAlert({
                      message: "Error al guardar el pago en la base de datos",
                      type: "error",
                    });
                  });
              } else {
                console.error("Error al capturar el pago de PayPal:", details);
                setAlert({
                  message: "Error al capturar el pago de PayPal",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.error("Error al capturar el pago de PayPal:", err);
              setAlert({
                message: "Error al capturar el pago de PayPal",
                type: "error",
              });
            });
        }}
        onError={(err) => {
          console.error("Error con PayPal:", err);
          setAlert({
            message: "Error con PayPal. Intente Nuevamente",
            type: "error",
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
*/
// Example: in your OrderDone component (or wherever you need to verify payment)
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import clientAxios from "../../config/clientAxios";

const OrderDone = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      // Call your verification endpoint
      clientAxios
        .get(`/api/stripe/verify-payment?session_id=${sessionId}`)
        .then((response) => {
          console.log("Verification response:", response.data);
          if (response.data.paymentDone) {
            console.log("Payment has been completed!");
            // Proceed to create the order in your database, etc.
          } else {
            console.log("Payment not completed.");
          }
        })
        .catch((err) => {
          console.error("Error verifying payment:", err);
        });
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Verificando pago...</h2>
    </div>
  );
};

export default OrderDone;
