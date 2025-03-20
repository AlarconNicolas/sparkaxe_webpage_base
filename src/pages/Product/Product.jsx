import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// *********************** hooks ************************
import useApp from "../../hooks/useApp";

// ********************** helpers ************************
import formatToMoney from "../../helpers/formatMoney";

// *********************** styles ************************
import styles from "./Product.module.css";

// *********************** components ************************
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Modal from "../../components/Modal/Modal";
import NavProducts from "../../components/NavProducts/NavProducts";
import Searchbar from "../../components/Searchbar/Searchbar";
import GoBack from "../../components/GoBack/GoBack";
import SlateToHtml from "../../components/SlateToHTML/SlateToHTML";
import Skeleton from '@mui/material/Skeleton';

const Product = () => {
    const {
        addItemAmount,
        restItemAmount,
        changeItemAmount,
        handleAddToCart,
        cart,
        removeItem,
        elements,
        loading,
    } = useApp();
    const { id } = useParams();

    const item = elements.find((product) => product.id === id);
    const [cartItem, setCartItem] = useState({});
    const [amount, setAmount] = useState(1);
    const elementsCategory = elements.filter(
        (element) =>
            element.subcategories[0]?.name === item.subcategories[0]?.name
    );

    useEffect(() => {
        const cartItem = cart.find((item) => item.id === id);
        setCartItem(cartItem);
        if (cartItem) {
            setAmount(cartItem.amount);
        }
    }, [cart, id]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!item && !loading) {
        return (
            <div className={styles.Searchbar}>
                <NavProducts />
                <div className={styles.ProductnotFound}>
                    <h2>Product not found</h2>
                    <Link to="/">Go back to home</Link>
                </div>
            </div>
        );
    }

    const isOutOfStock = item?.stock === 0;

    return (
        <div className={styles.Searchbar}>
            <Searchbar />
            <GoBack />
            {loading ? (
                <div className={styles.skeletons}>
                    <div className={styles["skeleton-product"]}>
                        <div className={styles["skeleton-image"]}>
                            <Skeleton variant="rounded" width={'100%'} height={483} />
                        </div>
                        <div className={styles["skeleton-info"]}>
                            <Skeleton variant="text" sx={{ fontSize: '10rem' }} />
                            <div className={styles["skeleton-p"]}>
                                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                            </div>
                            <div className={styles["skeleton-p"]}>
                                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                            </div>
                            <div className={styles["skeleton-cart"]}>
                                <Skeleton variant="rounded" width={200} height={36} />
                                <Skeleton variant="rounded" width={400} height={30} />
                            </div>
                        </div>
                    </div>
                    <div className={styles["skeleton-more-info"]}>
                        <Skeleton variant="rounded" width={'100%'} height={115} />
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.Product}>
                        <div className={styles.productImage}>
                            {/* Slide-in animation for product image */}
                            <img
                                src={`${item.image}`}
                                alt={`${item.name} Product`}
                                className={styles.productImageAnimation}
                            />
                        </div>
                        <div className={styles.productInfo}>
                            <div className={styles.ProductSpecifics}>
                                <h2 className={styles.ProdcutName}>{item.name}</h2>

                                <div className={styles.productButtonsContainer}>
                                    <p className={styles.Human}>
                                        <i className="fa-solid fa-user"></i> Para Humanos
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
                </>
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
