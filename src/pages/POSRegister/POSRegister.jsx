import Navbar from '../../components/Navbar/Navbar';
import React, { useState } from 'react';
import styles from './POSRegister.module.css'; 
import GoBack from '../../components/GoBack/GoBack';

function POSRegister() {
  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado:', formData, selectedValue);
  };

  return (
    <div className={styles.contactContainer}>
      <GoBack />
    
      <h2>Quiero ser Distribuidor</h2>
      
      {/* Sección de Información */}
      

      {/* Formulario de Contacto */}
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Mail:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Mensaje:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </label>
     
        <button type="submit" className={styles.button}>Enviar</button>
      </form>
    </div>
  );
}

export default POSRegister;
