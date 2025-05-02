import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Search, ShoppingBag } from 'lucide-react';
import beersImg from '../assets/beers.png';

const navItemStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#000000',
  marginRight: '32px', // spacing between items
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  outline: 'none',
};

const navBarStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px 0 0 48px', // top and left padding
  background: 'transparent',
  boxSizing: 'border-box',
};

const leftGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const centerGroupStyle: React.CSSProperties = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const rightGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '28px',
  width: '390px',
  height: '32px',
  marginRight: '48px',
};

const iconStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const getThandaButtonStyle: React.CSSProperties = {
  background: '#7B1818',
  color: '#fff',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: '16px',
  border: 'none',
  borderRadius: '20px',
  padding: '6px 24px',
  cursor: 'pointer',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
};

const heroSectionStyle: React.CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: 'calc(100vh - 80px)', // leave space for navbar
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '24px',
  overflow: 'visible',
};

const Home: React.FC = () => {
  const styles = {
    container: {
      position: 'absolute' as const,
      width: '100vw',
      height: '100vh',
      left: 0,
      top: 0,
      background: 'linear-gradient(180deg, #F4E3BF 0%, #FFFFFF 100%)',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box' as const,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start',
    },
  };

  return (
    <ParallaxProvider>
      <div style={styles.container}>
        <nav style={navBarStyle}>
          {/* Left group: nav links */}
          <div style={leftGroupStyle}>
            <span style={navItemStyle}>Home</span>
            <span style={navItemStyle}>Shop</span>
            <span style={navItemStyle}>About</span>
            <span style={{ ...navItemStyle, marginRight: 0 }}>Contact us</span>
          </div>
          {/* Center group: logo */}
          <div style={centerGroupStyle}>
            <img src="/logo.png" alt="Thanda House Logo" style={{ height: 48, width: 'auto' }} />
          </div>
          {/* Right group: icons, button, signup/login */}
          <div style={rightGroupStyle}>
            <span style={iconStyle}><Search size={32} color="#000" /></span>
            <span style={iconStyle}><ShoppingBag size={32} color="#000" /></span>
            <button style={getThandaButtonStyle}>Get Thanda</button>
            <span style={{ ...navItemStyle, marginRight: 0, marginLeft: 0 }}>Signup/Login</span>
          </div>
        </nav>
        {/* Parallax Hero Section */}
        <section style={heroSectionStyle}>
          {/* Logo (parallax, slower, behind) */}
          <Parallax speed={-10} styleInner={{ zIndex: 1 }}>
            <img
              src="/logo.png"
              alt="Thanda House Large Logo"
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: '340px',
                maxWidth: '90vw',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 1,
              }}
            />
          </Parallax>
          {/* Beer Bottles (parallax, faster, in front) */}
          <Parallax speed={-20} styleInner={{ zIndex: 2 }}>
            <img
              src={beersImg}
              alt="Thanda House Beers"
              style={{
                position: 'absolute',
                top: '32%',
                left: '50%',
                transform: 'translate(-50%, 0)',
                width: '600px',
                maxWidth: '95vw',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 2,
              }}
            />
          </Parallax>
        </section>
      </div>
    </ParallaxProvider>
  );
};

export default Home;
