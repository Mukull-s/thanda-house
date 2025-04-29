const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

try {
  // Get absolute path to service account file
  const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
  
  // Check if file exists
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error('Firebase service account file not found at: ' + serviceAccountPath);
  }

  // Load and validate service account
  const serviceAccount = require(serviceAccountPath);
  
  // Validate required fields
  if (!serviceAccount.project_id) {
    throw new Error('Service account is missing project_id');
  }
  if (!serviceAccount.client_email) {
    throw new Error('Service account is missing client_email');
  }
  if (!serviceAccount.private_key) {
    throw new Error('Service account is missing private_key');
  }

  console.log('Service account loaded:', {
    project_id: serviceAccount.project_id,
    client_email: serviceAccount.client_email,
    private_key_length: serviceAccount.private_key ? serviceAccount.private_key.length : 0
  });

  // Initialize Firebase Admin if not already initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully with project:', serviceAccount.project_id);
  } else {
    console.log('Firebase Admin already initialized');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  throw error; // Re-throw to prevent app from starting with invalid config
}

module.exports = admin; 