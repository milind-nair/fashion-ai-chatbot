// import * as React from "react";
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
// import Paper from "@mui/material/Paper";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Typography variant="h5" align="center" gutterBottom>
          FlipChat- GenAI Powered Fashion Outfit Generator
        </Typography>
        <List>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-end">
              {/* <ListItem alignItems="flex-start"> */}
                <ListItemText primary={message} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          style={{ marginTop: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendMessage}
          style={{ marginTop: '1rem' }}
        >
          Send
        </Button>
      </Paper>
    </Container>
  );
};

export default Chat;
