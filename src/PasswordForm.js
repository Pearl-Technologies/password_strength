import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(password)
      const response = await axios.post('http://localhost:5000/api/password', { password });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Check Strength
      </Button>
      {result && (
        <p>
          Minimum number of steps required: {result.steps}
        </p>
      )}
    </Form>
  );
};

export default PasswordForm;
