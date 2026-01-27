import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center h-screen text-white text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <p className="text-2xl mt-4">NOT FOUND</p>
        <Link to="/" className="mt-8 text-blue-400 hover:underline">BACK</Link>
    </div>
);