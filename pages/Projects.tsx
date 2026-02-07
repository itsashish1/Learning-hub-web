
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { Code, Layout, Smartphone, Database, Cpu } from 'lucide-react';

const Projects: React.FC = () => {
  const categories = [
    { id: 'web-dev', title: 'Web Development', icon: <Layout className="text-blue-600" />, desc: 'Portfolio, E-commerce, Social Media clones.', hoverColor: 'hover:bg-blue-50 hover:border-blue-400' },
    { id: 'app-dev', title: 'App Development', icon: <Smartphone className="text-purple-600" />, desc: 'Task manager, Expense tracker, Chat apps.', hoverColor: 'hover:bg-purple-50 hover:border-purple-400' },
    { id: 'ml-ai', title: 'AI & Machine Learning', icon: <Cpu className="text-teal-600" />, desc: 'Spam classifier, Face detection, Chatbots.', hoverColor: 'hover:bg-teal-50 hover:border-teal-400' },
    { id: 'db-systems', title: 'DBMS Systems', icon: <Database className="text-orange-600" />, desc: 'Library management, Hospital records, Banking.', hoverColor: 'hover:bg-orange-50 hover:border-orange-400' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Mini & Major Projects" 
          subtitle="Ready-to-use project ideas with source code explanations. Impress your professors and interviewers."
          badge="Portfolio Builders"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/projects/${cat.id}`}
              className={`p-10 bg-white border border-slate-200 rounded-[2.5rem] ${cat.hoverColor} transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                {React.cloneElement(cat.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{cat.title}</h3>
              <p className="text-slate-600 text-sm mb-8 font-medium leading-relaxed">{cat.desc}</p>
              <div className="text-blue-600 text-sm font-black flex items-center gap-2 group-hover:gap-4 transition-all">
                Explore Projects <Code className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-16 rounded-[3rem] border border-slate-700 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 pointer-events-none"></div>
          <h3 className="text-4xl font-black text-white mb-6">Need a specific project explanation?</h3>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed font-medium">Click any category above, or ask Bhai AI in the chat to generate a custom project report for you.</p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot', { detail: 'Bhai, mujhe ek awesome final year project idea chahiye with source code link!' }))}
            className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            Ask Bhai for Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
