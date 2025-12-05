import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AiDiseaseTracker = ({ darkMode }) => {
    const [messages, setMessages] = useState([
        {
            role: 'model',
            text: "Hello! I'm your AI Medical Assistant. I can help you understand symptoms, diseases, and general health information. How can I assist you today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
            const response = await fetch(`${apiUrl}/api/ai-tracker/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { role: 'model', text: data.response }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: `Error: ${data.error || 'Something went wrong.'}` }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I couldn't connect to the server. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto w-full rounded-2xl overflow-hidden border shadow-xl ${darkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200'}`}>

            {/* Chat Header */}
            <div className={`p-4 border-b flex items-center gap-3 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>AI Health Assistant</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>Powered by Gemini AI</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 
                                ${msg.role === 'user'
                                    ? (darkMode ? 'bg-blue-600' : 'bg-blue-500')
                                    : (darkMode ? 'bg-indigo-600' : 'bg-indigo-500')
                                } text-white shadow-lg`}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            <div className={`p-4 rounded-2xl shadow-md text-sm leading-relaxed
                                ${msg.role === 'user'
                                    ? (darkMode ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-tr-none' : 'bg-blue-500 text-white rounded-tr-none')
                                    : (darkMode ? 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none')
                                }`}>
                                <ReactMarkdown
                                    components={{
                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex max-w-[80%] gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-500'} text-white`}>
                                <Bot size={16} />
                            </div>
                            <div className={`p-4 rounded-2xl rounded-tl-none ${darkMode ? 'bg-white/10' : 'bg-white border border-slate-100'}`}>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${darkMode ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <form onSubmit={handleSendMessage} className="flex gap-2 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your symptoms or ask a health question..."
                        className={`flex-1 p-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 transition-all
                            ${darkMode
                                ? 'bg-white/5 border-white/10 text-white focus:ring-indigo-500/50 focus:border-indigo-500/50'
                                : 'bg-white border-slate-200 text-slate-900 focus:ring-indigo-500/20 focus:border-indigo-500'
                            }`}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all
                            ${input.trim()
                                ? (darkMode ? 'bg-indigo-500 text-white hover:bg-indigo-400' : 'bg-indigo-600 text-white hover:bg-indigo-700')
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </button>
                </form>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <AlertCircle size={12} />
                    <span>AI can make mistakes. Always consult a doctor.</span>
                </div>
            </div>
        </div>
    );
};

export default AiDiseaseTracker;
