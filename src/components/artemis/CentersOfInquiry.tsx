'use client';

import React, { useState, useEffect, useRef } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface Props {
  goToPage: (page: string, centerSlug?: string) => void;
}

/* ─── Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Center Data ─── */
const centers = [
  {
    name: 'Frontiers of Artemis Research',
    slug: 'frontiers-of-artemis-research',
    desc: 'The coordinating hub that defines and stewards Artemis\'s research identity — setting cross-cutting priorities, seeding bold interdisciplinary inquiries, and ensuring that every center contributes to a coherent, mission-driven knowledge enterprise.',
    longDesc: 'The Center for Frontiers of Artemis Research serves as the intellectual and operational nexus of the entire Artemis research ecosystem, defining cross-cutting priorities and seeding bold interdisciplinary inquiries that no single center could pursue alone. Rather than conducting research within a narrow disciplinary frame, this Center operates as a meta-research institution — studying how knowledge itself is produced, how interdisciplinary collaboration can be structured for maximum impact, and how the Artemis model of Centers of Inquiry can be continuously refined and improved. Core investigators drawn from philosophy of science, systems theory, research methodology, and institutional design work together to ensure that every Center contributes to a coherent, mission-driven knowledge enterprise. The Center maintains the Artemis Research Atlas, a living map of all active research programmes across the university, identifying gaps, overlaps, and emergent synergies that can be cultivated into new initiatives. Its Translational Programs focus on institutional innovation, developing new models for research governance, evaluation, and collaboration that can be adopted by universities and research institutions worldwide. Junior fellows rotate through multiple Centers during their tenure, developing a panoramic understanding of how interdisciplinary research works in practice.',
    img: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=800',
    tag: '01 — FRONTIERS OF ARTEMIS RESEARCH',
    focus: ['Meta-research and knowledge production systems', 'Interdisciplinary collaboration architecture', 'Research governance and institutional design', 'The Artemis Research Atlas and cross-center mapping', 'Emergent synergy identification and cultivation', 'Philosophy of science and inquiry methodology', 'Institutional innovation and translation'],
    nodes: 'Valletta, Malta — Tokyo, Japan — San Francisco, USA',
    investigators: 10,
    fellows: 40,
  },
  {
    name: 'Civilization Architecture',
    slug: 'civilization-architecture',
    desc: 'Designing the governance systems, legal frameworks, and social contracts that underpin resilient, just, and adaptable civilizations — from city-states to planetary polities.',
    longDesc: 'The Center for Civilization Architecture tackles one of the most consequential design challenges in human history: how to build governance systems, legal frameworks, and social contracts that are resilient, just, and adaptable enough to serve civilizations ranging from emergent city-states to planetary polities. Drawing on political theory, constitutional law, computational social science, anthropology, and complex systems engineering, the Center\'s core investigators pursue fundamental research into the architecture of collective decision-making, the design of institutions that can adapt to rapid technological and environmental change, and the construction of social contracts that remain legitimate under conditions of radical uncertainty. The Center operates a Constitutional Design Laboratory where researchers use computational simulation to test governance architectures before they are deployed, modeling how different institutional designs respond to stress, shock, and strategic manipulation. Its Translational Programs work directly with governments, indigenous governance bodies, and international organisations to pilot new governance frameworks in controlled settings, while its Technology Development Centers build the computational infrastructure needed to model complex social systems at scale. Junior fellows combine coursework in political theory, law, and computational modelling with hands-on engagement in real-world governance experiments.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800',
    tag: '02 — CIVILIZATION ARCHITECTURE',
    focus: ['Constitutional design and governance architecture', 'Computational social science and institutional modelling', 'Adaptive legal frameworks for rapid change', 'Social contract theory under radical uncertainty', 'Indigenous governance traditions and integration', 'Planetary polity design and global coordination', 'Resilience engineering for civilizational systems'],
    nodes: 'Geneva, Switzerland — Singapore — Accra, Ghana',
    investigators: 12,
    fellows: 44,
  },
  {
    name: 'Planetary Systems',
    slug: 'planetary-systems',
    desc: 'Understanding Earth as an integrated system of atmosphere, hydrosphere, lithosphere, and biosphere — and extending that understanding to other worlds, from Mars to exoplanets.',
    longDesc: 'The Center for Planetary Systems treats planets not as collections of separate environmental domains but as integrated systems in which atmosphere, hydrosphere, lithosphere, and biosphere co-evolve through complex, nonlinear interactions. Core investigators drawn from Earth science, atmospheric physics, oceanography, ecology, and astrobiology pursue research that spans from the deep carbon cycle to the dynamics of exoplanetary atmospheres, united by a common question: how do planets work as wholes, and what makes them habitable or hostile to life? The Center operates the Planetary Integration Laboratory, where researchers combine satellite observation data, deep-ocean sensor networks, and computational models to simulate planetary-scale dynamics with unprecedented fidelity. Its Translational Programs partner with space agencies, climate organisations, and conservation bodies to ensure that planetary science informs real-world decision-making on issues from climate adaptation to planetary protection protocols. The Technology Development Centers build and maintain the sensor networks, satellite data pipelines, and simulation platforms that make this research possible, while junior fellows engage in fieldwork from Antarctic research stations to volcanic observation posts, developing the empirical grounding that complements their computational and theoretical training.',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tag: '03 — PLANETARY SYSTEMS',
    focus: ['Integrated Earth system modelling', 'Atmosphere-hydrosphere-biosphere interactions', 'Planetary habitability and comparative planetology', 'Deep carbon cycle and geobiological processes', 'Exoplanetary atmosphere characterization', 'Climate adaptation and planetary boundary science', 'Sensor networks and observation systems'],
    nodes: 'Reykjavik, Iceland — Sydney, Australia — São Paulo, Brazil',
    investigators: 11,
    fellows: 42,
  },
  {
    name: 'Space & Frontier Science',
    slug: 'space-frontier-science',
    desc: 'Pushing the boundaries of human presence and scientific inquiry beyond Earth — from orbital habitats and lunar bases to deep-space propulsion and the ethics of cosmic expansion.',
    longDesc: 'The Center for Space & Frontier Science exists to push the boundaries of human presence and scientific inquiry beyond Earth, addressing the technical, biological, and ethical challenges of becoming a multi-planetary species. Core investigators from aerospace engineering, astrophysics, space medicine, astrobiology, and ethics of exploration pursue research that ranges from advanced propulsion concepts and closed-loop life support systems to the philosophical and legal implications of claiming territory beyond Earth. The Center operates the Frontier Simulation Environment, a computational platform that models the challenges of long-duration spaceflight, off-world habitation, and resource extraction in extreme environments, enabling researchers to test designs and protocols before committing to expensive physical prototypes. Its Translational Programs work with space agencies, aerospace companies, and international regulatory bodies to ensure that space research translates into safe, equitable, and sustainable off-world operations. The Technology Development Centers maintain advanced propulsion test facilities, orbital simulation environments, and bio-regenerative life support laboratories. Junior fellows rotate between theoretical research, simulation work, and field tests at analogue sites — from desert Mars simulations to underwater habitat trials — building the interdisciplinary expertise that the next generation of space explorers and designers will need.',
    img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    tag: '04 — SPACE & FRONTIER SCIENCE',
    focus: ['Advanced propulsion and deep-space transit', 'Off-world habitation and closed-loop life support', 'Space medicine and biological adaptation', 'Astrobiology and the search for extraterrestrial life', 'Ethics and law of cosmic expansion', 'Resource extraction and ISRU technologies', 'Orbital and lunar infrastructure design'],
    nodes: 'Houston, USA — Darmstadt, Germany — Tanegashima, Japan',
    investigators: 13,
    fellows: 48,
  },
  {
    name: 'Emerging Technologies',
    slug: 'emerging-technologies',
    desc: 'Tracking, evaluating, and shaping the technologies that will define the next half-century — quantum computing, synthetic biology, neurotechnology, and the convergence of fields that creates entirely new capabilities.',
    longDesc: 'The Center for Emerging Technologies stands at the critical intersection of technological possibility and societal consequence, tracking, evaluating, and shaping the technologies that will define the next half-century of human civilisation. Rather than pursuing any single technology in isolation, the Center focuses on the convergence of fields — quantum computing with synthetic biology, neurotechnology with artificial intelligence, advanced manufacturing with materials science — where the most transformative capabilities emerge. Core investigators drawn from quantum physics, synthetic biology, neuroscience, computer science, and technology ethics pursue research into the fundamental science of emerging technologies while simultaneously developing frameworks for evaluating their societal implications, governance requirements, and ethical boundaries. The Center operates the Convergence Observatory, a systematic programme that identifies and tracks emerging technology trends, assesses their potential trajectories and impacts, and publishes open-access foresight reports used by governments, corporations, and civil society organisations worldwide. Its Translational Programs accelerate the movement of breakthrough technologies from laboratory to application, while its Technology Development Centers provide the advanced prototyping and testing facilities that convergent research demands. Junior fellows develop expertise not only in the science of emerging technologies but in the governance and ethical frameworks needed to steer them toward beneficial outcomes.',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tag: '05 — EMERGING TECHNOLOGIES',
    focus: ['Quantum computing and quantum information science', 'Synthetic biology and genomic engineering', 'Neurotechnology and brain-computer interfaces', 'Technological convergence and emergent capabilities', 'Technology governance and regulatory frameworks', 'Foresight methodology and impact assessment', 'Ethics of transformative technology'],
    nodes: 'Zurich, Switzerland — Seoul, South Korea — Boston, USA',
    investigators: 14,
    fellows: 50,
  },
  {
    name: 'Next-Gen Education',
    slug: 'next-gen-education',
    desc: 'Reimagining how humans learn, teach, and create knowledge in an era of AI tutors, immersive environments, and lifelong learning continua — because the future of education is not a bigger classroom, it is a fundamentally different one.',
    longDesc: 'The Center for Next-Gen Education is dedicated to fundamentally reimagining how humans learn, teach, and create knowledge in an era defined by artificial intelligence, immersive digital environments, and the necessity of lifelong learning. Core investigators from cognitive science, learning analytics, educational philosophy, AI, and design pursue research that challenges the foundational assumptions of industrial-era education: fixed curricula, age-based cohorts, disciplinary silos, and the equation of time spent with knowledge gained. The Center operates the Learning Futures Laboratory, where researchers develop and test new pedagogical models using AI-adaptive tutoring systems, immersive simulation environments, and blockchain-verified credentialing frameworks that enable learners to construct personalized learning pathways across institutions and contexts. Its Translational Programs work with schools, universities, governments, and corporate learning departments to pilot next-generation educational models in real-world settings, while its Technology Development Centers build the open-source tools and platforms that make personalized, lifelong learning possible at scale. Junior fellows are themselves participants in the experimental educational models they study, gaining first-hand experience of the approaches they are helping to design and evaluate, and their capstone projects must demonstrate both pedagogical innovation and measurable learning outcomes.',
    img: 'https://images.unsplash.com/photo-1624555130296-e551faf8969b?auto=format&fit=crop&q=80&w=800',
    tag: '06 — NEXT-GEN EDUCATION',
    focus: ['AI-adaptive tutoring and personalized learning', 'Immersive and simulation-based pedagogy', 'Lifelong learning continua and credentialing', 'Cognitive science of learning and memory', 'Equity and access in digital education', 'Learning analytics and outcome measurement', 'Philosophy of education for the knowledge age'],
    nodes: 'Helsinki, Finland — Melbourne, Australia — Nairobi, Kenya',
    investigators: 9,
    fellows: 36,
  },
  {
    name: 'Materials, Matter & Manufacturing Futures',
    slug: 'materials-matter-manufacturing',
    desc: 'From metamaterials and programmable matter to additive manufacturing at scale — designing the substances and processes that will build the infrastructure of the future.',
    longDesc: 'The Center for Materials, Matter & Manufacturing Futures addresses a fundamental challenge: the substances and processes that built the modern world are insufficient for the world we are building next. Core investigators from materials science, condensed matter physics, chemical engineering, manufacturing systems, and computational design pursue research into metamaterials with properties that do not exist in nature, programmable matter that can change its form and function on demand, and manufacturing processes that are distributed, sustainable, and capable of producing structures at scales from nanometers to kilometers. The Center operates the Advanced Matter Foundry, a state-of-the-art facility where researchers can design, simulate, and fabricate novel materials and structures in an integrated workflow, moving from computational design to physical prototype in hours rather than months. Its Translational Programs work with manufacturing companies, construction firms, and aerospace partners to move breakthrough materials and processes from laboratory to production, while its Technology Development Centers maintain the fabrication, testing, and characterization equipment that cutting-edge materials research requires. Junior fellows gain hands-on experience across the entire materials development pipeline, from computational design and simulation through synthesis and characterization to manufacturing process design and deployment, building the integrated expertise that modern materials science demands.',
    img: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=800',
    tag: '07 — MATERIALS, MATTER & MANUFACTURING',
    focus: ['Metamaterials and programmable matter', 'Additive manufacturing at scale', 'Sustainable and circular materials design', 'Computational materials discovery', 'Distributed and adaptive manufacturing systems', 'Nanoscale fabrication and self-assembly', 'Structural health monitoring and self-healing materials'],
    nodes: 'Munich, Germany — Shenzhen, China — Detroit, USA',
    investigators: 11,
    fellows: 38,
  },
  {
    name: 'Agriculture, Food Systems',
    slug: 'agriculture-food-systems',
    desc: 'Securing humanity\'s food future through precision agriculture, cellular agriculture, closed-loop ecosystems, and equitable distribution — from urban vertical farms to planetary-scale food networks.',
    longDesc: 'The Center for Agriculture, Food Systems confronts one of the most urgent and complex challenges facing humanity: how to feed ten billion people sustainably, equitably, and resiliently in a world of climate disruption, resource scarcity, and rapid urbanisation. Core investigators from agronomy, plant science, cellular agriculture, food engineering, ecology, economics, and public health pursue research across the entire food system, from the molecular biology of drought-resistant crops to the logistics of equitable food distribution in megacities. The Center operates the Closed-Loop Agriculture Platform, an integrated research programme that combines precision farming, vertical agriculture, cellular protein production, and waste-to-resource conversion into self-sustaining food ecosystems that can be deployed in any environment — from urban rooftops to off-world habitats. Its Translational Programs work with farming cooperatives, food corporations, government agencies, and international organisations to pilot new food system models in diverse cultural and environmental contexts, while its Technology Development Centers develop the sensors, automation systems, and bioprocessing equipment that precision and cellular agriculture demand. Junior fellows combine laboratory research in plant genetics and cellular agriculture with fieldwork in farming communities and urban food systems, developing the practical and interdisciplinary expertise that the transformation of global food systems requires.',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800',
    tag: '08 — AGRICULTURE, FOOD SYSTEMS',
    focus: ['Precision agriculture and sensor-driven farming', 'Cellular agriculture and alternative proteins', 'Closed-loop and circular food ecosystems', 'Drought-resistant and climate-adapted crops', 'Equitable food distribution and food justice', 'Urban vertical farming and controlled-environment agriculture', 'Soil microbiome engineering and regenerative practices'],
    nodes: 'Wageningen, Netherlands — Hyderabad, India — Davis, USA',
    investigators: 10,
    fellows: 40,
  },
  {
    name: 'Robotics, Mechatronics & Physical Autonomy',
    slug: 'robotics-mechatronics-autonomy',
    desc: 'Building machines that move, sense, decide, and collaborate in the physical world — from surgical micro-robots to autonomous construction crews and swarm logistics systems.',
    longDesc: 'The Center for Robotics, Mechatronics & Physical Autonomy is dedicated to building machines that can move through, sense, understand, and act upon the physical world with increasing independence, intelligence, and collaboration. Core investigators from robotics, mechanical engineering, control theory, computer vision, and embodied AI pursue research that spans the full spectrum of physical autonomy, from surgical micro-robots that navigate the human body to autonomous construction crews that build infrastructure without human supervision, and from warehouse logistics systems to swarm robots that collaborate to accomplish tasks no single machine could handle alone. The Center operates the Physical Autonomy Proving Ground, a multi-environment testing facility where robotic systems can be evaluated in conditions that simulate real-world complexity — uneven terrain, unpredictable obstacles, human-robot interaction scenarios, and multi-agent coordination challenges. Its Translational Programs work with healthcare systems, construction companies, logistics firms, and disaster response organisations to move robotic systems from prototype to deployment, while its Technology Development Centers maintain the fabrication workshops, motion capture studios, and simulation platforms that advanced robotics research demands. Junior fellows design, build, and test robotic systems as part of integrated teams, developing the hands-on engineering skills and systems-thinking perspective that physical autonomy requires.',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    tag: '09 — ROBOTICS, MECHATRONICS & PHYSICAL AUTONOMY',
    focus: ['Autonomous navigation and embodied intelligence', 'Surgical and medical micro-robotics', 'Swarm robotics and multi-agent coordination', 'Human-robot collaboration and interaction', 'Soft robotics and bio-inspired mechanisms', 'Robotic construction and infrastructure automation', 'Disaster response and extreme-environment robotics'],
    nodes: 'Tokyo, Japan — Zurich, Switzerland — Pittsburgh, USA',
    investigators: 13,
    fellows: 46,
  },
  {
    name: 'Gaming & Worldbuilding',
    slug: 'gaming-worldbuilding',
    desc: 'Harnessing the power of play, simulation, and narrative worldbuilding as tools for research, education, and civic imagination — because the futures we can imagine are the futures we can build.',
    longDesc: 'The Center for Gaming & Worldbuilding is founded on a radical premise: that play, simulation, and narrative are not merely entertainment but fundamental cognitive tools for exploring possible futures, testing social hypotheses, and expanding the boundaries of collective imagination. Core investigators from game design, narrative theory, computer science, sociology, psychology, and architecture pursue research into how interactive simulations can model complex social systems, how narrative worldbuilding can illuminate the consequences of policy choices, and how game mechanics can be designed to foster empathy, collaboration, and civic engagement. The Center operates the Worldbuilding Engine, a platform that enables researchers to construct, populate, and simulate entire societies — from resource allocation and governance structures to cultural dynamics and technological development — and then invite players to inhabit those worlds, generating data about how humans behave under conditions that would be impossible or unethical to create in reality. Its Translational Programs work with educators, urban planners, policy-makers, and cultural institutions to apply worldbuilding methodologies to real-world challenges, while its Technology Development Centers develop the procedural generation, AI, and rendering technologies that make complex worldbuilding possible. Junior fellows design and build their own worlds as capstone projects, combining technical skills in game development with deep engagement in the social, psychological, and narrative dimensions of interactive experience.',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    tag: '10 — GAMING & WORLDBUILDING',
    focus: ['Interactive simulation and social modeling', 'Narrative worldbuilding and futures methodology', 'Procedural generation and AI-driven content', 'Game mechanics for empathy and civic engagement', 'Educational game design and serious games', 'Virtual reality and immersive experience design', 'The psychology of play and decision-making'],
    nodes: 'Montreal, Canada — Kyoto, Japan — Stockholm, Sweden',
    investigators: 8,
    fellows: 32,
  },
  {
    name: 'Energy Systems',
    slug: 'energy-systems',
    desc: 'Engineering the energy infrastructure of a post-carbon civilization — from next-generation fusion and orbital solar to distributed microgrids and the politics of energy sovereignty.',
    longDesc: 'The Center for Energy Systems is dedicated to engineering the energy infrastructure of a post-carbon civilization, recognising that the transition from fossil fuels is not merely a technical challenge but a deeply political, social, and economic one that requires integrated solutions spanning technology, governance, and justice. Core investigators from plasma physics, electrical engineering, materials science, political economy, environmental justice, and systems engineering pursue research that ranges from next-generation fusion reactor design and orbital solar power collection to distributed microgrid architectures and the politics of energy sovereignty in developing nations. The Center operates the Energy Transition Simulator, a computational platform that models the technical, economic, and social dynamics of energy system transitions at scales from individual communities to entire continents, enabling researchers and policy-makers to test transition strategies before committing resources. Its Translational Programs work with governments, utilities, community organisations, and international development agencies to pilot new energy systems in diverse contexts, while its Technology Development Centers maintain fusion research facilities, advanced battery testing laboratories, and smart grid testbeds. Junior fellows combine technical training in energy engineering with coursework in energy policy, environmental justice, and community engagement, building the interdisciplinary expertise that the energy transition demands.',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    tag: '11 — ENERGY SYSTEMS',
    focus: ['Next-generation fusion and advanced fission', 'Orbital solar and space-based power', 'Distributed microgrids and smart grid architecture', 'Energy storage and advanced battery technology', 'Energy sovereignty and environmental justice', 'Carbon capture and negative emissions technology', 'Energy system transition modeling and policy'],
    nodes: 'Copenhagen, Denmark — Abu Dhabi, UAE — Santiago, Chile',
    investigators: 12,
    fellows: 44,
  },
  {
    name: 'Health & Bioethics',
    slug: 'health-bioethics',
    desc: 'Advancing human health while rigorously examining the moral dimensions of biomedical innovation — because curing disease is not enough; we must ensure that the cures are just, accessible, and humane.',
    longDesc: 'The Center for Health & Bioethics operates on the conviction that advancing human health and rigorously examining the moral dimensions of biomedical innovation are not separate endeavours but inseparable aspects of a single mission. Core investigators from medicine, public health, bioethics, philosophy, health economics, and medical anthropology pursue research that integrates clinical and population-level health innovation with sustained ethical reflection on the implications of new medical technologies, delivery systems, and governance structures. The Center\'s work ranges from developing AI-assisted diagnostic tools for underserved populations to formulating ethical frameworks for gene editing, from designing equitable pandemic response systems to investigating the moral status of synthetic organisms. The Center operates the Bioethics Deliberation Forum, a structured programme that brings together researchers, clinicians, patients, community advocates, and policy-makers to navigate the ethical complexities of emerging health technologies in an inclusive and rigorous manner. Its Translational Programs work with healthcare systems, pharmaceutical companies, and regulatory agencies to ensure that health innovations reach patients quickly and equitably, while its Technology Development Centers maintain the clinical research infrastructure, health data platforms, and bioethics research tools that integrated health-and-ethics inquiry requires. Junior fellows are trained in both the science and the ethics of health innovation, and every capstone project must demonstrate both clinical or public health impact and rigorous ethical analysis.',
    img: 'https://images.unsplash.com/photo-1514416205405-075ab2f15964?auto=format&fit=crop&q=80&w=800',
    tag: '12 — HEALTH & BIOETHICS',
    focus: ['AI-assisted diagnosis and precision medicine', 'Gene editing ethics and governance', 'Pandemic preparedness and equitable response', 'Health equity and social determinants of health', 'Moral status and the ethics of synthetic organisms', 'Clinical innovation and translational ethics', 'Global health justice and access to care'],
    nodes: 'Boston, USA — Cape Town, South Africa — Hyderabad, India',
    investigators: 14,
    fellows: 52,
  },
  {
    name: 'Urban Futures',
    slug: 'urban-futures',
    desc: 'Designing cities that are resilient, equitable, and alive — integrating architecture, ecology, computation, and governance to create urban systems that adapt to their inhabitants rather than the reverse.',
    longDesc: 'The Center for Urban Futures is dedicated to designing cities that are resilient, equitable, and alive — urban systems that adapt to their inhabitants rather than forcing inhabitants to adapt to them. With the majority of humanity now living in cities and urbanisation accelerating across the Global South, the design of urban systems is among the most consequential challenges of the twenty-first century. Core investigators from architecture, urban planning, computational design, ecology, public policy, and sociology pursue research that integrates the physical, digital, ecological, and governance dimensions of urban life into coherent, adaptive systems. The Center operates the Urban Simulation Platform, a computational environment that models the interactions between urban form, transportation networks, energy systems, water cycles, social dynamics, and governance structures, enabling researchers and planners to test urban design proposals before they are built. Its Translational Programs work with city governments, development agencies, and community organisations to pilot innovative urban designs and governance models in real neighborhoods, while its Technology Development Centers develop the digital twin platforms, sensor networks, and participatory design tools that adaptive urban management requires. Junior fellows combine studio-based design training with coursework in urban ecology, computational modelling, and community engagement, and their capstone projects must address a real urban challenge in partnership with a city or community.',
    img: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=800',
    tag: '13 — URBAN FUTURES',
    focus: ['Adaptive urban design and computational architecture', 'Urban ecology and green infrastructure', 'Smart city systems and digital twins', 'Equitable housing and inclusive urban development', 'Urban mobility and transportation futures', 'Participatory governance and community co-design', 'Climate resilience and urban adaptation strategies'],
    nodes: 'Copenhagen, Denmark — Medellín, Colombia — Singapore',
    investigators: 10,
    fellows: 38,
  },
  {
    name: 'Biotech & Life Sciences',
    slug: 'biotech-life-sciences',
    desc: 'From gene editing and synthetic organisms to ecosystem engineering and de-extinction — pushing the boundaries of what life can do, with deep commitment to the ethics of reshaping the living world.',
    longDesc: 'The Center for Biotech & Life Sciences pushes the boundaries of what life can do, pursuing research that ranges from fundamental discoveries in molecular biology and genetics to the engineering of synthetic organisms, the restoration of degraded ecosystems, and the contemplation of de-extinction. Core investigators from molecular biology, genetics, synthetic biology, ecology, bioengineering, and bioethics pursue research united by a common thread: the conviction that understanding and reshaping the living world is among the most powerful and most consequential capabilities that humanity has ever possessed, and that it must be exercised with wisdom, humility, and rigorous ethical oversight. The Center operates the Bio-Design Foundry, an integrated facility for designing, building, and testing synthetic biological systems, from gene circuits and metabolic pathways to entire synthetic organisms with novel capabilities. Its Translational Programs work with biotechnology companies, conservation organisations, agricultural partners, and regulatory agencies to move bio-innovations from proof-of-concept to application, while its Technology Development Centers maintain the genetic foundries, high-throughput screening platforms, and ecological monitoring systems that modern biotechnology demands. Junior fellows gain experience across the full spectrum of life sciences research, from bench-top molecular biology to field ecology to bioethics deliberation, developing the integrated perspective that responsible biotechnology requires.',
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
    tag: '14 — BIOTECH & LIFE SCIENCES',
    focus: ['Gene editing and genetic engineering', 'Synthetic biology and organism design', 'Ecosystem engineering and restoration', 'De-extinction and species recovery', 'Biosecurity and dual-use research governance', 'High-throughput screening and bio-foundries', 'Ethics of reshaping the living world'],
    nodes: 'Cambridge, UK — Basel, Switzerland — Guangzhou, China',
    investigators: 15,
    fellows: 54,
  },
  {
    name: 'Fintech, DeFi & Economics',
    slug: 'fintech-defi-economics',
    desc: 'Rethinking money, markets, and economic governance for a decentralized, automated, and globally interconnected world — designing financial systems that serve people, not the other way around.',
    longDesc: 'The Center for Fintech, DeFi & Economics exists to rethink money, markets, and economic governance for a world that is increasingly decentralized, automated, and globally interconnected — designing financial systems that serve people rather than requiring people to serve them. Core investigators from economics, computer science, cryptography, political economy, law, and behavioral finance pursue research that spans the full spectrum of financial innovation, from the technical architecture of decentralized finance protocols and the cryptography of digital currencies to the macroeconomic implications of programmable money and the political economy of financial sovereignty. The Center operates the Digital Economy Sandbox, a controlled environment where researchers can deploy, test, and study novel financial mechanisms — from algorithmic stablecoins and decentralized lending protocols to universal basic income delivery systems and carbon credit marketplaces — under realistic conditions without putting real populations at risk. Its Translational Programs work with central banks, fintech startups, development organisations, and regulatory bodies to move financial innovations from concept to deployment, while its Technology Development Centers maintain the blockchain infrastructure, economic simulation platforms, and data analytics systems that modern financial research demands. Junior fellows combine technical training in blockchain development and financial engineering with rigorous coursework in economic theory, political economy, and financial ethics, and their capstone projects must demonstrate both technical innovation and a clear analysis of the economic and social implications of their work.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    tag: '15 — FINTECH, DEFI & ECONOMICS',
    focus: ['Decentralized finance protocols and architecture', 'Digital currencies and central bank digital currencies', 'Programmable money and smart contract economics', 'Financial sovereignty and inclusive finance', 'Algorithmic market design and mechanism engineering', 'Behavioral finance and consumer protection', 'Carbon markets and environmental finance'],
    nodes: 'London, UK — Singapore — Lagos, Nigeria',
    investigators: 11,
    fellows: 42,
  },
];

