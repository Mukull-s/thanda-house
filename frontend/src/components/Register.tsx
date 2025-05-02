import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

// Add Poppins font globally
if (typeof window !== 'undefined' && !document.getElementById('poppins-font')) {
  const link = document.createElement('link');
  link.id = 'poppins-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
  document.head.appendChild(link);
}

type Address = {
  street: string;
  city: string;
  state: string;
  pincode: string;
};

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  phone: string;
  address: Address;
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirm: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For address fields (e.g., address.street)
    if (name.startsWith('address.')) {
      const addressKey = name.split('.')[1] as keyof Address;
      setForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressKey]: value
        }
      }));
      return;
    }

    // For top-level fields
    if (name in form) {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    setLoading(true);
    try {
      // First create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const { user } = userCredential;

      if (!user) {
        throw new Error('Failed to create user account');
      }

      console.log('Firebase user created:', user.uid);

      // Get a fresh token
      const idToken = await user.getIdToken(true);
      console.log('Token obtained, length:', idToken.length);

      try {
        // Then save user data to MongoDB
        const response = await axios.post('http://localhost:5000/api/users', 
          {
            firebaseUid: user.uid,
            email: form.email,
            name: form.name,
            phone: form.phone,
            address: form.address
          },
          {
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('Server response:', response.status, response.data);

        if (response.status === 201) {
          navigate('/home');
        } else {
          console.error('Server response:', response.data);
          throw new Error(response.data.message || 'Failed to create user profile');
        }
      } catch (apiError: any) {
        console.error('API error details:', apiError.response?.data);
        // If MongoDB save fails, delete the Firebase user
        await user.delete();
        if (apiError.response?.data?.message) {
          setError(apiError.response.data.message);
        } else {
          setError('Failed to create user profile. Please try again.');
        }
      }
    } catch (err: any) {
      console.error('Registration error details:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please use a different email.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const idToken = await user.getIdToken();

      // Save Google user data to MongoDB
      await axios.post('http://localhost:5000/api/users', {
        email: user.email,
        name: user.displayName || '',
        phone: user.phoneNumber || '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: ''
        }
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });

      navigate('/home');
    } catch (err: any) {
      console.error('Google sign up error:', err);
      setError(err.response?.data?.message || err.message || 'Google sign up failed');
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
            onMouseOver={e => (e.currentTarget.style.background = '#2C64D4')}
            onMouseOut={e => (e.currentTarget.style.background = '#3D7BF2')}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        {/* Google Sign Up Button */}
        <button
          type="button"
          style={{ ...styles.button, background: '#fff', color: '#222', border: '1px solid #3D7BF2', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 22, height: 22 }} />
          <span>{loading ? 'Please wait...' : 'Sign Up with Google'}</span>
        </button>
        {/* Switch to Login */}
        <div style={styles.switchText}>
          Already have an account?{' '}
          <span style={styles.link} tabIndex={0} role="button" onClick={() => navigate('/login')}>Sign In</span>
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

export default RegisterPage;
