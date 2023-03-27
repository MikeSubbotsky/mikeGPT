import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);


  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;
    setIsLoading(true);
    setUserInput('');
    setMessages([...messages, { role: 'user', content: userInput }]);

    try {
      const response = await axios.post("https://us-central1-mikegpt-interview.cloudfunctions.net/app/api/chat", {
      message: userInput,
      conversationId,
    });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        if (!conversationId) {
          setConversationId(response.data.conversationId);
        }
        setIsLoading(false);
        const messageContent = response.data.content;
        console.log(messageContent);
        let currentContent = "";

      const typeMessage = (index) => {
        if (index < messageContent.length) {
          currentContent += messageContent.charAt(index);
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { role: "assistant", content: currentContent },
          ]);

          setTimeout(() => typeMessage(index + 1), 20);
        }};
          setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: "" }]);
          typeMessage(0);
      }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("An error occurred while sending your message. Please try again later.");
      }
    setIsLoading(false);
    setIsTyping(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !(userInput.length > 50 || userInput.length === 0 || isLoading || isTyping)) {
      handleSendMessage();
      event.preventDefault();
    }
  };

return (
  <Container component="main" maxWidth="sm" sx={{
    backgroundColor: 'rgba(166, 187, 171, 0.5)',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  }}>
    <CssBaseline />
    <Box
      sx={{
        width: '100%',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography component="h1" variant="h5">
        Chat with me
      </Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {messages.map((message, index) => (
          <ListItem key={index} sx={{ flexDirection: message.role === 'user' ? 'row-reverse' : 'row' }}>
            <ListItemText
              primary={message.content}
              secondary={message.role === 'user' ? 'You' : 'Mike'}
            />
          </ListItem>
        ))}
      </List>
      <Box
        component="form"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={userInput}
          maxLength={50}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {isLoading || isTyping ? (
          <CircularProgress sx={{ marginLeft: 1 }} />
        ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={userInput.length > 50 || userInput.length === 0 || isLoading || isTyping ? true : false}
            onClick={handleSendMessage}
            sx={{ marginLeft: 1 }}
          >
            Send
          </Button>
        )}
      </Box>
      {userInput.length > 50 && (
          <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              50 chars max
          </Typography>
      )}
          </Box>
        </Container>
      )
}

export default Chat;
