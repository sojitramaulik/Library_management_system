
import './App.css'
import { Button, Container, Typography } from "@mui/material";

function App() {

  return (
    <>
      <Container>
        <Typography variant="h3" gutterBottom>
          Library Management System
        </Typography>

        <Button variant="contained" color="primary">
          Add Book
        </Button>
      </Container>
    </>
  );
}

export default App
