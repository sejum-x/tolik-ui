import { useEffect, useState } from 'react';
import { Widget } from '@/components/Widget/Widget';
import { investigationService } from '@/api/mockServices';
import { InvestigationProject, InvestigationStats } from '@/types';
import { Users, FileText, Plus } from 'lucide-react';

// Define which widgets can exist
type WidgetType = 'STATS_ENTITIES' | 'STATS_DOCS' | 'PROJECT_LIST' | 'RECENT_ACTIVITY';

interface ActiveWidget {
    id: string;
    type: WidgetType;
    title: string;
}

export const DashboardPage = () => {
    const [stats, setStats] = useState<InvestigationStats | null>(null);
    const [projects, setProjects] = useState<InvestigationProject[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial state: what the user sees by default
    const [activeWidgets, setActiveWidgets] = useState<ActiveWidget[]>([
        { id: 'w1', type: 'STATS_ENTITIES', title: 'Total Entities' },
        { id: 'w2', type: 'STATS_DOCS', title: 'Processed Documents' },
        { id: 'w3', type: 'PROJECT_LIST', title: 'Investigation Projects' },
    ]);

    useEffect(() => {
        Promise.all([
            investigationService.getStats(),
            investigationService.getProjects()
        ]).then(([statsData, projectsData]) => {
            setStats(statsData);
            setProjects(projectsData);
            setLoading(false);
        });
    }, []);

    const removeWidget = (id: string) => {
        setActiveWidgets(prev => prev.filter(w => w.id !== id));
    };

    const addWidget = (type: WidgetType, title: string) => {
        const newId = `w-${Math.random().toString(36).substr(2, 9)}`;
        setActiveWidgets(prev => [...prev, { id: newId, type, title }]);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">OSINT Dashboard</h1>
                    <p className="text-text-secondary mt-1">Operational overview for Tolik-UI Research Platform</p>
                </div>

                {/* Simple customization menu */}
                <div className="flex gap-2">
                    <button
                        onClick={() => addWidget('RECENT_ACTIVITY', 'System Activity')}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-border px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    >
                        <Plus size={14} /> Add Activity Feed
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeWidgets.map((widget) => (
                    <Widget
                        key={widget.id}
                        id={widget.id}
                        title={widget.title}
                        onRemove={removeWidget}
                        className={widget.type === 'PROJECT_LIST' ? 'lg:col-span-2' : ''}
                    >
                        {/* Renderer based on widget type */}
                        {widget.type === 'STATS_ENTITIES' && (
                            <div className="flex justify-between items-center py-2">
                                <span className="text-5xl font-bold tracking-tighter">
                                    {loading ? '---' : stats?.totalEntities.toLocaleString()}
                                </span>
                                <Users className="text-accent-blue opacity-50" size={40} />
                            </div>
                        )}

                        {widget.type === 'STATS_DOCS' && (
                            <div className="flex justify-between items-center py-2">
                                <span className="text-5xl font-bold tracking-tighter">
                                    {loading ? '---' : stats?.processedDocuments}
                                </span>
                                <FileText className="text-orange-500 opacity-50" size={40} />
                            </div>
                        )}

                        {widget.type === 'PROJECT_LIST' && (
                            <div className="space-y-4">
                                {projects.map(p => (
                                    <div key={p.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div>
                                            <div className="font-bold text-sm">{p.title}</div>
                                            <div className="text-xs text-text-secondary">{p.status} • {p.lastModified}</div>
                                        </div>
                                        <div className="text-[10px] font-mono bg-accent-blue/10 text-accent-blue px-2 py-1 rounded">
                                            {p.nodeCount} NODES
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {widget.type === 'RECENT_ACTIVITY' && (
                            <div className="space-y-3 opacity-80">
                                <div className="text-xs border-l-2 border-accent-blue pl-3 py-1">
                                    <div className="font-bold">New Node Created</div>
                                    <div className="text-text-secondary italic">"IP-Address: 192.168.1.1" tagged in Marevo Cloud</div>
                                </div>
                                <div className="text-xs border-l-2 border-orange-500 pl-3 py-1">
                                    <div className="font-bold">System Alert</div>
                                    <div className="text-text-secondary italic">Unusual data export detected in Lviv IT Cluster Ops</div>
                                </div>
                            </div>
                        )}
                    </Widget>
                ))}
            </div>
        </div>
    );
};