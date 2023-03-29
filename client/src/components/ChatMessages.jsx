import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ChatMessages = ({ messages }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      { messages.length === 0 && <Typography component="h1" variant="h5">
        Chat with me
      </Typography>}
      <List sx={{ overflow: 'auto' }}>
        {messages.map((message, index) => (
          <ListItem key={index} sx={{ flexDirection: message.role === 'user' ? 'row-reverse' : 'row' }}>
            <ListItemText
              primary={message.content}
              secondary={message.role === 'user' ? 'You' : 'Mike'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatMessages;
