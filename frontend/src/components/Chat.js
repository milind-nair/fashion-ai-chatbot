// import * as React from "react";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
// import Paper from "@mui/material/Paper";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };
  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: "1rem",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          FlipChat
        </Typography>
        <div style={{ flex: 1, overflowY: "auto" }}>
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  style={{ justifyContent: "flex-end" }}
                >
                  <ListItemText
                    primary={message}
                    style={{ textAlign: "right" }}
                  />
                  <ListItemIcon
                    sx={{ marginBottom: 1, marginLeft: 2,mt:0 }}
                  >
                    <AccountCircleIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </div>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          style={{ marginTop: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendMessage}
          style={{ marginTop: "1rem" }}
        >
          Send
        </Button>
      </Paper>
    </>
  );
};

export default Chat;
