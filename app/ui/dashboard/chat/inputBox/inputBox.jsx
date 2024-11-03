"use client";

import { useState } from 'react';
import styles from './inputBox.module.css';

const InputBox = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage(''); // очищаем поле после отправки
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.inputBox}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button className={styles.sendButton} onClick={handleSend}>
        Отправить
      </button>
    </div>
  );
};

export default InputBox;
