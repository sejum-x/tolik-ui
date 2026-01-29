import {UserProfile, InvestigationProject, InvestigationStats, DocumentNode} from '@/types';

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const userService = {
    // Fetches the current logged-in user profile
    getProfile: async (): Promise<UserProfile> => {
        await delay(500);
        return {
            id: 'u1',
            fullName: 'Kira Franchuk', //
            email: 'k.franchuk@osint-platform.com',
            role: 'Analyst',
            avatarUrl: 'https://ui-avatars.com/api/?name=KF&background=3b82f6&color=fff'
        };
    }
};

export const investigationService = {
    // Fetches overview stats for the dashboard
    getStats: async (): Promise<InvestigationStats> => {
        await delay(700);
        return {
            totalEntities: 12450,
            processedDocuments: 892,
            activeAlerts: 3,
            growthPercentage: 15
        };
    },

    // Fetches all investigation projects
    getProjects: async (): Promise<InvestigationProject[]> => {
        await delay(600);
        return [
            {
                id: 'p1',
                title: 'Marevo Cloud Analysis', //
                description: 'Analyzing PaaS infrastructure and security vectors.', //
                nodeCount: 24, //
                fileCount: 12, //
                status: 'Active',
                lastModified: '2026-01-27'
            },
            {
                id: 'p2',
                title: 'Lviv IT Cluster Ops', //
                description: 'Monitoring regional IT infrastructure open data.',
                nodeCount: 156,
                fileCount: 45,
                status: 'Team',
                lastModified: '2026-01-28'
            }
        ];
    }
};

export const documentService = {
    // Mocked tree structure as seen in the reference image
    getDocuments: async (): Promise<DocumentNode[]> => {
        await delay(400);
        return [
            {
                id: 'f1', label: "System Management's", count: 12, type: 'folder',
                children: [
                    {
                        id: 'f1-1', label: "2025 Update's", count: 2, type: 'folder',
                        children: [
                            { id: 'file-1', label: 'Hiring Process', count: 4, type: 'file' },
                            { id: 'file-2', label: 'Billing Process', count: 3, type: 'file' }
                        ]
                    },
                    { id: 'f1-2', label: 'Fundamentals', count: 4, type: 'folder' }
                ]
            },
            { id: 'f2', label: 'Off Grid Servers', count: 5, type: 'folder' }
        ];
    }
};