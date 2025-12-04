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
    AlertCircle
} from 'lucide-react';
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

// Import 3D Images
import heart3d from '../assets/heart-3d.png';
import liver3d from '../assets/liver-3d.png';
import diabetes3d from '../assets/diabetes-3d.png';
// Placeholders for now, will be replaced by generated images
import brain3d from '../assets/brain-3d.png';
import lung3d from '../assets/lungs-3d.png';
import kidney3d from '../assets/kidney-3d.png';

const MedicalDashboard = () => {
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

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        fetch(`${apiUrl}/api/metrics`)
            .then(res => res.json())
            .then(data => setAccuracyScores(data))
            .catch(err => console.error("Failed to fetch metrics", err));
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
                { name: 'age', label: 'Age', type: 'number', min: 1, max: 120 },
                { name: 'sex', label: 'Sex (1=Male, 0=Female)', type: 'number', min: 0, max: 1 },
                { name: 'cp', label: 'Chest Pain Type (0-3)', type: 'number', min: 0, max: 3 },
                { name: 'trestbps', label: 'Resting Blood Pressure', type: 'number', min: 80, max: 200 },
                { name: 'chol', label: 'Cholesterol (mg/dl)', type: 'number', min: 100, max: 400 },
                { name: 'thalach', label: 'Max Heart Rate', type: 'number', min: 60, max: 220 },
            ]
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
                { name: 'glucose', label: 'Glucose Level (mg/dL)', type: 'number', min: 0, max: 300 },
                { name: 'bloodPressure', label: 'Blood Pressure (mmHg)', type: 'number', min: 0, max: 200 },
                { name: 'bmi', label: 'BMI', type: 'number', min: 10, max: 60, step: 0.1 },
                { name: 'age', label: 'Age', type: 'number', min: 1, max: 120 },
                { name: 'insulin', label: 'Insulin Level', type: 'number', min: 0, max: 900 },
                { name: 'pregnancies', label: 'Pregnancies', type: 'number', min: 0, max: 20 },
            ]
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
                { name: 'age', label: 'Age', type: 'number', min: 1, max: 120 },
                { name: 'hypertension', label: 'Hypertension (1=Yes, 0=No)', type: 'number', min: 0, max: 1 },
                { name: 'heartDisease', label: 'Heart Disease (1=Yes, 0=No)', type: 'number', min: 0, max: 1 },
                { name: 'avgGlucoseLevel', label: 'Avg Glucose Level', type: 'number', min: 50, max: 300 },
                { name: 'bmi', label: 'BMI', type: 'number', min: 10, max: 60, step: 0.1 },
                { name: 'smokingStatus', label: 'Smoking Status (formerly smoked, never smoked, smokes, Unknown)', type: 'text' },
            ]
        },
        {
            id: 'lung',
            name: 'Lung Cancer',
            shortName: 'Lung',
            icon: Wind,
            image: lung3d,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            gradient: 'from-emerald-500 to-teal-600',
            description: 'Respiratory health screening',
            fields: [
                { name: 'gender', label: 'Gender (Male/Female)', type: 'text' },
                { name: 'age', label: 'Age', type: 'number', min: 1, max: 120 },
                { name: 'passiveSmoker', label: 'Passive Smoker (1-8)', type: 'number', min: 1, max: 8 },
                { name: 'coughingOfBlood', label: 'Coughing of Blood (1-8)', type: 'number', min: 1, max: 8 },
                { name: 'balancedDiet', label: 'Balanced Diet (1-8)', type: 'number', min: 1, max: 8 },
                { name: 'smoking', label: 'Smoking (1-8)', type: 'number', min: 1, max: 8 },
                { name: 'airPollution', label: 'Air Pollution (1-8)', type: 'number', min: 1, max: 8 },
                { name: 'obesity', label: 'Obesity (1-8)', type: 'number', min: 1, max: 8 },
            ]
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
                { name: 'age', label: 'Age', type: 'number', min: 1, max: 120 },
                { name: 'serumCreatinine', label: 'Serum Creatinine', type: 'number', step: 0.1 },
                { name: 'hemoglobin', label: 'Hemoglobin', type: 'number', step: 0.1 },
                { name: 'albumin', label: 'Albumin', type: 'number', step: 0.1 },
                { name: 'specificGravity', label: 'Specific Gravity', type: 'number', step: 0.001 },
                { name: 'bloodUrea', label: 'Blood Urea', type: 'number', step: 0.1 },
                { name: 'hypertension', label: 'Hypertension (yes/no)', type: 'text' },
            ]
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
                { name: 'age', label: 'Age', type: 'number', min: 1, max: 120 },
                { name: 'gender', label: 'Gender (Male/Female)', type: 'text' },
                { name: 'totalBilirubin', label: 'Total Bilirubin', type: 'number', min: 0, max: 10, step: 0.1 },
                { name: 'directBilirubin', label: 'Direct Bilirubin', type: 'number', min: 0, max: 5, step: 0.1 },
                { name: 'sgot', label: 'SGOT (AST)', type: 'number', min: 0, max: 500 },
            ]
        }
    ];

    const handleSubmit = async (diseaseId, e) => {
        e.preventDefault();
        const data = {};
        const inputs = e.target.querySelectorAll('input');
        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        setIsAnalyzing(true);
        setPredictions({ ...predictions, [diseaseId]: null }); // Clear previous prediction

        // Simulate analysis delay
        setTimeout(async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
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
                alert("Failed to connect to the server.");
            } finally {
                setIsAnalyzing(false);
            }
        }, 3000);
    };

    // Smart Header Logic
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down hide the navbar
                    setShowNavbar(false);
                } else { // if scroll up show the navbar
                    setShowNavbar(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-sans relative overflow-x-hidden`}>

            <ParticleBackground darkMode={darkMode} />

            {/* Top Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 h-20 md:h-24 glass-panel border-b border-white/10 flex items-center justify-between px-4 md:px-8 m-2 md:m-4 mb-0 rounded-2xl transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-[150%]'}`}>

                {/* Logo Area */}
                <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setActiveTab('home')}>
                    <div className="relative transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Logo3D size={56} />
                    </div>
                    <div>
                        <h1 className="hidden xl:block text-3xl font-bold tracking-tight text-white group-hover:text-[var(--color-primary)] transition-colors duration-300"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,65,0.2)' }}>
                            MedPredict <span className="text-[var(--color-primary)]">AI</span>
                        </h1>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 absolute left-1/2 transform -translate-x-1/2">
                    {
                        diseases.map((d) => {
                            const Icon = d.icon;
                            return (
                                <Tooltip key={d.id} content={d.name}>
                                    <button
                                        onClick={() => setActiveTab(d.id)}
                                        className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium
                        ${activeTab === d.id ?
                                                'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold shadow-[0_0_15px_var(--glow-primary)] border border-[var(--color-primary)]/20' :
                                                'text-slate-300 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:shadow-[0_0_10px_var(--glow-subtle)]'}`}
                                    >
                                        <img src={d.image} alt={d.name} className="w-8 h-8 rounded-full object-cover drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]" />
                                        <span className="hidden xl:inline">{d.shortName}</span>
                                    </button>
                                </Tooltip>
                            )
                        })
                    }

                    <Tooltip content="About Us">
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium
                        ${activeTab === 'about' ?
                                    'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold shadow-[0_0_15px_var(--glow-primary)] border border-[var(--color-primary)]/20' :
                                    'text-slate-300 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:shadow-[0_0_10px_var(--glow-subtle)]'}`}
                        >
                            <Info size={24} />
                            <span className="hidden xl:inline">About</span>
                        </button>
                    </Tooltip>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-2 lg:space-x-4">

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
                        {
                            showSettings && (
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
                            )
                        }
                    </div >

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

            </header>

            {/* Mobile Menu Overlay */}
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


            {/* Main Content Area */}
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
                    ) : (
                        <div className="animate-fade-in">
                            {diseases
                                .filter((d) => d.id === activeTab)
                                .map((disease) => {
                                    const metrics = accuracyScores[disease.id] || { accuracy: '92%', best_model: 'Random Forest' };

                                    const InputSection = (
                                        <div className={`rounded-2xl p-8 border shadow-inner transition-colors ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'}`}>
                                            <h3 className={`text-2xl font-semibold mb-8 border-b pb-4 ${darkMode ? 'text-[var(--color-primary)] border-white/10' : 'text-[var(--color-primary)] border-slate-200'}`}>
                                                Patient Data Entry
                                            </h3>
                                            <form onSubmit={(e) => handleSubmit(disease.id, e)} className="space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {disease.fields.map((field) => (
                                                        <div key={field.name} className="space-y-3 group">
                                                            <Input
                                                                label={field.label}
                                                                type={field.type}
                                                                name={field.name}
                                                                min={field.min}
                                                                max={field.max}
                                                                step={field.step || 1}
                                                                required
                                                                className={darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="pt-6">
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
                                                </div>
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
