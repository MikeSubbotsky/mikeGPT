import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  return (
    <Container component="main" maxWidth="sm" sx={{
      backgroundColor: 'rgba(179, 200, 179, 0.5)',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}>
      <CssBaseline />
      <ChatMessages messages={messages} />
      <ChatInput
        messages={messages}
        setMessages={setMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        conversationId={conversationId}
        setConversationId={setConversationId}
      />
    </Container>
  );
};

export default Chat;
