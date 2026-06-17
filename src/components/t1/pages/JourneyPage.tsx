'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  ChevronRight, 
  Layers, 
  Briefcase, 
  Sparkles, 
  X, 
  CheckCircle2, 
  TrendingUp
} from 'lucide-react';

interface MilestoneDetail {
  title: string;
  desc: string;
  skillGained: string;
  impactAchieved: string;
  toolsUsed: string[];
  dayInTheLife: string;
}

interface PersonaData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  color: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  accentBg: string;
  steps: {
    year: string;
    phase: string;
    title: string;
    desc: string;
    traditional: MilestoneDetail;
    artemis: MilestoneDetail;
  }[];
}

const PERSONAS: Record<string, PersonaData> = {
  researcher: {
    id: 'researcher',
    name: 'The Scientific Researcher',
    subtitle: 'Mitochondrial Decay & Bio-informatics',
    description: 'Driven by deep intellectual breakthroughs, empirical discovery, and solving unmapped biological questions across continental lab networks.',
    badge: 'Deep Science Research',
    textColor: 'text-[#D4A853]',
    color: '#D4A853',
    borderColor: 'border-[#D4A853]/30',
    glowColor: 'shadow-[0_0_20px_rgba(212,168,83,0.3)]',
    accentBg: 'bg-[#D4A853]/10',
    steps: [
      {
        year: 'Year 1',
        phase: 'Calibrate',
        title: 'Mentor-Led Quantum Formulation',
        desc: 'Direct integration into the Quantum Bio-informatics lab on day one, analyzing anomalous cellular signaling pathways.',
        traditional: {
          title: 'Conformed Classroom Instruction',
          desc: 'Seated in a lecture theater with 400 classmates, memorizing high-level biology textbook chapters for a standard multiple-choice exam.',
          skillGained: 'Passive Memorization & Rote Recitation',
          impactAchieved: 'Acquired 4 semester credits; zero contribution to any active research fields.',
          toolsUsed: ['Generic PDF Slides', 'Optical Answer Sheets'],
          dayInTheLife: 'Spent 3 hours copying blackboard notes, followed by 2 hours memorizing diagram pathways without ever touching a laboratory pipette or instrument.'
        },
        artemis: {
          title: 'Active Lab Cohort & Formulation',
          desc: 'Partnered with a Senior Research Fellow to explore raw mitochondrial genomic datasets to trace anomalous metabolic decays.',
          skillGained: 'Empirical Graph Database Schematizing',
          impactAchieved: 'Parsed and structured 2.4 million decay curves into the open-source Artemis Bio-graph model.',
          toolsUsed: ['PyTorch Labs', 'Neo4j Graph Database', 'Sovereign Jupyter Nodes'],
          dayInTheLife: 'Analyzed mutation graphs in the morning, lunched with your fellowship cohort discussing ethics of synthetic genomes, and verified lab results via quantum simulator in the afternoon.'
        }
      },
      {
        year: 'Year 2',
        phase: 'Activate',
        title: 'Node Malta-Tokyo Sea Deployment',
        desc: 'Splitting time between Mediterranean biodiversity centers in Malta and high-throughput computational labs in Tokyo.',
        traditional: {
          title: 'Siloed Secondary Electives',
          desc: 'Required to select a pre-determined subset of secondary biology electives. Locked into one physical campus.',
          skillGained: 'Academic Conformity & Standard Essay Writing',
          impactAchieved: 'Created a static poster board with static text diagrams about marine cellular life.',
          toolsUsed: ['Microsoft PowerPoint', 'Campus Library Stacks'],
          dayInTheLife: 'Attended standard lab classes with pre-washed petri dishes to replicate a 30-year-old high school experiment. Scored a B+.'
        },
        artemis: {
          title: 'Decentralized High-Throughput Fieldwork',
          desc: 'Deployed to Node Valletta for robotic sea-floor ecological sequence sampling, then flew to Node Tokyo for rapid protein synthesis folding calculations.',
          skillGained: 'Remote Heterogeneous Data Pipelines',
          impactAchieved: 'Identified three temperature-tolerant genetic variations in deep marine hydrotherms.',
          toolsUsed: ['CRISPR fold simulations', 'Oceanic Autonomous Rovers', 'Tokyo High-Throughput Cluster'],
          dayInTheLife: 'Monitored real-time telemetry from Valletta buoy networks, compiled sequence models, and synced them with cloud models running in Tokyo supercomputing nodes.'
        }
      },
      {
        year: 'Year 3',
        phase: 'Elevate',
        title: 'Open Monograph Co-Authoring',
        desc: 'Writing and defending an innovative, open-science monograph detailing temperature-tolerant bio-sensors.',
        traditional: {
          title: 'Speculative Literature Review',
          desc: 'Drafted a 15-page essay reviewing existing publications on genetic cellular models. No original research or publication allowed.',
          skillGained: 'Secondary Text Collation',
          impactAchieved: 'A static paper read only by a single grader, filed away in university local hard-drive archive.',
          toolsUsed: ['Google Docs', 'Standard Bibliography Builders'],
          dayInTheLife: 'Wrote citations from 9 AM to 5 PM inside a windowless library basement, adjusting formatting margins to fit strict, archaic style guidelines.'
        },
        artemis: {
          title: 'Patent-Free Open IP Publication',
          desc: 'Published an original, co-authored monograph on quantum-integrated cellular bio-sensors. Successfully peer-reviewed at Valletta Bio-Computing Symposium.',
          skillGained: 'Synthesizing Novel Hypotheses & Public Defense',
          impactAchieved: 'Monograph published under open-source commons; adopted by three external medical laboratories.',
          toolsUsed: ['Collab Jupyter Hubs', 'Valletta Symposium Panel', 'Decentralized IPFS Registry'],
          dayInTheLife: 'Addressed questions from three leading international panels via virtual links, defending the integrity of your biosynthetic structures in real-time.'
        }
      },
      {
        year: 'Year 4',
        phase: 'Infinite',
        title: 'Permanent Network Integration',
        desc: 'Transitioning to an Alumni Fellow, receiving lifetime laboratory access, node residency privileges, and project acceleration resources.',
        traditional: {
          title: 'Graduation & Platform Eviction',
          desc: 'Degree conferred. Lost institutional emails, library subscriptions, and lab access. Pushed out to draft applications for entry-level lab tech roles.',
          skillGained: 'Standard Resume Structuring',
          impactAchieved: 'Recipients are left without continuing network support or resource access as knowledge goes out-of-date.',
          toolsUsed: ['LinkedIn Profiles', 'Indeed Listings'],
          dayInTheLife: 'Sorted generic online job boards, realizing university credentials gave no active engineering context or modern scientific network access.'
        },
        artemis: {
          title: 'Lifetime Alliance & Research Lab Anchor',
          desc: 'Appointed as an Artemis Lifetime Fellow. Retain permanent access to supercomputers, node labs worldwide, and direct mentoring allowances.',
          skillGained: 'Consensus Science Governance & Multi-generational Mentorship',
          impactAchieved: 'Secured $30,000 in seed-grant capital for active research scale-ups; directly mentoring 3 incoming Year 1 research minds.',
          toolsUsed: ['Artemis Micro-Grant Pools', 'Global Node Collaboration Suite', 'Guild Networks'],
          dayInTheLife: 'Reviewed proposals from Year 1 applicants, onboarded them into your live scientific lab, and booked a week-long research stay at Maltese nodes for next month.'
        }
      }
    ]
  },
  changemaker: {
    id: 'changemaker',
    name: 'The Civic Changemaker',
    subtitle: 'Decentralized Policy & Restorative Energy Grid',
    description: 'Focused on creating active civic solutions, grassroots renewable resource models, and drafting real policy alongside municipal coalitions.',
    badge: 'Socio-Political Design',
    textColor: 'text-[#8A0000]',
    color: '#8A0000',
    borderColor: 'border-[#8A0000]/30',
    glowColor: 'shadow-[0_0_20px_rgba(138,0,0,0.3)]',
    accentBg: 'bg-[#8A0000]/10',
    steps: [
      {
        year: 'Year 1',
        phase: 'Calibrate',
        title: 'Municipal Energy Asset Mapping',
        desc: 'Engaging immediately in designing local public solar cooperatives in Valletta, modeling neighborhood energy deficits.',
        traditional: {
          title: 'Theoretical Civic Foundations',
          desc: 'Listening to historical accounts of civic governance systems in abstract formats, with no local field exploration allowed.',
          skillGained: 'Ideology Classification & Bullet-points Drafting',
          impactAchieved: 'Completed a quiz on political theories. Had zero dialogue with any real living community.',
          toolsUsed: ['Scantron Papers', 'Standard Textbooks'],
          dayInTheLife: 'Spent the afternoon studying historical graphs of public services, trying to memorise definitions of municipal utilities.'
        },
        artemis: {
          title: 'Cooperative Co-Design Launch',
          desc: 'Partnered with cooperative energy engineers in Valletta to catalog and map micro-solar energy offsets across 12 neighborhood rows.',
          skillGained: 'Systemic Asset Mapping & Direct Surveying',
          impactAchieved: 'Successfully signed up and onboarded 120 residential households into localized solar planning algorithms.',
          toolsUsed: ['Sovereign GIS Suites', 'Valletta Municipal Interfaces', 'Tailwind Grid Analyzers'],
          dayInTheLife: 'Walked the narrow streets of Valletta surveying micro-grid points, and calculated optimal solar intake values alongside local elders.'
        }
      },
      {
        year: 'Year 2',
        phase: 'Activate',
        title: 'Node Silicon Valley Trust Design',
        desc: 'Bridging direct community action in Valletta with financial trust modeling and venture-philanthropy workshops in Silicon Valley.',
        traditional: {
          title: 'Pre-Packaged Academic Internships',
          desc: 'Unpaid internships consisting of administrative duties or generic presentation formatting at traditional governmental desks.',
          skillGained: 'Bureaucratic Red-Tape Navigation',
          impactAchieved: 'Completed 120 hours of administrative filing; zero impact on civic structures or energy strategies.',
          toolsUsed: ['Microsoft Word', 'Shared Outlook Calendars'],
          dayInTheLife: 'Spent 6 hours sorting digital mail and printing folders for department heads, learning no practical leadership or active legal mechanisms.'
        },
        artemis: {
          title: 'Cross-Border Strategic Venture Engineering',
          desc: 'Moved to Silicon Valley node to study legal trusts and decentralized capital structures, designing a micro-utility framework.',
          skillGained: 'Cross-Jurisdictional Trust Structuring',
          impactAchieved: 'Co-drafted a multi-stakeholder governance model legally linking California venture structures with Maltese energy cooperatives.',
          toolsUsed: ['Global Trust Frameworks', 'Sovereign Token Models', 'Artemis Alliance Nodes'],
          dayInTheLife: 'Collaborated with international trade attorneys in morning seminars, and coded distributed treasury voting contracts in the evening.'
        }
      },
      {
        year: 'Year 3',
        phase: 'Elevate',
        title: 'Deploying Active Renewable Networks',
        desc: 'Constructing physical, solar-powered community power nodes and proving direct economic viability.',
        traditional: {
          title: 'Abstract Political Theses',
          desc: 'Drafting an extensive paper summarizing literature on energy distribution. Kept entirely separate from practical implementation.',
          skillGained: 'Bibliographical Sorting & Academic Jargon',
          impactAchieved: 'An essay graded A- that goes directly into a closed index, never accessed by community stakeholders.',
          toolsUsed: ['Zotero Catalogues', 'Standard Text Editors'],
          dayInTheLife: 'Wrote and re-drafted introductory literature reviews, wondering if any real house would ever utilize the energy models studied.'
        },
        artemis: {
          title: 'Sovereign Micro-Grid Activation',
          desc: 'Built and integrated five physical solar-smart micro-grids. Presented data live to the Malta Department of Environmental Policy.',
          skillGained: 'Sovereign Infrastructure Execution',
          impactAchieved: 'Activated 45 kW of resilient local energy, powering 3 village plazas and reducing emissions by 40%.',
          toolsUsed: ['Physical Micro-Grid Inverters', 'Direct Municipal Presentations', 'Real-time Grid Monitors'],
          dayInTheLife: 'Assembled power cells with grid technicians, and monitored output data on a customized, public-facing, interactive web panel.'
        }
      },
      {
        year: 'Year 4',
        phase: 'Infinite',
        title: 'Strategic Expansion Residency',
        desc: 'Entering permanent residency status supporting larger municipal power rollouts with lifetime alliance micro-grants.',
        traditional: {
          title: 'Degree Awarded & Resource Disconnection',
          desc: 'Conferred with a diploma. Access to academic platforms, workspace directories, and professional networks is shut down.',
          skillGained: 'Independent Job Scouting & Cover Letter Writing',
          impactAchieved: 'Left seeking basic associate level employment in complex corporations, facing an isolated startup environment.',
          toolsUsed: ['Generic Job Boards', 'Cover Letter Generators'],
          dayInTheLife: 'Drafted standard templates for administrative consulting roles, feeling disconnected from the municipal communities.'
        },
        artemis: {
          title: 'Permanent Civic Fellowship & Trust Rollout',
          desc: 'Appointed Active Fellow with continuous access to the Artemis strategic network, mentoring newer student pods.',
          skillGained: 'Decentralized Civic Expansion & Venture Scale Management',
          impactAchieved: 'Onboarded 5 more municipalities into the energy grid model; scaled micro-grids to cover 600 residential households.',
          toolsUsed: ['Civic Trust Equity Pool', 'Worldwide Node Classrooms', 'Guild Forums'],
          dayInTheLife: 'Addressed incoming Year 1 changemakers, provided workspace modules to incoming candidates, and drafted scaling blueprints for the local government.'
        }
      }
    ]
  },
  artisan: {
    id: 'artisan',
    name: 'The Creative Artisan',
    subtitle: 'Interactive Media & Generative Woodcrafting',
    description: 'Combining traditional artisan joinery, kinetic architectural sculptures, and generative 3D algorithmic design.',
    badge: 'Cyber-Physical Artisanry',
    textColor: 'text-white',
    color: '#ffffff',
    borderColor: 'border-white/30',
    glowColor: 'shadow-[0_0_20px_rgba(255,255,255,0.25)]',
    accentBg: 'bg-white/10',
    steps: [
      {
        year: 'Year 1',
        phase: 'Calibrate',
        title: 'Cyber-Physical Kinetic Sculptures',
        desc: 'Immediate, unrestricted entry to the advanced design laboratories to build responsive structures from week 1.',
        traditional: {
          title: 'Abstract Form & Restricted Workshops',
          desc: 'Required to attend 2D sketch courses. Forbidden from major workshop tools or robotics until safety clearance in Year 3.',
          skillGained: 'Manual Drafting & Charcoal Sketching',
          impactAchieved: 'Produced 12 hand-drawn sketches on paper; zero physical or digital architectural models built.',
          toolsUsed: ['Graphite Pencils', 'Newsprint Pads'],
          dayInTheLife: 'Spent 4 hours copying lines with different weights on flat surfaces, with no access to 3D printers, laser cutters, or CNC nodes.'
        },
        artemis: {
          title: 'Interactive Spatial Design Launch',
          desc: 'Designed a dynamic, kinetic pavilion segment utilizing algorithmic timber joints that reacts to real-time crowd movement.',
          skillGained: 'Parametric CAD & Arduino Spatial Sensors',
          impactAchieved: 'Constructed prototype sculpture displayed in the Tokyo Media Arts Cluster on week 12.',
          toolsUsed: ['Grasshopper 3D', 'CNC Milling Nodes', 'Laser Material Slicers'],
          dayInTheLife: 'Programmed physical micro-controllers, loaded digital designs to smart automated CNC mills, and hand-finished premium walnut timber joints.'
        }
      },
      {
        year: 'Year 2',
        phase: 'Activate',
        title: 'Node Tokyo Digital Craft Sprint',
        desc: 'Spending half a year in specialized Tokyo woodshops studying traditional joinery, integrated with state-of-the-art computational modeling.',
        traditional: {
          title: 'Classroom History Recitations',
          desc: 'Writing text analyses of media histories, with no multi-disciplinary connection to raw physical materials or code.',
          skillGained: 'Historic Fact Preservation',
          impactAchieved: 'Acquired simple course grades. Did not generate any new physical objects or code systems.',
          toolsUsed: ['Generic Essay Apps', 'Library Slideshows'],
          dayInTheLife: 'Memorized architectural names from slideshow projections, trying to identify style dates on theoretical papers.'
        },
        artemis: {
          title: 'Hybrid Algorithmic Joinery Synthesis',
          desc: 'Immersed in Tokyo workshop to study structural joints, writing custom code to dynamically mill joints optimized for seismic movements.',
          skillGained: 'Seismic Structural Mathematics & Computational Tooling',
          impactAchieved: 'Manufactured and stress-tested a structural connector module capable of withstanding 7.2 magnitude impacts.',
          toolsUsed: ['Autodesk Fusion 360', 'Industrial Robotic arms', 'Japanese traditional hand tools'],
          dayInTheLife: 'Practiced assembly with Japanese master carpenters, then digitized hand gestures to train adaptive kinetic models in the afternoon.'
        }
      },
      {
        year: 'Year 3',
        phase: 'Elevate',
        title: 'Permanent Public Pavilion Construction',
        desc: 'Delivering a permanent, fully structural outdoor interactive civic installation in Valletta, Malta.',
        traditional: {
          title: 'Hypothetical Scale Models',
          desc: 'Crafted a small paper balsa-wood miniature of an unnamed building, which remained inside the student studio to be graded.',
          skillGained: 'Cardboard Modeling & Adhesives application',
          impactAchieved: 'A miniature model that was ultimately discarded into recycling bins following graduation day evaluation.',
          toolsUsed: ['Balsa Wood', 'X-Acto Knives', 'Hot Glue'],
          dayInTheLife: 'Glued thin sticks of wood together till midnight, hoping the delicate cardboard would not break before grading tomorrow.'
        },
        artemis: {
          title: 'Permanent Urban Architectural Intervention',
          desc: 'Negotiated, co-funded, and built a permanent interactive sun-shade pavilion in Valletta utilizing parametric timber structures.',
          skillGained: 'Civil Contracting & Parameter-driven Architecture',
          impactAchieved: 'Constructed an installation visited by over 50,000 public users; registered in the local community property trust.',
          toolsUsed: ['Pneumatic Joinery tools', 'Local Valletta planning permits', 'Real Wood Preservatives'],
          dayInTheLife: 'Directed Year 1 apprentice support teams in morning builds, and finalized automated lighting sequences and waterproof sensor housings.'
        }
      },
      {
        year: 'Year 4',
        phase: 'Infinite',
        title: 'Lifetime Guild Studio Launch',
        desc: 'Transitioning to active Master Resolute status with permanent studio allowances, equipment keys, and ongoing team royalties.',
        traditional: {
          title: 'Studio Eviction & Portfolio Dissolution',
          desc: 'Degree conferred. Instructed to empty out university workspaces, pack personal tools, and find commercial freelance jobs.',
          skillGained: 'Client Proposal Negotiations',
          impactAchieved: 'Freelancer seeking basic commercial rendering contracts, lacking advanced workshop tools or direct capital reserves.',
          toolsUsed: ['Upwork Forums', 'Portfolio PDF Compilations'],
          dayInTheLife: 'Fitted tools into cardboard boxes, bidding farewell to the high-end industrial machinery that made work possible.'
        },
        artemis: {
          title: 'Lifetime Studio Resolute & Guild Commission',
          desc: 'Granted lifetime keys to all global workshops, automated machinery networks, and permanent project grants.',
          skillGained: 'Creative Studio Scaling & Apprentice Leadership',
          impactAchieved: 'Established persistent brand studio, securing first direct $40,000 architectural client contract via the alliance.',
          toolsUsed: ['Artemis Forge Funding Pools', 'Decentralized Guild Directories', 'Node Labs'],
          dayInTheLife: 'Reviewed proposals from Year 1 creators wanting to serve as apprentices in your Valletta studio, while configuring spatial installations in parallel.'
        }
      }
    ]
  }
};

