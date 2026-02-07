
import React, { Suspense, lazy, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { MessageSquare } from 'lucide-react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Languages = lazy(() => import('./pages/Languages'));
const Roadmaps = lazy(() => import('./pages/Roadmaps'));
const Resources = lazy(() => import('./pages/Resources'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const Subjects = lazy(() => import('./pages/Subjects'));
const Projects = lazy(() => import('./pages/Projects'));

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>();

  const triggerChat = (msg?: string) => {
    setChatInitialMessage(msg);
    setIsChatOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-blue-600/10 relative text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-white">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Bhai</div>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/languages" element={<Languages />} />
              <Route path="/languages/:id/:mode" element={<GuidePage type="language" />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/:id" element={<GuidePage type="subject" />} />
              <Route path="/roadmaps" element={<Roadmaps onTriggerAI={triggerChat} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<GuidePage type="project" />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Floating Chat Button */}
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform z-50 animate-bounce"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        )}

        <Chatbot 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          initialMessage={chatInitialMessage}
        />
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
