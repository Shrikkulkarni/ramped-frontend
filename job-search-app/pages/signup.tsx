import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/signup', { email, password });
      alert('Sign up successful');
      router.push('/login');
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