/* ─── Pillar Tabs Data ─── */
const pillars = [
  {
    title: 'Unified Knowledge',
    content: 'Inspired by the pursuit of knowledge as a cohesive whole, our Centers of Inquiry replace traditional academic departments. They are designed to create an intellectual environment where reality is seen as interconnected and holistic, preventing distortions and imbalances that might arise from an exclusive focus on specific disciplines. This approach aligns with the vision of fostering a "philosophical habit of mind," encouraging learners to perceive knowledge as unified rather than fragmented into siloed domains. When a biologist, a philosopher, and a computer scientist share not just a hallway but a research agenda, the questions they ask become fundamentally different — and so do the answers they discover.',
  },
  {
    title: 'Junior Fellows',
    content: 'Students join the Centers of Inquiry as junior fellows, working alongside core investigators in a model that bridges disciplinary boundaries. This is not a peripheral internship programme — junior fellows participate fully in the intellectual life of the Center, engaging in interdisciplinary coursework, hands-on research, and valuable internship experiences that connect academic inquiry to real-world application. By functioning as a blend of research institutes, think tanks, and innovation incubators, the centers offer an immersive learning experience that transcends traditional academic structures. Every undergraduate and graduate capstone must align with a Center of Inquiry mission, evaluated against dual criteria: epistemic contribution and civic impact.',
  },
  {
    title: 'Core Investigators',
    content: 'At the core of each Center of Inquiry are the Core Investigators — a team of intellectually curious and innovative scientists who are provided with long-term, renewable appointments. This is a deliberate departure from the grant-dependent model that dominates most research universities. By freeing investigators from the relentless pressure of securing external funding, Artemis promotes intellectual risk-taking and collaboration, fostering an environment where transformative discoveries can emerge from sustained, deep inquiry rather than short-term, outcome-predictable projects. Core Investigators anchor the epistemic rigour of their Centers, mentoring junior fellows and shaping research agendas that span years rather than funding cycles.',
  },
  {
    title: 'Translational Programs',
    content: 'The Translational Programs bridge the gap between research and practical application, ensuring that scientific breakthroughs translate into tangible benefits for society. These programmes provide a robust infrastructure — including streamlined intellectual property licensing, funding support, and entrepreneurial mentorship — to facilitate the movement of discoveries from the laboratory to real-world solutions. By fostering a culture of innovation and entrepreneurship, the Translational Programs accelerate the impact of academic research while maintaining rigorous ethical oversight. Every translational project is reviewed for its social implications, ensuring that the pursuit of application never compromises the values of equity, sustainability, and human dignity that underpin the Artemis mission.',
  },
  {
    title: 'Technology Centers',
    content: 'The Technology Development Centers serve as the technological backbone of the Centers of Inquiry, focusing on the development and distribution of advanced tools and technologies. These centres represent a centralised hub for technological innovation, providing researchers with cutting-edge resources — from bio-fabrication laboratories and quantum computing cleanrooms to advanced computational modelling infrastructure — to advance their scientific endeavours. This collaborative model accelerates technological advancements and enhances the overall research infrastructure, ensuring that no Center operates in isolation and that breakthrough tools developed for one domain are rapidly available to researchers across the entire network.',
  },
];

