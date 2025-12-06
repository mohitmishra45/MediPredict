import React from 'react';
import GlassCard from './GlassCard';

const ModelSplitLayout = ({ title, description, inputSection, statsSection }) => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-[1600px]">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 neon-text">{title}</h1>
                <p className="text-gray-400 max-w-3xl mx-auto text-xl">{description}</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {/* Left Column: Input Form */}
                <div className="flex flex-col">
                    <GlassCard className="h-full">
                        <h2 className="text-2xl font-semibold mb-6 text-green-400 border-b border-white/10 pb-4 text-center">
                            Input Parameters
                        </h2>
                        {inputSection}
                    </GlassCard>
                </div>

                {/* Right Column: Accuracy & Stats */}
                <div className="flex flex-col">
                    <GlassCard className="h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

                        <h2 className="text-2xl font-semibold mb-8 text-green-400">Model Performance</h2>

                        {statsSection || (
                            <div className="flex flex-col items-center">
                                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                                    {/* Circular Progress Placeholder */}
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="88"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            className="text-gray-800"
                                        />
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="88"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={2 * Math.PI * 88}
                                            strokeDashoffset={2 * Math.PI * 88 * (1 - 0.92)} // 92% example
                                            className="text-green-500 drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-5xl font-bold text-white">92%</span>
                                        <span className="text-sm text-gray-400 mt-1">Accuracy</span>
                                    </div>
                                </div>

                                <p className="text-gray-400 max-w-xs">
                                    This model has been trained on over 10,000 clinical records to ensure high precision in early detection.
                                </p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default ModelSplitLayout;
