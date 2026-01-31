import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';
import { DocumentNode } from '@/types';

interface TreeItemProps {
    node: DocumentNode;
    level?: number;
}

export const SidebarTreeItem: React.FC<TreeItemProps> = ({ node, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ paddingLeft: `${level * 12 + 16}px` }}
                className="w-full flex items-center justify-between py-1.5 pr-4 text-sm text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-active transition-all rounded-lg group"
            >
                <div className="flex items-center gap-2">
                    {hasChildren ? (
                        isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : (
                        <div className="w-[14px]" />
                    )}
                    {node.type === 'folder' ? <Folder size={16} className="text-sidebar-muted" /> : <FileText size={16} className="text-sidebar-muted" />}
                    <span className="truncate">{node.label}</span>
                </div>
                {node.count !== undefined && (
                    <span className="text-[10px] opacity-40 group-hover:opacity-100">{node.count}</span>
                )}
            </button>

            {/* Render children recursively if the folder is open */}
            {isOpen && hasChildren && (
                <div className="mt-1 border-l border-sidebar-border ml-4">
                    {node.children!.map((child) => (
                        <SidebarTreeItem key={child.id} node={child} level={level} />
                    ))}
                </div>
            )}
        </div>
    );
};