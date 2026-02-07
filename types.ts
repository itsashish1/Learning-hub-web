
export interface ResourceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  link: string;
  tags: string[];
}

export interface RoadmapStep {
  title: string;
  description: string;
  resources: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  image: string;
  steps: RoadmapStep[];
}

export interface Project {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  description: string;
  image: string;
}
