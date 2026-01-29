import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar/Sidebar';

export const MainLayout = () => {
    return (
        <div className="flex h-screen bg-bg-main overflow-hidden">
            {}
            <Sidebar />

            {}
            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                {}
                <div className="absolute top-0 left-0 w-full h-96 bg-accent/5 blur-[120px] -z-10 pointer-events-none"></div>
                <Outlet />
            </main>
        </div>
    );
};