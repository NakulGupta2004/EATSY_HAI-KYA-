import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }


    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (isLogin) {
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
        setSuccess('Logged in successfully!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (users.some((u) => u.email === email)) {
        setError('User with this email already exists');
        return;
      }
      users.push({ username, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess('Account created successfully!');
      setTimeout(() => setIsLogin(true), 1500);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <p>{isLogin ? 'Welcome back!' : 'Create a new account'}</p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="submit-btn">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-form">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
      {error && <div className="notification error">{error}</div>}
      {success && <div className="notification success">{success}</div>}
    </div>
  );
};

export default AuthForm;