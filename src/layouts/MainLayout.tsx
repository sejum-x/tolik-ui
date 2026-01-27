import { Outlet, Link } from 'react-router-dom';
import { Brain, LayoutGrid, Activity, User, Settings } from 'lucide-react';

export const MainLayout = () => {
    return (
        <div className="flex h-screen bg-[#0d1117] text-[#c9d1d9]">
            {/* Sidebar */}
            <aside className="w-20 border-r border-white/10 flex flex-col items-center py-6 glass">

                {/* Logo / Home */}
                <Link to="/" className="mb-10 text-blue-500 hover:scale-110 transition-transform" title="Home">
                    <Brain size={32} strokeWidth={2.5} />
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col space-y-8 flex-1">
                    <Link to="/dashboard" className="text-gray-500 hover:text-blue-400 transition-colors" title="Dashboard">
                        <LayoutGrid size={24} />
                    </Link>

                    <Link to="/workspace/default" className="text-gray-500 hover:text-blue-400 transition-colors" title="Workspace">
                        <Activity size={24} />
                    </Link>

                    <Link to="/profile" className="text-gray-500 hover:text-blue-400 transition-colors" title="Profile">
                        <User size={24} />
                    </Link>
                </nav>

                {/* Bottom Action */}
                <div className="mt-auto">
                    <button className="text-gray-600 hover:text-white transition-colors">
                        <Settings size={24} />
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#0d1117]">
                <Outlet />
            </main>
        </div>
    );
};