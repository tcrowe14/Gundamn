"use client";
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, db } from '../_utils/firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import Header from '../components/header';

export default function Profile() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [signupDate, setSignupDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [reauthEmail, setReauthEmail] = useState('');
  const [reauthPassword, setReauthPassword] = useState('');

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { username });
      } catch (error) {
        console.error('Error saving username: ', error);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (user) {
      const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (confirmed) {
        try {
          // Delete user data from Firestore
          await deleteDoc(doc(db, 'users', user.uid));
          // Delete user account
          await deleteUser(user);
          setUser(null);
        } catch (error) {
          console.error('Error deleting user: ', error);
        }
      }
    }
  };

  const handleReauthenticate = async () => {
    const credential = EmailAuthProvider.credential(reauthEmail, reauthPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      handleDeleteUser();
    } catch (error) {
      console.error('Error reauthenticating: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userDoc.data().username);
          setSignupDate(userData.signupDate);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header />
      {user ? (
        <div>
          <div>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`}
              alt="User Avatar"
              style={{ borderRadius: '50%', width: '100px', height: '100px' }}
            />
          </div>
          <div>Welcome, {username || user.email}</div>
          <div>Email: {user.email}</div>
          <div>Member Since: {new Date(signupDate).toLocaleDateString()}</div>
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Username'}
            </button>
          </form>
          <button onClick={handleSignOut}>Sign Out</button>
          <div>
          <button
              onClick={() => {
                const email = prompt('Please enter your email for re-authentication:');
                const password = prompt('Please enter your password for re-authentication:');
                setReauthEmail(email);
                setReauthPassword(password);
                handleReauthenticate();
              }}
              style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
            >
              Delete Account
            </button>
            </div>
          </div>
      ) : (
        <div>Please log in to continue.</div>
      )}
    </main>
  );
}