import React, { useState, useContext } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
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
import { urlToCall } from "../constants/constants";
import { conversations } from "../constants/constants";

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
  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      try {
        const jsonToSend = {
          query: inputValue,
          history: conversations.filter((elem) => elem.name === currentUser)[0]
            .history,
        };
        const result = await makePostRequest(urlToCall, jsonToSend);
        // const message = concatenateWithLineNumbers(result.answer);

        //TODO change this according to API return
        let newText = result.map((item, i) => (
          <div>
            <p key={i}>
              {i}. {item.name}
            </p>
            <p key={i + 100}>{item.url}</p>
            <p key={i + 1000}>{item.price}</p>
          </div>
        ));
        setMessages([
          ...messages,
          { user: currentUser, message: inputValue, type: "question" },
          {
            user: currentUser,
            message: newText,
            type: "answer",
            thumbnailImageUrl: "",
          },
        ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
      setInputValue("");
    }
  };
  const makePostRequest = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
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
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment key={index}>
                    <img
                      src={message.thumbnailImageUrl}
                      alt="Recommended Product"
                    />
                    <ListItem alignItems="flex-start">
                      <ListItemIcon
                        sx={{ marginBottom: 1, marginLeft: 2, mt: 0 }}
                      >
                        <SmartToyIcon />
                      </ListItemIcon>
                      <div style={{ textAlign: "left" }}>{message.message}</div>

                      {/* <ListItemText
                        primary={message.message}
                        style={{ textAlign: "left" }}
                      /> */}
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
