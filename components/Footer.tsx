
import React from 'react';
import { Github, Twitter, Linkedin, Heart, Send, Activity } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <h3 className="text-2xl font-black text-slate-900 mb-4">EngineerBhai</h3>
            <p className="text-slate-500 font-medium mb-6">Making engineering education accessible, simple, and fun. Aapka apna bhai is here for you!</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-black mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-slate-600 font-bold text-sm">
              <li><a href="#/languages" className="hover:text-blue-600 transition-colors">Languages Hub</a></li>
              <li><a href="#/subjects" className="hover:text-blue-600 transition-colors">Subject Notes</a></li>
              <li><a href="#/roadmaps" className="hover:text-blue-600 transition-colors">Career Roadmaps</a></li>
              <li><a href="#/projects" className="hover:text-blue-600 transition-colors">Project Source Code</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black mb-6 uppercase tracking-widest text-xs">Join Us</h4>
            <ul className="space-y-4 text-slate-600 font-bold text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Telegram Community</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Discord Server</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Placement Updates</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Become a Mentor</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black mb-6 uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-slate-500 mb-4 text-sm font-medium">Get the latest notes directly in your inbox.</p>
            <div className="relative mb-6">
              <input 
                type="email" 
                placeholder="bhai@example.com" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 shadow-sm"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Live Server Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1">
                <Activity className="w-3 h-3" /> AI Engine: Online
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <p>© 2024 EngineerBhai. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-current" /> by <span className="text-slate-900">Aapka Apna Bhai</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
