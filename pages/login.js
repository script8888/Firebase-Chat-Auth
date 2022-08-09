import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { withPublic } from '../src/hooks/routes';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);

  const login = useStoreActions((action) => action.auth.loginWithGoogle);
  const loginEmail = useStoreActions((action) => action.auth.loginEmail);
  const error = useStoreState((state) => state.auth.error);

  const { email, password } = form;

  const onChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setForm((form) => ({ ...form, [e.target.name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    loginEmail({ email: email, password: password });
  };

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return (
    <div className="col-md-12 login-form">
      {error && error}
      <div className="card card-container">
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              name="email"
              onChange={onChange}
              type="email"
              placeholder="Enter email"
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
            />
          </Form.Group>
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            <Button variant="primary" type="submit">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </Button>
          </div>
        </Form>
        &nbsp;
        <Button onClick={() => login()} variant="primary" type="submit">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Login With Google</span>
        </Button>
      </div>{' '}
    </div>
  );
};
export default withPublic(Login);
