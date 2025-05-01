import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import { userAPI } from '../services/api';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

const Dashboard: React.FC = () => {
  const { user, signOutUser } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        setProfile(response.data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Error</h1>
          <p style={styles.error}>{error}</p>
          <button onClick={signOutUser} style={styles.button}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Dashboard</h1>
        {profile && (
          <div style={styles.profileInfo}>
            <p style={styles.welcomeText}>
              Welcome, <span style={styles.highlight}>{profile.name}</span>
            </p>
            <div style={styles.details}>
              <p><strong>Email:</strong> {profile.email}</p>
              {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
              {profile.address && (
                <div style={styles.address}>
                  <strong>Address:</strong>
                  <p>{profile.address.street}</p>
                  <p>{profile.address.city}, {profile.address.state}</p>
                  <p>{profile.address.pincode}</p>
                </div>
              )}
            </div>
          </div>
        )}
        <button onClick={signOutUser} style={styles.button}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8F6F2',
    padding: '20px'
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(61, 123, 242, 0.10)',
    padding: '40px 30px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center' as const
  },
  heading: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#222',
    marginBottom: '24px',
    marginTop: 0
  },
  profileInfo: {
    textAlign: 'left' as const,
    marginBottom: '32px'
  },
  welcomeText: {
    fontSize: '20px',
    color: '#555',
    marginBottom: '24px'
  },
  highlight: {
    color: '#3D7BF2',
    fontWeight: 600
  },
  details: {
    fontSize: '16px',
    color: '#444',
    '& p': {
      marginBottom: '12px'
    }
  },
  address: {
    marginTop: '16px'
  },
  button: {
    width: '100%',
    height: '48px',
    background: '#3D7BF2',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginBottom: 0,
    boxShadow: '0 2px 8px rgba(61, 123, 242, 0.10)'
  },
  error: {
    color: '#D8000C',
    marginBottom: '24px'
  }
};

export default Dashboard; 