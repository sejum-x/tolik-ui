import { motion } from 'framer-motion';

export const ProjectCardSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col rounded-2xl border border-border bg-card-bg/60 overflow-hidden"
        >
            <div className="aspect-video bg-muted-bg animate-pulse" />
            <div className="flex flex-col flex-1 p-4 space-y-3">
                <div className="flex justify-between gap-2">
                    <div className="h-4 w-2/3 rounded-md bg-muted-bg animate-pulse" />
                    <div className="h-6 w-6 rounded-md bg-muted-bg animate-pulse" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted-bg animate-pulse" />
                    <div className="h-3 w-3/4 rounded bg-muted-bg animate-pulse" />
                </div>
                <div className="flex justify-between pt-3 mt-auto">
                    <div className="h-3 w-16 rounded bg-muted-bg animate-pulse" />
                    <div className="h-3 w-20 rounded bg-muted-bg animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
};
