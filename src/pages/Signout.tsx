import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'; // Adjust the path based on your file structure
import { signOut } from 'firebase/auth';
import React from 'react';

export const Signout = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('User signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-7">Sign Out</h1>
      <button className="bg-blue-700 text-white rounded-xl py-2 px-4" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};
