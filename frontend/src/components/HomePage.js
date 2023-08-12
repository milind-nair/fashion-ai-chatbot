import React from 'react';
import { Container, Grid } from '@mui/material';
import ConversationList from './ConversationList'; 
import Chat from './Chat'; 

const HomePage = () => {
  return (
    <Container maxWidth="xl" style={{ marginTop: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ConversationList />
        </Grid>
        <Grid item xs={9}>
          <Chat />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
