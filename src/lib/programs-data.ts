export interface CourseLink {
  label: string;
}

export interface ProgramRequirement {
  name: string;
  detail: string;
}

export interface ProgramData {
  title: string;
  image?: string;
  directorName: string;
  directorLocation: string;
  coDirectorTitle?: string;
  coDirectorName?: string;
  coDirectorLocation?: string;
  website: string;
  overviewParagraphs: string[];
  requirementsParagraphs: string[];
  seniorRequirement: string;
  advising: string;
  requirementsArray: ProgramRequirement[];
  summaryDistribution: string;
  firstYearParagraphs: string[];
  certificateText?: string;
  certificateRequirements?: string;
  facultyProfessors?: string;
  facultyAssociate?: string;
  facultyAssistant?: string;
  facultyLecturers?: string;
  coursesLinks: CourseLink[];
}

export function generateProgramData(title: string): ProgramData {
  const cleanTitle = title.replace(/\(B\.A\.\)|\(B\.S\.\)|\(B\.F\.A\.\)/g, '').trim();
  const seed = cleanTitle.length + cleanTitle.charCodeAt(0);
  const images = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600"
  ];
  
  return {
    title: title,
    image: images[seed % images.length],
    directorName: "Prof. Alistair Sterling",
    directorLocation: "Hall of Scholars, Room 304",
    coDirectorTitle: "Associate Director",
    coDirectorName: "Dr. Evelyn Vance",
    coDirectorLocation: "Research Annex, Room 112",
    website: `https://artemis.collegium.edu/${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    overviewParagraphs: [
      `The ${cleanTitle} program at Artemis Collegium offers students a rigorous, intellectual environment for exploring the deep structural paradigms of the field. Students analyze complex global frameworks, using qualitative and quantitative models developed across the Artemis network.`,
      `By participating in core seminars and independent labs, majors gain a deep grasp of structural historical developments as well as state-of-the-art contemporary techniques. The curriculum balances classical foundational courses with dynamic experimental inquiries.`
    ],
    requirementsParagraphs: [
      `Majors are required to successfully complete twelve term courses or equivalent research credits. There are four foundation courses covering historical paradigms, followed by six intermediate specialization courses of the student's choosing.`,
      `In addition to coursework, majors participate in seasonal symposia and complete a rigorous senior essay or graduation thesis.`
    ],
    seniorRequirement: `A one-term senior essay or a comprehensive deep-space model portfolio representing original research, completed under the close guidance of a faculty supervisor.`,
    advising: `Students are matched with a dedicated academic mentor in their sophomore year, aiding track selection and post-graduate positioning.`,
    requirementsArray: [
      { name: "Foundational Seminars", detail: "4 core research credits exploring key theoretical texts and conceptual benchmarks." },
      { name: "Distribution Electives", detail: "6 advanced courses within the chosen sub-disciplines or planetary hubs." },
      { name: "Senior Essay / Graduation Project", detail: "A capstone project demonstrating rigorous methodologies and original contributions." }
    ],
    summaryDistribution: "12 term credits total: 4 foundations, 6 intermediate/advanced tracks, 1 capstone seminar, 1 senior project.",
    firstYearParagraphs: [
      "First-year students are encouraged to enroll in introductory survey lectures and the seasonal interdisciplinary seminars.",
      "No prior background in the field is required, though strong analytical habits and intellectual curiosity are highly recommended."
    ],
    certificateText: `The Special Certificate in Advanced ${cleanTitle} Research is awarded to students who complete an additional three research courses and participate in the annual summer workshop at our residency hubs.`,
    certificateRequirements: "Requires three courses at or above the 300-level, a summer research project, and a presentation before the Collegium Council.",
    facultyProfessors: "Elena Rostova (Structural Harmonics), Dr. Marcus Vance (Analytical Mechanics), Prof. Aris Thorne (Seismology & Quantum Dynamics)",
    facultyAssociate: "Dr. Clara Oswald (Tectonic Geometries), Dr. Jack Harkness (Cosmic Archeology)",
    facultyAssistant: "Dr. Martha Jones (Anomalous Fields), Dr. Amy Pond (Spatial Anomalies)",
    facultyLecturers: "Rory Williams (Clinical Metrics), Donna Noble (Administrative Economics)",
    coursesLinks: [
      { label: `View Catalog for ${cleanTitle}` },
      { label: "Upcoming Seminars (2026-2027)" },
      { label: "Intermediate Specialized Seminars" },
      { label: "Independent Study Registries" }
    ]
  };
}

export const programsData: Record<string, ProgramData> = {
  "African Studies (B.A.)": {
    ...generateProgramData("African Studies (B.A.)"),
    directorName: "Prof. Kofi Mensah",
    directorLocation: "Ames Hall, Room 205",
    website: "https://artemis.collegium.edu/african-studies",
    overviewParagraphs: [
      "The African Studies program explores the history, culture, politics, and economic paradigms of the African continent with premium academic depth.",
      "Combining linguistic study, post-colonial geopolitical theory, and active collaborative fieldwork, students gain an invaluable, multi-layered perspective on African contributions to global systems."
    ]
  },
  "Computer Science (B.S.)": {
    ...generateProgramData("Computer Science (B.S.)"),
    directorName: "Dr. Evelyn Vance",
    directorLocation: "Turing Pavilion, Room 402",
    website: "https://artemis.collegium.edu/computer-science",
    overviewParagraphs: [
      "Our Computer Science program is rooted in computational foundations, complex algorithms, and human-computer symbiosis.",
      "Majors develop scalable soft-goods systems, participate in decentralized machine-learning research, and explore computational structures that empower human creative capacity."
    ]
  }
};
