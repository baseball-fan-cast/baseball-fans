import React, { useState, useContext } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
// import { Google } from './Google';
import { AuthContext } from '../context/AuthContext';
import { Logo } from '@/components/Logo';
import DataService from '@/services/DataService';

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
      await DataService.login(token);
      setAuthenticated(true);
      navigate('/follow');
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-1 h-screen justify-center bg-sky-950">
      <div className="flex md:w-2/5 h-auto m-auto flex-col justify-center bg-white px-4 py-9">
        <Logo className="w-[100px] m-4 " />
        <h2 className="text-2xl font-bold my-2 px-4">Sign In</h2>
        <form className="mt-8 space-y-6 px-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email-address">Email address</label>
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
            <label htmlFor="password">Password</label>
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

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-2xl">
            Sign In
          </button>
          <p className="mt-10 text-sm text-center">
            New to MLB?
            <NavLink to="/signup" className="pl-2 text-tertiary text-blue-500">
              Sign up
            </NavLink>
          </p>

          {/* <p className="text-center font-bold">or</p>
          <Google isLogin={true} /> */}
        </form>
      </div>
    </div>
  );
};
