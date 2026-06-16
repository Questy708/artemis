export interface BlogArticleSection {
  heading?: string;
  body?: string;
  pullquote?: string;
  image?: string;
  imageCaption?: string;
}

export interface BlogArticle {
  id: string | number;
  title: string;
  slug: string;
  author: string;
  summary: string;
  category: 'Campaign' | 'Research' | 'Innovation' | 'Campus Life';
  date: string;
  readTime?: string;
  tags?: string[];
  image: string;
  heroAlt?: string;
  sections?: BlogArticleSection[];
}

export const heroContent = {
  image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600'
};

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: 'The Artemis Horizon: Charting the Path of the Imperial Guild Scaffold',
    slug: 'artemis-horizon-imperial-guild-scaffold',
    author: 'Elena Rostova, Dean of Trans-Orbital Engineering',
    summary: 'A comprehensive briefing on the newly deployed planetary system design cockpit and our mission to establish a resilient, decentralized research scaffold across the inner worlds.',
    category: 'Innovation',
    date: 'June 10, 2026',
    readTime: '6 min read',
    tags: ['Trans-Orbital', 'Guild Scaffold', 'Deep Space Engineering'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    heroAlt: 'A futuristic view of cosmic scaffolds stretching across an orbital plane',
    sections: [
      {
        heading: 'Phase 1: Deployment of the Guild Scaffold Nodes',
        body: 'Over the past quarter, the Artemis Collegium has initiated the primary sequence of our Trans-Orbital grid. By projecting secure, high-density quantum scaffold nodes across designated planetary sectors, we have successfully created a self-healing operational layer that bridges classical computational gaps and mitigates environmental degradation in deep space environments.\n\nThis system allows researchers, specialists, and scholars on any of our linked research vessels or planetary installations to tap into real-time shared simulation registers, vastly accelerating collaborative physics and engineering work.',
        pullquote: 'The Scaffold is not merely a grid of structures, but a neural lattice of human and synthetic minds working in absolute unison across the gravity wells.'
      },
      {
        heading: 'Pioneering Planetary System Design Cockpits',
        body: 'Central to this initiative is the newly updated Artemis Horizon interface. Implemented as an immersive, high-contrast operational cockpit, it gives directors and students the ability to simulate and mitigate complex topological challenges locally, before initiating physical node assembly. With custom mitigation matrices, we can model and defuse localized solar storms and gravitational variance, ensuring maximum uptime across our entire network.'
      }
    ]
  },
  {
    id: 2,
    title: 'Empowering Next-Generation Thinkers: The Launch of the Collegium Alliance Initiative',
    slug: 'collegium-alliance-initiative-launch',
    author: 'Vice-Chancellor Marcus Vance',
    summary: 'Artemis Collegium unites with global leaders to launch the Collegium Alliance—a historic network dedicated to cross-disciplinary knowledge systems, ethical AI governance, and planetary stewardship.',
    category: 'Campaign',
    date: 'May 28, 2026',
    readTime: '4 min read',
    tags: ['Alliance', 'Campaign', 'Ethics', 'Collaboration'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600',
    sections: [
      {
        heading: 'An Historic Concreteness of Purpose',
        body: 'The Collegium Alliance brings together twelve founding research hubs and seven physical colleges in a unified trust. Enabled by generous donations from our global fundraising campaign, this alliance aims to transition academic discovery into direct, field-ready local action within months, rather than the traditional decade-long publishing cycle.\n\nOur initial cohorts will focus on two major directions: localized eco-systemic micro-grids, and decentralized cryptographic compliance standards designed to safeguard human agency in automated economies.'
      }
    ]
  },
  {
    id: 3,
    title: 'Quantum Resonance Harmonics in the Deep Inner Mantle',
    slug: 'quantum-resonance-harmonics-mantle',
    author: 'Dr. Aris Thorne, Center for Core Seismology',
    summary: 'A review of recent experimental data confirming acoustic anomalies in deep tectonic layers, and key findings on the generation of localized energy fields through high-frequency seismic waves.',
    category: 'Research',
    date: 'April 14, 2026',
    readTime: '8 min read',
    tags: ['Seismology', 'Quantum Harmonics', 'Geophysics'],
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1600',
    sections: [
      {
        heading: 'Probing the Depths',
        body: 'Using the advanced deep-crust array developed here at Artemis, our seismologists have recorded a series of highly synchronized periodic oscillations at approximately 2,900 kilometers below the continental shield. These resonance patterns do not conform to standard mechanical seismic wave behavior, suggestion a coupled geodynamic effect that we are now calling Core Resonance Harmonics.\n\nThis breakthrough validates our long-standing hypothesis that the earth\'s core-mantle boundary behaves as a massive acoustic lens, concentrating secondary waves into distinct, highly energetic nodes.'
      }
    ]
  },
  {
    id: 4,
    title: 'Life in the Central Quad: Designing the New Student Assembly Precinct',
    slug: 'central-quad-student-assembly-precinct',
    author: 'Sienna Lin, Student President',
    summary: 'An inside look at the blueprint for the upcoming Central Quad redevelopment project, co-created by our student body to feature open-air lecture gardens and bio-domes for creative meditation.',
    category: 'Campus Life',
    date: 'March 19, 2026',
    readTime: '3 min read',
    tags: ['Campus Life', 'Master Plan', 'Sustainability'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600',
    sections: [
      {
        heading: 'A Living, Breathing Campus Hub',
        body: 'At Artemis, education does not stop when you exit the seminar room. The new Student Assembly Precinct is designed as a direct physical manifestation of our philosophy of active, social, and continuous inquiry. Work will begin in late July to construct three large-span thermodynamic bio-domes that will house a mixture of native flora, micro-labs, and collaborative assembly stations designed to accommodate both quiet reflection and rapid collaborative hackathons.'
      }
    ]
  }
];
