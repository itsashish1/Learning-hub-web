
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC<{ isOpen: boolean; onClose: () => void; initialMessage?: string }> = ({ isOpen, onClose, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleExternalTrigger = (e: any) => {
      handleSend(e.detail);
    };
    window.addEventListener('open-chatbot', handleExternalTrigger);
    return () => window.removeEventListener('open-chatbot', handleExternalTrigger);
  }, [messages]);

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      handleSend(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const demoResponses: { [key: string]: string[] } = {
    'dsa': [
      'Bhai! DSA ho to mast padho. LinkedList aur Trees ko samjh lo pehle, uske baad recursion bilkul clear ho jayega. Leetcode solve kar, daily 2-3 problems. 6 months mein bhai expert ban jayega! 💪',
      'Data Structures aur Algorithms—ye duniya ki sabse important chiz hai engineering mein! Array, LinkedList, Stack, Queue, Tree, Graph... sab seekh. Time complexity aur Space complexity samajhna zaroori hai!',
      'Bhai recursion samajhne mein dikkat aa rahi? Ek simple chiz hai—function apne aap ko call kare, base case likh aur baaki recursion sambhal lega. Factorial, Fibonacci se start kar!',
    ],
    'dbms': [
      'DBMS mein normalization aur joins achche se samjhna. SQL practice kar, real databases banao. MongoDB bhi seekh le, real world mein dono kaam aate hain bhai!',
      'Database design bahut important hai! Relationships samajh—One-to-One, One-to-Many, Many-to-Many. Foreign keys use kar, data integrity maintain kar. ACID properties seekh le!',
      'SQL likho efficiently bhai! Joins, subqueries, indexes—sab seekh. Slow queries profiling kar aur optimize kar. Performance matter karta hai production mein!',
    ],
    'os': [
      'Operating Systems bahut important hai! Process scheduling, memory management, deadlock—inn sab ko achche se samjh. Galat concept waalah bhai interview mein phase 1 hi fail ho jayega!',
      'Threads aur Processes mein difference samajh. Synchronization, Mutex, Semaphore—ye sab critical hai multithreading mein. Race conditions se bachna bhai!',
      'Memory management padh—Virtual memory, Paging, Segmentation. Garbage collection aur manual memory allocation ke pros-cons samajh!',
    ],
    'projects': [
      'Project banao jo real problem solve kare. Todo app se zyada seekh lo. Full stack banao—database, backend, frontend sab. GitHub mein push kar, portfolio strong hoga!',
      'Github pe projects daal aur README likho properly. Documentation zaroori hai bhai! Employers teri code dekh kar samajh jayenge ki tu kitna serious ho!',
      'Real-world problem solve kar project se. Scalability, security, performance—sab sochh kar banao. Production-ready code likha na, beta version nahi!',
    ],
    'placement': [
      'Placement ke liye DSA strong rakh, Projects interesting banao, communication skills develop kar. Companies logo chahte hain jo problem solve kar saken, na ki theory waale knowledge burra hua bande!',
      'Interview ke liye consistent preparation zaroor hai. Mock interviews de, communicate clear kar apne approach ko. Confidence aur clarity matter karte hain coding interviews mein!',
      'Resume strong banao—projects, internships, achievements highlight kar. LinkedIn profile bhi proper rakh. Networking karo, senior se mentor lelo!',
    ],
    'coding': [
      'Coding practice daily kar bhai! Competitive programming mein involve ho, Codeforces pe contests daal. Consistency chahiye, talent nahi! 30 din mein coding sense aa jayega guarantee!',
      'Clean code likho! Readability matter karta hai. Variable names meaningful rakh, functions small aur focused banao. Comments likho jo confusing logic explain kare!',
      'Testing likho apne code ke liye. Unit tests, integration tests—sab zaroori hai production code mein. TDD approach try kar!',
    ],
    'java': [
      'Java bahut powerful language hai! OOP concepts—Inheritance, Polymorphism, Encapsulation, Abstraction—sab samajh. Collections Framework (ArrayList, HashMap, HashSet) regularly use karna!',
      'Multithreading in Java seekh! Thread pool, ExecutorService use kar. Thread-safe code likho aur race conditions se bachh!',
      'Exception handling properly kar. Try-catch-finally istemal kar, meaningful error messages likho. Logging implement kar apne applications mein!',
    ],
    'python': [
      'Python easy language hai shuruat ke liye! Libraries bahut hain—NumPy, Pandas, Django, Flask. Data science aur web development dono ke liye use hota hai!',
      'Python ke decorators, generators, context managers seekh! List comprehensions use kar, code concise aur readable banao!',
      'Virtual environments hamesha use kar! pip se packages install kar, requirements.txt maintain kar. Production-ready Python application banao!',
    ],
    'web development': [
      'Web development full stack sikho! HTML, CSS, JavaScript frontend mein. Backend mein Node.js ya Python use kar! Database connect kar aur APIs banao!',
      'React seekho bhai! Components, hooks, state management—sab zaroori hai modern frontend mein. Redux ya Context API use kar state manage karne ke liye!',
      'Responsive design banao! Mobile-first approach follow kar. CSS Grid aur Flexbox use kar. Testing likho frontend code ke liye!',
    ],
    'interview': [
      'Interview ke liye pehle practice kar! Coding rounds mein optimal solutions likho, time aur space complexity discuss kar. Behavioral questions ke liye STAR method use kar!',
      'System design questions padh! Scalability, load balancing, caching—sab concepts clear ho jayenge!',
      'Previous year questions dekh, similar problems solve kar. Company ke projects aur tech stack research kar interview se pehle!',
    ],
    'help': [
      'Bhai, main yahan hoon tere help ke liye! Pucho: DSA, DBMS, OS, Projects, Placements, Java, Python, Web Development, Interviews—anything bhai!',
      'Confusion mein hoon? Clear kar aur sochna shuru kar! Fundamentals strong ho jayenge agar consistently padhe. Main yahan hoon guidance dene ke liye!',
    ],
  };

  const getRandomDemoResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    for (const [key, responses] of Object.entries(demoResponses)) {
      if (lowerText.includes(key)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    const genericResponses = [
      'Bilkul bhai! Ye bahut important topic hai. Deep mein soch aur consistent practice kar. 💪',
      'Bhai, ye sab seekhne se pehle fundamentals clear kar. Base strong hona chahiye!',
      'Sahi pucha bhai! Ye approach bilkul correct hai. Aur deep mein soch!',
      'Haan bhai, bilkul yeh sahi idea hai! Aise hi approach kar, success mil jayegi!',
      'Bhai ye confusion clear hoga agar practice karoge. Daily 2-3 ghante code kar, sab samajh aa jayega!',
      'Interesting question! Ye topic bahut important hai. Iska use har jagah hota hai!',
      'Exactly bhai! Tu sahi direction mein chal raha hai. Akelagiri mat kar, apne doubts pucho!',
      'Ye mujhe bhi pasand aaya! Pro-level thinking kar raha hai tu. Continue karte reh!',
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.message) {
        setMessages(prev => [...prev, { role: 'model', text: data.message }]);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      // Fallback to demo response if API fails
      const demoResponse = getRandomDemoResponse(text);
      setMessages(prev => [...prev, { role: 'model', text: `[Demo Mode] ${demoResponse}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-black leading-none text-lg">EngineerBhai AI</h3>
            <span className="text-[10px] text-blue-100 uppercase tracking-widest font-black">Live Support</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center py-10 px-6">
            <Bot className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-slate-900 font-black mb-2 text-xl">Poocho bhai, tension mat lo!</h4>
            <p className="text-slate-500 text-sm font-medium italic">"Semester exams, codes, projects, ya career—Bhai hai na yahan!"</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <div className="text-sm font-medium whitespace-pre-wrap leading-relaxed">{m.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2 shadow-sm">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-xs text-slate-500 font-bold italic">Thinking like an engineer...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Poocho bhai..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1.5 p-1.5 bg-blue-600 disabled:bg-slate-300 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
