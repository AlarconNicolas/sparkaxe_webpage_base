import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// ******************* styles *******************
import styles from "./StoreSearch.module.css";

// ******************* hooks *******************
import useApp from "../../hooks/useApp";

// ******************* components *******************
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Searchbar from "../../components/Searchbar/Searchbar";
import Banner from "../../components/Carousel/Banner";
import GoBack from "../../components/GoBack/GoBack";

function StoreSearch() {
    const { elements, advertisements, loading } = useApp();
    const location = useLocation();
    const [filteredElements, setFilteredElements] = useState([]);

    // Extract the query parameter
    const query = new URLSearchParams(location.search).get("query")?.toLowerCase() || "";

    useEffect(() => {
        if (query) {
            const filtered = elements.filter((product) => {
                const { name, description, subcategories } = product;

                const matchesName = name.toLowerCase().includes(query);
                const matchesDescription = description.toLowerCase().includes(query);
                const matchesSubcategory = subcategories.some((sub) =>
                    sub.name.toLowerCase().includes(query)
                );
                const matchesCategory = subcategories.some((sub) =>
                    sub.category.name.toLowerCase().includes(query)
                );

                return (
                    matchesName ||
                    matchesDescription ||
                    matchesSubcategory ||
                    matchesCategory
                );
            });
            setFilteredElements(filtered);
        } else {
            setFilteredElements(elements); // Show all elements if no query is provided
        }
    }, [query, elements]);

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
            <GoBack />
            <h2 className={styles.heading}>Bienvenido a la Tienda</h2>
            {/* Conditional rendering for "No products" */}
            {filteredElements.length === 0 ? (
                <div className={styles.noProducts}>
                    <Link className={styles.noProductsLink} to="/store"> <i className="fa-solid fa-arrow-left"></i> Regresar a la Tienda</Link>
                  <p> No se encontraron productos</p> 
                    
                </div>
            ) : (
                <ProductGrid elements={filteredElements} />
            )}
        </div>
    );
}

export default StoreSearch;
