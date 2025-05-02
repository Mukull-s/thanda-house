const admin = require('../config/firebaseAdmin');
const { AppError } = require('../utils/errorHandler');

const firebaseAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.firebaseUser = decodedToken;
      next();
    } catch (error) {
      if (error.code === 'auth/id-token-expired') {
        throw new AppError('Token expired', 401);
      }
      if (error.code === 'auth/id-token-revoked') {
        throw new AppError('Token revoked', 401);
      }
      throw new AppError('Invalid or expired token', 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = firebaseAuth; 