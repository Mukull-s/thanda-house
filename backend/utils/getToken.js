const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyC-XUkGX6FZVnU4rZNJX3j-Gpm0HvNZwOU",
  authDomain: "thandahouse-13ff3.firebaseapp.com",
  projectId: "thandahouse-13ff3",
  storageBucket: "thandahouse-13ff3.appspot.com",
  messagingSenderId: "640387008694",
  appId: "1:640387008694:web:20ee5221f3dfbf718fbe17",
  measurementId: "G-FR7DBF563G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function getTestToken() {
  try {
    // Test user credentials
    const email = "test@example.com";
    const password = "password123";

    let userCredential;
    try {
      // Try to sign in first
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (signInError) {
      console.log('User does not exist, creating new user...');
      // If sign in fails, create a new user
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    }

    const user = userCredential.user;
    
    // Get the ID token
    const token = await user.getIdToken();
    console.log('\nFirebase ID Token:', token);
    console.log('\nUse this token in your Authorization header like this:');
    console.log('Authorization: Bearer', token);
    console.log('\nFirebase UID:', user.uid);
    
    return token;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Run the function
getTestToken(); 