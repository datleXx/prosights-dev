'use client'; 

import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
        onClick={() => signIn('google')}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
