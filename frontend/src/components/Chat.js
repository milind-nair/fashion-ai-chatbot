// import * as React from "react";
import React, { useState, useContext } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
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
  const { currentUser } = useContext(UserContext);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  // const [flag, setFlag] = useState(true);
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      // let type = flag === true ? "question" : "answer";
      // setFlag(!flag);
      setMessages([
        ...messages,
        { user: currentUser, message: inputValue, type: "question" },
        {
          user: currentUser,
          message: "The AI does not work yet",
          type: "answer",
        },
      ]);

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
        <Divider />
        <div style={{ flex: 1, overflowY: "auto" }}>
          <List>
            {messages
              .filter((message) => message.user === currentUser)
              .map((message, index) => {
                if (message.type === "question") {
                  return (
                    <React.Fragment key={index}>
                      <ListItem
                        alignItems="flex-start"
                        style={{
                          justifyContent: "flex-end",
                        }}
                        sx={{ mt: 2 }}
                      >
                        <ListItemText
                          primary={message.message}
                          style={{ textAlign: "right" }}
                        />
                        <ListItemIcon
                          sx={{ marginBottom: 1, marginLeft: 2, mt: 0 }}
                        >
                          <AccountCircleIcon />
                        </ListItemIcon>
                      </ListItem>
                      {/* <Divider /> */}
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      // sx={{ mt: 5, border: 1, borderRadius: 10 }}
                    >
                      <ListItemIcon
                        sx={{ marginBottom: 1, marginLeft: 2, mt: 0 }}
                      >
                        <SmartToyIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={message.message}
                        style={{ textAlign: "left" }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
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
