
import React from 'react';
import { Terminal, Braces, Cpu, Code2, Globe, Database } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Languages', path: '/languages' },
  { name: 'Subjects', path: '/subjects' },
  { name: 'Projects', path: '/projects' },
  { name: 'Roadmaps', path: '/roadmaps' },
  { name: 'Resources', path: '/resources' },
];

export const LANGUAGES = [
  { id: 'c', title: 'C Programming', description: 'Mother of all languages. We cover Memory Layout, Pointers, and low-level System calls in depth.', icon: <Terminal />, category: 'Basics', hoverColor: 'hover:bg-blue-50 hover:border-blue-400' },
  { id: 'cpp', title: 'C++', description: 'DSA ka King. Deep dive into STL, OOPs internals, and Performance Optimization templates.', icon: <Braces />, category: 'Intermediate', hoverColor: 'hover:bg-indigo-50 hover:border-indigo-400' },
  { id: 'java', title: 'Java', description: 'Enterprise level robustness. JVM Architecture, Garbage Collection, and Multithreading mastered.', icon: <Cpu />, category: 'Intermediate', hoverColor: 'hover:bg-orange-50 hover:border-orange-400' },
  { id: 'python', title: 'Python', description: 'AI/ML powerhouse. Covering GIL, Generators, Decorators, and full-stack Backend basics.', icon: <Code2 />, category: 'Beginner', hoverColor: 'hover:bg-yellow-50 hover:border-yellow-400' },
  { id: 'js', title: 'JavaScript', description: 'The language of the web. Event Loop, Closures, and Async/Await explored at a deep level.', icon: <Globe />, category: 'Web', hoverColor: 'hover:bg-yellow-100 hover:border-yellow-500' },
];

export const SUBJECTS = [
  { id: 'dsa', title: 'Data Structures & Algorithms', description: 'Placement ka secret weapon. 100+ standard problems and visual logic explanations.', icon: <Database />, hoverColor: 'hover:bg-purple-50 hover:border-purple-400', accent: 'bg-purple-600' },
  { id: 'dbms', title: 'Database Management', description: 'SQL, NoSQL, Indexing, and Transaction Management for high-scale systems.', icon: <Database />, hoverColor: 'hover:bg-emerald-50 hover:border-emerald-400', accent: 'bg-emerald-600' },
  { id: 'os', title: 'Operating Systems', description: 'Scheduling, Deadlocks, and Memory Management explained with real OS examples.', icon: <Cpu />, hoverColor: 'hover:bg-red-50 hover:border-red-400', accent: 'bg-red-600' },
  { id: 'cn', title: 'Computer Networks', description: 'OSI Model, TCP/IP deep-dive, and Cloud infrastructure basics.', icon: <Globe />, hoverColor: 'hover:bg-cyan-50 hover:border-cyan-400', accent: 'bg-cyan-600' },
];

export const QUOTES = [
  "Bhai, tension mat le, placement ho jayega! Bas padhte reh.",
  "Engineering is not just a degree, it's an emotion.",
  "Sleep is a luxury, coding is a necessity.",
  "Real heroes don't wear capes, they resolve merge conflicts.",
];