/* ─── Guild Data ─── */
const guildLayers = [
  { layer: 'Inquiry', desc: 'Transdisciplinary research advancing foundational questions in vital domains (e.g., biotech ethics, urban resilience).', integration: 'Evolves CoI\'s curiosity-driven hubs into collaborative think tanks, feeding discoveries directly into the Knowledge Core for holistic preservation.' },
  { layer: 'Capstone Catalysts', desc: 'Integrates student projects into live Guild missions, ensuring capstones produce open IP or prototypes.', integration: 'Aligns with "Learners as Junior Fellows," mandating capstone embedding in CoI research cycles for immersive, outcome-oriented learning.' },
  { layer: 'Deployment Interfaces', desc: 'Field-tests tools in civic, planetary, or industry settings via global nodes (e.g., Nairobi labs, virtual simulations).', integration: 'Extends Translational Programs, accelerating CoI breakthroughs into real-world applications with ethical oversight from the Knowledge Core.' },
  { layer: 'Commons Nodes', desc: 'Archives and publishes open-access outputs with modular remix licenses, enabling global collaboration.', integration: 'Serves as the API-driven interface to the Knowledge Core, ensuring Guild artifacts enrich humanity\'s collective intellectual identity.' },
  { layer: 'Challenge Engines', desc: 'Curates seasonal sprints (2-6 weeks) and residencies to tackle urgent challenges, drawing from CoI priorities.', integration: 'Operationalizes the Infinite Learning Continuum, blending CoI\'s immersive fellowships with high-velocity, challenge-based action.' },
];

