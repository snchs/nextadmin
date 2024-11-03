"use client";
import styles from './messageList.module.css';

const MessageList = ({ messages }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            message.sender === 'bot' ? styles.botMessage : styles.userMessage
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
