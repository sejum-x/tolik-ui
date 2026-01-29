import { useEffect, useState } from 'react';
import { LayoutDashboard, Library, Share2, Plus, Search, Settings } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { SidebarProfile } from './SidebarProfile';
import { SidebarTreeItem } from './SidebarTree';
import { documentService } from '@/api/mockServices';
import { DocumentNode } from '@/types';

export const Sidebar = () => {
    const [docs, setDocs] = useState<DocumentNode[]>([]);

    useEffect(() => {
        // Fetch document hierarchy from mocked service
        documentService.getDocuments().then(data => setDocs(data));
    }, []);

    return (
        <aside className="w-72 h-screen flex flex-col bg-sidebar-bg border-r border-border overflow-hidden">
            <div className="p-4">
                <SidebarProfile />
            </div>

            <nav className="flex-1 overflow-y-auto px-2 space-y-8 custom-scrollbar">
                {/* Main Navigation */}
                <section>
                    <h3 className="px-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Projects</h3>
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
                    <SidebarItem icon={Library} label="Library" to="/library" />
                    <SidebarItem icon={Share2} label="Shared Projects" to="/shared" />
                </section>

                {/* Documents Section with Search & Collapsible Tree */}
                <section>
                    <div className="flex items-center justify-between px-4 mb-4">
                        <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Documents</h3>
                        <Plus size={14} className="text-text-secondary cursor-pointer hover:text-white" />
                    </div>

                    {/* Search Field */}
                    <div className="relative mx-4 mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
                        <input
                            placeholder="Search docs..."
                            className="w-full bg-white/5 border border-white/5 rounded-lg py-1.5 pl-9 text-xs text-white outline-none focus:border-white/20"
                        />
                    </div>

                    <div className="space-y-0.5">
                        {docs.map(node => (
                            <SidebarTreeItem key={node.id} node={node} />
                        ))}
                    </div>
                </section>
            </nav>

            <div className="p-4 border-t border-border">
                <SidebarItem icon={Settings} label="Settings" to="/settings" />
            </div>
        </aside>
    );
};