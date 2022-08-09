import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withPublic } from '../src/hooks/routes';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const register = useStoreActions((actions) => actions.auth.register);
  const login = useStoreActions((action) => action.auth.loginWithGoogle);
  const error = useStoreState((action) => action.auth.error);

  const { email, password } = form;

  const onChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setForm((form) => ({ ...form, [e.target.name]: value }));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    register({ email: email, password: password });
    if (error) {
      setLoading(false);
    }
  };
  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={onChange}
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={onChange}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            <Button variant="primary" type="submit">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Sign Up</span>
            </Button>
          </div>
        </Form>
        &nbsp;
        <Button onClick={() => login()} variant="primary" type="submit">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Signup With Google</span>
        </Button>
      </div>
    </div>
  );
};
export default withPublic(Register);
