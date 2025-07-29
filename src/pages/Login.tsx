import React, { useState } from 'react';

import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import apiLogin from '../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await apiLogin(email, password);

      if (response.token) {
        login(response.token);
      } else {
        alert(`Login failed: ${response.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoToSignup = () => {
    chrome.tabs.create({
      url: 'https://study-helper.chandreshsharma06-cs.workers.dev/signup',
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='button' onClick={handleLogin} disabled={isLoading}>
        {isLoading ? <Loader size='small' /> : 'Login'}
      </button>
      <p>
        Don&apos;t have an account?{' '}
        <button type='button' onClick={handleGoToSignup}>
          Sign up
        </button>
      </p>
    </div>
  );
}

export default Login;
