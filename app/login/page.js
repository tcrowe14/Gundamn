"use client"
import Header from '../components/header';
import { useState } from 'react';
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Basic validation for email and password
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }
  
      setError('');
      // You can handle login logic here, for example, call an API to verify credentials
  
      console.log('Login successful');
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
            onClick={() => signIn('google')}
            className="flex items-center justify-center w-full p-3 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <FaGoogle className="w-5 h-5 mr-2" />
            Login with Google
          </button>
          <button
            onClick={() => signIn('github')}
            className="flex items-center justify-center w-full p-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Login with GitHub
          </button>
          <button
            onClick={() => signIn('apple')}
            className="flex items-center justify-center w-full p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <FaApple className="w-5 h-5 mr-2" />
            Login with Apple
          </button>
        </div>

        <p className="mt-4 text-center text-white">
          Don't have an account?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
      
    </main>
  );
}
