import {
  Bot,
  BrainCircuit,
  Code2,
  Database,
  Github,
  Globe,
  Layers3,
  Mail,
  Phone,
  Rocket,
  Sparkles,
  Trophy,
  WandSparkles
} from "lucide-react";

export const profile = {
  name: "Muhammad Hafeez",
  role: "AI Engineer / Software Developer",
  shortRoles: [
    "AI Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Problem Solver",
    "Future Builder",
    "Software Architect"
  ],
  phone: "+94766042952",
  email: "haffeypythonista@gmail.com",
  github: "haffey041707",
  description:
    "Passionate AI Engineer and Software Developer with experience developing AI-based projects and modern web applications. Skilled in Python, JavaScript, Flask, HTML, CSS, PostgreSQL, PyTorch, TensorFlow, Scikit-Learn and API integrations.",
  seo:
    "Muhammad Hafeez is an AI Engineer and Software Developer specializing in Python, Flask, AI products, modern web applications, and intelligent automation."
};

export const stats = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "Technologies Learned", value: 18, suffix: "+" },
  { label: "Hours Coding", value: 2400, suffix: "+" }
];

export const projects = [
  {
    title: "Aiba AI Virtual Assistant",
    badge: "Project 01",
    description:
      "AI-powered assistant with 46+ intelligent features including real-time voice interaction, Urdu and English support, automation commands, application launching, website navigation, and a modern animated UI.",
    tech: ["Python", "Eel", "JavaScript", "APIs"],
    icon: Bot,
    github: "https://github.com/haffey041707/Aiba-Virtual-Ai-Assistant"
  },
  {
    title: "Birthday-Gift-Behan",
    badge: "Project 02",
    description:
      "AI-powered birthday platform featuring robotic voice wishes, animated gift box visuals, personalized interactions, and modern UI animations.",
    tech: ["Python", "JavaScript", "AI APIs"],
    icon: WandSparkles,
    github: "https://github.com/haffey041707/Virtual-Ai-Birthday-Wish"
  },
  {
    title: "Restaurant Recommendation System",
    badge: "Project 03",
    description:
      "Full-stack restaurant recommendation and booking platform with smart recommendations, table booking, dynamic frontend, backend logic, and database support.",
    tech: ["HTML", "CSS", "JavaScript", "Python", "Flask"],
    icon: Database,
    github: "https://github.com/haffey041707/Full-Stack-Restaurant-Recommendation-System"
  }
];

export const skillGroups = [
  {
    label: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 94 },
      { name: "JavaScript", level: 88 },
      { name: "HTML", level: 92 },
      { name: "CSS", level: 90 },
      { name: "Shell", level: 76 },
      { name: "SQL", level: 84 }
    ]
  },
  {
    label: "Frameworks",
    icon: Layers3,
    skills: [
      { name: "Flask", level: 88 },
      { name: "React.js", level: 86 },
      { name: "API Integration", level: 90 },
      { name: "PostgreSQL", level: 82 }
    ]
  },
  {
    label: "AI",
    icon: BrainCircuit,
    skills: [
      { name: "PyTorch", level: 82 },
      { name: "TensorFlow", level: 80 },
      { name: "Scikit-Learn", level: 85 },
      { name: "Prompt Engineering", level: 92 }
    ]
  },
  {
    label: "Professional",
    icon: Trophy,
    skills: [
      { name: "Teamwork", level: 94 },
      { name: "Project Management", level: 86 },
      { name: "Time Management", level: 88 },
      { name: "Creativity", level: 95 },
      { name: "Problem Solving", level: 93 },
      { name: "Adaptability", level: 90 }
    ]
  }
];

export const timeline = [
  {
    year: "2024",
    title: "Diploma in Education IT",
    institution: "SEG Awards",
    detail: "Built the practical base for software delivery, IT systems, and digital problem solving."
  },
  {
    year: "2024 - 2026",
    title: "HND Software Engineering",
    institution: "Pearson",
    detail: "Advancing full-stack engineering, database systems, architecture, and production workflows."
  }
];

export const techMarquee = [
  "Python",
  "JavaScript",
  "CSS",
  "HTML",
  "Shell",
  "React",
  "Flask",
  "TensorFlow",
  "PyTorch",
  "PostgreSQL",
  "Scikit-Learn",
  "Next.js",
  "Three.js"
];

export const contactLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, icon: Phone },
  { label: "GitHub", value: profile.github, href: `https://github.com/${profile.github}`, icon: Github },
  { label: "Global", value: "Available remotely", href: "#contact", icon: Globe }
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" }
];

export const highlights = [
  { icon: BrainCircuit, text: "AI product thinking" },
  { icon: Rocket, text: "Fast full-stack delivery" },
  { icon: Sparkles, text: "Premium interface craft" }
];
