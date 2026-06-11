export interface SiteConfig {
  coupleNames: {
    partner1: string;
    partner2: string;
  };
  anniversaryDate: string; // ISO string or simple YYYY-MM-DD
  siteTitle: string;
  siteSubtitle: string;
  heroGreeting: string;
  heroDescription: string;
  theme: {
    fontSans: string;
    fontSerif: string;
    primaryColor: string; // e.g., 'rose' | 'pink' | 'emerald'
    glassBlur: string; // Tailwind blur class
  };
  heroCarouselImages?: string[];
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  date: string;
  description: string;
  category: 'adventure' | 'cozy' | 'travel' | 'special';
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  emoji: string;
  description: string;
  imageUrl?: string;
  tag?: string;
}

export interface ReasonItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Name of Lucide React icon
}

export interface LoveLetterContent {
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CountdownItem {
  id: string;
  title: string;
  targetDate: string; // YYYY-MM-DDTHH:mm:ss
  description: string;
}

export interface LetterItem {
  id: string;
  category: string; // e.g. "Read when you miss me"
  iconName: string; // Lucide icon
  title: string;
  content: string;
  date: string;
}