const cycles = [
  {
    name: 'Residency Cycles',
    duration: '3-6 Months',
    desc: 'Immersive embeds in Guild missions, blending CoI fellowships with field labs. Students and fellows rotate across global nodes — from Bali for cultural futurism to Toronto for AI ethics — producing capstone prototypes tested in civic contexts. These residencies tie directly to Translational Programs, with Knowledge Core provenance tracking enabling remix and iteration by subsequent cohorts.',
    steps: ['CoI Proposal & Fellow Selection', 'Embed in Guild Mission: Interdisciplinary Team Formation', 'Hands-On Research: Capstone Ideation & Prototyping', 'Field Lab Rotation: Global Node Immersion', 'Deployment Test: Civic Feedback & Iteration', 'Output: Capstone Prototype & Knowledge Core Publication', 'Reflection: Junior Fellow Review & Cycle Close'],
  },
  {
    name: 'Sprint Cycles',
    duration: '2-6 Weeks',
    desc: 'High-intensity challenges drawn from CoI priorities — for example, a "Bioethics Sprint" addressing gene-editing dilemmas. Open to junior fellows and external collaborators, sprints culminate in hackathon-style deliverables. Sprint Cycles are mandatory for Year 3+ students, feeding prototypes directly into deployment interfaces where they can be tested and refined.',
    steps: ['CoI Priority Challenge Announcement', 'Team Assembly: Junior Fellows & Civic Advisors Join', 'Intensive Inquiry: Rapid Ideation & Experimentation', 'Hackathon Phase: Collaborative Prototyping', 'Review & Pitch: Capstone Alignment Check', 'Deliverable: Open IP Output to Commons Node', 'Debrief: Lessons to Knowledge Core & Next Sprint Prep'],
  },
  {
    name: 'Deployment Cycles',
    duration: 'Ongoing, Quarterly Reviews',
    desc: 'Real-world testing in planetary settings, with iterative feedback from civic advisors. Outputs loop back to Inquiry layers for refinement. These cycles mirror the Infinite Continuum\'s experiential arc, ensuring that capstones contribute to the Knowledge Core\'s evolving repository rather than existing as isolated academic exercises with no impact beyond the classroom.',
    steps: ['Guild Prototype Selection', 'Field Test: Planetary Node Activation', 'Civic Feedback Loop: Advisor Input & Iteration', 'Impact Metrics: Capstone Evaluation & Ethical Review', 'Refinement: Loop Back to CoI Inquiry', 'Archival: Updated Artifact to Knowledge Core', 'Quarterly Review: Scale or Adapt for Next Cycle'],
  },
];

