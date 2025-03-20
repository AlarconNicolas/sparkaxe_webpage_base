import React, { useState } from 'react';
import styles from './OrderTableEdit.module.css';
import pants  from "../../assets/Product.png";

const OrderTable = () => {
    // Initial product list
    const [products, setProducts] = useState([
        { id: 1, name: 'Producto 1', quantity: 'Cantidad', price: 22 },
        { id: 2, name: 'Producto 2', quantity: 'Cantidad', price: 42 },
        { id: 3, name: 'Producto 3', quantity: 'Cantidad', price: 55 },
    ]);

    // Function to handle product deletion
    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    // Calculate total price
    const totalPrice = products.reduce((total, product) => total + product.price, 0);

    return (
        <div className={styles.OrderList}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className={styles.OrderProduct}>
                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={pants} alt="pants" className={styles.productImage} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}$</td>
                            <td>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4"></td>
                        <td><span>Total:</span> {totalPrice}$</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
