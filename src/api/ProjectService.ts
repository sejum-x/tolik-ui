import { LibraryProject } from '@/types';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const MOCK_PROJECTS: LibraryProject[] = [
    {
        id: 'lib-1',
        name: 'Marevo Cloud Analysis',
        description: 'PaaS infrastructure and security vector analysis with automated threat mapping.',
        thumbnailUrl: 'https://picsum.photos/seed/marevo/400/240',
        lastModified: '2026-01-28',
        category: 'Infrastructure',
        status: 'Active',
    },
    {
        id: 'lib-2',
        name: 'Lviv IT Cluster Ops',
        description: 'Regional IT infrastructure monitoring and open data aggregation.',
        thumbnailUrl: 'https://picsum.photos/seed/lviv/400/240',
        lastModified: '2026-01-27',
        category: 'Research',
        status: 'Active',
    },
    {
        id: 'lib-3',
        name: 'Network Topology v2',
        description: 'Dynamic network graph visualization and node relationship mapping.',
        thumbnailUrl: 'https://picsum.photos/seed/network/400/240',
        lastModified: '2026-01-25',
        category: 'OSINT',
        status: 'Draft',
    },
    {
        id: 'lib-4',
        name: 'Entity Resolution Pipeline',
        description: 'Cross-source entity matching and deduplication workflows.',
        thumbnailUrl: 'https://picsum.photos/seed/entity/400/240',
        lastModified: '2026-01-24',
        category: 'Security',
        status: 'Active',
    },
    {
        id: 'lib-5',
        name: 'Export Compliance Audit',
        description: 'Historical export compliance checks and documentation.',
        thumbnailUrl: 'https://picsum.photos/seed/compliance/400/240',
        lastModified: '2026-01-20',
        category: 'Research',
        status: 'Archived',
    },
    {
        id: 'lib-6',
        name: 'Dark Web Crawler',
        description: 'Automated crawling and indexing of surface-level dark web sources.',
        thumbnailUrl: 'https://picsum.photos/seed/darkweb/400/240',
        lastModified: '2026-01-18',
        category: 'OSINT',
        status: 'Draft',
    },
    {
        id: 'lib-7',
        name: 'API Gateway Metrics',
        description: 'Real-time API usage dashboards and rate limit monitoring.',
        thumbnailUrl: 'https://picsum.photos/seed/api/400/240',
        lastModified: '2026-01-15',
        category: 'Infrastructure',
        status: 'Active',
    },
    {
        id: 'lib-8',
        name: 'Persona Builder',
        description: 'Digital identity profiling and social graph construction.',
        thumbnailUrl: 'https://picsum.photos/seed/persona/400/240',
        lastModified: '2026-01-12',
        category: 'OSINT',
        status: 'Archived',
    },
    {
        id: 'lib-9',
        name: 'Geo-IP Enrichment',
        description: 'Geographic data enrichment for IP and domain analysis.',
        thumbnailUrl: 'https://picsum.photos/seed/geo/400/240',
        lastModified: '2026-01-10',
        category: 'Security',
        status: 'Active',
    },
];

export const projectService = {
    getProjects: async (): Promise<LibraryProject[]> => {
        await delay(1200);
        return [...MOCK_PROJECTS];
    },

    getCategories: (): string[] => {
        const set = new Set(MOCK_PROJECTS.map((p) => p.category));
        return Array.from(set).sort();
    },
};
