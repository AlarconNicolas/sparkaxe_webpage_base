import { createContext, useEffect, useState } from "react";

import clientAxios from "../config/clientAxios.jsx";

// ************ Helpers ************
import generateHash from '../helpers/generateHash.js';
import encryptWord from '../helpers/encryptWord.js';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [elements, setElements] = useState([]);
    const [filteredElements, setFilteredElements] = useState([]);
    const [categories, setCategories] = useState([]);
    const [advertisements, setAdvertisements] = useState([]);
    const [pos, setPos] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [auth, setAuth] = useState({});
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState({});
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        const getAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const hash = generateHash();
                const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        'x-client-hash': `${hash}`,
                        'x-client-website': `${encryptedName}`,
                        Authorization: `Bearer ${token}`,
                    }
                };
                try {
                    const response = await clientAxios.get("/api/customers/profile", config);
                    setAuth({
                        name: response.data.name,
                        lastname: response.data.lastname,
                        email: response.data.email,
                        phone: response.data.phone,
                    });
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoadingAuth(false);
                }
            } else {
                setLoadingAuth(false);
            }
        };
        getAuth();
    }, []);

    useEffect(() => {
        const getElements = async () => {
            const hash = generateHash();
            const encryptedName = encryptWord(import.meta.env.VITE_WEBSITE_NAME);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'x-client-hash': `${hash}`,
                    'x-client-website': `${encryptedName}`,
                }
            };
            try {
                const response = await clientAxios.get("/api/oralpeace/main-info", config);
                console.log(response.data);
                if (response.status === 200) {
                    setElements(response.data.elements);
                    setCategories(response.data.categories);
                    setAdvertisements(response.data.advertisements);
                    setPos(response.data.pos);
                    setTopProducts(response.data.topProducts.map(item => {
                        return {
                            ...item.element,
                        }
                    }));
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getElements();
    }, []);

    useEffect(() => {
        const carLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) ?? [] : [];
        setCart(carLS);
    }, []);

    useEffect(() => {
        if(firstLoad){
            if(cart?.length === 0){
                setFirstLoad(false);
                return;
            }
        }
        setFirstLoad(false);
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth({});
    }


    const handleAddToCart = (product, amount = 1) => {
        setCart([...cart, { ...product, amount: amount }]);
    };

    const addItemAmount = (id) => {
        const newCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, amount: item.amount + 1 };
            }
            return item;
        });
        setCart(newCart);
    }

    const restItemAmount = (id) => {
        const newCart = cart.map(item => {
            if (item.id === id) {
                if(item.amount === 1){
                    return item;
                }else{
                    return { ...item, amount: item.amount - 1 };
                }
            }
            return item;
        });
        setCart(newCart);
    }

    const removeItem = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
    }

    const changeItemAmount = (e, id) => {
        const newCart = cart.map(item => {
            if (item.id === id) {
                if(!(isNaN(e.target.value) || e.target.value < 1)){
                    return { ...item, amount: parseInt(e.target.value) };   
                }
            }
            return item;
        });
        setCart(newCart);
    }

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + (item.amount * item.price), 0)
    }

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    }


    return (
        <AppContext.Provider value={{
            cart,
            handleAddToCart,
            cartOpen,
            elements,
            filteredElements,
            setFilteredElements,
            categories,
            advertisements,
            pos,
            topProducts,
            setCartOpen,
            addItemAmount,
            restItemAmount,
            removeItem,
            changeItemAmount,
            auth,
            setAuth,
            loadingAuth,
            setLoadingAuth,
            alert,
            setAlert,
            handleLogout,
            getCartTotal,
            clearCart,
            loading,
        }}>
            {children}

        </AppContext.Provider>
    );
};

export { AppProvider };
export default AppContext;