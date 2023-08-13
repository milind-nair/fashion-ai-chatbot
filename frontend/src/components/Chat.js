// import * as React from "react";
import React, { useState, useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  TextField,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../context/UserContext";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { currentUser} = useContext(UserContext);
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
      setMessages([...messages, { user: currentUser, message: inputValue }]);
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
                    primary={message.message}
                    style={{ textAlign: "right" }}
                  />
                  <ListItemIcon sx={{ marginBottom: 1, marginLeft: 2, mt: 0 }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Enter Your Outfit Requirements"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            fullWidth
            style={{ marginTop: "1rem" }}
          />
          <IconButton
            color="primary"
            size="large"
            onClick={handleSendMessage}
            style={{ marginTop: "1rem" }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </Paper>
    </>
  );
};

export default Chat;
