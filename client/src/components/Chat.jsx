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


  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;
    setIsLoading(true);
    setUserInput('');
    setMessages([...messages, { role: 'user', content: userInput }]);

    try {
      const response = await axios.post("http://localhost:4000/api/chat", { message: userInput });
      if (response.data.error) {
        alert(response.data.error);
      } else {
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
        }
      };

      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: "" }]);
      typeMessage(0);
      console.log(messages);
        }
        // const response = await axios.post("http://localhost:4000/api/chat", { message: userInput });
        // if (response.data.error) {
        //   alert(response.data.error);
        // } else {
        //   setMessages((prevMessages) => [
        //     ...prevMessages,
        //     { role: "assistant", content: response.data.content },
        //   ]);
        // }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("An error occurred while sending your message. Please try again later.");
      }
    setIsLoading(false);
    setIsTyping(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Chat with me
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
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
          {/* {isLoading ? (
          <CircularProgress sx={{ marginLeft: 1 }} />
           ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={userInput.length > 50 || userInput.length === 0 || isLoading ? true : false}
            onClick={handleSendMessage}
            sx={{ marginLeft: 1 }}
          >
            Send
          </Button> 
          )} */}
        </Box>
        {userInput.length > 50 && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                50 chars max
            </Typography>
  )}
      </Box>
    </Container>
  );
};

export default Chat;
