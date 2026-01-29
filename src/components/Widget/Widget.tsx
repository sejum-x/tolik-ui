import React, { ReactNode } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface WidgetProps {
    id: string;
    children: ReactNode;
    className?: string;
    title?: string;
    onRemove?: (id: string) => void; // Callback to remove widget
}

export const Widget: React.FC<WidgetProps> = ({ id, children, className, title, onRemove }) => {
    return (
        <div className={clsx('dashboard-card p-6 flex flex-col relative overflow-hidden group', className)}>
            <div className="flex justify-between items-start mb-4">
                {title && (
                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                        {title}
                    </h3>
                )}
                {/* Remove Button - visible on hover */}
                {onRemove && (
                    <button
                        onClick={() => onRemove(id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-md transition-all text-text-secondary hover:text-white"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
            <div className="flex-1 text-text-primary">
                {children}
            </div>
        </div>
    );
};