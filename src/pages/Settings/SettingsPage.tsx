import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

export const SettingsPage = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
                <p className="text-text-secondary mt-1">
                    Manage your preferences and application appearance
                </p>
            </header>

            <section className="dashboard-card p-6 max-w-2xl">
                <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
                    Appearance
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="font-medium text-text-primary">Theme</p>
                        <p className="text-sm text-text-secondary mt-0.5">
                            Choose between light and dark mode for the app, including the sidebar.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={() => setTheme('light')}
                            className={clsx(
                                'flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all',
                                theme === 'light'
                                    ? 'bg-muted-bg border-accent-blue text-accent-blue'
                                    : 'bg-transparent border-border text-text-secondary hover:border-muted-border hover:text-text-primary'
                            )}
                        >
                            <Sun size={18} />
                            Light
                        </button>
                        <button
                            type="button"
                            onClick={() => setTheme('dark')}
                            className={clsx(
                                'flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all',
                                theme === 'dark'
                                    ? 'bg-muted-bg border-accent-blue text-accent-blue'
                                    : 'bg-transparent border-border text-text-secondary hover:border-muted-border hover:text-text-primary'
                            )}
                        >
                            <Moon size={18} />
                            Dark
                        </button>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-text-secondary">
                        Your choice is saved in this browser and will apply on your next visit.
                    </p>
                </div>
            </section>
        </div>
    );
};
