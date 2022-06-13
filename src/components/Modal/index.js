import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Popup from 'reactjs-popup';

// hooks

import styles from './Modal.module.css';

const Modal = () => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
        <div className={styles.container}>
          <button type="button" className={styles.close} onClick={closeModal}>
            &times;
          </button>
          <div className={styles.header}>Title here</div>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
            nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
            quibusdam voluptates delectus doloremque, explicabo tempore dicta
            adipisci fugit amet dignissimos?
          </div>
        </div>
      </Popup>
    </>
  );
};
export default Modal;