export default function JourneyPage({ goTo }: { goTo: (p: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Persistence block
  const [selectedPersona, setSelectedPersona] = useState<string>('researcher');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('artemis_journey_persona');
      if (saved && PERSONAS[saved]) {
        setSelectedPersona(saved);
      }
    }
  }, []);

  const handlePersonaSelect = (id: string) => {
    setSelectedPersona(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('artemis_journey_persona', id);
    }
  };

  // View mode
  const [viewMode, setViewMode] = useState<'timeline' | 'split'>('split');

  // Clickable milestone popup state
  const [activeTooltip, setActiveTooltip] = useState<{
    pathType: 'traditional' | 'artemis';
    stepIdx: number;
  } | null>(null);

  const activePersona = PERSONAS[selectedPersona] || PERSONAS.researcher;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll parallax transforms
  const backgroundTransform = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "radial-gradient(circle at 50% 50%, #120808 0%, #060606 100%)",
      "radial-gradient(circle at 10% 30%, #0a0e17 0%, #050505 100%)",
      "radial-gradient(circle at 90% 70%, #150909 0%, #060606 100%)",
      "radial-gradient(circle at 50% 50%, #0d0c0d 0%, #050505 100%)"
    ]
  );

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0a] min-h-[500vh] text-white selection:bg-[#8A0000] selection:text-white pb-32">
      {/* Background Gradient responding to scroll */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{ background: backgroundTransform }}
      />

      {/* --- Ambient Starfield / Cyber Grid Accent --- */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-10" />

      {/* Intro section */}
      <div className="h-screen sticky top-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none">
        <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}>
          <span className="text-[#D4A853] font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase mb-6 block">Comparative Educational Continuum</span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white tracking-tighter max-w-5xl leading-[0.9] mb-8 font-extrabold">
            The Artemis Journey
          </h1>
          <p className="mt-8 text-gray-500 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] animate-pulse">
            Scroll to begin divergence comparison
          </p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 mt-[-100vh] z-30">
        
        {/* --- Top Command Panel (Persona Selection & View Mode Toggles) --- */}
        <div className="sticky top-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 mb-24 max-w-5xl mx-auto z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            
            {/* Persona picker label & control */}
            <div className="w-full lg:w-auto">
              <span className="text-gray-400 font-mono text-[9px] uppercase tracking-widest block mb-3">
                Select Student Profile / Persisted Persona
              </span>
              <div className="flex flex-wrap gap-2.5">
                {Object.values(PERSONAS).map((persona) => {
                  const isSelected = selectedPersona === persona.id;
                  return (
                    <button
                      key={persona.id}
                      onClick={() => handlePersonaSelect(persona.id)}
                      className={`px-4 py-2 border rounded-full transition-all duration-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${
                        isSelected 
                          ? `${persona.borderColor} text-white bg-white/5 ${persona.glowColor}` 
                          : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/2'
                      }`}
                      id={`persona-btn-${persona.id}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: persona.color }} />
                      {persona.name.split(' ').slice(2).join(' ') || persona.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View layout mode picker */}
            <div className="flex flex-col w-full lg:w-auto">
              <span className="text-gray-400 font-mono text-[9px] uppercase tracking-widest block mb-3">
                Comparison Visualization Mode
              </span>
              <div className="flex border border-white/10 rounded-full p-0.5 bg-black/60 w-fit">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    viewMode === 'split' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  }`}
                  id="viewmode-split-btn"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Twin-Column Split
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    viewMode === 'timeline' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  }`}
                  id="viewmode-timeline-btn"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Scroll Timeline
                </button>
              </div>
            </div>

          </div>

          {/* Active Persona info card */}
          <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 items-start bg-white/2 p-3 rounded-lg">
            <div className="shrink-0 p-2.5 rounded-md bg-white/5 border border-white/10">
              <Compass className="w-5 h-5 text-[#D4A853]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white font-serif">{activePersona.name}</h4>
                <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${activePersona.borderColor} ${activePersona.textColor} ${activePersona.accentBg}`}>
                  {activePersona.badge}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">{activePersona.description}</p>
            </div>
          </div>
        </div>

        {/* --- Side-by-Side TWIN COLUMN Layout Mode --- */}
        {viewMode === 'split' && (
          <div className="space-y-24 py-12">
            
            {/* Split Column Headers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sticky top-36 z-40 bg-black/90 p-4 border border-white/5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <div className="text-center p-3 border-r border-white/5 md:block hidden">
                <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase block mb-1">Traditional Framework</span>
                <h3 className="text-xl font-serif text-gray-300">The Rigid Pipeline</h3>
              </div>
              <div className="text-center p-3 md:block hidden">
                <span className="text-[10px] font-mono tracking-widest text-[#D4A853] uppercase block mb-1">Artemis Ecosystem</span>
                <h3 className="text-xl font-serif text-white font-bold tracking-tight">The Decentralized Open Loop</h3>
              </div>
              {/* Mobile indicators */}
              <div className="block md:hidden text-center">
                 <span className="text-xs font-mono text-gray-400">Comparing Traditional vs. Artemis Model Side-by-Side</span>
              </div>
            </div>

            {/* Split Steps / Years */}
            {activePersona.steps.map((step, idx) => (
              <div key={idx} className="border-b border-white/5 pb-16">
                
                {/* Year Badge */}
                <div className="flex items-center justify-center gap-3 mb-10">
                  <span className="h-px w-12 bg-white/10" />
                  <span className="text-[11px] font-mono tracking-[0.3em] text-[#D4A853] uppercase font-bold">{step.year} — {step.phase}</span>
                  <span className="h-px w-12 bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
                  
                  {/* Central Glow Divider (Divergence indicator) */}
                  <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2 md:block hidden" />

                  {/* Left: Traditional Pathway */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-black/45 border border-red-950/40 hover:border-red-900/50 rounded-xl p-6 relative flex flex-col justify-between transition-all group hover:bg-neutral-950/20 shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono uppercase bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">
                          Standard Traditional Node
                        </span>
                        <TrendingUp className="w-4 h-4 text-red-500/40 group-hover:text-red-500 transition-colors" />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-300 font-serif mb-2 group-hover:text-white transition-colors">{step.traditional.title}</h4>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 font-light">{step.traditional.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <button
                        onClick={() => setActiveTooltip({ pathType: 'traditional', stepIdx: idx })}
                        className="w-full py-2 bg-red-950/[0.14] hover:bg-red-950/30 border border-red-900/30 active:scale-[0.98] transition-all text-[10px] uppercase tracking-widest text-red-400 font-bold rounded flex items-center justify-center gap-1"
                        id={`milestone-trad-${idx}`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        Explore Conformed Impact
                      </button>
                    </div>
                  </motion.div>

                  {/* Right: Artemis Pathway */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-black/45 border border-[#8A0000]/20 hover:border-[#8A0000]/50 rounded-xl p-6 relative flex flex-col justify-between transition-all group hover:bg-[#8A0000]/[0.02] shadow-lg shadow-[#8A0000]/5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono uppercase bg-[#8A0000]/20 text-[#D4A853] border border-[#8A0000]/30 px-2 py-0.5 rounded">
                          Artemis Unified Module
                        </span>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#8A0000] shadow-[0_0_10px_#8A0000] animate-pulse" />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white font-serif mb-2 group-hover:text-[#D4A853] transition-colors">{step.artemis.title}</h4>
                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 font-light">{step.artemis.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <button
                        onClick={() => setActiveTooltip({ pathType: 'artemis', stepIdx: idx })}
                        className="w-full py-2 bg-[#8A0000]/30 hover:bg-[#8A0000]/50 border border-[#8A0000]/40 active:scale-[0.98] transition-all text-[10px] uppercase tracking-[0.2em] text-white font-bold rounded flex items-center justify-center gap-1 shadow-inner"
                        id={`milestone-art-${idx}`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
                        Examine Dynamic Impact
                      </button>
                    </div>
                  </motion.div>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* --- Classical SCROLL TIMELINE Mode --- */}
        {viewMode === 'timeline' && (
          <div className="relative pt-[100vh] pb-[60vh] max-w-5xl mx-auto">
            {/* Vertical Flow Line */}
            <div className="absolute left-1/2 top-[100vh] bottom-[20vh] w-px bg-white/10 -translate-x-1/2">
              <motion.div 
                className="absolute top-0 w-full bg-[#8A0000] origin-top shadow-[0_0_20px_#8A0000]"
                style={{
                  height: "100%",
                  scaleY: useTransform(scrollYProgress, [0.1, 0.9], [0, 1]),
                }}
              />
            </div>

            <div className="text-center mb-32 relative z-10">
              <h2 className="text-[#D4A853] font-mono text-[12px] uppercase tracking-[0.2em] mb-4">Unified Continuum</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight">Timeline Divergence</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm">
                Scroll to track a customized student profile diverging completely from traditional 19th-century terminal models into the lifetime open loop.
              </p>
            </div>

            {activePersona.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex w-full items-center mb-56 relative z-10 ${isEven ? 'justify-start' : 'justify-end'}`}>
                  
                  {/* central connecting dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-auto">
                    <button
                      onClick={() => setActiveTooltip({ pathType: 'artemis', stepIdx: idx })}
                      className="group cursor-pointer w-8 h-8 rounded-full bg-black border border-white/20 hover:border-[#D4A853] flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                      title="Click to view raw milestone details"
                      id={`timeline-dot-${idx}`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-pulse" />
                    </button>
                  </div>

                  <motion.div 
                    className={`w-[45%] relative px-6 md:px-12 ${isEven ? 'text-right' : 'text-left'}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <span className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.25em]">{step.year} — {step.phase}</span>
                    <h4 className="text-2xl md:text-3xl font-serif text-white mt-1 mb-3 font-bold">{step.artemis.title}</h4>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 font-light">{step.artemis.desc}</p>
                    
                    <button
                      onClick={() => setActiveTooltip({ pathType: 'artemis', stepIdx: idx })}
                      className="inline-flex items-center gap-1 text-[10px] tracking-widest font-mono uppercase text-[#D4A853] hover:underline"
                    >
                      View Node Impact <ChevronRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                </div>
              );
            })}

          </div>
        )}

        {/* --- Clickable Overlay Milestone Tooltip Modal --- */}
        <AnimatePresence>
          {activeTooltip && (() => {
            const step = activePersona.steps[activeTooltip.stepIdx];
            const isTrad = activeTooltip.pathType === 'traditional';
            const detail: MilestoneDetail = isTrad ? step.traditional : step.artemis;
            
            return (
              <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-[9999]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="bg-[#0f0f11] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveTooltip(null)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
                    id="close-tooltip-modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-mono bg-[#D4A853]/10 text-[#D4A853] border border-[#D4A853]/30 px-2 py-0.5 rounded">
                        {step.year} {step.phase}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                        isTrad ? 'bg-red-950/20 text-red-400 border-red-900/30' : 'bg-green-950/20 text-green-400 border-green-900/30'
                      }`}>
                        {isTrad ? 'Traditional Path' : 'Artemis Model'}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-semibold leading-tight">
                      {detail.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-2 font-light italic">
                      "{activePersona.name}" pathway divergence profile.
                    </p>
                  </div>

                  {/* Core Diverging Content */}
                  <div className="space-y-6">
                    
                    {/* Synopsis */}
                    <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">A Day in the Life</span>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">{detail.dayInTheLife}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Skill Gained */}
                      <div className="p-4 rounded-xl border border-white/5 bg-white/1 bg-gradient-to-br from-white/2 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className={`w-4 h-4 ${isTrad ? 'text-red-500' : 'text-green-500'}`} />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Skill Acquired</span>
                        </div>
                        <p className="text-white text-xs sm:text-sm font-bold">{detail.skillGained}</p>
                      </div>

                      {/* Impact Achieved */}
                      <div className="p-4 rounded-xl border border-white/5 bg-white/1 bg-gradient-to-br from-white/2 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 text-[#D4A853]" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Socio-Economic Impact</span>
                        </div>
                        <p className="text-white text-xs sm:text-sm font-bold">{detail.impactAchieved}</p>
                      </div>

                    </div>

                    {/* Tools / Infrastructure */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                        Systems, Ecosystems & Tools In-Use
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {detail.toolsUsed.map((tool, i) => (
                          <span 
                            key={i} 
                            className="text-[10px] sm:text-[11px] font-mono bg-white/5 text-gray-300 border border-white/10 px-2.5 py-1 rounded"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Back button */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="px-5 py-2 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded"
                    >
                      Return to Comparative View
                    </button>
                  </div>

                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>

        {/* Dynamic divergence metrics callout */}
        <div className="max-w-4xl mx-auto border border-white/10 bg-white/1 rounded-2xl p-6 sm:p-8 mb-24 z-30 relative backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-2 border-r border-white/5 last:border-none">
              <div className="text-3xl font-serif text-[#D4A853] font-bold">1:1</div>
              <div className="text-[10px] font-mono text-gray-400 uppercase mt-1">Direct Mentor Relations</div>
            </div>
            <div className="p-2 border-r border-white/5 last:border-none">
              <div className="text-3xl font-serif text-white font-bold">100%</div>
              <div className="text-[10px] font-mono text-gray-400 uppercase mt-1">Open-Science IP Releases</div>
            </div>
            <div className="p-2 last:border-none">
              <div className="text-3xl font-serif text-red-500 font-bold">&#8734;</div>
              <div className="text-[10px] font-mono text-gray-400 uppercase mt-1">Continuous Loop Lifetimes</div>
            </div>
          </div>
        </div>
        
        {/* Call to action at bottom */}
        <div className="relative py-[10vh] text-center z-10 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-8">Begin Your Dynamic Divergence</h2>
            <button 
              onClick={() => goTo('open-loop-learning')}
              className="px-8 py-4 bg-[#8A0000] text-white text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="cta-explore-dimensions"
            >
              Explore Learning Dimensions
            </button>
        </div>

      </div>
    </div>
  );
}
