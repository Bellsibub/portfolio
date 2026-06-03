// Curated list of commonly used tech icons
// Format: { label: Display Name, value: icon key }
export const SKILL_ICONS = [
    { label: 'TypeScript', value: 'SiTypescript' },
    { label: 'JavaScript', value: 'SiJavascript' },
    { label: 'HTML5', value: 'SiHtml5' },
    { label: 'CSS3', value: 'FaCss3' },

    { label: 'React', value: 'FaReact' },
    { label: 'TanStack Router', value: 'TbRoute' },
    { label: 'TanStack Query', value: 'TbDatabaseSearch' },
    { label: 'Zustand', value: 'TbStack2' },
    { label: 'React Hook Form', value: 'TbForms' },
    { label: 'Zod', value: 'TbShieldCheck' },
    { label: 'Framer Motion', value: 'TbVectorBezier' },

    { label: 'Tailwind CSS', value: 'SiTailwindcss' },
    { label: 'shadCN/UI', value: 'TbComponents' },
    { label: 'Radix UI', value: 'TbLayoutGrid' },

    { label: 'Supabase', value: 'SiSupabase' },
    { label: 'PostgreSQL', value: 'SiPostgresql' },
    { label: 'Node.js', value: 'FaNodeJs' },
    { label: 'Edge Functions', value: 'TbBolt' },

    { label: 'Vite', value: 'SiVite' },
    { label: 'npm', value: 'FaNpm' },
    { label: 'Git', value: 'FaGitAlt' },
    { label: 'GitHub', value: 'FaGithub' },
    { label: 'Docker', value: 'FaDocker' },
    { label: 'Netlify', value: 'SiNetlify' },

    { label: 'Accessibility', value: 'FaUniversalAccess' },
    { label: 'Responsive Design', value: 'TbDeviceMobile' },
    { label: 'Authentication', value: 'TbLockPassword' },
    { label: 'API Integration', value: 'TbPlugConnected' },
    { label: 'Performance Optimization', value: 'TbGauge' },
    { label: 'CMS / Content Modeling', value: 'TbBlocks' },

    { label: 'Next.js', value: 'SiNextdotjs' },
    { label: 'GraphQL', value: 'SiGraphql' },
    { label: 'AWS', value: 'FaAws' },
    { label: 'Kubernetes', value: 'SiKubernetes' },
    { label: 'React Native', value: 'TbBrandReactNative' },
    { label: 'Testing', value: 'TbTestPipe' },
] as const;

export type SkillIconValue = (typeof SKILL_ICONS)[number]['value'];
