import { Link, useNavigate } from "react-router-dom";

// ********************** styles **********************
import styles from "./ConfirmOrder.module.css";

// ********************** hooks **********************
import useApp from "../../hooks/useApp";

// ********************** Components **********************
import OrderTable from "../../components/OrderTable/OrderTable";
import GoBack from "../../components/GoBack/GoBack";

function ConfirmOrder() {
  const { cart, getCartTotal } = useApp();
  return (
    <main className={styles.main}>
      <GoBack />
      <h2 className={styles.Heading}>Confirmar Pedido</h2>
      <div className={styles.content}>
        <OrderTable elements={cart} total={getCartTotal()} />{" "}
        {cart.length > 0 && (
          <Link to="/information-order" className={styles.Paybutton}>
            Confirmar Pedido
          </Link>
        )}{" "}
      </div>
    </main>
  );
}

export default ConfirmOrder;
