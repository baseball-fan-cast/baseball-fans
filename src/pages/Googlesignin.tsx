import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';

export const Googlesignin = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <button className="bg-red-700 text-white rounded-xl w-full p-2" onClick={signInWithGoogle}>
        Continue with Google
      </button>
    </div>
  );
};
