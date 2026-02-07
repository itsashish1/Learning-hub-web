
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { 
  Loader2, ArrowLeft, Download, Sparkles, 
  MessageSquare, CheckCircle2, BookOpen, 
  Zap, Lightbulb, ChevronRight, GraduationCap, Code
} from 'lucide-react';

interface GuidePageProps {
  type: 'subject' | 'language' | 'project';
}

const GuidePage: React.FC<GuidePageProps> = ({ type }) => {
  const { id, mode } = useParams<{ id: string; mode?: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchFullContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        let prompt = "";
        const topicName = id?.replace(/-/g, ' ');

        if (type === 'language') {
          if (mode === 'theory') {
            prompt = `You are 'EngineerBhai', a top-tier Engineering Mentor. 
              Generate an EXHAUSTIVE Theory Guide for: ${topicName} programming language.
              Focus on: 
              - Fundamentals and Architecture.
              - Memory Layout, Stack vs Heap, and Pointers/References.
              - Compiler/Interpreter internals.
              - Interview questions.
              Deliver maximum value in a Hinglish big-brother tone.`;
          } else {
            prompt = `You are 'EngineerBhai', a top-tier Engineering Mentor. 
              Generate a Complete CODE MASTERCLASS for: ${topicName}.
              Provide snippets from Hello World to Industry patterns. Deliver in Hinglish.`;
          }
        } else {
          // General Subject/Exam Notes Prompt
          prompt = `You are 'EngineerBhai', a top-tier Engineering Mentor specializing in BTech exams. 
            Generate EXHAUSTIVE EXAM NOTES for the subject: ${topicName}.
            
            Structure required for absolute student success:
            1. Syllabus Roadmap: Break down into 5 standard engineering units.
            2. Detailed Unit-wise Theory: Explain concepts like a big brother in simple Hinglish. 
            3. Must-Know Diagrams: Describe important diagrams for each unit that students should draw in exams.
            4. Important Formulae/Equations: List them clearly.
            5. Previous Year Questions (PYQs): List top 10 most repeated questions with answer hints.
            6. 'Bhai's Cheat Tip': Secret to scoring high in this specific subject.
            
            Use bold text, tables, and lists. Deliver maximum depth as if this is the ONLY source a student needs to pass.`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { 
            temperature: 0.7,
          }
        });

        setContent(response.text || "Bhai, content load nahi ho raha. Refresh karke dekh?");
      } catch (err) {
        console.error("Content fetch error:", err);
        setError("Network issue hai bhai! Check your connection or refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullContent();
  }, [id, type, mode]);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const fileName = `${id}-Notes-EngineerBhai.md`;
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Library
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl border border-slate-200 min-h-[600px] flex flex-col items-center justify-center text-center">
            <div className="relative mb-10">
              <div className="w-24 h-24 border-8 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Preparing Full Masterclass...</h2>
            <p className="text-slate-500 italic text-lg">Bhai is indexing every important unit for {id?.replace(/-/g, ' ')}.</p>
            
            <div className="mt-12 space-y-4 w-full max-w-md mx-auto">
              <div className="h-3 bg-slate-100 rounded-full animate-pulse w-full"></div>
              <div className="h-3 bg-slate-100 rounded-full animate-pulse w-5/6 mx-auto"></div>
              <div className="h-3 bg-slate-100 rounded-full animate-pulse w-4/6 mx-auto"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-[3rem] p-20 shadow-2xl border border-red-100 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Lightbulb className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">{error}</h2>
            <button onClick={() => window.location.reload()} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all">Try Again</button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative border border-slate-200 overflow-hidden group">
               <div className="absolute top-0 right-0 w-[50%] h-[40%] bg-blue-50 rounded-full blur-[120px] -z-10 group-hover:bg-blue-100/50 transition-colors duration-1000"></div>
               
               <div className="mb-16 flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-slate-100 pb-12">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/20">
                        Bhai's Special Masterclass
                      </span>
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase px-4 py-1.5 rounded-full">Exam Ready</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 capitalize tracking-tighter leading-tight mb-4">
                      {id?.replace(/-/g, ' ')}
                    </h1>
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-lg">
                      <GraduationCap className="w-6 h-6 text-blue-600" /> Curated for Engineering Students
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <button 
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:bg-slate-300"
                    >
                      {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                      Export as PDF
                    </button>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot', { detail: `Bhai, mujhe ${id} subject mein ye cheez samajh nahi aa rahi...` }))}
                      className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                    >
                      <MessageSquare className="w-5 h-5" /> Ask Doubts
                    </button>
                  </div>
               </div>

               <div className="prose prose-slate prose-lg max-w-none 
                 prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tighter prose-headings:mt-16 prose-headings:mb-8
                 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-xl
                 prose-strong:text-blue-700 prose-strong:font-black
                 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-code:font-bold
                 prose-pre:bg-slate-900 prose-pre:border-0 prose-pre:rounded-[2.5rem] prose-pre:p-10 prose-pre:shadow-2xl prose-pre:my-12
                 prose-li:text-slate-700 prose-li:mb-4 prose-li:text-lg
                 prose-img:rounded-[2rem]
                 whitespace-pre-wrap font-medium">
                 {content}
               </div>

               <div className="mt-24 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white font-black text-4xl shadow-2xl transform hover:rotate-6 transition-transform">B</div>
                    <div>
                      <p className="text-slate-900 font-black text-2xl mb-1">EngineerBhai</p>
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Trusted Mentor Partner
                      </p>
                    </div>
                 </div>
                 <div className="text-center md:text-right">
                   <p className="text-slate-600 text-2xl font-bold mb-8 italic">"Bas itna padh le bhai, 8.5+ CGPA pakki hai!"</p>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePage;
