
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, Code, Book, Rocket, Search, Loader2, 
  Sparkles, Zap, Star, Layout, Terminal, 
  Cpu, Braces, Coffee, Command, Binary, Settings, Monitor, HardDrive, ExternalLink
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import SectionHeading from '../components/SectionHeading';
import { QUOTES } from '../constants';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{text: string, sources: any[]} | null>(null);
  const navigate = useNavigate();

  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Research this for an Indian engineering student: ${searchQuery}. Give latest updates, simplified explanations, and relevant links. Speak like a helpful big brother (EngineerBhai).`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setSearchResult({
        text: response.text || "Bhai kuch mila nahi...",
        sources: sources
      });
    } catch (error) {
      console.error("Search error:", error);
      setSearchResult({ text: "Bhai network ya API issue hai, live server check kar!", sources: [] });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden py-24 sm:py-36 min-h-[90vh] flex items-center">
        <div className="absolute top-10 right-10 opacity-5 pointer-events-none select-none">
           <Binary className="w-96 h-96" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-5 pointer-events-none select-none rotate-12">
           <Cpu className="w-64 h-64" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[60%] bg-blue-400/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] bg-purple-400/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900 text-slate-100 text-xs font-bold mb-10 animate-in fade-in slide-in-from-left duration-700 shadow-2xl border border-slate-700">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="mono-text tracking-tighter uppercase">{randomQuote}</span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.85]">
                beat the<br />
                <span className="vibrant-gradient bg-clip-text text-transparent drop-shadow-2xl">btech.</span>
              </h1>
              
              <p className="text-slate-600 text-xl md:text-2xl max-w-2xl lg:mx-0 mx-auto mb-14 leading-relaxed font-medium">
                No complex jargon. Just pure, student-focused notes, codes, and mentorship from <span className="text-blue-600 font-bold underline underline-offset-8 decoration-blue-500/30 decoration-4">Aapka Apna Bhai.</span>
              </p>

              <div className="max-w-2xl mx-auto lg:mx-0">
                <form onSubmit={handleGlobalSearch} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-md opacity-25 group-focus-within:opacity-50 transition duration-700"></div>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-400"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                       <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ask anything... (e.g. explain Pointers to me like I'm 5)" 
                      className="w-full bg-white border-2 border-slate-200 rounded-[2rem] pl-24 pr-40 py-7 text-slate-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-2xl mono-text"
                    />
                    <button 
                      type="submit"
                      disabled={isSearching}
                      className="absolute right-4 top-4 bottom-4 bg-slate-900 hover:bg-black text-white px-8 rounded-2xl font-black transition-all flex items-center gap-3 disabled:bg-slate-300 active:scale-95 shadow-xl shadow-slate-500/10"
                    >
                      {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Command className="w-5 h-5" />}
                      <span className="hidden sm:inline">Execute</span>
                    </button>
                  </div>
                </form>

                {searchResult && (
                  <div className="mt-8 p-10 bg-slate-900 rounded-[2.5rem] text-left animate-in zoom-in-95 duration-500 relative shadow-3xl border border-slate-800">
                    <div className="absolute top-6 right-6">
                      <button onClick={() => setSearchResult(null)} className="text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">✕</button>
                    </div>
                    <div className="flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6 mono-text">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                      Bhai_AI_Response_Output
                    </div>
                    <div className="text-slate-300 prose prose-invert max-w-none text-lg leading-relaxed mb-8 mono-text whitespace-pre-wrap">
                      {searchResult.text}
                    </div>
                    
                    {/* Render Grounding Sources */}
                    {searchResult.sources.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-800">
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 mono-text">Verified_Sources:</p>
                        <div className="flex flex-wrap gap-3">
                          {searchResult.sources.map((chunk, idx) => (
                            chunk.web && (
                              <a 
                                key={idx} 
                                href={chunk.web.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all font-bold"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {chunk.web.title || 'Live Resource'}
                              </a>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                       <span className="text-slate-500 text-[10px] mono-text tracking-widest uppercase font-black">Process_Success_100%</span>
                       <button 
                        onClick={() => {
                          navigator.clipboard.writeText(searchResult.text);
                          alert("Output copied to clipboard!");
                        }}
                        className="text-blue-400 text-xs font-bold hover:underline mono-text"
                       >
                         Copy_Raw_Data
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-2/5 flex justify-center relative min-h-[500px]">
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>
              
              <div className="relative glass-card p-4 rounded-[3rem] tech-border shadow-3xl animate-float z-20">
                <div className="relative overflow-hidden rounded-[2.2rem]">
                   <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop" 
                    alt="Engineering Prototype" 
                    className="w-full max-w-sm rounded-[2.2rem] hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>
              </div>

              <div className="absolute -top-12 -right-8 w-44 h-44 glass-card p-2 rounded-[2rem] shadow-2xl rotate-12 animate-float delay-700 z-10 border-white/50">
                 <img 
                  src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&auto=format&fit=crop" 
                  alt="Embedded Systems" 
                  className="w-full h-full object-cover rounded-[1.8rem]"
                 />
              </div>

              <div className="absolute -bottom-16 -left-12 w-48 h-56 glass-card p-2 rounded-[2rem] shadow-2xl -rotate-6 animate-float delay-1000 z-30 border-white/50 overflow-hidden">
                 <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop" 
                  alt="Scientific Lab" 
                  className="w-full h-full object-cover rounded-[1.8rem]"
                 />
                 <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-[8px] font-black text-slate-900 mono-text uppercase border border-slate-100">Lab_Validated</div>
              </div>

              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-[2rem] shadow-3xl border border-slate-100 flex items-center gap-4 animate-bounce delay-1000 z-40">
                 <div className="bg-yellow-500 p-3 rounded-2xl text-white shadow-lg">
                    <Coffee className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-slate-900 font-black text-xl leading-none">95%</p>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Caffeine Level</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit and Community Sections remain same... */}
      <section className="py-32 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Your Engineering Toolkit" 
            subtitle="Everything curated by experts to help you excel in academics and career."
            badge="0x01_MODULES"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "Premium Notes", 
                desc: "Hand-written and typed notes for all major BTech branches.", 
                icon: <Book className="w-8 h-8" />, 
                color: "from-blue-600 to-cyan-500",
                link: "/subjects",
                status: "Stable v2.4",
                asset: "https://images.unsplash.com/photo-1544391496-1ca7c9745700?q=80&w=400&auto=format&fit=crop"
              },
              { 
                title: "Code Repository", 
                desc: "1000+ snippets for C, C++, Java, and DSA problems.", 
                icon: <Code className="w-8 h-8" />, 
                color: "from-purple-600 to-indigo-500",
                link: "/languages",
                status: "Build: Passing",
                asset: "https://images.unsplash.com/photo-1629904853716-f0bc54eba481?q=80&w=400&auto=format&fit=crop"
              },
              { 
                title: "Career Maps", 
                desc: "Step-by-step roadmaps to reach your dream companies.", 
                icon: <Rocket className="w-8 h-8" />, 
                color: "from-emerald-500 to-teal-500",
                link: "/roadmaps",
                status: "Production Ready",
                asset: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop"
              }
            ].map((card, i) => (
              <Link to={card.link} key={i} className="group">
                <div className="relative h-full bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-blue-500 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3">
                  <div className="h-40 overflow-hidden relative">
                    <img src={card.asset} alt={card.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                     <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                     </div>
                     <span className="text-[10px] mono-text text-slate-400 font-bold uppercase tracking-widest">{card.status}</span>
                  </div>
                  <div className="p-10 flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-8 shadow-2xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                      {card.icon}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{card.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium mb-8">{card.desc}</p>
                    <div className="mt-auto flex items-center gap-3 text-blue-600 font-black text-sm group-hover:gap-5 transition-all">
                      Access Component <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
