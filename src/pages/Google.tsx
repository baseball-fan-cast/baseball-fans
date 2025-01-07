import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Google = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up with Google:', error);
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
