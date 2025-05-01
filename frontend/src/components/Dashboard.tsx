import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    // TODO: Implement shopping functionality
    console.log('Start shopping clicked');
  };

  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img
          src="/logo.png"
          alt="Thanda House Logo"
          style={styles.logo}
        />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.heading}>
          Welcome to<br />
          Thanda House
        </h1>
        <p style={styles.welcomeText}>
          Discover our premium collection of craft beers
        </p>
        <button onClick={handleStartShopping} style={styles.shopButton}>
          Start Shopping
        </button>
      </div>

      {/* Beer Bottle */}
      <div style={styles.beerContainer}>
        <img
          src="/beer background.png"
          alt="Thanda House Premium Beer"
          style={styles.beerImage}
        />
      </div>

      {/* Back Button */}
      <button onClick={() => navigate('/')} style={styles.backButton}>
        Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'radial-gradient(74.93% 148.18% at 28.44% 32.57%, #D29046 0%, #3C1E0D 100%)',
    position: 'relative' as const,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative' as const,
    zIndex: 2,
  },
  logo: {
    width: '280px',
    height: 'auto',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    position: 'relative' as const,
    zIndex: 2,
    maxWidth: '800px',
  },
  heading: {
    fontSize: '72px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    lineHeight: 1.1,
    marginBottom: '24px',
    fontFamily: 'Poppins, sans-serif',
  },
  welcomeText: {
    fontSize: '24px',
    color: '#fff',
    margin: '0 0 48px 0',
    opacity: 0.9,
  },
  shopButton: {
    padding: '16px 48px',
    fontSize: '20px',
    fontWeight: 600,
    color: '#000',
    backgroundColor: '#D4AF37',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  beerContainer: {
    position: 'absolute' as const,
    right: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    width: '400px',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beerImage: {
    height: '100%',
    width: 'auto',
    objectFit: 'contain' as const,
    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))',
  },
  backButton: {
    position: 'absolute' as const,
    top: '40px',
    right: '40px',
    padding: '8px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: 'transparent',
    border: '2px solid #fff',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 3,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
};

export default Dashboard; 