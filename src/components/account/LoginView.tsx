'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '@/app/account/actions';

export function LoginView() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      setError(res?.error || 'An unexpected error occurred.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-soft-ivory px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 border border-jet-black/10 shadow-sm">
        <h1 className="text-3xl font-serif font-bold text-jet-black mb-6 text-center uppercase tracking-tight">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

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
            <label className="block text-xs font-semibold text-jet-black uppercase tracking-wider mb-1">Password</label>
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
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-jet-black/70 hover:text-jet-black underline decoration-1 underline-offset-4"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
