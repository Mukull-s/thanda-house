import React, { useState, CSSProperties } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Example error handling
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // TODO: Add real authentication logic
    alert('Logged in!');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo Placeholder */}
        <div style={styles.logoWrapper}>
          <img
            src="/logo.png" // <-- Replace with your actual logo path
            alt="Thanda House Logo"
            style={styles.logo}
          />
        </div>
        {/* Heading */}
        <h2 style={styles.heading}>Welcome Back to Thanda House!</h2>
        {/* Error Message */}
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }} autoComplete="off">
          {/* Email Input */}
          <input
            aria-label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            style={styles.input}
            onFocus={e => (e.target.style.borderColor = '#3D7BF2')}
            onBlur={e => (e.target.style.borderColor = '#DDDDDD')}
            required
          />
          {/* Password Input */}
          <div style={{ position: 'relative' as const, width: '100%' }}>
            <input
              aria-label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              style={styles.input}
              onFocus={e => (e.target.style.borderColor = '#3D7BF2')}
              onBlur={e => (e.target.style.borderColor = '#DDDDDD')}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(v => !v)}
              style={styles.showPasswordBtn}
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {/* Password Tip */}
          <div style={styles.passwordTip}>Minimum 8 characters.</div>
          {/* Sign In Button */}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={e => (e.currentTarget.style.background = '#2C64D4')}
            onMouseOut={e => (e.currentTarget.style.background = '#3D7BF2')}
          >
            Sign In
          </button>
        </form>
        {/* Switch to Sign Up */}
        <div style={styles.switchText}>
          Don't have an account?{' '}
          <span style={styles.link} tabIndex={0} role="button">Sign Up</span>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: CSSProperties } = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F8F6F2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    fontFamily: 'Inter, Arial, sans-serif',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(61, 123, 242, 0.10)',
    padding: '40px 30px',
    maxWidth: 420,
    width: '100%',
    textAlign: 'center' as const,
    animation: 'fadeIn 0.6s ease-out',
  },
  logoWrapper: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: '#E6EEFA',
    objectFit: 'cover' as const,
  },
  heading: {
    fontSize: 28,
    fontWeight: 600,
    color: '#222222',
    marginBottom: 24,
    marginTop: 0,
  },
  input: {
    width: '100%',
    height: 48,
    marginBottom: 16,
    padding: '0 16px',
    borderRadius: 8,
    border: '1px solid #DDDDDD',
    fontSize: 16,
    color: '#222',
    background: '#FAFAFA',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box' as const,
  },
  showPasswordBtn: {
    position: 'absolute' as const,
    right: 12,
    top: 12,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 18,
    color: '#888',
    padding: 0,
  },
  passwordTip: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 20,
    textAlign: 'left' as const,
    width: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    background: '#3D7BF2',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 500,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginBottom: 20,
    boxShadow: '0 2px 8px rgba(61, 123, 242, 0.10)',
  },
  switchText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 8,
  },
  link: {
    color: '#3D7BF2',
    cursor: 'pointer',
    fontWeight: 500,
    marginLeft: 4,
    textDecoration: 'underline',
  },
  error: {
    background: '#FFEAEA',
    color: '#D8000C',
    borderRadius: 6,
    padding: '8px 0',
    marginBottom: 12,
    fontSize: 14,
  },
};

// Add fade-in animation
const fadeInAnimation = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
if (typeof window !== 'undefined' && !document.getElementById('fadeInAnim')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'fadeInAnim';
  styleTag.innerHTML = fadeInAnimation;
  document.head.appendChild(styleTag);
}

export default LoginPage;
