
import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Download, Star, ShieldCheck, Zap, 
  Loader2, CheckCircle, Search, Sparkles, 
  BookOpen, Code, Library, GraduationCap,
  ExternalLink, ArrowRight, Upload, Plus, UserCircle, Layout, Eye
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import SectionHeading from '../components/SectionHeading';

interface ResourceFile {
  name: string;
  size: string;
  type: 'Exam Notes' | 'Cheat Sheets' | 'Interview Prep' | 'Project Ideas' | 'User Upload' | 'Contributor';
  isBhaiPick: boolean;
  downloads: string;
  isUserUploaded?: boolean;
  isContributor?: boolean;
}

const Resources: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Expanded database with 120+ subjects
  const [files, setFiles] = useState<ResourceFile[]>([
    { name: "My_Special_Notes_v1.pdf", size: "3.2 MB", type: "Contributor", isBhaiPick: true, downloads: "100+", isContributor: true },
    
    // --- SEMESTER 1 & 2 (ALL BRANCHES) ---
    { name: "Engineering Mathematics-I Complete.pdf", size: "12.4 MB", type: "Exam Notes", isBhaiPick: true, downloads: "45k" },
    { name: "Engineering Physics - Quantum & Optics.pdf", size: "9.1 MB", type: "Exam Notes", isBhaiPick: false, downloads: "22k" },
    { name: "Engineering Chemistry - Polymers & Nano.pdf", size: "8.5 MB", type: "Exam Notes", isBhaiPick: false, downloads: "18k" },
    { name: "Basic Electrical Engineering (BEE) Notes.pdf", size: "10.2 MB", type: "Exam Notes", isBhaiPick: true, downloads: "31k" },
    { name: "Programming for Problem Solving (PPS-C).pdf", size: "6.8 MB", type: "Exam Notes", isBhaiPick: true, downloads: "55k" },
    { name: "Engineering Graphics (CAD) Guide.pdf", size: "15.6 MB", type: "Exam Notes", isBhaiPick: false, downloads: "12k" },
    { name: "English for Communication (Soft Skills).pdf", size: "4.2 MB", type: "Exam Notes", isBhaiPick: false, downloads: "8k" },
    { name: "Manufacturing Processes (Workshop).pdf", size: "7.9 MB", type: "Exam Notes", isBhaiPick: false, downloads: "14k" },

    // --- COMPUTER SCIENCE & IT ---
    { name: "Data Structures & Algorithms (Full Course).pdf", size: "18.2 MB", type: "Exam Notes", isBhaiPick: true, downloads: "120k" },
    { name: "Discrete Mathematical Structures (DMS).pdf", size: "8.4 MB", type: "Exam Notes", isBhaiPick: false, downloads: "25k" },
    { name: "Digital Electronics (CS Perspective).pdf", size: "11.1 MB", type: "Exam Notes", isBhaiPick: false, downloads: "19k" },
    { name: "Object Oriented Programming (Java/C++).pdf", size: "9.8 MB", type: "Exam Notes", isBhaiPick: true, downloads: "42k" },
    { name: "Database Management Systems (DBMS).pdf", size: "13.2 MB", type: "Exam Notes", isBhaiPick: true, downloads: "65k" },
    { name: "Operating Systems Internals & Gates.pdf", size: "12.5 MB", type: "Exam Notes", isBhaiPick: true, downloads: "58k" },
    { name: "Theory of Computation (Automata) Master.pdf", size: "10.1 MB", type: "Exam Notes", isBhaiPick: true, downloads: "38k" },
    { name: "Computer Organization & Architecture (COA).pdf", size: "11.4 MB", type: "Exam Notes", isBhaiPick: false, downloads: "29k" },
    { name: "Computer Networks (OSI, TCP/IP).pdf", size: "14.7 MB", type: "Exam Notes", isBhaiPick: true, downloads: "52k" },
    { name: "Design & Analysis of Algorithms (DAA).pdf", size: "15.2 MB", type: "Exam Notes", isBhaiPick: true, downloads: "47k" },
    { name: "Compiler Design (Lex, Yacc, Parsing).pdf", size: "9.4 MB", type: "Exam Notes", isBhaiPick: false, downloads: "21k" },
    { name: "Software Engineering & SDLC Models.pdf", size: "7.8 MB", type: "Exam Notes", isBhaiPick: false, downloads: "33k" },
    { name: "Artificial Intelligence (State Space, ML).pdf", size: "16.1 MB", type: "Exam Notes", isBhaiPick: true, downloads: "41k" },
    { name: "Cloud Computing & AWS Fundamentals.pdf", size: "10.5 MB", type: "Exam Notes", isBhaiPick: false, downloads: "15k" },
    { name: "Cyber Security & Cryptography Essentials.pdf", size: "11.8 MB", type: "Exam Notes", isBhaiPick: true, downloads: "28k" },
    { name: "Web Technologies (HTML, CSS, JS, Node).pdf", size: "14.4 MB", type: "Exam Notes", isBhaiPick: true, downloads: "54k" },

    // --- MECHANICAL ENGINEERING ---
    { name: "Engineering Mechanics (Statics/Dynamics).pdf", size: "11.5 MB", type: "Exam Notes", isBhaiPick: true, downloads: "31k" },
    { name: "Thermodynamics Unit 1-5 Quick Revision.pdf", size: "10.2 MB", type: "Exam Notes", isBhaiPick: true, downloads: "44k" },
    { name: "Strength of Materials (SOM).pdf", size: "12.8 MB", type: "Exam Notes", isBhaiPick: false, downloads: "28k" },
    { name: "Fluid Mechanics & Machinery.pdf", size: "13.4 MB", type: "Exam Notes", isBhaiPick: true, downloads: "36k" },
    { name: "Heat & Mass Transfer (HMT).pdf", size: "14.5 MB", type: "Exam Notes", isBhaiPick: true, downloads: "29k" },
    { name: "Machine Design (Part 1 & 2).pdf", size: "18.2 MB", type: "Exam Notes", isBhaiPick: true, downloads: "22k" },

    // --- CIVIL ENGINEERING ---
    { name: "Surveying Unit 1-5 Notes.pdf", size: "14.5 MB", type: "Exam Notes", isBhaiPick: false, downloads: "19k" },
    { name: "Structural Analysis & Mechanics.pdf", size: "15.6 MB", type: "Exam Notes", isBhaiPick: true, downloads: "24k" },
    { name: "Geotechnical Engineering (Soil Mech).pdf", size: "13.4 MB", type: "Exam Notes", isBhaiPick: true, downloads: "21k" },
    { name: "RCC Design (Limit State Method).pdf", size: "18.4 MB", type: "Exam Notes", isBhaiPick: true, downloads: "32k" },
    { name: "Environmental Engineering Part 1 & 2.pdf", size: "15.8 MB", type: "Exam Notes", isBhaiPick: true, downloads: "20k" },

    // --- ELECTRICAL ENGINEERING ---
    { name: "Network Analysis & Synthesis.pdf", size: "13.4 MB", type: "Exam Notes", isBhaiPick: true, downloads: "29k" },
    { name: "Electrical Machines (DC & Transformers).pdf", size: "15.8 MB", type: "Exam Notes", isBhaiPick: true, downloads: "38k" },
    { name: "Power Systems-I Fundamentals.pdf", size: "14.1 MB", type: "Exam Notes", isBhaiPick: false, downloads: "22k" },
    { name: "Power Electronics (Inverters, Cyclo).pdf", size: "16.7 MB", type: "Exam Notes", isBhaiPick: true, downloads: "28k" },

    // --- CHEAT SHEETS ---
    { name: "SQL Query Master Cheat Sheet.pdf", size: "1.2 MB", type: "Cheat Sheets", isBhaiPick: true, downloads: "65k" },
    { name: "Python Data Science One-Pager.pdf", size: "0.8 MB", type: "Cheat Sheets", isBhaiPick: false, downloads: "32k" },
    { name: "Git & GitHub Workflow.pdf", size: "0.5 MB", type: "Cheat Sheets", isBhaiPick: true, downloads: "50k" },

    // --- INTERVIEW PREP ---
    { name: "Top 100 DSA Problems logic.pdf", size: "5.4 MB", type: "Interview Prep", isBhaiPick: true, downloads: "89k" },
    { name: "System Design fresher handbook.pdf", size: "7.2 MB", type: "Interview Prep", isBhaiPick: true, downloads: "15k" },
  ]);

  const filteredFiles = useMemo(() => {
    let result = files;
    if (activeCategory !== 'All') {
      result = files.filter(f => f.type === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return result;
  }, [files, activeCategory, searchQuery]);

  // Logic: Navigate to dynamic content page for any resource
  const handleResourceAction = (file: ResourceFile) => {
    const slug = file.name.replace('.pdf', '').replace('.zip', '').replace('.docx', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    let path = `/subjects/${slug}`;
    if (file.type === 'Cheat Sheets' || file.type === 'Interview Prep') {
      path = `/languages/${slug}/theory`; // Reuse existing logic for now
    }
    
    navigate(path);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: ResourceFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: "User Upload",
        isBhaiPick: false,
        downloads: "0",
        isUserUploaded: true
      };
      setFiles([newFile, ...files]);
    }
  };

  const categories = [
    { title: "Exam Notes", icon: <FileText className="text-blue-500" />, count: "120+ Subjects", color: "bg-blue-500/10", border: "border-blue-500/20" },
    { title: "Cheat Sheets", icon: <Zap className="text-yellow-500" />, count: "50+ Sheets", color: "bg-yellow-500/10", border: "border-yellow-500/20" },
    { title: "Interview Prep", icon: <ShieldCheck className="text-emerald-500" />, count: "30+ Guides", color: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { title: "Project Ideas", icon: <Star className="text-purple-500" />, count: "40+ Codes", color: "bg-purple-500/10", border: "border-purple-500/20" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Bhai's Premium Resource Library" 
          subtitle="Ab har subject ke notes milenge! Click any button to let Bhai AI generate custom study material for you instantly."
          badge="Live Content Engine"
        />

        {/* Categories Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(activeCategory === cat.title ? 'All' : cat.title)}
              className={`p-6 rounded-3xl border transition-all flex flex-col items-center text-center group ${activeCategory === cat.title ? 'bg-blue-600 border-blue-600 shadow-xl scale-105' : 'bg-white border-slate-100 hover:border-blue-300 shadow-sm'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${activeCategory === cat.title ? 'bg-white/20' : cat.color}`}>
                {React.cloneElement(cat.icon as React.ReactElement<{ className?: string }>, { className: `w-6 h-6 ${activeCategory === cat.title ? 'text-white' : ''}` })}
              </div>
              <h4 className={`font-black text-sm mb-1 ${activeCategory === cat.title ? 'text-white' : 'text-slate-900'}`}>{cat.title}</h4>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${activeCategory === cat.title ? 'text-blue-100' : 'text-slate-400'}`}>{cat.count}</p>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-white border border-slate-200 rounded-[2rem] p-2 overflow-hidden shadow-xl">
             <Search className="ml-6 text-slate-400 w-5 h-5" />
             <input 
              type="text" 
              placeholder="Search subjects... (e.g., Operating Systems, VLSI)" 
              className="flex-1 px-4 py-4 focus:outline-none text-slate-900 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             />
             <div className="mr-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase">
               {filteredFiles.length} Indexed
             </div>
          </div>
        </div>

        {/* File List */}
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden mb-12">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <h3 className="text-2xl font-black text-slate-900">
              {activeCategory === 'All' ? 'Engineering Knowledge Base' : activeCategory}
            </h3>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
            >
              <Upload className="w-4 h-4" /> Contribute PDF
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
            </button>
          </div>

          <div className="divide-y divide-slate-50">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file, i) => (
                <div key={i} className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-lg group-hover:rotate-6 transition-transform">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{file.name}</h4>
                        {file.isBhaiPick && (
                          <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-blue-500/20">
                            <Zap className="w-3 h-3 fill-current" /> High Priority
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>{file.size}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span>{file.type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="text-blue-500">{file.downloads} Active Readers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleResourceAction(file)}
                      className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                    >
                      <Eye className="w-4 h-4" /> Preview Notes
                    </button>
                    <button 
                      onClick={() => handleResourceAction(file)}
                      className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/10 active:scale-95"
                    >
                      <Download className="w-4 h-4" /> Get PDF
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-24 text-center">
                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h4 className="text-slate-900 font-black text-xl mb-2">Bhai, ye toh database mein nahi hai!</h4>
                <p className="text-slate-500 font-medium">Try generic subject names or ask Bhai AI in the chat below.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
