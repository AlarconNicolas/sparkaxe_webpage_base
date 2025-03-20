

// ******************* styles *******************
import styles from "./Store.module.css";

// ******************* hooks *******************
import useApp from "../../hooks/useApp";

// ******************* components *******************
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Searchbar from "../../components/Searchbar/Searchbar";
import Banner from "../../components/Carousel/Banner";
import Skeleton from '@mui/material/Skeleton';


function Store() {
    const { elements, advertisements, loading } = useApp();
    return (
        <div>
            {loading ? (
                <Skeleton variant="rounded" width={'100%'} height={420} />
            ) : (
                <Banner 
                    slides={advertisements}
                />
            )}
            <Searchbar />
            <h2 className={styles.heading}>Bienvenido a la Tienda</h2>
            {/* Aquí puedes renderizar el contenido relacionado con la subcategoría */}
            <ProductGrid 
                elements={elements}
            />
        </div>
    );
}

export default Store;
