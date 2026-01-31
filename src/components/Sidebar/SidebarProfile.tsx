import { User, ChevronDown } from 'lucide-react';

export const SidebarProfile = () => {
    return (
        <div className="flex items-center p-4 mb-6 glass rounded-xl cursor-pointer hover:bg-sidebar-active transition-colors">
            {}
            <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue mr-3">
                <User size={24} />
            </div>
            <div className="flex-1 overflow-hidden">
                <h4 className="font-semibold text-sm truncate leading-tight">Аналітик OSINT</h4>
                <p className="text-xs text-sidebar-muted truncate">analyst@tolik-osint.com</p>
            </div>
            <ChevronDown size={16} className="text-sidebar-muted ml-2" />
        </div>
    );
};