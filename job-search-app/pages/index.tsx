import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Job Search App</h1>
      <p className="text-lg mb-8">Find your dream job today!</p>
      <nav className="space-x-4">
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
        <Link href="/login" className="text-blue-500 hover:underline">
          Log In
        </Link>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
