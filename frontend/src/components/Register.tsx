import React, { useState, CSSProperties } from 'react';

// Add Poppins font globally
if (typeof window !== 'undefined' && !document.getElementById('poppins-font')) {
  const link = document.createElement('link');
  link.id = 'poppins-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
  document.head.appendChild(link);
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // TODO: Add real registration logic
    alert('Registered!');
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
        <h2 style={styles.heading}>Create Your Chill Account!</h2>
        {/* Error Message */}
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }} autoComplete="off">
          {/* Name Input */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            style={styles.input}
            onFocus={e => (e.target.style.borderColor = '#3D7BF2')}
            onBlur={e => (e.target.style.borderColor = '#CCCCCC')}
            required
            aria-label="Full Name"
          />
          {/* Email Input */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            style={styles.input}
            onFocus={e => (e.target.style.borderColor = '#3D7BF2')}
            onBlur={e => (e.target.style.borderColor = '#CCCCCC')}
            required
            aria-label="Email Address"
          />
          {/* Password Input */}
          <div style={{ position: 'relative' as const, width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              style={styles.input}
              onFocus={e => (e.target.style.borderColor = '#3D7BF2')}
              onBlur={e => (e.target.style.borderColor = '#CCCCCC')}
              required
              aria-label="Password"
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
          {/* Confirm Password Input */}
          <div style={{ position: 'relative' as const, width: '100%' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Confirm Password"
              style={styles.input}
              onFocus={e => (e.target.style.borderColor = '#3D7BF2')}
              onBlur={e => (e.target.style.borderColor = '#CCCCCC')}
              required
              aria-label="Confirm Password"
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              onClick={() => setShowConfirm(v => !v)}
              style={styles.showPasswordBtn}
              tabIndex={-1}
            >
              {showConfirm ? '🙈' : '👁️'}
            </button>
          </div>
          {/* Password Tip */}
          <div style={styles.passwordTip}>Minimum 8 characters.</div>
          {/* Sign Up Button */}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={e => (e.currentTarget.style.background = '#2C64D4')}
            onMouseOut={e => (e.currentTarget.style.background = '#3D7BF2')}
          >
            Sign Up
          </button>
        </form>
        {/* Switch to Login */}
        <div style={styles.switchText}>
          Already have an account?{' '}
          <span style={styles.link} tabIndex={0} role="button">Sign In</span>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: CSSProperties } = {
  page: {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(to right, #F8F6F2, #EFEAE3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundImage: 'url("/background-pattern.png")',
    backgroundRepeat: 'repeat',
    backgroundSize: '300px 300px',
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
    padding: '50px 40px',
    maxWidth: 500,
    width: '100%',
    textAlign: 'center' as const,
    animation: 'fadeIn 0.8s ease-out',
  },
  logoWrapper: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#E6EEFA',
    objectFit: 'cover' as const,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    color: '#222222',
    marginBottom: 36,
    fontFamily: "'Poppins', sans-serif",
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 18,
    padding: '0 16px',
    borderRadius: 10,
    border: '1px solid #CCCCCC',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s',
    fontFamily: "'Poppins', sans-serif",
    color: '#222',
    background: '#FAFAFA',
    boxSizing: 'border-box' as const,
  },
  showPasswordBtn: {
    position: 'absolute' as const,
    right: 14,
    top: 14,
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
    marginBottom: 24,
    textAlign: 'left' as const,
    fontFamily: "'Poppins', sans-serif",
    width: '100%',
  },
  button: {
    width: '100%',
    height: 52,
    background: '#3D7BF2',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 600,
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginBottom: 24,
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 2px 8px rgba(61, 123, 242, 0.10)',
  },
  switchText: {
    fontSize: 14,
    color: '#555555',
    fontFamily: "'Poppins', sans-serif",
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
    fontFamily: "'Poppins', sans-serif",
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

export default RegisterPage;
