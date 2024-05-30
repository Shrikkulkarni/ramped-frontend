import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      router.push('/login');
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between container mx-auto">
          <div>
            <Link href="/" className="text-lg font-bold">
              Job Search App
            </Link>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" className="hover:underline">
                  Sign Up
                </Link>
                <Link href="/login" className="hover:underline">
                  Log In
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2024 Job Search App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
