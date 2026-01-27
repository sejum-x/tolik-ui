import { Link } from 'react-router-dom';
import { ArrowRight, Brain } from 'lucide-react';

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="z-10 flex flex-col items-center">
                <div className="text-blue-500 mb-6 animate-bounce">
                    <Brain size={64} />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    OSINT <span className="text-blue-500">KNOWLEDGE</span> OS
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
                    A professional platform for collecting open data, semantic analysis, and real-time visualization of complex relationships.
                </p>

                <Link
                    to="/dashboard"
                    className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                    Start
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};