import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, ExternalLink, Copy, Archive, Trash2 } from 'lucide-react';
import { LibraryProject } from '@/types';
import clsx from 'clsx';

interface ProjectCardProps {
    project: LibraryProject;
    onOpen?: (id: string) => void;
    layout?: boolean;
}

const STATUS_CONFIG: Record<
    LibraryProject['status'],
    { bg: string; text: string }
> = {
    Active: {
        bg: 'bg-emerald-500 dark:bg-emerald-600',
        text: 'text-white',
    },
    Draft: {
        bg: 'bg-amber-400 dark:bg-amber-500',
        text: 'text-amber-950 dark:text-white',
    },
    Archived: {
        bg: 'bg-slate-500 dark:bg-slate-600',
        text: 'text-white',
    },
};

export const ProjectCard = ({ project, onOpen, layout }: ProjectCardProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [imgError, setImgError] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <motion.article
            layout={layout}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col rounded-2xl border border-border bg-card-bg/80 backdrop-blur-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:border-muted-border transition-all duration-300"
        >
            {/* Thumbnail */}
            <div
                className="relative aspect-video overflow-hidden bg-muted-bg cursor-pointer"
                onClick={() => onOpen?.(project.id)}
            >
                {imgError ? (
                    <div className="w-full h-full bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 flex items-center justify-center">
                        <span className="text-4xl font-bold text-accent-blue/40">
                            {project.name.charAt(0)}
                        </span>
                    </div>
                ) : (
                    <img
                        src={project.thumbnailUrl}
                        alt={project.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Status banner - most visible element on card */}
            <div
                className={clsx(
                    'px-4 py-2.5 font-bold text-sm uppercase tracking-wider',
                    STATUS_CONFIG[project.status].bg,
                    STATUS_CONFIG[project.status].text
                )}
            >
                {project.status}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3
                        className="font-bold text-base text-text-primary line-clamp-1 cursor-pointer hover:text-accent-blue transition-colors"
                        onClick={() => onOpen?.(project.id)}
                    >
                        {project.name}
                    </h3>
                    <div className="relative shrink-0" ref={menuRef}>
                        <button
                            type="button"
                            onClick={() => setMenuOpen((o) => !o)}
                            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted-bg transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Actions"
                        >
                            <MoreVertical size={18} />
                        </button>
                        <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full mt-1 py-1 min-w-[160px] rounded-xl border border-border bg-card-bg shadow-xl z-10"
                            >
                                <button
                                    type="button"
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-muted-bg"
                                    onClick={() => {
                                        onOpen?.(project.id);
                                        setMenuOpen(false);
                                    }}
                                >
                                    <ExternalLink size={14} /> Open
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-muted-bg"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Copy size={14} /> Duplicate
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-muted-bg"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Archive size={14} /> Archive
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2 mt-1 flex-1">
                    {project.description}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-text-secondary font-medium">
                        {project.category}
                    </span>
                    <span className="text-[11px] text-text-secondary/80">
                        {project.lastModified}
                    </span>
                </div>
            </div>
        </motion.article>
    );
};
