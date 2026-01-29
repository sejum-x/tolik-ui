import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface WidgetProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export const Widget: React.FC<WidgetProps> = ({ children, className, title }) => {
    return (
        <div className={clsx('glass rounded-2xl p-6 flex flex-col relative overflow-hidden group', className)}>
            {title && (
                <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
            )}
            <div className="flex-1">
                {children}
            </div>
            {}
            <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/[0.02] pointer-events-none"></div>
        </div>
    );
};