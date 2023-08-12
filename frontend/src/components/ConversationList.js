import React from "react";
import {
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
//   Divider,
} from "@mui/material";

const ConversationList = () => {
  const conversations = [
    { name: "User 1" },
    { name: "User 2" },
    { name: "User 3" },
  ];
  return (
    <Paper
      elevation={3}
      style={{
        padding: "1rem",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <img
          src="/logo-nobg.png"
          alt="FlipChat Logo"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      </div>
      <Typography variant="h6" align="center" gutterBottom>
        Fashion Outfit Generator - (Powered By Generative AI)
      </Typography>
      <Typography variant="body2" align="center" paragraph>
        Get fashion recommendations based on your needs, personalised to your
        requirements.
      </Typography>
      <List style={{ flexGrow: 1, overflowY: "auto" }}>
        {conversations.map((conversation, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{
                  "text-transform": "none",
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={conversation.name} src={conversation.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={conversation.name}
                  secondary={conversation.status}
                  style={{ textAlign: "left" }}
                />
              </Button>
            </ListItem>
            {/* <Divider /> */}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ConversationList;
