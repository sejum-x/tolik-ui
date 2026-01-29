// Core data models for the OSINT platform
export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    role: 'Admin' | 'Analyst' | 'Observer'; //
    avatarUrl?: string;
}

export interface InvestigationStats {
    totalEntities: number;
    processedDocuments: number;
    activeAlerts: number;
    growthPercentage: number;
}

export interface InvestigationProject {
    id: string;
    title: string;
    description: string;
    nodeCount: number;
    fileCount: number;
    status: 'Active' | 'Archived' | 'Team';
    lastModified: string;
}

// Define recursive structure for documents
export interface DocumentNode {
    id: string;
    label: string;
    count?: number;
    type: 'folder' | 'file';
    children?: DocumentNode[]; // Nested items
}