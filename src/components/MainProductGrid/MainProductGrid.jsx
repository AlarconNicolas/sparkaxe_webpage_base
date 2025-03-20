

// ***************** styles *****************
import styles from "./MainProductGrid.module.css";

// ************ hooks ************
import useApp from "../../hooks/useApp";

// ************ components ************
import ProductCard from "../ProductCard/ProductCard";
import ProductCardPets from "../ProductCardPets/ProductCardPets";
import Skeleton from '@mui/material/Skeleton';

const ProductGrid = () => {
    const { topProducts, elements, loading } = useApp();
    return (
        <div className={styles.ProductGrid}>
            <div className={styles.ProductGridcontainer}>
                {loading ? (
                    [1, 2, 3, 4, 5].map((item) => (
                        <Skeleton key={item} variant="rounded" width={'100%'} height={343} />
                    ))
                ) : topProducts.length > 0 ? topProducts.map((item) => {
                    if(item?.subcategories[0]?.category?.name === "Mascotas"){
                        return <ProductCardPets key={item.id} item={item} />
                    } else {
                        return <ProductCard key={item.id} item={item} />
                    }
                }) : elements.slice(0, 5).map((item) => {
                    if(item?.subcategories[0]?.category?.name === "Mascotas"){
                        return <ProductCardPets key={item.id} item={item} />
                    } else {
                        return <ProductCard key={item.id} item={item} />
                    }
                })}
            </div>
        </div>
    );
};

export default ProductGrid;
