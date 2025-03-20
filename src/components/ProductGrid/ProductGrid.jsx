

// ***************** styles *****************
import styles from "./ProductGrid.module.css";

// ************ components ************
import ProductCard from "../ProductCard/ProductCard";
import ProductCardPets from "../ProductCardPets/ProductCardPets";
import Skeleton from '@mui/material/Skeleton';

// ************ hooks ************
import useApp from "../../hooks/useApp";

const ProductGrid = ({ elements }) => {
    const { loading } = useApp();
    return (
        <div className={styles.ProductGrid}>
            <div className={styles.ProductGridcontainer}>
                {loading ? (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <Skeleton key={item} variant="rounded" width={'100%'} height={343} />
                    ))
                ) : (
                    elements.length > 0 && elements.map((item) => {
                        if(item?.subcategories[0]?.category?.name === "Mascotas"){
                            return <ProductCardPets key={item.id} item={item} />
                        } else {
                            return <ProductCard key={item.id} item={item} />
                        }
                    })
                )}
            </div>
        </div>
    );
};

export default ProductGrid;
