import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { projectService } from '@/api/ProjectService';
import { ProjectCard } from '@/components/Library/ProjectCard';
import { ProjectCardSkeleton } from '@/components/Library/ProjectCardSkeleton';
import { LibraryProject } from '@/types';
import { useNavigate } from 'react-router-dom';

const GRID_COLS = [3, 4, 5] as const;

export const LibraryPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<LibraryProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [gridCols, setGridCols] = useState<3 | 4 | 5>(4);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'alphabetical' | 'lastModified'>('newest');
    const categoryRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    const categories = useMemo(() => ['all', ...projectService.getCategories()], []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (categoryRef.current && !categoryRef.current.contains(target))
                setCategoryOpen(false);
            if (statusRef.current && !statusRef.current.contains(target))
                setStatusOpen(false);
            if (sortRef.current && !sortRef.current.contains(target))
                setSortOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        projectService.getProjects().then((data) => {
            setProjects(data);
            setLoading(false);
        });
    }, []);

    const [width, setWidth] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    const cols =
        width < 640 ? 1 : width < 1024 ? Math.min(gridCols, 2) : gridCols;

    const filteredAndSortedProjects = useMemo(() => {
        const filtered = projects.filter((p) => {
            const matchSearch =
                !search ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());
            const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
            const matchStatus = statusFilter === 'all' || p.status === statusFilter;
            return matchSearch && matchCategory && matchStatus;
        });

        const sorted = [...filtered].sort((a, b) => {
            const dateA = new Date(a.lastModified).getTime();
            const dateB = new Date(b.lastModified).getTime();
            if (sortBy === 'newest' || sortBy === 'lastModified') return dateB - dateA;
            if (sortBy === 'alphabetical')
                return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
            return 0;
        });
        return sorted;
    }, [projects, search, categoryFilter, statusFilter, sortBy]);

    const handleOpen = (id: string) => navigate(`/workspace/${id}`);

    return (
        <div className="space-y-6">
            <motion.header
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                    Library
                </h1>
                <p className="text-text-secondary mt-1">
                    Your project collection with advanced filtering and view controls
                </p>
            </motion.header>

            {/* Toolbar - glassmorphism */}
            <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="sticky top-0 z-20 rounded-2xl border border-border bg-card-bg/70 backdrop-blur-xl p-4 shadow-sm"
            >
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                    {/* Search */}
                    <div className="relative flex-1 min-w-0">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                        />
                        <input
                            type="search"
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted-bg border border-border text-text-primary placeholder:text-text-secondary outline-none focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/20 transition-all"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        {/* Category dropdown */}
                        <div className="relative" ref={categoryRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setCategoryOpen((o) => !o);
                                    setStatusOpen(false);
                                    setSortOpen(false);
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted-bg border border-border text-sm text-text-primary hover:border-muted-border transition-colors"
                            >
                                {categoryFilter === 'all' ? 'All categories' : categoryFilter}
                                <ChevronDown size={14} className={categoryOpen ? 'rotate-180' : ''} />
                            </button>
                            {categoryOpen && (
                                <div className="absolute left-0 top-full mt-1 py-1 min-w-[180px] rounded-xl border border-border bg-card-bg shadow-xl z-30">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => {
                                                setCategoryFilter(cat);
                                                setCategoryOpen(false);
                                            }}
                                            className={`w-full px-4 py-2 text-left text-sm ${
                                                categoryFilter === cat
                                                    ? 'bg-accent-blue/10 text-accent-blue'
                                                    : 'text-text-primary hover:bg-muted-bg'
                                            }`}
                                        >
                                            {cat === 'all' ? 'All categories' : cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Status dropdown */}
                        <div className="relative" ref={statusRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatusOpen((o) => !o);
                                    setCategoryOpen(false);
                                    setSortOpen(false);
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted-bg border border-border text-sm text-text-primary hover:border-muted-border transition-colors"
                            >
                                {statusFilter === 'all' ? 'All statuses' : statusFilter}
                                <ChevronDown size={14} className={statusOpen ? 'rotate-180' : ''} />
                            </button>
                            {statusOpen && (
                                <div className="absolute left-0 top-full mt-1 py-1 min-w-[160px] rounded-xl border border-border bg-card-bg shadow-xl z-30">
                                    {['all', 'Active', 'Draft', 'Archived'].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => {
                                                setStatusFilter(s);
                                                setStatusOpen(false);
                                            }}
                                            className={`w-full px-4 py-2 text-left text-sm ${
                                                statusFilter === s
                                                    ? 'bg-accent-blue/10 text-accent-blue'
                                                    : 'text-text-primary hover:bg-muted-bg'
                                            }`}
                                        >
                                            {s === 'all' ? 'All statuses' : s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort dropdown */}
                        <div className="relative" ref={sortRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSortOpen((o) => !o);
                                    setCategoryOpen(false);
                                    setStatusOpen(false);
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted-bg border border-border text-sm text-text-primary hover:border-muted-border transition-colors"
                            >
                                {sortBy === 'newest' && 'Newest First'}
                                {sortBy === 'alphabetical' && 'Alphabetical (A-Z)'}
                                {sortBy === 'lastModified' && 'Last Modified'}
                                <ChevronDown
                                    size={14}
                                    className={`shrink-0 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {sortOpen && (
                                <div className="absolute left-0 top-full mt-1 py-1 min-w-[200px] rounded-xl border border-border bg-card-bg shadow-xl z-30">
                                    {[
                                        { value: 'newest' as const, label: 'Newest First (by date)' },
                                        { value: 'alphabetical' as const, label: 'Alphabetical (A-Z)' },
                                        { value: 'lastModified' as const, label: 'Last Modified' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                setSortBy(opt.value);
                                                setSortOpen(false);
                                            }}
                                            className={`w-full px-4 py-2 text-left text-sm ${
                                                sortBy === opt.value
                                                    ? 'bg-accent-blue/10 text-accent-blue'
                                                    : 'text-text-primary hover:bg-muted-bg'
                                            }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Grid density */}
                    <div className="flex items-center gap-1 lg:border-l lg:border-border lg:pl-4">
                            {GRID_COLS.map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => setGridCols(n)}
                                    className={`min-w-[32px] px-2 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                        gridCols === n
                                            ? 'bg-accent-blue/15 text-accent-blue'
                                            : 'text-text-secondary hover:bg-muted-bg hover:text-text-primary'
                                    }`}
                                    title={`${n} per row`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                </div>
            </motion.div>

            {/* Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="min-h-[320px] relative"
            >
                {loading ? (
                    <div
                        className="grid gap-5"
                        style={{
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                        }}
                    >
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProjectCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredAndSortedProjects.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <p className="text-text-secondary text-lg">No projects found</p>
                                <p className="text-text-secondary text-sm mt-1">
                                    Try adjusting your search or filters
                                </p>
                            </motion.div>
                        ) : (
                            <div
                                className="grid gap-5"
                                style={{
                                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                                }}
                            >
                                        {filteredAndSortedProjects.map((project) => (
                                            <ProjectCard
                                                key={project.id}
                                                project={project}
                                                onOpen={handleOpen}
                                                layout
                                            />
                                        ))}
                            </div>
                        )}
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};
