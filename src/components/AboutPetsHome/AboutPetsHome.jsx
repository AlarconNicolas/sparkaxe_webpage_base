

// ******************* styles ********************
import styles from "./AboutPetsHome.module.css";

// ******************* hooks ********************
import useApp from "../../hooks/useApp";

// ******************* images ********************
import Logo from "../../assets/Logo-Therbal.png";

// ******************* components ********************
import ProductCardPets from "../ProductCardPets/ProductCardPets";
import Skeleton from '@mui/material/Skeleton';

const AboutPetsHome = () => {
    const { elements, loading } = useApp();
    const items = elements.filter((item) => item?.subcategories[0]?.category?.name === "Mascotas");
    return (
        <div className={styles.AboutPetsHome}>
            <h2 className={styles.AboutPetsHomeHead}>
                Therbal tu aliado
            </h2>
            <div className={styles.AboutPetsHomeContent}>
                <div className={styles.Petinfo}>
                    <div className={styles.PetinfoText}>
                        <h3>Cuidado del Alma</h3>
                        <p>PAr ala panshita</p>
                    </div>
                    <img src={Logo} alt="Logo" className={styles.Logo} />
                </div>
                <div className={styles.GridPets}>
                    {loading ? (
                        [1, 2].map((item) => (
                            <Skeleton key={item} variant="rounded" width={'100%'} height={343} />
                        ))
                    ) : items.slice(0, 2).map((item) => (
                        <ProductCardPets key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPetsHome;
