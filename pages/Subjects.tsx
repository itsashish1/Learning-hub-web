
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { SUBJECTS } from '../constants';

const Subjects: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="BTech Subjects Notes" 
          subtitle="Semester wise notes, simplified for the Indian student."
          badge="Study Material"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUBJECTS.map((sub) => (
            <Link 
              to={`/subjects/${sub.id}`}
              key={sub.id} 
              className={`relative overflow-hidden group p-8 rounded-[2.5rem] bg-white border border-slate-200 ${sub.hoverColor} hover:shadow-2xl transition-all duration-500 block transform hover:-translate-y-2`}
            >
              <div className={`w-14 h-14 ${sub.accent || 'bg-slate-900'} rounded-2xl flex items-center justify-center mb-6 border border-slate-100 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 text-white`}>
                {React.cloneElement(sub.icon as React.ReactElement<{ className?: string }>, { className: 'w-7 h-7' })}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">{sub.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm">{sub.description}</p>
              <div className="w-full py-3 bg-slate-900 group-hover:bg-blue-600 text-white rounded-xl font-black text-sm text-center transition-all duration-500 shadow-lg">
                View Notes
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
