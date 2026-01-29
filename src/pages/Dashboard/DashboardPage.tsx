import { useEffect, useState } from 'react';
import { Widget } from '@/components/Widget/Widget';
import { investigationService } from '@/api/mockServices';
import { InvestigationProject, InvestigationStats } from '@/types';
import { Users, FileText } from 'lucide-react';

export const DashboardPage = () => {
    const [stats, setStats] = useState<InvestigationStats | null>(null);
    const [projects, setProjects] = useState<InvestigationProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Parallel data fetching
        Promise.all([
            investigationService.getStats(),
            investigationService.getProjects()
        ]).then(([statsData, projectsData]) => {
            setStats(statsData);
            setProjects(projectsData);
            setLoading(false);
        });
    }, []);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Investigation Dashboard</h1>
                <p className="text-gray-400">Overview of your current OSINT operations.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Widget title="Total Entities" className={loading ? 'animate-pulse' : ''}>
                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold">{stats?.totalEntities.toLocaleString() || '0'}</span>
                        <Users className="text-blue-500" size={32} />
                    </div>
                </Widget>
                <Widget title="Processed Documents">
                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold">{stats?.processedDocuments || '0'}</span>
                        <FileText className="text-orange-500" size={32} />
                    </div>
                </Widget>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <Widget key={project.id} title={project.title}>
                        <p className="text-sm text-gray-400 mb-4 h-10 line-clamp-2">{project.description}</p>
                        <div className="flex justify-between text-xs font-mono text-blue-400">
                            <span>NODES: {project.nodeCount}</span>
                            <span>FILES: {project.fileCount}</span>
                        </div>
                    </Widget>
                ))}
            </div>
        </div>
    );
};