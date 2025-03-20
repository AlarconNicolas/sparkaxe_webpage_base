import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ********************* images *********************
import CategoryImage from "../../assets/Category.png";

// ********************* styles *********************
import styles from "./Searchbar.module.css";
import useApp from "../../hooks/useApp";

function Searchbar() {
    const [query, setQuery] = useState("");
    const [filteredElements, setFilteredElements] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);

        const filtered = elements.filter((product) => {
            const { name, description, subcategories } = product;

            // Filtrar por nombre, descripción, subcategoría o categoría
            const matchesName = name.toLowerCase().includes(value);
            const matchesDescription = description.toLowerCase().includes(value);
            const matchesSubcategory = subcategories.some((sub) =>
                sub.name.toLowerCase().includes(value)
            );
            const matchesCategory = subcategories.some((sub) =>
                sub.category.name.toLowerCase().includes(value)
            );

            return (
                matchesName ||
                matchesDescription ||
                matchesSubcategory ||
                matchesCategory
            );
        });
        setFilteredElements(filtered);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query) {
            navigate(`/storesearch?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className={styles["searcher-container"]}>
            <div className={styles.Searchbar}>
                <input
                    type="text"
                    placeholder="Buscar productos"
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                />
                <i className={`fa-solid fa-magnifying-glass ${styles.magnifier}`}></i>
                {query && (
                    <i
                        className={`fa-solid fa-xmark ${styles.clear}`}
                        onClick={() => {
                            setQuery("");
                            setFilteredElements([]);
                        }}
                    ></i>
                )}
            </div>
            {query && (
                <Link
                    to={`/storesearch?query=${encodeURIComponent(query)}`}
                    className={styles.searchButtonLink}
                >
                    <button className={styles.searchButton}>
                        <i className={`fa-solid fa-magnifying-glass ${styles.magnifier2}`}></i>
                    </button>
                </Link>
            )}
        </div>
    );
}

export default Searchbar;
