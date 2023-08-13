import React from "react";
import {
  Paper,
  Button,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  //   Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
              <Box sx={{ border: 1 }} width={"100vw"}>
                <Grid container>
                  <Grid item xs={10}>
                    <Button
                      variant="text"
                      color="inherit"
                      fullWidth
                      sx={{
                        textTransform: "none",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={conversation.name}
                          src={conversation.avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={conversation.name}
                        secondary={conversation.status}
                        style={{ textAlign: "left" }}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton sx={{ mt: 1, alignItems: "flex-end" }}>
                      <VisibilityIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </ListItem>
            {/* <Divider /> */}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ConversationList;
