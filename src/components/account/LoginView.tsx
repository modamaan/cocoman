'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, recoverPassword } from '@/app/account/actions';

export function LoginView() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRecovering, setIsRecovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  async function handleRecover(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    const res = await recoverPassword(email);
    
    if (res?.success) {
      setSuccessMsg('We have sent an email with instructions to reset your password.');
      setIsRecovering(false);
    } else {
      setError(res?.error || 'Failed to send recovery email.');
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    let res;
    if (isLogin) {
      res = await login(email, password);
    } else {
      res = await register(email, password, firstName, lastName);
    }

    if (res?.success) {
      router.refresh(); // Refresh the page to load the protected account view
    } else {
      // Custom friendly error if they already exist (e.g. from Early Access)
      if (!isLogin && res?.error?.includes('Email may already be in use')) {
        setError('An account with this email already exists (perhaps from Early Access). Please sign in or reset your password.');
      } else {
        setError(res?.error || 'An unexpected error occurred.');
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-soft-ivory px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 border border-jet-black/10 shadow-sm">
        <h1 className="text-3xl font-serif font-bold text-jet-black mb-6 text-center uppercase tracking-tight">
          {isRecovering ? 'Reset Password' : (isLogin ? 'Sign In' : 'Create Account')}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm border border-green-200">
            {successMsg}
          </div>
        )}

        {isRecovering ? (
          <form onSubmit={handleRecover} className="flex flex-col gap-4">
            <p className="text-sm text-jet-black/70 mb-2">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <div>
              <label className="block text-xs font-semibold text-jet-black uppercase tracking-wider mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                className="w-full border border-jet-black/20 p-3 bg-transparent text-jet-black focus:outline-none focus:border-jet-black transition-colors"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 w-full bg-jet-black text-soft-ivory py-3 px-6 text-sm font-semibold uppercase tracking-wider hover:bg-jet-black/90 transition-colors disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className="mt-4 text-center">
              <button 
                type="button"
                onClick={() => { setIsRecovering(false); setError(''); setSuccessMsg(''); }}
                className="text-sm text-jet-black/70 hover:text-jet-black underline decoration-1 underline-offset-4"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-jet-black uppercase tracking-wider mb-1">First Name</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      required 
                      className="w-full border border-jet-black/20 p-3 bg-transparent text-jet-black focus:outline-none focus:border-jet-black transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-jet-black uppercase tracking-wider mb-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      required 
                      className="w-full border border-jet-black/20 p-3 bg-transparent text-jet-black focus:outline-none focus:border-jet-black transition-colors"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-jet-black uppercase tracking-wider mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full border border-jet-black/20 p-3 bg-transparent text-jet-black focus:outline-none focus:border-jet-black transition-colors"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-jet-black uppercase tracking-wider">Password</label>
                  {isLogin && (
                    <button 
                      type="button"
                      onClick={() => { setIsRecovering(true); setError(''); setSuccessMsg(''); }}
                      className="text-xs text-jet-black/70 hover:text-jet-black underline decoration-1 underline-offset-2"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  minLength={5}
                  className="w-full border border-jet-black/20 p-3 bg-transparent text-jet-black focus:outline-none focus:border-jet-black transition-colors"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="mt-4 w-full bg-jet-black text-soft-ivory py-3 px-6 text-sm font-semibold uppercase tracking-wider hover:bg-jet-black/90 transition-colors disabled:opacity-70"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }}
                className="text-sm text-jet-black/70 hover:text-jet-black underline decoration-1 underline-offset-4"
              >
                {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
