import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// *********************** hooks ************************
import useApp from "../../hooks/useApp";

// ********************** helpers ************************
import formatToMoney from "../../helpers/formatMoney";

// *********************** styles ************************
import styles from "./ProductPet.module.css";

// *********************** components ************************
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Modal from "../../components/Modal/Modal";
import NavProducts from "../../components/NavProducts/NavProducts";
import Searchbar from "../../components/Searchbar/Searchbar";
import GoBack from "../../components/GoBack/GoBack";
import SlateToHtml from "../../components/SlateToHTML/SlateToHTML";
import Skeleton from '@mui/material/Skeleton';
import WelcomeScreen from "../../components/Petwelcome/PetWelcome";

const Product = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [cartItem, setCartItem] = useState(null);
    const [amount, setAmount] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { addItemAmount, restItemAmount, changeItemAmount, handleAddToCart, cart, removeItem, elements, loading } = useApp();
    const { id } = useParams();

    const item = elements.find((product) => product.id === id);
    const elementsCategory = item
        ? elements.filter((element) => element.subcategories[0]?.name === item.subcategories[0]?.name)
        : [];

    useEffect(() => {
        if (item) {
            const existingCartItem = cart.find((cartItem) => cartItem.id === id);
            setCartItem(existingCartItem);
            setAmount(existingCartItem ? existingCartItem.amount : 1);
        }
    }, [cart, id, item]);

    if (showWelcome) {
        return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;
    }

    if (!item && !loading) {
        return (
            <div className={styles.Searchbar}>
                <NavProducts />
                <div className={styles.ProductnotFound}>
                    <h2>Producto no encontrado</h2>
                    <Link to="/">Regresar al inicio</Link>
                </div>
            </div>
        );
    }

    const isOutOfStock = item?.stock <= 0;

    return (
        <div className={styles.Searchbar}>
            <Searchbar />
            <GoBack />

            {loading ? (
                <div className={styles.skeletons}>
                    {/* Skeleton loaders for product details */}
                    <div className={styles["skeleton-product"]}>
                        <div className={styles["skeleton-image"]}>
                            <Skeleton variant="rounded" width="100%" height={483} />
                        </div>
                        <div className={styles["skeleton-info"]}>
                            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.Product}>
                    <div className={styles.productImage}>
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.productInfo}>
                        <div className={styles.ProductSpecifics}>
                            <h2 className={styles.ProductName}>{item.name}</h2>
                            <div className={styles.productButtonsContainer}>
                                <p className={styles.Paw}>
                                    <i className="fa-solid fa-paw"></i> Para Mascotas
                                </p>
                                {item.ingredients && (
                                    <button
                                        className={styles.Ingredients}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <i className="fa-solid fa-clipboard-list"></i> Ingredientes
                                    </button>
                                )}
                            </div>
                        </div>

                        <p className={styles.Description}>{item.description}</p>
                        <p className={styles.Price}>
                            Precio: <span>{formatToMoney(item.price)}</span>
                        </p>

                        <div className={styles.productbuttons}>
                            {!isOutOfStock ? (
                                <>
                                    <div className={styles.cantidad}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                restItemAmount(item.id);
                                                setAmount((prev) => Math.max(1, prev - 1));
                                            }}
                                            disabled={amount === 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            disabled
                                            value={amount}
                                            onChange={(e) => changeItemAmount(e, item.id)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                addItemAmount(item.id);
                                                setAmount((prev) => prev + 1);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {cartItem ? (
                                        <button
                                            onClick={() => {
                                                removeItem(item.id);
                                                setAmount(1);
                                            }}
                                            className={styles.addcart}
                                        >
                                            Eliminar del Carrito
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(item, amount)}
                                            className={styles.addcart}
                                        >
                                            <i className="fa-solid fa-cart-plus"></i> Agregar a Carrito
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className={styles.agotado}>
                                    <p>Agotado</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <h3 className={styles["heading-category"]}>Productos de la Misma Categoría</h3>
            <ProductGrid elements={elementsCategory} />

            {item?.ingredients && (
                <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className={styles["ingredients-heading"]}>Ingredientes</h2>
                    <div className={styles["ingredients-content"]}>
                        <SlateToHtml value={JSON.parse(item.ingredients)} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Product;
