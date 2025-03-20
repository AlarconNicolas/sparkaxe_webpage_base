import styles from "./ProductGridPets.module.css";
import { items } from "../../../Nanophos/Items";
import { Link } from "react-router-dom";
import pants from "../../assets/Category.png";
import { useRef } from "react";
import ProductCardPets from "../ProductCardPets/ProductCardPets";

const ProductGrid = () => {

  return (
    <div className={styles.ProductGrid}>
      <div className={styles.ProductGridcontainer} >
      {items.slice(0, 2).map((item) => (
          <ProductCardPets item={item} />
        ))}
      </div>

    </div>
  );
};

export default ProductGrid;
