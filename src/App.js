import React from 'react';
import { Container } from 'react-bootstrap';
import PasswordForm from './PasswordForm';

const App = () => {
  return (
    <Container>
      <h1>Password Strength Checker</h1>
      <PasswordForm />
    </Container>
  );
};

export default App;