/* ─── Component ─── */
export default function CentersOfInquiry({ goToPage }: Props) {
  const [activePillar, setActivePillar] = useState(0);
  const introAnim = useInView();
  const pillarsAnim = useInView();
  const centersAnim = useInView(0);
  const guildAnim = useInView();
  const cyclesAnim = useInView();

  const activeSection = useActiveSection(['pillars', 'centers', 'guilds', 'cycles']);

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&q=80&w=1800" alt="Centers of Inquiry" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
          <div className="mb-6 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Frontiers of Research</span>
          </div>
          <h1 className="text-[44px] md:text-[52px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4 uppercase">Centers of Inquiry</h1>
          <p className="text-[17px] text-white/70 max-w-xl leading-relaxed font-light">The epicenters of transformative research — where curiosity-driven exploration meets goal-oriented inquiry to address the grand challenges of our time.</p>
        </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'pillars', label: 'Five Pillars' },
          { id: 'centers', label: 'Centers' },
          { id: 'guilds', label: 'Guilds' },
          { id: 'cycles', label: 'Cycles' },
        ]}
        activeSection={activeSection}
      />

      {/* Introduction */}
      <section className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24">
        <div ref={introAnim.ref} className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                Our Approach
              </span>
            </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">Replacing departments with purpose</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4 max-w-2xl">Our Centers of Inquiry stand as the epicenters of transformative research. These centers are structured to seamlessly blend curiosity-driven exploration with goal-oriented research, focusing on unraveling significant challenges. Inspired by the pursuit of knowledge as a cohesive whole, these centers are the cornerstone of our academic landscape.</p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4 max-w-2xl">Each center is a powerhouse of interdisciplinary collaboration, bringing together researchers from diverse disciplines to tackle complex challenges. Modeled on the principles of curiosity-driven research and a commitment to truth, these centers aim not only to unravel mysteries but to address grand challenges that transcend disciplinary boundaries. The goal is to foster an environment rooted in scientific curiosity, a commitment to truth, and interdisciplinary collaboration — a collective effort to solve complex problems facing society.</p>
          <p className="text-[16px] text-gray-600 leading-relaxed max-w-2xl">They replace traditional academic departments, creating an intellectual environment where reality is seen as interconnected and holistic, preventing distortions and imbalances that might arise from an exclusive focus on specific disciplines. This approach aligns with the vision of fostering a "philosophical habit of mind," encouraging learners to perceive knowledge as unified.</p>
        </div>
      </section>

      {/* Pillar Tabs */}
      <section id="pillars" className="bg-gray-50 py-16 lg:py-24 scroll-mt-[110px]">
        <div ref={pillarsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${pillarsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Five Pillars</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-10">How the Centers operate</h2>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-10">
            {pillars.map((p, i) => (
              <button key={i} onClick={() => setActivePillar(i)} className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${activePillar === i ? 'bg-[#8A0000] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}>
                {p.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white border border-gray-100 p-8 md:p-10">
            <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-4 uppercase">{pillars[activePillar].title}</div>
            <p className="text-[16px] text-gray-600 leading-relaxed">{pillars[activePillar].content}</p>
          </div>
        </div>
      </section>

      {/* All Centers Grid */}
      <section id="centers" className="py-16 lg:py-24 scroll-mt-[110px]">
        <div ref={centersAnim.ref} className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${centersAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Our Centers</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-12">
            {centers.map((center, i) => (
              <div key={i} onClick={() => goToPage('center-detail', center.slug)} className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 border border-gray-100 hover:border-[#8A0000] transition-all bg-white overflow-hidden shadow-sm hover:shadow-lg">
                <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                  <img src={center.img} alt={center.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 hover:scale-105 transition-all duration-500" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">{center.tag}</div>
                  <h3 className="text-[24px] font-bold text-[#141414] mb-3 group-hover:text-[#8A0000] transition-colors leading-tight">{center.name}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-4">{center.longDesc}</p>
                  <div className="flex gap-6 mb-5 text-[12px]">
                    <div><span className="font-black text-[#141414]">{center.investigators}</span> <span className="text-gray-500">Investigators</span></div>
                    <div><span className="font-black text-[#141414]">{center.fellows}</span> <span className="text-gray-500">Junior Fellows</span></div>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#141414] border-b-2 border-[#8A0000] w-fit group-hover:text-[#8A0000] transition-all">
                    Explore Center <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guilds Section */}
      <section id="guilds" className="bg-gray-50 py-16 lg:py-24 scroll-mt-[110px]">
        <div ref={guildAnim.ref} className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${guildAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8 flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#8A0000]"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Applied Engine</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">Guilds as the Applied Engine of Planetary Inquiry</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4 max-w-2xl">In the University of Artemis&apos;s vision for a reimagined higher education ecosystem, research is not a siloed pursuit but a dynamic force for planetary renewal. The Guilds represent the operational evolution of the foundational Centers of Inquiry (CoI) and the expansive Knowledge Core, transforming curiosity-driven exploration into actionable, civic-embedded intelligence.</p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">This architecture positions Guilds as the &ldquo;frontier layer&rdquo; atop the CoI&apos;s epistemic depth: where Centers generate unified knowledge, Guilds propel it into real-world systems through cyclical activities, co-stewardship, and student-integrated missions. Aligned with Artemis&apos;s governance ethos of adaptive, participatory structures, Guilds ensure research serves the Commons — fostering ethical, resilient innovations for a just global future.</p>

          {/* Operational Layers Table */}
          <h3 className="text-[20px] font-bold text-[#141414] mb-6">Operational Layers of the Guilds</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">Guilds operate across five interconnected roles. These layers bridge the Knowledge Core&apos;s archival unity with the CoI&apos;s innovative hubs, embedding student capstones as core drivers of progress. This layered design ensures Guilds are not parallel entities but amplifiers: CoI provide the intellectual scaffolding, while Guilds infuse dynamism through cycles of inquiry-action-reflection.</p>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-left border border-gray-200 bg-white">
              <thead>
                <tr className="bg-[#8A0000] text-white">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest">Layer</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest">Description</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest hidden md:table-cell">Integration with Artemis</th>
                </tr>
              </thead>
              <tbody>
                {guildLayers.map((gl, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 text-[14px] font-bold text-[#8A0000] whitespace-nowrap">{gl.layer}</td>
                    <td className="py-4 px-6 text-[14px] text-gray-700">{gl.desc}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-500 hidden md:table-cell">{gl.integration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Co-Stewardship */}
          <h3 className="text-[20px] font-bold text-[#141414] mb-6">Co-Stewardship for Adaptive Intelligence</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">Guild governance distributes authority across a triadic structure of faculty leads, civic advisors, and student fellows, creating a co-stewardship model that ensures every voice is heard and every perspective is integrated into decision-making.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Core Investigators</div>
              <h4 className="text-[16px] font-bold text-[#141414] mb-3">2-3 per Guild</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Appointed via CoI nomination for 3-year renewable terms. They anchor epistemic rigor, drawing from long-term CoI appointments to pursue high-risk inquiries without grant pressures.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Civic Advisors</div>
              <h4 className="text-[16px] font-bold text-[#141414] mb-3">3-5 per Guild</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Representatives from global nodes — indigenous knowledge keepers, industry ethicists, community leaders. Selected through open calls, they ensure deployments reflect diverse planetary contexts.</p>
            </div>
            <div className="bg-white p-6 border border-gray-100">
              <div className="text-[10px] font-bold text-[#8A0000] tracking-widest mb-3 uppercase">Junior Fellows</div>
              <h4 className="text-[16px] font-bold text-[#141414] mb-3">5-10 per Guild</h4>
              <p className="text-[14px] text-gray-600 leading-relaxed">Rotating cohort of undergraduates and graduates, elected from capstone participants. They co-design challenges, representing the Infinite Continuum&apos;s learner-centric flow and injecting fresh perspectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cycles of Activity */}
      <section id="cycles" className="py-16 lg:py-24 scroll-mt-[110px]">
        <div ref={cyclesAnim.ref} className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${cyclesAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex items-center mb-16">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">Cycles of Activity</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-6">Three interlocking rhythms</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-12 max-w-2xl">Guilds pulse through three interlocking cycles, synchronized with Artemis&apos;s global calendar. These rhythms operationalize CoI&apos;s static hubs into fluid engines, ensuring capstones evolve from ideation to deployment.</p>

          <div className="space-y-12">
            {cycles.map((cycle, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 p-8 md:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold text-[#8A0000] tracking-widest uppercase">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[22px] font-bold text-[#141414]">{cycle.name}</h3>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 bg-white px-3 py-1 border border-gray-200">{cycle.duration}</span>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-6">{cycle.desc}</p>
                <div className="flex flex-col gap-0">
                  {cycle.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${j === 0 ? 'bg-[#8A0000]' : j === cycle.steps.length - 1 ? 'bg-green-700' : 'bg-gray-300'}`}></div>
                        {j < cycle.steps.length - 1 && <div className="w-0.5 h-6 bg-gray-200"></div>}
                      </div>
                      <span className="text-[13px] text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
