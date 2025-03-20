import React, { useState } from "react";
import styles from "./NavProducts.module.css";
import { categories } from "../../../Nanophos/Database"; // Import the array from the new file
import { Link } from "react-router-dom";
import CategoryImage from "../../assets/Category.png"; // Import the image

function Searchbar() {
    // Function to toggle showing all categories
    const toggleShowAll = () => {
        setShowAll(true); // Show all and hide the "Ver más" button
    };

    return (
        <div className={styles.Searchbar}>
            <div className={styles.godiv}>
                <Link to="/">
                    <button className={styles.goback}>
                        <i className="fa-solid fa-caret-left"></i> Regresar
                    </button>
                </Link>
            </div>
            {/* Input for search */}
            <input type="text" placeholder="Search... " />
        </div>
    );
}

export default Searchbar;
