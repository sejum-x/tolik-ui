import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    to: string;
    count?: number;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, count }) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            className={clsx(
                'flex items-center justify-between px-4 py-2.5 my-1 transition-all duration-200 rounded-xl group mx-2',
                isActive
                    ? 'nav-item-active'
                    : 'text-text-secondary hover:bg-white/5 hover:text-white'
            )}
        >
            <div className="flex items-center">
                {/* Icon changes color on active or hover */}
                <Icon size={18} className={clsx('mr-3 transition-colors', isActive ? 'text-white' : 'group-hover:text-white')} />
                <span className="text-sm font-medium">{label}</span>
            </div>
            {count !== undefined && (
                <span className="text-[10px] bg-white/10 text-text-secondary px-2 py-0.5 rounded-full">
                    {count}
                </span>
            )}
        </Link>
    );
};