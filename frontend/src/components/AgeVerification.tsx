import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgeVerification: React.FC = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleVerification = (isOfAge: boolean) => {
    setVerifying(true);
    if (isOfAge) {
      if (rememberMe) {
        localStorage.setItem('ageVerified', 'true');
      } else {
        sessionStorage.setItem('ageVerified', 'true');
      }
      navigate('/dashboard');
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  return (
    <div style={styles.container}>
      {/* Decorative Beer Bottle */}
      <img
        src="/beer background.png"
        alt="Beer Bottle Decorative"
        style={styles.beerBottle}
        aria-hidden="true"
        draggable={false}
      />
      {/* Logo */}
      <img 
        src="/logo.png" 
        alt="Thanda House Premium Beer" 
        style={styles.logo}
      />
      {/* Age Question */}
      <div style={styles.questionContainer}>
        <h1 style={styles.question}>
          ARE YOU <span style={styles.underline}>20 YEARS</span>
        </h1>
        <h1 style={styles.question}>OR</h1>
        <h1 style={styles.question}>OLDER ?</h1>
      </div>
      {/* Buttons */}
      <div style={styles.buttonGroup}>
        <button
          onClick={() => handleVerification(false)}
          style={styles.notYetButton}
          disabled={verifying}
        >
          <span style={styles.notYetText}>Not Yet</span>
        </button>
        <button
          onClick={() => handleVerification(true)}
          style={styles.yesButton}
          disabled={verifying}
        >
          <span style={styles.yesText}>Yes</span>
        </button>
      </div>
      {/* Remember Me */}
      <div style={styles.rememberContainer}>
        <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          style={styles.checkbox}
        />
        <label htmlFor="remember" style={styles.rememberText}>
          Remember me on this device
        </label>
      </div>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: none;
        }
        #root {
          max-width: 100vw !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative' as const,
    width: '100vw',
    height: '100vh',
    minWidth: '320px',
    minHeight: '100vh',
    maxHeight: '1024px',
    margin: '0 auto',
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(74.93% 148.18% at 28.44% 32.57%, #D29046 0%, #3C1E0D 100%)',
    backdropFilter: 'blur(10px)',
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
  },
  beerBottle: {
    position: 'absolute' as const,
    right: 200,
    bottom: -600,
    width: '420px',
    height: 'auto',
    maxHeight: '',
    background: 'none',
    mixBlendMode: 'hard-light' as const,
    filter: 'drop-shadow(-12px 12px 8px rgba(0, 0, 0, 0.25))',
    transform: 'rotate(48deg)',
    zIndex: 0,
    pointerEvents: 'none' as const,
    userSelect: 'none' as const,
    opacity: 0.45,
  },
  logo: {
    width: '260px',
    height: 'auto',
    marginBottom: '32px',
    marginTop: '-16px',
    zIndex: 1,
  },
  questionContainer: {
    textAlign: 'center' as const,
    marginBottom: '16px',
    zIndex: 1,
  },
  question: {
    color: '#fff',
    fontSize: '2.6rem',
    fontWeight: 800,
    margin: '0',
    lineHeight: '1.2',
    textShadow: '0 2px 8px rgba(0,0,0,0.18)',
    fontFamily: 'Poppins, Arial, sans-serif',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    marginBottom: '0.2em',
  },
  underline: {
    borderBottom: '1px solid #fff',
    textDecorationThickness: '1px',
    textDecorationColor: '#fff',
    paddingBottom: '0px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '24px',
    marginTop: '18px',
    marginBottom: '8px',
    zIndex: 1,
  },
  yesButton: {
    width: '185px',
    height: '62px',
    boxSizing: 'border-box' as const,
    border: '2px solid #FFFFFF',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 700,
    fontSize: '2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(61, 123, 242, 0.10)',
    transition: 'background 0.2s, transform 0.2s',
    outline: 'none',
    margin: 0,
    padding: 0,
    zIndex: 1,
  },
  notYetButton: {
    width: '200px',
    height: '62px',
    fontSize: '2rem',
    fontWeight: 700,
    color: '#fff',
    backgroundColor: 'transparent',
    border: '2px solid #fff',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(61, 123, 242, 0.10)',
    transition: 'background 0.2s, color 0.2s, transform 0.2s',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  yesText: {
    color: '#D4AF37',
    fontWeight: 700,
    fontSize: '2rem',
    textShadow: '0 2px 8px rgba(0,0,0,0.10)',
    zIndex: 1,
  },
  notYetText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '2rem',
    textShadow: '0 2px 8px rgba(0,0,0,0.10)',
    zIndex: 1,
  },
  rememberContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '24px',
    width: '100%',
    justifyContent: 'center',
    zIndex: 1,
  },
  checkbox: {
    width: '22px',
    height: '22px',
    cursor: 'pointer',
    accentColor: '#D4AF37',
    zIndex: 1,
  },
  rememberText: {
    color: '#fff',
    fontSize: '1.3rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    cursor: 'pointer',
    userSelect: 'none' as const,
    zIndex: 1,
  },
};

export default AgeVerification; 