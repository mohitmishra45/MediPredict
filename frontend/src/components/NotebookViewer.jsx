import React, { useState, useEffect, Suspense } from 'react';
import {
    BarChart2,
    Activity,
    PieChart,
    TrendingUp,
    Grid,
    Thermometer,
    BarChart,
    Download,
    FileText,
    Terminal
} from 'lucide-react';
import Button from './Button';

// Lazy load Plotly to avoid large bundle size issues
const Plot = React.lazy(() => import('react-plotly.js'));

const NotebookViewer = ({ notebookPath, activeTab, onClose }) => {
    const [notebookData, setNotebookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('notebook'); // 'notebook' or 'visualizations'
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    useEffect(() => {
        const fetchNotebookContent = async () => {
            if (!notebookPath) return;

            try {
                setLoading(true);
                // Extract filename
                const filename = notebookPath.split('/').pop();

                const response = await fetch(`${apiUrl}/api/analysis/notebooks/${filename}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch notebook: ${response.statusText}`);
                }

                const data = await response.json();
                setNotebookData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notebook content:', error);
                setLoading(false);
            }
        };

        fetchNotebookContent();
    }, [notebookPath, apiUrl]);

    const handleDownload = async () => {
        if (!notebookPath) return;
        const filename = notebookPath.split('/').pop();

        try {
            const response = await fetch(`${apiUrl}/api/analysis/notebooks/${filename}`);
            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading notebook:', error);
            alert('Failed to download notebook');
        }
    };

    // Extract visualizations from notebook cells
    const getVisualizations = () => {
        if (!notebookData || !notebookData.cells) return [];

        const viz = [];
        let dataFound = false;

        notebookData.cells.forEach((cell, index) => {
            if (cell.outputs) {
                cell.outputs.forEach((output) => {
                    // Check for Plotly JSON output (application/vnd.plotly.v1+json)
                    if (output.data && output.data['application/vnd.plotly.v1+json']) {
                        const plotData = output.data['application/vnd.plotly.v1+json'];
                        dataFound = true;
                        viz.push({
                            id: `viz-${index}`,
                            type: 'plotly',
                            data: plotData.data,
                            layout: plotData.layout,
                            title: plotData.layout?.title?.text || `Visualization ${viz.length + 1}`
                        });
                    }
                    // Check for image output (png/jpeg)
                    else if (output.data && (output.data['image/png'] || output.data['image/jpeg'])) {
                        const mimeType = output.data['image/png'] ? 'image/png' : 'image/jpeg';
                        const imageData = output.data[mimeType];
                        viz.push({
                            id: `viz-${index}`,
                            type: 'image',
                            src: `data:${mimeType};base64,${imageData}`,
                            title: `Chart ${viz.length + 1}`
                        });
                    }
                });
            }
        });

        // Add dummy visualizations if none found (for demonstration/fallback)
        if (!dataFound && notebookData) {
            // Only purely for testing UI if real notebooks don't have Plotly objects
        }

        return viz;
    };

    const visualizations = getVisualizations();

    // Render a markdown cell
    const renderMarkdownCell = (cell, index) => {
        const content = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
        // Basic markdown rendering replacement
        // In a real app, use react-markdown
        const htmlContent = content
            .replace(/#{1,6} (.*)/g, '<h$1>$1</h$1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\n/g, '<br/>');

        return (
            <div key={`md-${index}`} className="py-4 px-6 markdown-content w-full prose prose-invert max-w-none">
                <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="text-slate-300 w-full"
                />
            </div>
        );
    };

    // Render a code cell
    const renderCodeCell = (cell, index) => {
        const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

        return (
            <div key={`code-${index}`} className="mb-4 w-full group">
                {/* Code input */}
                <div className="bg-[#1e1e2e] rounded-lg border border-white/10 overflow-hidden mb-2 shadow-sm">
                    <div className="flex bg-[#2d2d2d] px-4 py-1 text-xs text-gray-400 border-b border-white/5 select-none">
                        <span className="mr-2 font-mono">In [{cell.execution_count || ' '}]:</span>
                        <span className="flex-1">Python</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <pre className="text-blue-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                            <code>{source}</code>
                        </pre>
                    </div>
                </div>

                {/* Code output */}
                {cell.outputs && cell.outputs.length > 0 && (
                    <div className="pl-2 ml-4 border-l-2 border-white/10">
                        {cell.outputs.map((output, i) => {
                            if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                                // Handle text/html
                                if (output.data && output.data['text/html']) {
                                    const html = Array.isArray(output.data['text/html'])
                                        ? output.data['text/html'].join('')
                                        : output.data['text/html'];
                                    return (
                                        <div
                                            key={`out-${i}`}
                                            dangerouslySetInnerHTML={{ __html: html }}
                                            className="overflow-x-auto py-2"
                                        />
                                    );
                                }
                                // Handle text/plain
                                else if (output.data && output.data['text/plain']) {
                                    const text = Array.isArray(output.data['text/plain'])
                                        ? output.data['text/plain'].join('')
                                        : output.data['text/plain'];
                                    return <pre key={`out-${i}`} className="text-slate-400 font-mono text-sm whitespace-pre-wrap py-2">{text}</pre>;
                                }
                                // Handle image
                                else if (output.data && output.data['image/png']) {
                                    return (
                                        <div key={`out-${i}`} className="py-2">
                                            <img
                                                src={`data:image/png;base64,${output.data['image/png']}`}
                                                alt="Output"
                                                className="max-w-full h-auto bg-white rounded-md p-1"
                                            />
                                        </div>
                                    );
                                }
                            } else if (output.output_type === 'stream') {
                                const text = Array.isArray(output.text) ? output.text.join('') : output.text;
                                return <pre key={`out-${i}`} className="text-slate-400 font-mono text-sm whitespace-pre-wrap py-1">{text}</pre>;
                            } else if (output.output_type === 'error') {
                                return (
                                    <div key={`out-${i}`} className="py-2 text-red-400 font-mono text-sm bg-red-900/10 p-2 rounded">
                                        <span className="font-bold">{output.ename}: </span>
                                        <span>{output.evalue}</span>
                                        {output.traceback && (
                                            <div className="mt-1 opacity-75 text-xs">
                                                {output.traceback.join('\n')}
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 animate-pulse">Loading Notebook...</p>
            </div>
        );
    }

    if (!notebookData) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <FileText size={48} className="mb-4 opacity-50" />
                <p>Failed to load notebook content.</p>
                <Button onClick={onClose} variant="ghost" className="mt-4">Back to List</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-black">
                <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="p-1.5 rounded bg-orange-500/20 text-orange-500">
                        <Terminal size={18} />
                    </div>
                    <h3 className="text-sm font-medium text-slate-200 truncate font-mono">
                        {notebookPath.split('/').pop()}
                    </h3>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex bg-black/20 p-0.5 rounded-lg mr-2">
                        <button
                            onClick={() => setViewMode('notebook')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'notebook'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Notebook
                        </button>
                        <button
                            onClick={() => setViewMode('visualizations')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'visualizations'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Charts ({visualizations.length})
                        </button>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Download .ipynb"
                    >
                        <Download size={18} />
                    </button>

                    {onClose && (
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white"
                        >
                            Close
                        </Button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto custom-scrollbar bg-[#1e1e1e]">
                {viewMode === 'visualizations' ? (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {visualizations.length > 0 ? (
                            visualizations.map((viz) => (
                                <div key={viz.id} className="bg-[#2d2d2d] rounded-xl border border-white/5 overflow-hidden shadow-lg p-4">
                                    <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                        <BarChart size={16} className="text-blue-400" />
                                        {viz.title}
                                    </h4>
                                    <div className="bg-black/20 rounded-lg p-2 min-h-[300px] flex items-center justify-center">
                                        {viz.type === 'plotly' ? (
                                            <Suspense fallback={<div className="text-xs text-slate-500">Loading Chart...</div>}>
                                                <Plot
                                                    data={viz.data}
                                                    layout={{
                                                        ...viz.layout,
                                                        width: undefined,
                                                        height: undefined,
                                                        paper_bgcolor: 'rgba(0,0,0,0)',
                                                        plot_bgcolor: 'rgba(0,0,0,0)',
                                                        font: { color: '#cbd5e1' },
                                                        margin: { l: 50, r: 20, t: 30, b: 50 },
                                                        autosize: true
                                                    }}
                                                    style={{ width: '100%', height: '300px' }}
                                                    config={{ responsive: true, displayModeBar: false }}
                                                />
                                            </Suspense>
                                        ) : (
                                            <img src={viz.src} alt={viz.title} className="max-w-full max-h-[300px] object-contain" />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-slate-500">
                                <BarChart2 size={48} className="mx-auto mb-4 opacity-30" />
                                <p>No visualizations detected in this notebook.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
                        {notebookData.cells.map((cell, index) => {
                            if (cell.cell_type === 'markdown') {
                                return renderMarkdownCell(cell, index);
                            } else if (cell.cell_type === 'code') {
                                return renderCodeCell(cell, index);
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotebookViewer;
