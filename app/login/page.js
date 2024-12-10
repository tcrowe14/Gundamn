// app/login/page.js

"use client";
import { useState } from 'react';
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa'; 
import { auth } from '../_utils/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth'; 
import Header from '../components/header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for email and password
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    try {
      // Sign in using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error signing in', error);
      setError('Failed to login. Please check your credentials.');
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google login successful', result);
      window.location.href = '/'; 
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  // Handle GitHub login
  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('GitHub login successful', result);
      window.location.href = '/';
    } catch (error) {
      console.error('GitHub login error', error);
    }
  };

  // Apple requires paid dev account for SSO
  const handleAppleLogin = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Apple login successful', result);
      window.location.href = '/';
    } catch (error) {
      console.error('Apple login error', error);
    }
  };

  return (
    <main>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8">Login</h1>

          {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Login
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="flex flex-col space-y-2 mt-10">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full p-3 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              Login with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center w-full p-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              Login with GitHub
            </button>
            <button
              onClick={handleAppleLogin}
              className="flex items-center justify-center w-full p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FaApple className="w-5 h-5 mr-2" />
              Login with Apple
            </button>
          </div>

          <p className="mt-4 text-center text-white">
            Don&#39;t have an account?{' '}
            <a href="/signup" className="text-blue-400 hover:text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
}
