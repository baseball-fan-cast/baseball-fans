import React, { useState, useContext } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
// import { Googlesignin } from './Googlesignin';
import { AuthContext } from '../context/AuthContext';
// import DataService from '@/services/DataService';

export const Login = () => {
  const { setToken, setAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      const token = await data?.user?.getIdToken();
      setToken(token);
      // await DataService.login(token);
      setAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-1 h-screen justify-center">
      <div className="flex md:w-2/5  mx-auto flex-col justify-center h-screen ">
        <h2 className="text-2xl text-center font-bold mb-2">Sign In</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email_login"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
            Sign In
          </button>
          <p className="mt-10 text-sm text-center">
            Are you new?
            <NavLink to="/signup" className="underline text-tertiary text-blue-500">
              Sign up
            </NavLink>
          </p>

          {/* <p className="text-center font-bold">or</p>
          <Googlesignin /> */}
        </form>
      </div>
    </div>
  );
};
