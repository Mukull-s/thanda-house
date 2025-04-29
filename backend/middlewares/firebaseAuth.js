const admin = require('../config/firebaseAdmin');

const firebaseAuth = async (req, res, next) => {
  try {
    console.log('Incoming headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header found');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    console.log('Token extracted, length:', token.length);

    try {
      console.log('Verifying token...');
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log('Token verified successfully:', {
        uid: decodedToken.uid,
        email: decodedToken.email,
        projectId: decodedToken.project_id
      });

      req.firebaseUser = decodedToken;
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      if (error.code === 'auth/id-token-expired') {
        return res.status(401).json({ message: 'Token expired' });
      }
      if (error.code === 'auth/id-token-revoked') {
        return res.status(401).json({ message: 'Token revoked' });
      }
      return res.status(401).json({ 
        message: 'Invalid or expired token',
        error: error.message 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = firebaseAuth; 