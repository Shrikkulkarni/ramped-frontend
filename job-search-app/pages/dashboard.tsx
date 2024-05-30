import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Job {
  job_name: string;
  company_name: string;
}

export default function Dashboard() {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to search for jobs');
        router.push('/login');
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/jobs?title=${jobTitle}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(response.data);
    } catch (error) {
      alert('Error fetching jobs');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          Search
        </button>
        {jobs.length > 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Job Name</th>
                <th className="text-left py-2">Company Name</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.job_name}>
                  <td className="border-t py-2">{job.job_name}</td>
                  <td className="border-t py-2">{job.company_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {jobs.length === 0 && <p>No jobs found</p>}
      </div>
    </div>
  );
}
