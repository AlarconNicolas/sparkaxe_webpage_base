import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Custom hook to manage global app state (authentication, cart, etc.)
import useApp from "../../hooks/useApp";

// Importing an image asset for the payment illustration
import payment from "../../assets/Payment.png";

// Importing CSS module styles for this component
import styles from "./InformationOrder.module.css";

// Importing child components
import GoBack from "../../components/GoBack/GoBack";
import OrderTable from "../../components/OrderTable/OrderTable";
import clientAxios from "../../config/clientAxios";

// Importing helper functions to generate a hash and encrypt a word (for API headers)
import generateHash from "../../helpers/generateHash.js";
import encryptWord from "../../helpers/encryptWord.js";

// Importing a static JSON file containing states and cities in Mexico
import MexicoStatesCities from "./MexicoStatesCities.json";

function InformationOrder() {
  // Get navigation and route params hooks
  const navigate = useNavigate();
  const { websiteId } = useParams();

  // Destructure functions and values from global state via useApp hook
  const { setAlert, auth, cart, getCartTotal, clearCart } = useApp();

  // State to hold order information entered by the user
  const [order, setOrder] = useState({
    address: "",
    state: "",
    postalCode: "",
    notes: "",
    promoCode: "",
    promotions: [],
  });
  // State for the selected city
  const [city, setCity] = useState("");

  // States for data fetched from the backend
  const [fetchedStates, setFetchedStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [promotions, setPromotions] = useState([]);

  // State variables for shipping cost, checkout flag, Stripe account ID, payment link URL, and payment verification status
  const [shippingCost, setShippingCost] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [stripeAccountId, setStripeAccountId] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);

  // Redirect user to home if the cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // ----------------------------
  // Handlers for input field changes
  // ----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field change: ${name} = ${value}`);
    setOrder((prev) => ({
      ...prev,
      [name]: value,
      // Clear promotions if promoCode field changes
      ...(name === "promoCode" && { promotions: [] }),
    }));
    // Reset city when state changes
    if (name === "state") setCity("");
  };

  const handleCityChange = (e) => {
    console.log("City selected:", e.target.value);
    setCity(e.target.value);
  };

  // ----------------------------
  // Fetch states from the backend
  // ----------------------------
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const token = localStorage.getItem("token");
        const hash = generateHash();
        const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
        // Setup config headers for the API call
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-client-hash": hash,
            "x-client-website": encryptedName,
          },
        };
        const { data } = await clientAxios.get(
          "/api/deliveries/customer/states",
          config
        );
        console.log("Fetched states:", data);
        setFetchedStates(data);
      } catch (error) {
        console.error("Error fetching states", error);
        setAlert({ message: "Error fetching states", type: "error" });
      }
    };
    fetchStates();
  }, [setAlert]);

  // ----------------------------
  // Fetch cities for all states from the backend
  // ----------------------------
  useEffect(() => {
    const fetchCitiesForAllStates = async () => {
      if (fetchedStates.length === 0) return;
      try {
        const token = localStorage.getItem("token");
        const hash = generateHash();
        const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-client-hash": hash,
            "x-client-website": encryptedName,
          },
        };
        // Map over states to get cities for each state
        const promises = fetchedStates.map((stateObj) =>
          clientAxios
            .get(`/api/deliveries/customer/cities/${stateObj.id}`, config)
            .then((res) => res.data)
            .catch((err) => {
              console.error(`Error fetching cities for ${stateObj.state}`, err);
              return [];
            })
        );
        const results = await Promise.all(promises);
        const combinedCities = results.flat();
        console.log("Fetched all cities:", combinedCities);
        setAllCities(combinedCities);
      } catch (error) {
        console.error("Error fetching all cities", error);
        setAlert({ message: "Error fetching cities", type: "error" });
      }
    };
    fetchCitiesForAllStates();
  }, [fetchedStates, setAlert]);

  // ----------------------------
  // Fetch promotions from the backend
  // ----------------------------
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const token = localStorage.getItem("token");
        const hash = generateHash();
        const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-client-hash": hash,
            "x-client-website": encryptedName,
          },
        };
        const { data } = await clientAxios.get(
          "/api/promotions/customer",
          config
        );
        console.log("Fetched promotions:", data);
        setPromotions(data);
      } catch (error) {
        console.error("Error fetching promotions", error);
        setAlert({ message: "Error fetching promotions", type: "error" });
      }
    };
    fetchPromotions();
  }, [setAlert]);

  // ----------------------------
  // Validate promotional code entered by the user
  // ----------------------------
  const validatePromoCode = () => {
    if (!order.promoCode) return null;
    const promo = promotions.find(
      (p) =>
        p.code && p.code.toLowerCase() === order.promoCode.trim().toLowerCase()
    );
    if (!promo) {
      setAlert({ message: "El código promocional no existe", type: "error" });
      return null;
    }
    // If promotion is of type 'multibuy', perform additional validation
    if (promo.type === "multibuy") {
      let eligibleItems = [];
      promo.elements.forEach((element) => {
        const cartItem = cart.find((item) => item.id === element.id);
        if (cartItem) {
          eligibleItems.push({ ...element, quantity: cartItem.quantity });
        }
      });
      if (eligibleItems.length === 0) {
        setAlert({
          message:
            "No hay productos elegibles para la promoción multibuy en el carrito",
          type: "error",
        });
        return null;
      }
      eligibleItems = eligibleItems.map((item) => {
        const freeUnits =
          Math.floor(item.quantity / promo.multibuyDetails.buy) *
          promo.multibuyDetails.get;
        return { ...item, freeUnits };
      });
      console.log("Eligible items with free units:", eligibleItems);
    }
    return promo;
  };

  // ----------------------------
  // Calculate shipping cost based on selected city or state
  // ----------------------------
  const calculateShippingCost = () => {
    if (city && allCities.length > 0) {
      const foundCity = allCities.find(
        (entry) => entry.city.toLowerCase() === city.toLowerCase()
      );
      if (foundCity) return foundCity.cost;
    }
    if (order.state && fetchedStates.length > 0) {
      const foundState = fetchedStates.find(
        (entry) => entry.state.toLowerCase() === order.state.toLowerCase()
      );
      if (foundState) return foundState.cost;
    }
    return null;
  };

  // ----------------------------
  // Handle the "Continuar con el pago" button click
  // Validate inputs, calculate shipping, store order info locally, and trigger payment link creation.
  // ----------------------------
  const handleContinuePayment = () => {
    if (!order.address || !order.state || !order.postalCode || !city) {
      setAlert({ message: "Todos los campos son obligatorios", type: "error" });
      return;
    }
    const cost = calculateShippingCost();
    if (cost === null) {
      setAlert({
        message: "No hay envios a tu Ciudad o Estado",
        type: "error",
      });
      return;
    }

    let promotionIds = [];
    // Handle promotional code validation
    if (order.promoCode) {
      if (order.promoCode.trim().toLowerCase() === "automatic") {
        const autoPromo = promotions.find(
          (p) => p.code && p.code.trim().toLowerCase() === "automatic"
        );
        if (!autoPromo) {
          setAlert({
            message: "No se encontró promoción automática",
            type: "error",
          });
          return;
        }
        console.log("Auto promotion applied:", autoPromo);
        promotionIds.push(autoPromo.id);
      } else {
        const promo = validatePromoCode();
        if (!promo) return;
        console.log("Validated promotion:", promo);
        promotionIds.push(promo.id);
      }
    }
    // Check for promotions that auto-apply based on cart contents
    promotions.forEach((promo) => {
      if (promo.autoApply && promo.elements) {
        const isEligible = promo.elements.some((element) =>
          cart.some((item) => item.id === element.id)
        );
        if (isEligible && !promotionIds.includes(promo.id)) {
          console.log(`Auto-applying promotion: ${promo.id}`);
          promotionIds.push(promo.id);
        }
      }
    });
    // Update order state with promotion IDs
    setOrder((prev) => ({ ...prev, promotions: promotionIds }));
    console.log("Shipping cost:", cost);
    console.log("Order info:", { ...order, city, promotions: promotionIds });
    setShippingCost(cost);

    // Save order info in localStorage for later order creation after payment
    const orderInfoForCreation = {
      elements: cart.map((item) => ({ id: item.id, quantity: item.amount })),
      address: `${order.address}, ${order.state}, C.P. ${order.postalCode}`,
      notes: order.notes,
      promotions: order.promotions,
    };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfoForCreation));

    // Set checkout to true to trigger the creation of a payment link
    setCheckout(true);
  };

  // ----------------------------
  // Fetch Stripe Account ID via API headers
  // ----------------------------
  useEffect(() => {
    const fetchStripeAccount = async () => {
      try {
        const token = localStorage.getItem("token");
        const hash = generateHash();
        const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
        // Set up config with headers required by the backend
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-client-hash": hash,
            "x-client-website": encryptedName,
          },
        };
        const { data } = await clientAxios.get(
          "/api/stripe/customer/account-by-website",
          config
        );
        console.log("Stripe account fetch response:", data);
        const fetchedId = data.id || data.stripeAccountId;
        if (fetchedId) {
          console.log("Fetched Stripe Account ID:", fetchedId);
          setStripeAccountId(fetchedId);
        } else {
          console.warn("No account id found in the response.");
        }
      } catch (err) {
        console.error("Error fetching Stripe Account:", err);
        setAlert({ message: "Error fetching Stripe Account", type: "error" });
      }
    };
    fetchStripeAccount();
  }, [setAlert]);

  // ----------------------------
  // Create Payment Link via Stripe when checkout is active
  // ----------------------------
  useEffect(() => {
    if (checkout) {
      const createPaymentLink = async () => {
        try {
          const token = localStorage.getItem("token");
          const hash = generateHash();
          const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-client-hash": hash,
              "x-client-website": encryptedName,
            },
          };

          // Calculate total amount from cart items plus shipping cost
          const totalCart = cart.reduce(
            (acc, item) => acc + item.price * item.amount,
            0
          );
          const totalAmount = totalCart + Number(shippingCost || 0);

          // Build payload for creating a Payment Link with one line item "TOTAL"
          const payload = {
            stripeAccountId,
            cartItems: [
              {
                name: "TOTAL",
                price: totalAmount,
                amount: 1,
              },
            ],
            shippingCost: 0, // Already included in totalAmount
          };

          console.log("Payload for payment link:", payload);
          const { data } = await clientAxios.post(
            "/api/stripe/customer/payment-link",
            payload,
            config
          );
          console.log("Payment link response:", data);
          if (data.url) {
            setPaymentLink(data.url);
          } else {
            console.warn("No payment link URL in response.");
          }
        } catch (error) {
          console.error("Error creating payment link:", error);
          setAlert({ message: "Error creating payment link", type: "error" });
        }
      };
      createPaymentLink();
    }
  }, [checkout, cart, shippingCost, stripeAccountId, setAlert]);

  // ----------------------------
  // Redirect to payment: navigate directly to the payment link in the same window
  // ----------------------------
  const redirectToPayment = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  return (
    <div className={styles.page}>
      <GoBack />
      <h2 className={styles.Heading}>Información de pago</h2>
      <div className={styles.Paymentpage}>
        <div className={styles.imgpay}>
          <img src={payment} alt="payment" />
        </div>
        <div className={styles.Paymentdiv}>
          <form className={styles.FormPay}>
            {!checkout ? (
              <>
                {/* Display user information */}
                <div className={styles.formGroup}>
                  <label className={styles.required}>Nombre</label>
                  <p className={styles["p-disabled-input"]}>
                    {auth.name} {auth.lastname}
                  </p>
                </div>
                <div className={styles["grid-2"]}>
                  <div className={styles.formGroup}>
                    <label className={styles.required}>Email</label>
                    <p className={styles["p-disabled-input"]}>{auth.email}</p>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.required}>Teléfono</label>
                    <p className={styles["p-disabled-input"]}>{auth.phone}</p>
                  </div>
                </div>
                {/* Address input */}
                <div className={styles.formGroup}>
                  <label htmlFor="address" className={styles.required}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Ingresa tu dirección (calle, número, colonia)"
                    onChange={handleChange}
                    value={order.address}
                  />
                </div>
                {/* State and City selectors */}
                <div className={styles["grid-2"]}>
                  <div className={styles.formGroup}>
                    <label htmlFor="state" className={styles.required}>
                      Estado
                    </label>
                    <select
                      id="state"
                      name="state"
                      onChange={handleChange}
                      value={order.state}
                    >
                      <option disabled value="">
                        -- Selecciona un estado --
                      </option>
                      {Object.keys(MexicoStatesCities).map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="city" className={styles.required}>
                      Ciudad
                    </label>
                    <select
                      id="city"
                      name="city"
                      onChange={handleCityChange}
                      value={city}
                      disabled={!order.state}
                    >
                      <option disabled value="">
                        -- Selecciona una ciudad --
                      </option>
                      {order.state &&
                        MexicoStatesCities[order.state].map((cityName) => (
                          <option key={cityName} value={cityName}>
                            {cityName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {/* Postal code and notes */}
                <div className={styles.formGroup}>
                  <label htmlFor="postalCode" className={styles.required}>
                    Código Postal
                  </label>
                  <input
                    type="number"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Ingresa tu código postal"
                    onChange={handleChange}
                    value={order.postalCode}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="notes">Notas</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Ingresa alguna nota adicional"
                    onChange={handleChange}
                    value={order.notes}
                  />
                </div>
                {/* Promotional code input */}
                <div className={styles.formGroup}>
                  <label htmlFor="promoCode">Código Promocional</label>
                  <input
                    type="text"
                    id="promoCode"
                    name="promoCode"
                    placeholder="Ingresa el código promocional"
                    onChange={handleChange}
                    value={order.promoCode}
                  />
                </div>
                {/* Button to continue with payment */}
                <button
                  type="button"
                  className={styles.Paybutton}
                  onClick={handleContinuePayment}
                >
                  Continuar con el pago
                </button>
              </>
            ) : (
              <>
                {/* Display order summary */}
                <OrderTable
                  elements={cart}
                  shippingCost={shippingCost}
                  total={getCartTotal() + Number(shippingCost)}
                />
                <div className={styles.virtualWindow}>
                  {paymentLink ? (
                    <>
                      {/* Redirects the current window to the Stripe Checkout page */}
                      <button
                        type="button"
                        className={styles.Paybutton}
                        onClick={redirectToPayment}
                      >
                        Ir a Checkout
                      </button>
                    </>
                  ) : (
                    <p>Creando enlace de pago...</p>
                  )}
                  {/* Show payment verified message if payment is completed */}
                  {paymentVerified && (
                    <p style={{ color: "green", marginTop: "1rem" }}>
                      Pago completado: true
                    </p>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default InformationOrder;
