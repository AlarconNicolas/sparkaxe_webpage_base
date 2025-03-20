import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ isVisible, onClose, children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
    } else {
      const timeout = setTimeout(() => setShowModal(false), 300);  // Wait for the animation to complete
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  if (!showModal) return null;

  return (
    <div className={`${styles.modalOverlay} ${isVisible ? styles.show : ''}`}>
      <div className={`${styles.modalContent} ${isVisible ? styles.show : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
