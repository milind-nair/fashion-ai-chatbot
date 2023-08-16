import React, { useState, useContext } from "react";
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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UserContext } from "../context/UserContext";
import UserHistoryDialog from "./UserHistoryDialog";
import { conversations } from "../constants";

const ConversationList = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const userChangeHandler = (conversation) => {
    let newUser = conversation.name;
    setCurrentUser(newUser);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const showHistory = () => {
    setDialogOpen(true);
  };
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
              <Box width={"100vw"}>
                <Grid
                  container
                  sx={{
                    border: 1,
                    borderRadius: "10px",
                    backgroundColor:
                      currentUser === conversation.name ? "lightblue" : "white",
                  }}
                >
                  <Grid item xs={10}>
                    <Button
                      variant={
                        currentUser === conversation.name ? "text" : "string"
                      }
                      color="inherit"
                      fullWidth
                      sx={{
                        textTransform: "none",
                      }}
                      onClick={() => userChangeHandler(conversation)}
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
                    <IconButton
                      sx={{ mt: 1, alignItems: "flex-end" }}
                      onClick={showHistory}
                    >
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
      {dialogOpen && (
        <UserHistoryDialog
          history={
            conversations.filter(
              (conversation) => conversation.name === currentUser
            )[0].history
          }
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </Paper>
  );
};

export default ConversationList;
