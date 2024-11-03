"use client";

import { useState } from 'react';
import MessageList from '../messageList/messageList';
import InputBox from '../inputBox/inputBox';
import styles from './chatPage.module.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you?', sender: 'bot' },
    { text: 'Hi! I need some assistance.', sender: 'user' }
  ]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const botMessage = await response.text(); // Предположим, что ответ - это простой текст
        setMessages(prevMessages => [
          ...prevMessages,
          { text: botMessage, sender: 'bot' }
        ]);
      } else {
        console.error('Ошибка при получении ответа от бота');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <MessageList messages={messages} />
      <InputBox onSend={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
