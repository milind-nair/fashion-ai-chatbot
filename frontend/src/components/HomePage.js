import React from "react";
import { Container, Grid } from "@mui/material";
import { UserContextProvider } from "../context/UserContext";
import ConversationList from "./ConversationList";
import Chat from "./Chat";

const HomePage = () => {
  return (
    <UserContextProvider>
      <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ConversationList />
          </Grid>
          <Grid item xs={9}>
            <Chat />
          </Grid>
        </Grid>
      </Container>
    </UserContextProvider>
  );
};
export default HomePage;
