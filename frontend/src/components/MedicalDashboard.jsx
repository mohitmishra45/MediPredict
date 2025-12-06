import React, { useState, useEffect } from 'react';
import {
    Heart,
    Activity,
    Brain,
    Wind,
    User,
    Droplet,
    Menu,
    X,
    ChevronRight,
    Search,
    Bell,
    Settings,
    LogOut,
    Sun,
    Moon,
    Check,
    Info,
    TrendingUp,
    Stethoscope,
    CheckCircle2,
    AlertCircle,

    Github,
    Sparkles,
    Send,
    Bot,
    User as UserIcon,
    Image as ImageIcon,
    BarChart2,
    ChevronDown,
    FileText,
    BookOpen,
    Dna,
    FileCode
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Logo3D from './Logo3D';
import ParticleBackground from './ParticleBackground';
import Footer from './Footer';
import GlassCard from './GlassCard';
import ModelSplitLayout from './ModelSplitLayout';
import Button from './Button';
import Input from './Input';
import Badge from './Badge';
import ProgressBar from './ProgressBar';
import Skeleton from './Skeleton';
import NeonTitle from './NeonTitle';
import Tooltip from './Tooltip';
import NotebookViewer from './NotebookViewer';

// Import 3D Images
import heart3d from '../assets/heart-3d.png';
import liver3d from '../assets/liver-3d.png';
import diabetes3d from '../assets/diabetes-3d.png';
// Placeholders for now, will be replaced by generated images
import brain3d from '../assets/brain-3d.png';

import kidney3d from '../assets/kidney-3d.png';
import robot3d from '../assets/robot-3d.png';


const MedicalDashboard = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.location.hash.replace('#', '') || 'home';
        }
        return 'home';
    });

    // Sync activeTab with URL hash
    useEffect(() => {
        window.location.hash = activeTab;
    }, [activeTab]);

    // Listen for browser navigation (back/forward)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '') || 'home';
            setActiveTab(hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [predictions, setPredictions] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [themeColor, setThemeColor] = useState('#f97316'); // Default Orange
    const [showSettings, setShowSettings] = useState(false);
    const [accuracyScores, setAccuracyScores] = useState({});

    // Chat State
    const [chatMessages, setChatMessages] = useState([
        { role: 'bot', text: "Hello! I'm your AI health assistant. Describe your symptoms or ask me any health-related questions, and I'll help you analyze them." }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatImage, setChatImage] = useState(null);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    // Form State for Controlled Inputs
    const [formValues, setFormValues] = useState({});

    const [notebooks, setNotebooks] = useState([]);
    const [plots, setPlots] = useState([]);
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [selectedPlot, setSelectedPlot] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, activeTab]);

    useEffect(() => {
        if (activeTab === 'notebooks') {
            fetch(`${apiUrl}/api/analysis/notebooks`)
                .then(res => res.json())
                .then(data => setNotebooks(data))
                .catch(err => console.error(err));
        } else if (activeTab === 'correlations') {
            fetch(`${apiUrl}/api/analysis/plots`)
                .then(res => res.json())
                .then(data => setPlots(data))
                .catch(err => console.error(err));
        }
    }, [activeTab]);

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMessage = chatInput;
        const currentImage = chatImage;

        // Create message object for UI
        const uiMessage = { role: 'user', text: userMessage };
        if (currentImage) {
            uiMessage.image = currentImage;
        }

        setChatMessages(prev => [...prev, uiMessage]);
        setChatInput('');
        setChatImage(null);
        setIsChatLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/ai-tracker/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    image: currentImage // This is already a base64 string from the reader
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setChatMessages(prev => [...prev, { role: 'bot', text: data.response }]);
            } else {
                setChatMessages(prev => [...prev, { role: 'bot', text: `Error: ${data.error || 'Failed to get response'}` }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setChatMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting to the server. Please try again later." }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    useEffect(() => {
        fetch(`${apiUrl}/api/metrics`)
            .then(res => res.json())
            .then(data => setAccuracyScores(data))
            .catch(err => {
                console.error("Failed to fetch metrics", err);
                alert(`Failed to fetch metrics from ${apiUrl}. Error: ${err.message}`);
            });
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const colors = [
        { name: 'Green', value: '#22c55e' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Purple', value: '#a855f7' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Orange', value: '#f97316' },
        { name: 'Yellow', value: '#eab308' },
        { name: 'Cyan', value: '#06b6d4' },
        { name: 'Red', value: '#ef4444' },
    ];

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', themeColor);

        // Helper to adjust brightness
        const adjustBrightness = (hex, percent) => {
            const num = parseInt(hex.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) + amt;
            const G = (num >> 8 & 0x00FF) + amt;
            const B = (num & 0x0000FF) + amt;
            return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
        };

        root.style.setProperty('--color-primary-light', adjustBrightness(themeColor, 40));
        root.style.setProperty('--color-primary-dark', adjustBrightness(themeColor, -40));

        // Convert hex to rgb for glow effects
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 255, 65';
        };

        const rgb = hexToRgb(themeColor);
        root.style.setProperty('--glow-primary', `0 0 10px rgba(${rgb}, 0.3), 0 0 20px rgba(${rgb}, 0.15)`);
        root.style.setProperty('--glow-primary-strong', `0 0 15px rgba(${rgb}, 0.4), 0 0 30px rgba(${rgb}, 0.2)`);
        root.style.setProperty('--glow-subtle', `0 0 5px rgba(${rgb}, 0.15)`);

    }, [themeColor]);



    const handleInputChange = (diseaseId, field, value) => {
        setFormValues(prev => ({
            ...prev,
            [diseaseId]: {
                ...prev[diseaseId],
                [field]: value
            }
        }));
    };

    const fillRandomValues = (diseaseId) => {
        const disease = diseases.find(d => d.id === diseaseId);
        if (!disease || !disease.profiles) return;

        // 1. Randomly select a profile (Healthy or At Risk)
        const profileType = Math.random() > 0.5 ? 'healthy' : 'risk';
        const profile = disease.profiles[profileType];

        console.log(`Generating ${profileType} sample for ${disease.name}`);

        const randomValues = {};

        disease.fields.forEach(field => {
            let baseValue = profile[field.name];

            // If the profile doesn't define this field, fallback to random min/max
            if (baseValue === undefined) {
                if (field.type === 'number') {
                    const min = field.min !== undefined ? field.min : 0;
                    const max = field.max !== undefined ? field.max : 100;
                    baseValue = (min + max) / 2; // Midpoint as fallback
                } else {
                    return; // Skip text fields if not in profile
                }
            }

            if (field.type === 'number') {
                // Add some randomness (jitter) to the base value
                // +/- 10% variation or based on step
                const variation = (field.max - field.min) * 0.05; // 5% of range
                const minVal = Math.max(field.min, baseValue - variation);
                const maxVal = Math.min(field.max, baseValue + variation);

                const step = field.step || 1;
                const precision = step.toString().split('.')[1]?.length || 0;

                const rawVal = Math.random() * (maxVal - minVal) + minVal;
                let val = parseFloat(rawVal.toFixed(precision));

                // Special handling for Stroke Age: Integers for adults, decimals for children
                if (diseaseId === 'stroke' && field.name === 'age' && val >= 1) {
                    val = Math.round(val);
                }

                randomValues[field.name] = val;
            } else {
                // For text, just use the profile value directly
                randomValues[field.name] = baseValue;
            }
        });

        setFormValues(prev => ({
            ...prev,
            [diseaseId]: randomValues
        }));
    };

    const openNotebook = (notebookName) => {
        if (!notebookName) return;
        setActiveTab('notebooks');
        // Ensure it has .ipynb extension if not present (though we will set it fully)
        const fullPath = notebookName.endsWith('.ipynb') ? notebookName : `${notebookName}.ipynb`;
        setSelectedNotebook(fullPath);
    };

    // Disease configurations
    const diseases = [
        {
            id: 'heart',
            name: 'Heart Disease',
            shortName: 'Heart',
            icon: Heart,
            image: heart3d,
            color: 'text-rose-500',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20',
            gradient: 'from-rose-500 to-pink-600',
            description: 'Cardiovascular health assessment',
            fields: [
                { name: 'age', label: 'Age', type: 'number', min: 29, max: 77 },
                { name: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', min: 0, max: 1 },
                { name: 'cp', label: 'Chest Pain Type (1-4)', type: 'number', min: 1, max: 4 },
                { name: 'trestbps', label: 'Resting Blood Pressure', type: 'number', min: 94, max: 200 },
                { name: 'chol', label: 'Cholesterol (mg/dl)', type: 'number', min: 126, max: 564 },
                { name: 'thalach', label: 'Max Heart Rate', type: 'number', min: 71, max: 202 },
            ],
            notebook: 'heart_disease.ipynb',
            profiles: {
                healthy: { age: 45, sex: 1, cp: 1, trestbps: 120, chol: 200, thalach: 160 },
                risk: { age: 60, sex: 1, cp: 4, trestbps: 160, chol: 300, thalach: 110 }
            }
        },
        {
            id: 'diabetes',
            name: 'Diabetes',
            shortName: 'Diabetes',
            icon: Droplet,
            image: diabetes3d,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            gradient: 'from-blue-500 to-cyan-600',
            description: 'Blood glucose & insulin analysis',
            fields: [
                { name: 'glucose', label: 'Glucose Level (mg/dL)', type: 'number', min: 0, max: 199 },
                { name: 'bloodPressure', label: 'Blood Pressure (mmHg)', type: 'number', min: 0, max: 122 },
                { name: 'bmi', label: 'BMI', type: 'number', min: 0, max: 67.1, step: 0.1 },
                { name: 'age', label: 'Age', type: 'number', min: 21, max: 81 },
                { name: 'insulin', label: 'Insulin Level', type: 'number', min: 0, max: 846 },
                { name: 'pregnancies', label: 'Pregnancies', type: 'number', min: 0, max: 17 },
            ],
            notebook: 'diabetese.ipynb',
            profiles: {
                healthy: { glucose: 90, bloodPressure: 70, bmi: 22, age: 30, insulin: 80, pregnancies: 1 },
                risk: { glucose: 160, bloodPressure: 90, bmi: 35, age: 55, insulin: 200, pregnancies: 3 }
            }
        },
        {
            id: 'stroke',
            name: 'Stroke',
            shortName: 'Stroke',
            icon: Brain,
            image: brain3d,
            color: 'text-violet-500',
            bg: 'bg-violet-500/10',
            border: 'border-violet-500/20',
            gradient: 'from-violet-500 to-purple-600',
            description: 'Cerebrovascular risk evaluation',
            fields: [
                { name: 'age', label: 'Age', type: 'number', min: 0.08, max: 82, step: 0.01 },
                { name: 'hypertension', label: 'Hypertension (1=Yes, 0=No)', type: 'number', min: 0, max: 1 },
                { name: 'heartDisease', label: 'Heart Disease (1=Yes, 0=No)', type: 'number', min: 0, max: 1 },
                { name: 'avgGlucoseLevel', label: 'Avg Glucose Level', type: 'number', min: 55, max: 272, step: 0.01 },
                { name: 'bmi', label: 'BMI', type: 'number', min: 10.3, max: 97.6, step: 0.1 },
                { name: 'smokingStatus', label: 'Smoking Status (formerly smoked, never smoked, smokes, Unknown)', type: 'text' },
            ],
            notebook: 'stroke_prediction_model.ipynb',
            profiles: {
                healthy: { age: 40, hypertension: 0, heartDisease: 0, avgGlucoseLevel: 85, bmi: 23, smokingStatus: 'never smoked' },
                risk: { age: 70, hypertension: 1, heartDisease: 1, avgGlucoseLevel: 200, bmi: 32, smokingStatus: 'smokes' }
            }
        },
        {
            id: 'liver',
            name: 'Liver Disease',
            shortName: 'Liver',
            icon: User,
            image: liver3d,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            gradient: 'from-orange-500 to-red-600',
            description: 'Hepatic health analysis',
            fields: [
                { name: 'age', label: 'Age', type: 'number', min: 4, max: 90 },
                { name: 'gender', label: 'Gender (Male/Female)', type: 'text' },
                { name: 'totalBilirubin', label: 'Total Bilirubin', type: 'number', min: 0.4, max: 75, step: 0.1 },
                { name: 'directBilirubin', label: 'Direct Bilirubin', type: 'number', min: 0.1, max: 19.7, step: 0.1 },
                { name: 'sgot', label: 'SGOT (AST)', type: 'number', min: 10, max: 4929 },
            ],
            notebook: 'liver_disease.ipynb',
            profiles: {
                healthy: { age: 35, gender: 'Female', totalBilirubin: 0.8, directBilirubin: 0.2, sgot: 25 },
                risk: { age: 55, gender: 'Male', totalBilirubin: 5.0, directBilirubin: 2.5, sgot: 150 }
            }
        },
        {
            id: 'kidney',
            name: 'Kidney Disease',
            shortName: 'Kidney',
            icon: Activity,
            image: kidney3d,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            gradient: 'from-amber-500 to-orange-600',
            description: 'Renal function assessment',
            fields: [
                { name: 'age', label: 'Age', type: 'number', min: 2, max: 90 },
                { name: 'serumCreatinine', label: 'Serum Creatinine', type: 'number', min: 0.4, max: 76, step: 0.1 },
                { name: 'hemoglobin', label: 'Hemoglobin', type: 'number', min: 3.1, max: 17.8, step: 0.1 },
                { name: 'albumin', label: 'Albumin', type: 'number', min: 0, max: 5, step: 0.1 },
                { name: 'specificGravity', label: 'Specific Gravity', type: 'number', min: 1.005, max: 1.025, step: 0.001 },
                { name: 'bloodUrea', label: 'Blood Urea', type: 'number', min: 1.5, max: 391, step: 0.1 },
                { name: 'hypertension', label: 'Hypertension (yes/no)', type: 'text' },
            ],
            notebook: 'Kidney_disease.ipynb',
            profiles: {
                healthy: { age: 40, serumCreatinine: 0.8, hemoglobin: 15, albumin: 0, specificGravity: 1.020, bloodUrea: 30, hypertension: 'no' },
                risk: { age: 65, serumCreatinine: 4.5, hemoglobin: 9, albumin: 3, specificGravity: 1.010, bloodUrea: 100, hypertension: 'yes' }
            }
        },
        {
            id: 'ai-tracker',
            name: 'AI Disease Tracker',
            shortName: 'AI',
            icon: Sparkles,
            image: robot3d,
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10',
            border: 'border-indigo-500/20',
            gradient: 'from-indigo-500 to-purple-600',
            description: 'Advanced AI-powered symptom checker and health assistant',
            fields: [] // No standard fields, uses chat interface
        }
    ];

    const handleSubmit = async (diseaseId, e) => {
        e.preventDefault();

        // Use state values instead of querying DOM
        const data = formValues[diseaseId];
        if (!data || Object.keys(data).length === 0) {
            alert("Please fill in the fields");
            return;
        }

        setIsAnalyzing(true);
        setPredictions({ ...predictions, [diseaseId]: null }); // Clear previous prediction

        // Simulate analysis delay
        setTimeout(async () => {
            try {
                const response = await fetch(`${apiUrl}/api/predict/${diseaseId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    setPredictions(prev => ({
                        ...prev,
                        [diseaseId]: {
                            prediction: result.prediction,
                            risk: result.prediction.includes('No') || result.prediction.includes('Healthy') || result.prediction.includes('Low') ? 'Low' : 'High',
                            probability: 'N/A' // Backend doesn't return probability yet, can be added if needed
                        }
                    }));
                } else {
                    console.error("Prediction failed:", result.error);
                    alert(`Error: ${result.error}`);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert(`Failed to connect to the server at ${apiUrl}. Error: ${error.message}`);
            } finally {
                setIsAnalyzing(false);
            }
        }, 3000);
    };

    // Smart Header Logic
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = React.useRef(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY.current && currentScrollY > 100) { // if scroll down hide the navbar
                    setShowNavbar(false);
                } else { // if scroll up show the navbar
                    setShowNavbar(true);
                }
                lastScrollY.current = currentScrollY;
            }
        };

        let timeoutId;
        const throttledControlNavbar = () => {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    controlNavbar();
                    timeoutId = null;
                }, 100); // Throttle to 100ms
            }
        };

        window.addEventListener('scroll', throttledControlNavbar);

        return () => {
            window.removeEventListener('scroll', throttledControlNavbar);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-sans relative overflow-x-hidden`}>

            <ParticleBackground darkMode={darkMode} themeColor={themeColor} />
            <div
                className="fixed inset-0 pointer-events-none z-0 transition-colors duration-500"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${themeColor}20 0%, transparent 70%)`,
                    backdropFilter: 'blur(100px)'
                }}
            ></div>

            {/* Top Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 glass-panel border-b border-white/10 flex items-center justify-between px-4 md:px-6 m-2 md:m-4 mb-0 rounded-2xl transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-[150%]'}`}>

                {/* Logo Area */}
                <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setActiveTab('home')}>
                    <div className="relative transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Logo3D size={40} />
                    </div>
                    <div>
                        <h1 className="hidden 2xl:block text-2xl font-bold tracking-tight text-white group-hover:text-[var(--color-primary)] transition-colors duration-300"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,65,0.2)' }}>
                            MedPredict <span className="text-[var(--color-primary)]">AI</span>
                        </h1>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
                    {
                        diseases.map((d) => {
                            const Icon = d.icon;
                            return (
                                <Tooltip key={d.id} content={d.name}>
                                    <button
                                        onClick={() => setActiveTab(d.id)}
                                        className={`group relative flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all duration-300 font-medium
                        ${activeTab === d.id ?
                                                'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold shadow-[0_0_15px_var(--glow-primary)] border border-[var(--color-primary)]/20' :
                                                'text-slate-300 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:shadow-[0_0_10px_var(--glow-subtle)]'}`}
                                    >
                                        <img src={d.image} alt={d.name} className="w-6 h-6 rounded-full object-cover drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]" />
                                        <span className="hidden 2xl:inline text-sm">{d.shortName}</span>
                                    </button>
                                </Tooltip>
                            )
                        })
                    }

                    <Tooltip content="About Us">
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`group relative flex items-center space-x-2 px-3 py-1.5 rounded-xl transition-all duration-300 font-medium
                        ${activeTab === 'about' ?
                                    'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold shadow-[0_0_15px_var(--glow-primary)] border border-[var(--color-primary)]/20' :
                                    'text-slate-300 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:shadow-[0_0_10px_var(--glow-subtle)]'}`}
                        >
                            <Info size={20} />
                            <span className="hidden 2xl:inline text-sm">About</span>
                        </button>
                    </Tooltip>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-2 lg:space-x-4">

                    {/* Data Analysis Button */}
                    <button
                        onClick={() => setActiveTab('analysis')}
                        className={`p-2 rounded-xl transition-colors ${activeTab === 'analysis' || activeTab === 'notebooks' || activeTab === 'correlations' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        title="Data Analysis"
                    >
                        <BarChart2 size={20} />
                    </button>
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Settings Toggle */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`p-2 rounded-xl transition-colors ${showSettings ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                            title="Theme Settings"
                        >
                            <Settings size={20} />
                        </button>

                        {/* Settings Popover */}
                        {showSettings && (
                            <div className="absolute right-0 mt-4 w-64 glass-panel p-4 rounded-2xl border border-white/10 shadow-xl z-50 animate-fade-in backdrop-blur-xl bg-black/80">
                                <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Theme Color</h3>
                                <div className="grid grid-cols-4 gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setThemeColor(color.value)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 border border-white/10`}
                                            style={{ backgroundColor: color.value, boxShadow: themeColor === color.value ? `0 0 10px ${color.value}` : 'none' }}
                                            title={color.name}
                                        >
                                            {themeColor === color.value && <Check size={16} className="text-white drop-shadow-md" strokeWidth={3} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 glass-panel rounded-2xl border border-white/10 shadow-xl lg:hidden animate-fade-in z-50">
                        <div className="grid grid-cols-4 gap-4">
                            {diseases.map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => {
                                        setActiveTab(d.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${activeTab === d.id ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 shadow-[0_0_10px_var(--glow-subtle)]' : 'hover:bg-white/5'}`}
                                    title={d.name}
                                >
                                    <img src={d.image} alt={d.name} className="w-10 h-10 rounded-full object-cover mb-1" />
                                    {/* <span className="text-xs text-center mt-1">{d.shortName}</span> */}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setActiveTab('about');
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${activeTab === 'about' ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 shadow-[0_0_10px_var(--glow-subtle)]' : 'hover:bg-white/5'}`}
                                title="About Us"
                            >
                                <Info size={40} className="p-1" />
                                {/* <span className="text-xs text-center mt-1">About</span> */}
                            </button>
                        </div>
                    </div>
                )}

            </header>

            <div className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}>
                <div className={`absolute right-0 top-0 h-full w-80 glass-panel border-l border-white/10 p-6 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col space-y-6 mt-20">
                        {diseases.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => {
                                    setActiveTab(d.id);
                                    setIsSidebarOpen(false);
                                }}
                                className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${activeTab === d.id ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <img src={d.image} alt={d.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-medium text-lg">{d.name}</span>
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                setActiveTab('about');
                                setIsSidebarOpen(false);
                            }}
                            className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${activeTab === 'about' ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Info size={24} />
                            <span className="font-medium text-lg">About Us</span>
                        </button>
                    </div>
                </div>
            </div>


            <main className={`flex-1 min-h-screen transition-all duration-300 pt-24`}>
                {/* Mobile Header Removed as it's replaced by the global Top Header */}

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {activeTab === 'home' ? (
                        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] py-12 animate-fade-in">
                            {/* Hero Section */}
                            <div className="relative text-center mb-12 md:mb-16">
                                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary-dark)] filter drop-shadow-[0_0_15px_var(--glow-primary)] animate-fade-in">
                                    MedPredict AI
                                </h1>
                                <NeonTitle />


                                {/* Decorative Elements */}
                                <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--color-primary-light)]/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>

                            {/* Disease Cards Grid */}
                            <div className="w-full max-w-7xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {diseases.map((disease, index) => {
                                        const Icon = disease.icon;
                                        return (
                                            <GlassCard
                                                key={disease.id}
                                                hoverEffect={true}
                                                variant="default"
                                                className={`cursor-pointer group relative overflow-hidden border transition-all duration-500 ${darkMode ? 'border-white/10 hover:border-[var(--color-primary)]/50' : 'border-slate-200 hover:border-[var(--color-primary)]'}`}
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                <div onClick={() => setActiveTab(disease.id)} className="w-full h-full flex flex-col items-center text-center p-6 sm:p-8">
                                                    {/* Icon Container */}
                                                    <div className="relative mb-6">
                                                        <div className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-full blur-xl group-hover:blur-2xl group-hover:bg-[var(--color-primary)]/20 transition-all duration-500"></div>
                                                        <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border ${darkMode ? 'bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border-[var(--color-primary)]/20' : 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'}`}>
                                                            <img src={disease.image} alt={disease.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                                                        </div>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className={`text-xl sm:text-2xl font-bold mb-3 transition-colors ${darkMode ? 'text-[var(--color-primary)] group-hover:text-[var(--color-primary-light)]' : 'text-slate-900 group-hover:text-[var(--color-primary)]'}`}>
                                                        {disease.name}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className={`text-sm sm:text-base mb-8 line-clamp-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                                                        {disease.description}
                                                    </p>

                                                    {/* CTA Button */}
                                                    <button className={`mt-auto px-6 py-2.5 rounded-full border-2 text-sm font-bold transition-all duration-300 transform hover:scale-105 ${darkMode ? 'border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black hover:border-[var(--color-primary)] shadow-[0_0_15px_var(--glow-subtle)] hover:shadow-[0_0_25px_var(--glow-primary)]' : 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'}`}>
                                                        Explore Model
                                                    </button>
                                                </div>

                                                {/* Card Accent Line */}
                                                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            </GlassCard>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'about' ? (
                        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] py-12 animate-fade-in">
                            <div className="w-full max-w-7xl">
                                <GlassCard className={`p-8 sm:p-12 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                                    <div className="text-center mb-12">
                                        <div className="inline-flex p-4 rounded-full bg-[var(--color-primary)]/10 mb-6 border border-[var(--color-primary)]/20">
                                            <Stethoscope className="text-[var(--color-primary)]" size={48} />
                                        </div>
                                        <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                            About MedPredict AI
                                        </h2>
                                        <p className={`text-lg max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                                            An advanced machine learning platform designed to assist healthcare professionals in early disease detection and risk assessment.
                                        </p>

                                        {/* Mission Statement */}
                                        <div className={`p-6 rounded-2xl border mb-8 text-left ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                            <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                                <TrendingUp size={24} className="text-[var(--color-primary)]" />
                                                Our Mission
                                            </h3>
                                            <p className={`${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                                                To democratize access to advanced medical diagnostics by leveraging the power of artificial intelligence. We aim to provide accurate, instant, and accessible risk assessments to support clinical decision-making and empower individuals to take charge of their health.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                            <Activity className="text-[var(--color-primary)] mb-4" size={32} />
                                            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>High Accuracy</h3>
                                            <p className={darkMode ? 'text-gray-400' : 'text-slate-600'}>
                                                Powered by state-of-the-art machine learning algorithms trained on validated clinical datasets.
                                            </p>
                                        </div>
                                        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                            <Brain className="text-[var(--color-primary)] mb-4" size={32} />
                                            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Multi-Disease</h3>
                                            <p className={darkMode ? 'text-gray-400' : 'text-slate-600'}>
                                                Comprehensive analysis for Heart Disease, Diabetes, Stroke, Liver, Kidney, and Cancer risks.
                                            </p>
                                        </div>
                                        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                            <User className="text-[var(--color-primary)] mb-4" size={32} />
                                            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>User Centric</h3>
                                            <p className={darkMode ? 'text-gray-400' : 'text-slate-600'}>
                                                Designed with a focus on usability, accessibility, and clear data visualization.
                                            </p>
                                        </div>
                                    </div>

                                    {/* How It Works */}
                                    <div className="mb-12">
                                        <h3 className={`text-2xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>How It Works</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                                            {/* Connecting Line (Desktop) */}
                                            <div className={`hidden md:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

                                            {[
                                                { icon: Activity, title: 'Input Data', desc: 'Enter patient vitals and health metrics' },
                                                { icon: Brain, title: 'AI Analysis', desc: 'Models process data against clinical patterns' },
                                                { icon: CheckCircle2, title: 'Risk Assessment', desc: 'Receive instant risk probability score' }
                                            ].map((step, i) => (
                                                <div key={i} className={`relative z-10 flex flex-col items-center text-center p-4 rounded-xl ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 ${darkMode ? 'bg-black border-[var(--color-primary)] text-[var(--color-primary)]' : 'bg-white border-[var(--color-primary)] text-[var(--color-primary)]'}`}>
                                                        <step.icon size={32} />
                                                    </div>
                                                    <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{step.title}</h4>
                                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{step.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Future Roadmap */}
                                    <div className="mb-12">
                                        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Future Roadmap</h3>
                                        <div className="space-y-4">
                                            {[
                                                'Integration with Electronic Health Records (EHR)',
                                                'Mobile Application for iOS and Android',
                                                'Real-time wearable device data synchronization',
                                                'Expanded disease models including Alzheimer\'s and Pneumonia'
                                            ].map((item, i) => (
                                                <div key={i} className={`flex items-center p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                    <div className={`w-2 h-2 rounded-full mr-4 bg-[var(--color-primary)]`}></div>
                                                    <span className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Medical Disclaimer */}
                                    <div className={`p-6 rounded-xl border border-rose-500/20 bg-rose-500/5 mb-12`}>
                                        <div className="flex items-start gap-4">
                                            <AlertCircle className="text-rose-500 shrink-0 mt-1" size={24} />
                                            <div>
                                                <h4 className="text-rose-500 font-bold mb-2">Medical Disclaimer</h4>
                                                <p className={`text-sm ${darkMode ? 'text-rose-200/80' : 'text-rose-700'}`}>
                                                    MedPredict AI is a decision support tool and is NOT a substitute for professional medical diagnosis, advice, or treatment. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-8">
                                        <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 text-center ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                                            Technology Stack
                                        </h3>
                                        <div className="flex flex-wrap justify-center gap-4">
                                            {['React', 'Python', 'Flask', 'Scikit-Learn', 'Tailwind CSS', 'Vite'].map((tech) => (
                                                <span key={tech} className={`px-4 py-2 rounded-full text-sm font-medium border ${darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </GlassCard>
                            </div>
                        </div>
                    ) : activeTab === 'analysis' ? (
                        <div className="animate-fade-in w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
                            <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">Data Analysis Hub</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                                <button
                                    onClick={() => setActiveTab('notebooks')}
                                    className="w-full text-left focus:outline-none"
                                >
                                    <GlassCard
                                        className="h-full p-8 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/50 cursor-pointer group transition-all duration-300 hover:scale-105"
                                        hoverEffect={true}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="p-6 rounded-full bg-[var(--color-primary)]/10 mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                                                <FileText size={48} className="text-[var(--color-primary)]" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4">Jupyter Notebooks</h3>
                                            <p className="text-gray-400">Explore detailed data analysis, model training logs, and performance metrics directly from your notebooks.</p>
                                        </div>
                                    </GlassCard>
                                </button>

                                <button
                                    onClick={() => setActiveTab('correlations')}
                                    className="w-full text-left focus:outline-none"
                                >
                                    <GlassCard
                                        className="h-full p-8 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/50 cursor-pointer group transition-all duration-300 hover:scale-105"
                                        hoverEffect={true}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="p-6 rounded-full bg-[var(--color-primary)]/10 mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                                                <Activity size={48} className="text-[var(--color-primary)]" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-4">Correlation Graphs</h3>
                                            <p className="text-gray-400">Visualize feature relationships and dependencies through interactive correlation heatmaps and plots.</p>
                                        </div>
                                    </GlassCard>
                                </button>
                            </div>
                        </div>
                    ) : activeTab === 'notebooks' ? (
                        <div className="animate-fade-in w-full max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
                            {selectedNotebook ? (
                                <NotebookViewer
                                    notebookPath={selectedNotebook}
                                    activeTab={activeTab}
                                    onClose={() => setSelectedNotebook(null)}
                                />
                            ) : (
                                <GlassCard className="p-8 border-[var(--color-primary)]/20">
                                    <div className="flex items-center justify-between mb-6">
                                        <button
                                            onClick={() => setActiveTab('analysis')}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <ChevronDown className="rotate-90" size={20} />
                                            <span>Back to Dashboard</span>
                                        </button>
                                        <h2 className="text-3xl font-bold text-white">Jupyter Notebooks</h2>
                                        <div className="w-24"></div> {/* Spacer for centering */}
                                    </div>
                                    {notebooks.length === 0 ? (
                                        <div className="text-center py-12 text-gray-400">
                                            <FileText size={48} className="mx-auto mb-4 opacity-50" />
                                            <p>No notebooks found in <code>backend/data/notebooks</code></p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {notebooks.map((nb, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => setSelectedNotebook(nb)}
                                                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--color-primary)]/50 transition-all cursor-pointer group"
                                                >
                                                    <div className="flex items-center space-x-4 mb-4">
                                                        <div className="p-3 rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                                                            <FileText size={24} />
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors truncate" title={nb}>
                                                            {nb.replace('.html', '').replace('.ipynb', '').replace(/_/g, ' ')}
                                                        </h3>
                                                    </div>
                                                    <p className="text-sm text-gray-400 truncate">{nb}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </GlassCard>
                            )}
                        </div>
                    ) : activeTab === 'correlations' ? (
                        <div className="animate-fade-in w-full max-w-7xl mx-auto">
                            <GlassCard className="p-8 border-[var(--color-primary)]/20">
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setActiveTab('analysis')}
                                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <ChevronDown className="rotate-90" size={20} />
                                        <span>Back to Dashboard</span>
                                    </button>
                                    <h2 className="text-3xl font-bold text-white">Feature Correlations</h2>
                                    <div className="w-24"></div> {/* Spacer for centering */}
                                </div>
                                {plots.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Activity size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>No plots found in <code>backend/data/plots</code></p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {plots.map((plot, idx) => (
                                            <div key={idx} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
                                                <div className="p-4 border-b border-white/10 bg-white/5">
                                                    <h3 className="font-semibold text-white truncate">{plot.replace('.png', '').replace(/_/g, ' ')}</h3>
                                                </div>
                                                <div
                                                    className="aspect-video bg-black/40 flex items-center justify-center overflow-hidden group cursor-pointer relative"
                                                    onClick={() => setSelectedPlot(plot)}
                                                >
                                                    <img
                                                        src={`${apiUrl}/api/analysis/plots/${plot}`}
                                                        alt={plot}
                                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                                        <span className="text-white font-bold px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">View Full Screen</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </GlassCard>

                            {/* Full Screen Plot Modal */}
                            {selectedPlot && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in" onClick={() => setSelectedPlot(null)}>
                                    <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center">
                                        <button
                                            className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
                                            onClick={() => setSelectedPlot(null)}
                                        >
                                            <X size={32} />
                                        </button>
                                        <img
                                            src={`${apiUrl}/api/analysis/plots/${selectedPlot}`}
                                            alt={selectedPlot}
                                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <h3 className="mt-4 text-xl font-bold text-white">{selectedPlot.replace('.png', '').replace(/_/g, ' ')}</h3>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            {diseases
                                .filter((d) => d.id === activeTab)
                                .map((disease) => {
                                    if (disease.id === 'ai-tracker') {
                                        return (
                                            <div key={disease.id} className="w-full max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
                                                <GlassCard className="flex-1 flex flex-col overflow-hidden border-indigo-500/20">
                                                    {/* Chat Header */}
                                                    <div className="p-4 border-b border-white/10 flex items-center space-x-4 bg-indigo-500/5">
                                                        <div className="p-2 rounded-full bg-indigo-500/20">
                                                            <Bot className="text-indigo-400" size={24} />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-white">MedPredict AI Assistant</h3>
                                                            <p className="text-xs text-indigo-300">Powered by Gemini Pro</p>
                                                        </div>
                                                    </div>

                                                    {/* Chat Messages */}
                                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                                        {chatMessages.map((msg, idx) => (
                                                            <div key={idx} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-emerald-500/20' : 'bg-indigo-500/20'}`}>
                                                                    {msg.role === 'user' ? <UserIcon size={16} className="text-emerald-400" /> : <Bot size={16} className="text-indigo-400" />}
                                                                </div>
                                                                <div className={`p-4 max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-emerald-500/10 rounded-2xl rounded-tr-none text-emerald-100' : 'bg-white/5 rounded-2xl rounded-tl-none text-gray-300'}`}>
                                                                    {msg.image && (
                                                                        <img src={msg.image} alt="Uploaded" className="max-w-full rounded-lg mb-2 border border-white/10" />
                                                                    )}
                                                                    {msg.role === 'user' ? (
                                                                        msg.text
                                                                    ) : (
                                                                        <div className="prose prose-sm prose-invert max-w-none break-words">
                                                                            <ReactMarkdown
                                                                                remarkPlugins={[remarkGfm]}
                                                                                components={{
                                                                                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                                                                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                                                                                    li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                                                                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0 heading-relaxed" {...props} />,
                                                                                    strong: ({ node, ...props }) => <strong className="font-bold text-indigo-300" {...props} />,
                                                                                    a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                                                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-2" {...props} />,
                                                                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                                                                                    h3: ({ node, ...props }) => <h3 className="text-md font-bold my-1" {...props} />,
                                                                                    code: ({ node, inline, className, children, ...props }) => {
                                                                                        return inline ? (
                                                                                            <code className="bg-black/30 rounded px-1 py-0.5 text-xs font-mono" {...props}>
                                                                                                {children}
                                                                                            </code>
                                                                                        ) : (
                                                                                            <code className="block bg-black/30 rounded p-2 text-xs font-mono my-2 overflow-x-auto" {...props}>
                                                                                                {children}
                                                                                            </code>
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {msg.text}
                                                                            </ReactMarkdown>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {isChatLoading && (
                                                            <div className="flex items-start space-x-3">
                                                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                                                    <Bot size={16} className="text-indigo-400" />
                                                                </div>
                                                                <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-gray-300 flex items-center space-x-2">
                                                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                                                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div ref={chatEndRef} />
                                                    </div>

                                                    {/* Input Area */}
                                                    <div className="p-4 border-t border-white/10 bg-black/20">
                                                        {chatImage && (
                                                            <div className="mb-2 relative inline-block">
                                                                <img src={chatImage} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-white/20" />
                                                                <button
                                                                    onClick={() => setChatImage(null)}
                                                                    className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-0.5 hover:bg-rose-600"
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </div>
                                                        )}
                                                        <form className="flex space-x-2" onSubmit={handleChatSubmit}>
                                                            <input
                                                                type="file"
                                                                ref={fileInputRef}
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            setChatImage(reader.result);
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className="p-3 rounded-xl bg-white/5 text-indigo-400 hover:bg-white/10 transition-colors border border-white/5"
                                                                title="Upload Image"
                                                            >
                                                                <ImageIcon size={20} />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={chatInput}
                                                                onChange={(e) => setChatInput(e.target.value)}
                                                                placeholder="Type your symptoms here..."
                                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                                                                disabled={isChatLoading}
                                                            />
                                                            <button
                                                                type="submit"
                                                                disabled={isChatLoading || (!chatInput.trim() && !chatImage)}
                                                                className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${!chatInput.trim() && !chatImage
                                                                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                                                    : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                                                    }`}
                                                            >
                                                                <Send size={20} />
                                                            </button>
                                                        </form>
                                                    </div>
                                                </GlassCard>
                                            </div>
                                        );
                                    }



                                    const metrics = accuracyScores[disease.id] || { accuracy: '92%', best_model: 'Random Forest' };

                                    const InputSection = (
                                        <div className={`rounded-2xl p-8 border shadow-inner transition-colors ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'}`}>
                                            <form onSubmit={(e) => handleSubmit(disease.id, e)} className="space-y-8">
                                                <div className="flex flex-wrap justify-center gap-8">
                                                    {disease.fields.map((field) => (
                                                        <div key={field.name} className="space-y-3 group w-full md:w-[calc(50%-1rem)]">
                                                            <Input
                                                                label={field.label}
                                                                type={field.type}
                                                                name={field.name}
                                                                min={field.min}
                                                                max={field.max}
                                                                step={field.step || 1}
                                                                required
                                                                value={formValues[disease.id]?.[field.name] ?? ''}
                                                                onChange={(e) => handleInputChange(disease.id, field.name, e.target.value)}
                                                                className={darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <Button
                                                        type="button"
                                                        size="lg"
                                                        variant="outline"
                                                        onClick={() => fillRandomValues(disease.id)}
                                                        icon={Dna}
                                                        className={`py-4 text-lg border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10`}
                                                    >
                                                        Sample Data
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="lg"
                                                        variant="outline"
                                                        onClick={() => openNotebook(disease.notebook)}
                                                        icon={FileCode}
                                                        className={`py-4 text-lg border-blue-500/40 text-blue-400 hover:bg-blue-500/10`}
                                                    >
                                                        View Notebook
                                                    </Button>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    loading={isAnalyzing}
                                                    disabled={isAnalyzing}
                                                    icon={Activity}
                                                    className="w-full py-4 text-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] border-0 text-black font-bold shadow-[0_0_20px_var(--glow-subtle)] hover:shadow-[0_0_30px_var(--glow-primary)]"
                                                >
                                                    {isAnalyzing ? 'Processing...' : 'Analyze Risk Factors'}
                                                </Button>
                                            </form>
                                        </div>
                                    );

                                    const StatsSection = (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-6">
                                            {isAnalyzing ? (
                                                <div className="text-center">
                                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                                        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-[var(--color-primary)] animate-spin"></div>
                                                        <div className="absolute inset-4 rounded-full border-4 border-b-transparent border-[var(--color-primary)]/50 animate-spin-slow"></div>
                                                    </div>
                                                    <p className={`text-xl font-medium animate-pulse ${darkMode ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary-dark)]'}`}>
                                                        Analyzing Symptoms...
                                                    </p>
                                                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                                                        Running {metrics.best_model} Algorithm
                                                    </p>
                                                </div>
                                            ) : predictions[disease.id] ? (
                                                <div className="text-center w-full animate-fade-in">
                                                    <div className={`inline-flex p-6 rounded-full mb-6 ${predictions[disease.id].risk === 'High'
                                                        ? 'bg-red-500/20 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
                                                        : 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] shadow-[0_0_30px_var(--glow-primary)]'
                                                        }`}>
                                                        {predictions[disease.id].risk === 'High' ? <AlertCircle size={48} /> : <CheckCircle2 size={48} />}
                                                    </div>

                                                    <h3 className={`text-sm font-medium uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                                                        Risk Assessment
                                                    </h3>
                                                    <h2 className={`text-4xl font-bold mb-8 ${predictions[disease.id].risk === 'High' ? 'text-red-500' : 'text-[var(--color-primary)]'
                                                        }`}>
                                                        {predictions[disease.id].prediction}
                                                    </h2>

                                                    <div className={`rounded-xl p-6 border text-left ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                                                        <p className={`leading-relaxed flex gap-3 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                                                            <Activity className={`shrink-0 mt-1 ${predictions[disease.id].risk === 'High' ? 'text-red-500' : 'text-[var(--color-primary)]'}`} size={20} />
                                                            <span>
                                                                Based on the analysis of your parameters, the model indicates a
                                                                <strong className={predictions[disease.id].risk === 'High' ? 'text-red-400' : 'text-[var(--color-primary)]'}> {predictions[disease.id].risk.toLowerCase()} risk</strong>.
                                                                {predictions[disease.id].risk === 'High'
                                                                    ? " Immediate consultation with a healthcare provider is recommended."
                                                                    : " Maintain a healthy lifestyle and regular checkups."}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setPredictions({ ...predictions, [disease.id]: null })}
                                                        className="mt-8"
                                                    >
                                                        Start New Analysis
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex-1 flex flex-col justify-center space-y-6">
                                                    {metrics.all_accuracies && Object.keys(metrics.all_accuracies).length > 0 ? (
                                                        Object.entries(metrics.all_accuracies).map(([modelName, accuracy], index) => {
                                                            const colorMap = ['green', 'blue', 'purple', 'yellow', 'red'];
                                                            const color = colorMap[index % colorMap.length];
                                                            return (
                                                                <ProgressBar
                                                                    key={modelName}
                                                                    label={modelName}
                                                                    value={parseFloat(accuracy)}
                                                                    color={color}
                                                                    showValue={true}
                                                                    size="md"
                                                                    glow={true}
                                                                    animated={true}
                                                                    className="mb-4"
                                                                />
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="flex flex-col items-center">
                                                            <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                                                                <svg className="w-full h-full transform -rotate-90">
                                                                    <circle cx="112" cy="112" r="100" stroke={darkMode ? "#1f2937" : "#e2e8f0"} strokeWidth="12" fill="transparent" />
                                                                    <circle cx="112" cy="112" r="100" stroke="var(--color-primary)" strokeWidth="12" fill="transparent"
                                                                        strokeDasharray={2 * Math.PI * 100}
                                                                        strokeDashoffset={2 * Math.PI * 100 * (1 - (parseFloat(metrics.accuracy) / 100 || 0.92))}
                                                                        className="drop-shadow-[0_0_10px_var(--glow-subtle)]"
                                                                    />
                                                                </svg>
                                                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                                    <span className="text-6xl font-bold text-white">{metrics.accuracy}</span>
                                                                    <span className="text-sm text-gray-400 mt-2 uppercase tracking-wider">Accuracy</span>
                                                                </div>
                                                            </div>
                                                            <div className={`space-y-2 text-center`}>
                                                                <p className={darkMode ? 'text-gray-400' : 'text-slate-500'}>Best Performing Model</p>
                                                                <p className="text-xl font-semibold text-[var(--color-primary)]">{metrics.best_model}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className={`mt-8 p-4 rounded-xl border text-center ${darkMode ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20' : 'bg-[var(--color-primary)]/5 border-[var(--color-primary)]/10'}`}>
                                                        <p className="text-sm text-[var(--color-primary)]">
                                                            <span className="font-bold">Note:</span> These models are trained on validated clinical datasets to ensure high reliability.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );

                                    return (
                                        <ModelSplitLayout
                                            key={disease.id}
                                            title={disease.name}
                                            description={disease.description}
                                            inputSection={InputSection}
                                            statsSection={StatsSection}
                                        />
                                    );
                                })}
                        </div>
                    )
                    }
                </div >
            </main >

            <Footer darkMode={darkMode} />
        </div >
    );
};

export default MedicalDashboard;
