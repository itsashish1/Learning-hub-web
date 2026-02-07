
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, BookOpen, Code, Terminal, Cpu, Braces, Code2, Globe } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { LANGUAGES } from '../constants';

const Languages: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = LANGUAGES.filter(l => l.title.toLowerCase().includes(search.toLowerCase()));

  // Map IDs to specific vibrant gradients for the icons
  const getIconGradient = (id: string) => {
    switch(id) {
      case 'c': return 'from-blue-600 to-cyan-500';
      case 'cpp': return 'from-indigo-600 to-purple-500';
      case 'java': return 'from-orange-600 to-red-500';
      case 'python': return 'from-yellow-500 to-green-500';
      case 'js': return 'from-yellow-400 to-orange-400';
      default: return 'from-slate-700 to-slate-900';
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-white">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-blue-50/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <SectionHeading 
            title="Master the Syntax" 
            subtitle="Programming languages simplified by Bhai. From basic C to production-ready JS." 
            badge="Code Lab v3.0" 
          />
        </div>
        
        <div className="max-w-2xl mx-auto mb-20 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search language (e.g. Java, Python)..." 
              className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-[2rem] pl-16 pr-6 py-6 text-slate-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-xl font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((lang) => (
            <div key={lang.id} className={`group relative bg-white border border-slate-200 rounded-[3rem] overflow-hidden hover:shadow-3xl transition-all duration-500 flex flex-col transform hover:-translate-y-3 hover:border-blue-300`}>
              {/* Card Header Decoration */}
              <div className={`h-2 w-full bg-gradient-to-r ${getIconGradient(lang.id)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="p-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${getIconGradient(lang.id)} rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:rotate-12 transition-all duration-500 text-white transform-gpu`}>
                  {React.cloneElement(lang.icon as React.ReactElement<{ className?: string }>, { className: 'w-10 h-10 drop-shadow-lg' })}
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{lang.title}</h3>
                  <span className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full border border-slate-200">
                    {lang.category}
                  </span>
                </div>
                
                <p className="text-slate-500 mb-8 font-medium text-base leading-relaxed">{lang.description}</p>
              </div>

              <div className="mt-auto p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-4">
                <Link 
                  to={`/languages/${lang.id}/theory`} 
                  className="w-full bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-[0.98]"
                >
                  <BookOpen className="w-5 h-5" /> Detailed Theory
                </Link>
                <Link 
                  to={`/languages/${lang.id}/codes`} 
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-500/20 active:scale-[0.98]"
                >
                  <Code className="w-5 h-5" /> Practice Snippets
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-slate-300">
              <Terminal className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Bhai, ye language toh library mein nahi hai!</h3>
            <p className="text-slate-500 font-medium">Try searching for Java, Python, C++, or C.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Languages;
