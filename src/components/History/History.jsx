import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkVeil from '../../DarkVeil/DarkVeil';
import { ArrowUpRight, Search, Clock, MessageCircle } from 'lucide-react';

function History() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const hist = [
    { 
      id: 1, 
      input: "hello there", 
      fulltext: "General Kenobi! You are a bold one. This is a general conversation starter.", 
      date: "9/15/2025" 
    },
    { 
      id: 2, 
      input: "what is your name", 
      fulltext: "I am a large language model, trained by Google. I don't have a personal name.", 
      date: "9/15/2025", 
      chatlink: "/chat/2" 
    },
    { 
      id: 3, 
      input: "help me with react code", 
      fulltext: "Sure, I can help with that. Here is a code snippet for a basic React component...", 
      date: "9/14/2025", 
      chatlink: "/chat/3" 
    },
    { 
      id: 4, 
      input: "today's weather in Nanakramguda", 
      fulltext: `The weather in Nanakramguda, Telangana as of ${new Date().toLocaleTimeString()} is clear with a temperature of 29°C.`, 
      date: new Date().toLocaleDateString(), 
      chatlink: "/chat/4" 
    },
    { 
      id: 5, 
      input: "ideas for a project", 
      fulltext: "How about a web app that tracks personal fitness goals or a tool to manage subscription services?", 
      date: "9/13/2025", 
      chatlink: "/chat/5" 
    }
  ];

  const filteredHist = hist.filter(item => 
    item.input.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.fulltext.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full h-screen text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans">
      <DarkVeil className="absolute inset-0 w-full h-full z-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-indigo-600/20 z-[1]" />
      
      <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
        <div className="flex flex-col h-[92vh] w-full max-w-6xl p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-2xl shadow-2xl border border-white/10 overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8 flex-shrink-0">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-8 h-8 text-violet-400" />
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Chat History
              </h1>
            </div>
            <p className="text-white/60 text-center">Revisit your previous conversations</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/50 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white/15 transition-all duration-200 backdrop-blur-sm border border-white/10"
            />
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <div className="grid gap-4">
              {filteredHist.length > 0 ? (
                filteredHist.map((item, index) => (
                  <div 
                    key={item.id}
                    className="group relative bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <MessageCircle className="w-4 h-4 text-violet-400 flex-shrink-0" />
                          <h3 className="font-semibold text-white text-lg truncate group-hover:text-violet-300 transition-colors">
                            {item.input}
                          </h3>
                        </div>
                        
                        <p className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-2">
                          {item.fulltext}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-xs text-white/50">
                            <Clock className="w-3 h-3" />
                            <span>{item.date}</span>
                          </div>
                          
                          {item.chatlink && (
                            <button 
                              onClick={() => navigate(item.chatlink)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-violet-500/20 hover:bg-violet-500/40 text-violet-300 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 border border-violet-500/30"
                            >
                              <span>Open Chat</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-white/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-white/80 mb-2">No Results Found</h3>
                  <p className="text-white/50">Try searching for a different keyword or phrase.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default History;
