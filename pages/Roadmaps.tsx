
import React from 'react';
import { Map, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

interface RoadmapsProps {
  onTriggerAI?: (msg: string) => void;
}

const Roadmaps: React.FC<RoadmapsProps> = ({ onTriggerAI }) => {
  const roadmaps = [
    { 
      title: "Frontend Web Development", 
      time: "4-6 Months", 
      level: "Beginner Friendly",
      color: "from-orange-500 to-red-500",
      image: "https://picsum.photos/400/300?random=2"
    },
    { 
      title: "Backend Specialist", 
      time: "6-8 Months", 
      level: "Intermediate",
      color: "from-emerald-500 to-teal-500",
      image: "https://picsum.photos/400/300?random=3"
    },
    { 
      title: "AI & Machine Learning", 
      time: "10-12 Months", 
      level: "Advanced",
      color: "from-blue-500 to-purple-500",
      image: "https://picsum.photos/400/300?random=4"
    },
    { 
      title: "Android App Development", 
      time: "5-7 Months", 
      level: "Intermediate",
      color: "from-green-500 to-emerald-500",
      image: "https://picsum.photos/400/300?random=5"
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Guided Career Paths" 
          subtitle="Confused where to start? Humne saare topics line-wise arrange kar diye hain. Bas follow karte jao."
          badge="Your Journey"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {roadmaps.map((road, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col md:flex-row h-full shadow-2xl">
              <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden relative">
                <img src={road.image} alt={road.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${road.color} opacity-40 mix-blend-overlay`}></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                  {road.level}
                </div>
              </div>
              <div className="p-8 w-full md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight">{road.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-6 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" /> Suggested Time: {road.time}
                  </div>
                  <div className="space-y-3 mb-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                        <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                        Step {i}: Important Core Concepts
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => onTriggerAI?.(`Bhai, mujhe ${road.title} ka detailed roadmap chahiye with resources.`)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-slate-800 group-hover:bg-blue-600 text-white rounded-2xl font-bold transition-all transform group-hover:scale-[1.02]"
                >
                  Ask Bhai for Resources <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Big CTA */}
        <div className="mt-20 p-12 bg-blue-600/10 border border-blue-500/20 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Map className="w-32 h-32 text-blue-500" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Want a Custom Roadmap?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Bhai ko batao apne interest and current skill level, and we'll generate a personalized path just for you.
          </p>
          <button 
            onClick={() => onTriggerAI?.("Bhai, mujhe mere liye ek personalized engineering roadmap chahiye. Help kar!")}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/40"
          >
            Talk to Bhai AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
