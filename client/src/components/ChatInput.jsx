import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const ChatInput = ({ messages, setMessages, isLoading, setIsLoading, conversationId, setConversationId }) => {
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

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
        //console.log(messageContent);
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
        //alert("An error occurred while sending your message. Please try again later.");
      } //try again after
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Button
                  type="button"
                  color="success"
                  disabled={ userInput.length > 50 || userInput.length === 0 || isLoading ? true : false }
                  onClick={handleSendMessage}
                  sx={{ minWidth: 0, padding: 0 }}
                >
                  <SendIcon sx={{ opacity: 0.5}}/>
                </Button>
              )}
            </InputAdornment>
          ),
        }}
      />
      {userInput.length > 50 && (
        <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
          50 chars max
        </Typography>
      )}
    </Box>
  );
};

export default ChatInput;
