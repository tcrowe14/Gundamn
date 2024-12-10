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
        await setDoc(doc(db, 'users', user.uid), { username }, { merge: true });
      } catch (error) {
        console.error('Error saving username: ', error);
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
          if (error.code === 'auth/requires-recent-login') {
            alert('Please re-authenticate to delete your account.');
          } else {
            console.error('Error deleting user: ', error);
          }
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="container mx-auto p-4">
        {user ? (
          <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`}
                alt="User Avatar"
                className="rounded-full w-24 h-24"
              />
            </div>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Welcome, {username || user.email}</h2>
              <p>Email: {user.email}</p>
              <p>Member Since: {new Date(signupDate).toLocaleDateString()}</p>
            </div>
            <form onSubmit={handleUsernameSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your username"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Username'}
              </button>
            </form>
            <button
              onClick={handleSignOut}
              className="w-full mt-4 p-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Sign Out
            </button>
            <button
              onClick={() => {
                const email = prompt('Please enter your email for re-authentication:');
                const password = prompt('Please enter your password for re-authentication:');
                setReauthEmail(email);
                setReauthPassword(password);
                handleReauthenticate();
              }}
              className="w-full mt-4 p-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Delete Account
            </button>
          </div>
        ) : (
          <div className="text-center">Please log in to continue.</div>
        )}
      </div>
    </main>
  );
}