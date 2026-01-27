import { Outlet, Link } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className="flex h-screen bg-[#0d1117]">
            {/* Sidebar */}
            <aside className="w-20 border-r border-white/10 flex flex-col items-center py-6 space-y-8 glass">
                <Link to="/dashboard" title="Dashboard">
                    <div className="text-blue-500 text-2xl">🧠</div>
                </Link>
                <nav className="flex flex-col space-y-6 text-gray-500">
                    <Link title="Workspace" to="/workspace/default" className="hover:text-white transition">📁</Link>
                    <Link title="Profile" to="/profile" className="hover:text-white transition">👤</Link>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};