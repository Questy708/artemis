'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Lock, Users, Clock, TrendingDown, AlertTriangle, X,
  Sparkles, Compass, Globe, GraduationCap, Rocket, Heart,
  ChevronDown, ArrowRight, CheckCircle2, Infinity as InfinityIcon,
  BookOpen, FlaskConical, MapPin, Target, Brain, Zap
} from 'lucide-react';

interface StepData {
  num: string;
  age: string;
  phase: string;
  title: string;
  desc: string;
  detail: string;
  consequence: string;
  success: string;
  image: string;
  icon: React.ElementType;
}

// ═══════════════════════════════════════════════════════════
// ACT 1: THE TRADITIONAL WAY — The loopholes & consequences
// ═══════════════════════════════════════════════════════════
const TRADITIONAL_STEPS: StepData[] = [
  {
    num: '01', age: 'Age 5–11', phase: 'Primary School',
    title: 'The Sorting Begins',
    desc: 'Children are placed into age-based cohorts and sorted by standardized tests that measure conformity over curiosity.',
    detail: 'From the first day of primary school, children are grouped not by interest or ability but by birth year. A child fascinated by astronomy sits beside a child who cannot yet read, both taught the same curriculum at the same pace. Standardized tests begin early, sorting children into "gifted" and "regular" tracks — labels that often stick for life. The message is clear: fit the mold, or fall behind.',
    consequence: 'Curiosity is replaced by compliance. Children who do not fit the age-based mold learn that they are "not smart," regardless of their actual potential.',
    success: 'Success means scoring well on standardized tests and being labeled "gifted." The child learns that their worth is a number.',
    image: 'https://sfile.chatglm.cn/images-ppt/98993d8336f9.jpg',
    icon: Lock,
  },
  {
    num: '02', age: 'Age 12–17', phase: 'Secondary School',
    title: 'The Exam Gauntlet',
    desc: 'Years of schooling are reduced to a single metric: exam scores. Learning becomes test preparation.',
    detail: 'Secondary school is dominated by the exam gauntlet. Every lesson, every homework assignment, every extracurricular activity is ultimately evaluated by how it contributes to a test score. Students learn to optimize for the test, not for understanding. They memorize, regurgitate, and forget. The joy of discovery is replaced by the anxiety of performance. Teachers, themselves evaluated by test scores, have no choice but to teach to the test.',
    consequence: 'Students develop test-taking skills, not life skills. They can pass exams but cannot think critically, solve real problems, or adapt to change.',
    success: 'Success means a high exam score that secures a place at a selective university. The student learns that the destination matters more than the journey.',
    image: 'https://sfile.chatglm.cn/images-ppt/f5738b8b26d7.jpg',
    icon: AlertTriangle,
  },
  {
    num: '03', age: 'Age 17–18', phase: 'University Applications',
    title: 'The Gatekeeper',
    desc: 'A single application, a single test score, a single admissions decision determines the trajectory of a lifetime.',
    detail: 'The university admissions process is a gatekeeper of life chances. A single standardized test score — the SAT, A-Levels, Gaokao, JEE — can open or close doors to elite institutions, which in turn gatekeep access to elite careers. Students spend years preparing for a single exam that will determine their social and economic trajectory. The system claims to be meritocratic, but it rewards those who can afford test prep, private tutors, and the cultural capital of knowing how the system works.',
    consequence: 'Talent is wasted. Brilliant students from poor backgrounds are filtered out not by lack of ability but by lack of access to test preparation and cultural knowledge.',
    success: "Success means admission to a prestigious university — regardless of whether that university will actually serve the student's growth. The gate is the goal.",
    image: 'https://sfile.chatglm.cn/images-ppt/98993d8336f9.jpg',
    icon: Lock,
  },
  {
    num: '04', age: 'Age 18–19', phase: 'Year 1 — Foundation',
    title: 'The Lecture Hall',
    desc: '200 students in a lecture hall. One professor at the front. Content that could be a YouTube video.',
    detail: 'The first year of university is dominated by the lecture hall. Hundreds of students sit in tiered rows while a professor speaks at them for 50 minutes. The content is often identical to what is available for free on YouTube or in a textbook. Questions are discouraged by the format. Interaction is limited to a brief Q&A at the end, if there is time. The student is a passive recipient, a vessel to be filled. Attendance is taken, notes are copied, exams are crammed for, and the content is forgotten within weeks.',
    consequence: 'Students learn to be passive consumers of information, not active creators of knowledge. The habit of passive learning persists for life.',
    success: 'Success means passing the first-year exams with a GPA high enough to stay. The student has survived; whether they have learned is secondary.',
    image: 'https://sfile.chatglm.cn/images-ppt/98993d8336f9.jpg',
    icon: Users,
  },
  {
    num: '05', age: 'Age 19–20', phase: 'Year 2 — Declaring a Major',
    title: 'The Silo',
    desc: 'Students must choose a single discipline — and are locked into it. Cross-disciplinary curiosity becomes a scheduling nightmare.',
    detail: 'In the second year, students are forced to declare a major. This choice, made at age 19, determines the courses they will take, the faculty they will interact with, and the degree they will receive. A computer science student who discovers a passion for philosophy must navigate bureaucratic hurdles to take a philosophy course — if it fits their schedule at all. Departments are silos, with their own faculty, their own curricula, and their own cultures. The interdisciplinary connections that produce breakthroughs are structurally prevented.',
    consequence: 'Graduates think in silos. The most consequential problems of the 21st century — climate, AI governance, pandemics — span disciplines that the silo model cannot address.',
    success: 'Success means completing the major requirements with a competitive GPA. The student has checked the boxes; whether the boxes were worth checking is not asked.',
    image: 'https://sfile.chatglm.cn/images-ppt/f9588bde8580.jpg',
    icon: Lock,
  },
  {
    num: '06', age: 'Age 20–21', phase: 'Year 3 — The GPA Game',
    title: 'Grade Point Average',
    desc: 'Learning is reduced to a number. The GPA becomes the sole metric of academic worth, driving strategic course selection.',
    detail: 'By the third year, the GPA has become the student\'s identity. Every course is evaluated not by what it teaches but by how it affects the GPA. Students select "easy A" courses to protect their average, avoiding challenging but valuable courses that might lower it. Collaboration is discouraged — if you help a peer, you might curve yourself down. The system is a zero-sum competition: your success depends on others\' failure. The transcript, a single number, is supposed to represent four years of intellectual growth. It cannot.',
    consequence: 'Students optimize for grades, not for learning. They avoid risk, avoid challenge, and avoid the kind of intellectual struggle that produces genuine growth.',
    success: 'Success means a 3.8+ GPA that keeps professional school or elite employer options open. The number, not the knowledge, is the achievement.',
    image: 'https://sfile.chatglm.cn/images-ppt/f5738b8b26d7.jpg',
    icon: TrendingDown,
  },
  {
    num: '07', age: 'Age 21–22', phase: 'Year 4 — The Job Hunt',
    title: 'The Credential',
    desc: 'The degree is a signal to employers, not a measure of capability. The job hunt reduces four years to a single line on a resume.',
    detail: 'In the final year, the purpose of the degree becomes clear: it is a credential, a signal to employers. The four years of lectures, exams, and GPAs are reduced to a single line on a resume: "B.A., University X, 2026." Employers use the degree as a filter, not because it indicates capability but because it indicates conformity to the system. The actual skills the graduate has — or lacks — are invisible. A 3.9 GPA student who crammed for every exam is indistinguishable from a 3.9 student who deeply understood the material. The credential cannot tell them apart.',
    consequence: 'Employers hire credentials, not capability. Graduates who passed through the system without acquiring real skills are employed alongside those who did, and the system cannot distinguish them.',
    success: 'Success means a job offer from a recognized employer. The degree has been converted into income — the only metric the system recognizes.',
    image: 'https://sfile.chatglm.cn/images-ppt/f9588bde8580.jpg',
    icon: X,
  },
  {
    num: '08', age: 'Age 22', phase: 'Graduation',
    title: 'The Identical Caps',
    desc: 'Hundreds of identical caps and gowns. A ceremony that celebrates conformity, not individuality.',
    detail: 'Graduation is the culmination of the system. Hundreds of students wear identical caps and gowns, walk across a stage in identical fashion, and receive identical-looking diplomas. The ceremony celebrates the completion of a standardized process. The valedictorian, chosen by GPA, gives a speech about following your dreams — the same speech given at every graduation, every year, everywhere. The individuality, curiosity, and potential that each student brought to the institution has been processed into a uniform output. The system worked as designed.',
    consequence: 'Graduates enter the world as standardized products, not as the unique thinkers and makers the world needs.',
    success: 'Success means walking across the stage, receiving the diploma, and having your photo taken. The ceremony confirms you are done.',
    image: 'https://sfile.chatglm.cn/images-ppt/288b47e4a529.jpg',
    icon: Users,
  },
  {
    num: '09', age: 'Age 22–25', phase: 'Early Career',
    title: 'The Cubicle',
    desc: 'The degree gets you the interview. The cubicle is the reward. The work often has nothing to do with what you studied.',
    detail: 'The degree gets the graduate an interview. The interview gets them a job. The job, more often than not, is a cubicle — a standardized workspace in a standardized organization doing standardized work. The specific knowledge acquired over four years is rarely used. What matters is the demonstration that the graduate can survive a bureaucratic process, follow instructions, and conform to expectations. The cubicle is the physical expression of the lecture hall: a space designed for standardization, not for creativity or impact.',
    consequence: 'Graduates spend their most energetic years in environments that do not use their talents, do not challenge them to grow, and do not connect their work to anything they care about.',
    success: "Success means a stable salary, benefits, and a career trajectory. The cubicle is not a failure — it is the system's intended outcome.",
    image: 'https://sfile.chatglm.cn/images-ppt/f9588bde8580.jpg',
    icon: Lock,
  },
  {
    num: '10', age: 'Age 22–30', phase: 'The Debt',
    desc: 'The average US graduate carries $37,000 in student debt. The degree that was supposed to be an investment becomes a chain.',
    detail: 'The financial consequence of the traditional path is debt. In the United States, the average graduate carries $37,000 in student loans; many carry $100,000 or more. This debt shapes every decision that follows: the jobs they can afford to take, the risks they can afford to take, the cities they can afford to live in, the businesses they can afford to start. The degree that was supposed to be an investment in freedom becomes a chain binding the graduate to the corporate ladder. They cannot afford to take the lower-paying but higher-impact job. They cannot afford to start the venture. They must pay the debt.',
    consequence: 'Debt strips graduates of the freedom to take risks, pursue purpose, or change direction. The system that promised upward mobility delivers indentured servitude.',
    success: 'Success means paying off the student loans — eventually. Financial freedom, not intellectual freedom, becomes the life goal.',
    image: 'https://sfile.chatglm.cn/images-ppt/dd49aaa1d2ec.jpg',
    icon: AlertTriangle,
  },
  {
    num: '11', age: 'Age 30–50', phase: 'Mid-Career Stagnation',
    title: 'The Plateau',
    desc: 'The skills that got you the job are obsolete. The system that trained you offers no path to re-learn.',
    detail: 'By mid-career, the skills acquired in university are obsolete. The technology has changed, the field has evolved, the problems have shifted. But the traditional system offers no path to re-learn. Continuing education is expensive, inconvenient, and disconnected from the workplace. The graduate, now 35 or 40, is stuck with a 15-year-old education in a 40-year-old world. They are too expensive to fire and too outdated to promote. The plateau sets in: the same work, the same salary, the same cubicle, year after year, until retirement. Learning has stopped. Growth has stopped. The system delivered the credential, and then it walked away.',
    consequence: 'Millions of professionals in their peak years are intellectually stagnant, trapped by a system that educated them once and then abandoned them.',
    success: 'Success means a promotion, a title, a corner office. The metrics of success are external, defined by the organization, not the individual.',
    image: 'https://sfile.chatglm.cn/images-ppt/f9588bde8580.jpg',
    icon: TrendingDown,
  },
  {
    num: '12', age: 'Age 65+', phase: 'Retirement',
    title: 'The Exit',
    desc: 'After 40 years in the system, retirement is the exit. Learning is over. Contribution is over. The mind is left to atrophy.',
    detail: 'Retirement is the final stage of the traditional path. After 40 years of work, the graduate — now a senior — exits the workforce. In the traditional model, this is the end of learning and contribution. The skills are obsolete, the network is retired, and the mind is left to atrophy. Society treats the senior as a former contributor, not an ongoing one. The wisdom accumulated over a lifetime has no outlet, no audience, no institution to receive it. The system that used the graduate\'s youth has no use for their elderhood. The learning that could have continued for decades simply stops.',
    consequence: 'Society loses the wisdom, mentorship, and ongoing contribution of its elders — the very people best positioned to provide perspective, context, and intergenerational knowledge transfer.',
    success: 'Success means a pension and a comfortable retirement. Learning is over; the goal is to rest after 40 years of the system.',
    image: 'https://sfile.chatglm.cn/images-ppt/288b47e4a529.jpg',
    icon: X,
  },
];

// ═══════════════════════════════════════════════════════════
// ACT 2: THE ARTEMIS WAY — The new way of doing things
// ═══════════════════════════════════════════════════════════
const ARTEMIS_STEPS: StepData[] = [
  {
    num: '01', age: 'Age 5–11', phase: 'Open-Loop Learning',
    title: 'The Infinite Continuum',
    desc: 'Learning begins at birth and never ends. There is no "first day of school" — only the continuation of a natural process.',
    detail: 'Artemis rejects the idea that learning has a start date and an end date. The Infinite Learning Continuum (Dimension 01) treats learning as a lifelong process that begins at birth and continues until death. There is no "first day of school" and no "graduation." Children do not wait until age 5 to begin learning — they are born learning, and the institution\'s role is to support and structure that learning, not to initiate it. The continuum means that a 7-year-old, a 17-year-old, a 37-year-old, and a 70-year-old are all learners, all in different stages of the same journey, all able to learn from and teach each other.',
    consequence: 'No one is "too young" or "too old" to learn. The intergenerational exchange enriches everyone.',
    success: 'Success means the child retains their curiosity, asks questions fearlessly, and sees themselves as a lifelong learner — not as a test score.',
    image: 'https://sfile.chatglm.cn/images-ppt/a3b5c9774539.jpg',
    icon: InfinityIcon,
  },
  {
    num: '02', age: 'Age 12–17', phase: 'Adaptive Paced Learning',
    title: 'Your Rhythm, Not the Clock',
    desc: 'Students progress when they master the material, not when the semester ends. No one is "behind" or "ahead."',
    detail: 'Adaptive Paced Learning (Dimension 02) replaces the factory-model clock. Students do not progress through material at a uniform pace determined by the academic calendar. They progress when they have demonstrated mastery of the current material, regardless of how long that takes. A student who masters algebra in three months moves on. A student who needs six months gets six months. No one is "behind" because there is no behind — there is only where you are and what you are mastering. The competency-based model means that every student who completes a subject has actually mastered it, not merely survived it.',
    consequence: 'No student is left behind by the clock, and no student is held back by it. Mastery, not time, is the metric.',
    success: 'Success means the student has genuinely mastered the material at their own pace, with deep understanding rather than superficial memorization.',
    image: 'https://sfile.chatglm.cn/images-ppt/c31492086d3a.jpg',
    icon: Clock,
  },
  {
    num: '03', age: 'Age 17–18', phase: 'Purpose Learning',
    title: 'Declare a Mission, Not a Major',
    desc: 'Students do not choose a major. They declare a mission — a real-world problem they commit to advancing.',
    detail: 'Purpose Learning (Dimension 04) replaces the major with the mission. A student does not declare "Computer Science" or "History." They declare: "To make clean water accessible across the Sahel" or "To design governance systems for autonomous AI." The mission, not a departmental curriculum, shapes the student\'s course selection, capstone project, and Center of Inquiry affiliation. The education serves the mission, not the other way around. A student whose mission is water access takes hydrology, public health, governance, and engineering — not because they are distribution requirements, but because the mission demands them.',
    consequence: 'Graduates know what they are working toward and why. The education is not a credential but a toolkit for purpose.',
    success: 'Success means the student has found a mission that ignites their passion — and built a curriculum that serves it, not the other way around.',
    image: 'https://sfile.chatglm.cn/images-ppt/099499c66b44.jpg',
    icon: Target,
  },
  {
    num: '04', age: 'Age 18–19', phase: 'The Four-Pillar Foundation',
    title: 'Epistemology, Computation, Systems, Expression',
    desc: 'Every Artemis graduate, regardless of mission, completes a four-pillar foundation in their first two years.',
    detail: 'The four-pillar curriculum provides the shared intellectual substrate. Epistemology: how we know what we know — logic, evidence, inference, the limits of certainty. Computational Thinking: the algorithmic decomposition of problems across every field. Global Systems: climate, finance, migration, governance — the interlocking systems of the planetary century. Creative Expression: the studio, the workshop, the stage — making as knowing. Every graduate can reason epistemologically, computationally, systemically, and creatively. This is the common language that lets a computer scientist and a historian collaborate without translation.',
    consequence: 'Graduates can think across disciplines. They have the tools to approach any problem, in any field, with any team.',
    success: 'Success means the student can reason epistemologically, computationally, systemically, and creatively — the foundation for any future inquiry.',
    image: 'https://sfile.chatglm.cn/images-ppt/c31492086d3a.jpg',
    icon: BookOpen,
  },
  {
    num: '05', age: 'Age 18–22', phase: 'The Tutorial System',
    title: 'Three Students, One Faculty Member',
    desc: 'Weekly 75-minute tutorials in groups of three. Socratic inquiry, not passive lecture. Every student accountable every week.',
    detail: 'The tutorial is the core of the Artemis pedagogy. Every student meets weekly in a tutorial of three students and one faculty member — a 75-minute deep discussion of the week\'s readings and problems. The tutorial is not a mini-lecture; it is a Socratic interrogation. The faculty member probes understanding, challenges assumptions, and pushes students to articulate and defend their reasoning. The 3:1 ratio means no one can hide. Every student is accountable every week. With 60,000 students, the institution runs 20,000 weekly tutorials, staffed by 2,000 faculty.',
    consequence: 'Students learn to think on their feet, articulate their reasoning, and defend their ideas — the skills that matter in the real world.',
    success: 'Success means the student can articulate, defend, and refine their ideas in real-time — the skill that defines leadership in every field.',
    image: 'https://sfile.chatglm.cn/images-ppt/c31492086d3a.jpg',
    icon: Users,
  },
  {
    num: '06', age: 'Age 18–22', phase: 'The AI Tutor',
    title: '24/7 Socratic Guidance',
    desc: 'Every course is paired with an AI tutor that asks questions, never gives answers. Available at 2am when you are stuck.',
    detail: 'Every Artemis course is paired with an AI assistant — a large language model fine-tuned on the Center of Inquiry\'s domain knowledge and the Socratic method. The AI tutor is available 24/7, not to deliver answers but to ask questions. When a student is stuck at 2am, the AI tutor asks: "What have you tried?" "What assumption are you making?" "How would you check that?" The AI is calibrated to the student\'s competency level, adjusting its questioning to the student\'s zone of proximal development. It is a complement to the faculty tutorial, ensuring the student is never alone with a problem.',
    consequence: 'Every student has a personal tutor that never sleeps, never tires, and never judges — but always pushes them to think harder.',
    success: 'Success means the student is never stuck, never alone with a problem — the AI tutor ensures thinking never stops, even at 2am.',
    image: 'https://sfile.chatglm.cn/images-ppt/e5ca6fbd2a3b.png',
    icon: Brain,
  },
  {
    num: '07', age: 'Age 18–22', phase: 'The Six-City Rotation',
    title: 'Six Cities, Four Continents',
    desc: 'Undergraduate students rotate through six hostel cities — Valletta, Berlin, Nairobi, Singapore, São Paulo, Vancouver.',
    detail: 'The Darwin Voyage (Dimension 06) is the physical expression of the planetary mandate. Undergraduate students rotate through six cities over four years — Valletta, Berlin, Nairobi, Singapore, São Paulo, Vancouver — spending two semesters in each. Each city hosts a residential college with full academic facilities, and the curriculum is synchronised so the student continues their course sequence seamlessly. A student studying global systems lives in both the Global North and the Global South. A student studying urban futures walks the streets of cities being adapted and cities being built. The rotation is the degree, and the cities are the classroom.',
    consequence: 'Graduates have lived in six countries, speak multiple languages, and understand the world from multiple cultural perspectives — not from a textbook.',
    success: 'Success means the student has lived in six countries, speaks multiple languages, and understands the world not from a book but from experience.',
    image: 'https://sfile.chatglm.cn/images-ppt/c68c0911a2ac.jpg',
    icon: Globe,
  },
  {
    num: '08', age: 'Age 18–22', phase: 'Centers of Inquiry',
    title: 'No Departments, Only Problems',
    desc: '19 interdisciplinary Centers replace departments. Faculty are appointed to Centers, not silos. Research flows across boundaries.',
    detail: 'The 19 Centers of Inquiry (Dimension 05) replace traditional academic departments. Each Center is an interdisciplinary hub organised around a problem domain: Synthetic Intelligence, Bio-Regenerative Arts, Cosmological Humanities, Urban Futures, Biotech & Life Sciences, Fintech & Economics, Health & Bioethics, and more. Faculty are appointed to Centers, not departments. Students affiliate with the Center whose research agenda most aligns with their mission. The Centers share infrastructure, co-advise students, and run joint projects. The boundary-crossing that produces breakthroughs is the default, not the exception.',
    consequence: 'Research and teaching are organized around the world\'s problems, not around 19th-century disciplinary boundaries.',
    success: 'Success means the student has contributed to real research at the frontier of human knowledge — not merely studied what others have done.',
    image: 'https://sfile.chatglm.cn/images-ppt/e5ca6fbd2a3b.png',
    icon: FlaskConical,
  },
  {
    num: '09', age: 'Age 18–22', phase: 'Competency-Based Grading',
    title: 'Mastery, Not Ranking',
    desc: 'No GPA. No class rank. No curve. Students are assessed against mastery standards — "mastery," "proficiency," or "in progress."',
    detail: 'SkillPrints (Dimension 03) replaces the GPA with competency-based assessment. Students are not ranked against each other; they are assessed against published mastery standards. A student demonstrates mastery of a competency (e.g., "can construct a valid Bayesian inference from data") through coursework, projects, and oral examinations, and receives a designation of "mastery," "proficiency," or "in progress." The transcript describes what the student can actually do, not how they ranked relative to peers. The standard is absolute, not relative — a "mastery" designation means the same thing in 2026 and 2050.',
    consequence: 'Collaboration replaces competition. Students help each other because helping does not lower your grade. The transcript is a skill portfolio, not a ranking.',
    success: 'Success means the student has a portfolio of demonstrated competencies — what they can do, not how they ranked.',
    image: 'https://sfile.chatglm.cn/images-ppt/c31492086d3a.jpg',
    icon: CheckCircle2,
  },
  {
    num: '10', age: 'Age 20–22', phase: 'The Capstone',
    title: 'Advance Your Mission',
    desc: 'Every student completes a capstone that advances their declared mission. Evaluated on epistemic contribution and civic impact.',
    detail: 'The capstone is the culmination of the Artemis education. Every student completes a capstone project in their final year, and the capstone must advance the student\'s declared mission. This is not a thesis — it is a contribution. A water-access student might design and prototype a low-cost filtration system deployed in a Sahel community. An AI-governance student might draft a model regulatory framework adopted by a national government. The capstone is evaluated on a dual criterion: epistemic contribution (did it advance knowledge?) and civic impact (did it advance the mission?). The standard is the same standard applied to the institution\'s own research.',
    consequence: 'Graduates leave with a portfolio of real work, not just a transcript. They have already made a contribution before they graduate.',
    success: 'Success means the student has advanced their mission — made a real contribution to a real problem before they even graduate.',
    image: 'https://sfile.chatglm.cn/images-ppt/e5ca6fbd2a3b.png',
    icon: Rocket,
  },
  {
    num: '11', age: 'Age 22+', phase: 'The Forge & Innovation',
    title: 'From Breakthrough to Venture',
    desc: 'The Forge incubator spins research into ventures within 12 months. 5% equity flows to the endowment. Graduates can build.',
    detail: 'The Forge is Artemis\'s translational engine. It takes breakthroughs from the Centers of Inquiry and spins them into independent ventures within 12 months. ClimatIQ from the Center for Urban Futures. NeuroBridge from Synthetic Intelligence. BioWeave from Bio-Regenerative Arts. Each venture addresses a real-world problem, was spun within twelve months of the underlying research, and carries 5% equity for the Artemis endowment. Graduates are not just prepared to join existing organizations — they are prepared to build new ones, with institutional support and an innovation infrastructure behind them.',
    consequence: 'Graduates can build ventures, not just join them. The institution supports their ambitions with capital, mentorship, and infrastructure.',
    success: 'Success means the graduate can build, not just join — with the capital, mentorship, and infrastructure to launch ventures that matter.',
    image: 'https://sfile.chatglm.cn/images-ppt/099499c66b44.jpg',
    icon: Zap,
  },
  {
    num: '12', age: 'Age 22–100', phase: 'The Lifelong Continuum',
    title: 'Learning Never Stops',
    desc: 'Graduation is not the end. Alumni continue learning, teaching, and contributing through the Artemis network for life.',
    detail: 'Because learning is an infinite continuum (Dimension 01), graduation is not the end of the journey — it is a milestone. Artemis alumni continue to have access to the institution\'s courses, Centers, and Knowledge Core for life. They can return for a semester, audit a course, mentor a student, or contribute to a Center\'s research. The alumni network is concentrated in the six rotation cities, producing a density of connection that amplifies every graduate\'s reach. The 70-year-old alumnus and the 20-year-old student are both learners, both in different stages of the same continuum, both able to teach and learn from each other. Learning never stops.',
    consequence: 'The institution supports its learners for life, not for four years. The wisdom of elders flows back to the young, and the energy of the young flows to the elders.',
    success: 'Success means the graduate continues to learn, teach, and contribute for life — the continuum never ends, and neither does the impact.',
    image: 'https://sfile.chatglm.cn/images-ppt/d96457501870.jpg',
    icon: Heart,
  },
];

// ═══════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════
export default function JourneyPage({ goTo }: { goTo: (page: string) => void }) {
  const [activeTale, setActiveTale] = useState<'intro' | 'traditional' | 'bigger' | 'artemis'>('intro');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Scroll to top when tale changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTale]);

  return (
    <div ref={containerRef} className="w-full bg-white overflow-x-hidden">
      {/* ─── Scroll Progress Bar ─── */}
      <motion.div
        className="fixed top-14 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8A0000] via-[#dc2626] to-[#D4A853] z-[60] origin-left"
        style={{ scaleX: progressWidth }}
      />

      {/* ═══════════════════════════════════════════
          INTRO: The Tale of Two Ways
          ═══════════════════════════════════════════ */}
      {activeTale === 'intro' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-[#0c0a09] text-white overflow-hidden"
        >
          {/* Background gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#8A0000]/20 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#D4A853]/10 blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <span className="w-10 h-[1px] bg-[#8A0000]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#ff6b6b]">A Tale of Two Ways</span>
              <span className="w-10 h-[1px] bg-[#8A0000]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[40px] sm:text-[56px] md:text-[72px] font-black leading-[0.95] tracking-tighter mb-6"
            >
              The Learner's<br/>Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[17px] sm:text-[19px] text-white/50 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
            >
              Two paths lie before every learner. One has been walked for 200 years — a system designed for the industrial age, still running on a factory clock. The other is being built now — for the planetary century, for the learner, for humanity. This is the story of both.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => setActiveTale('traditional')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all text-white text-[13px] font-bold uppercase tracking-[0.2em] rounded-full"
              >
                <Lock size={16} className="text-gray-400" />
                The Traditional Way
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setActiveTale('artemis')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#8A0000] hover:bg-[#6B0000] transition-all text-white text-[13px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-[#8A0000]/30"
              >
                <Sparkles size={16} />
                The Artemis Way
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-16"
            >
              <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mb-2">Scroll to begin</p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown size={20} className="text-white/30 mx-auto" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════
          ACT 1: THE TRADITIONAL WAY
          ═══════════════════════════════════════════ */}
      {activeTale === 'traditional' && (
        <ActSteps
          title="The Traditional Way"
          subtitle="A system designed for the industrial age — still running on a factory clock"
          steps={TRADITIONAL_STEPS}
          color="#6b7280"
          bgColor="bg-[#1a1a1a]"
          textColor="text-white"
          onContinue={() => setActiveTale('bigger')}
          continueLabel="See the bigger picture"
          actLabel="Act I"
        />
      )}

      {/* ═══════════════════════════════════════════
          THE BIGGER PICTURE
          ═══════════════════════════════════════════ */}
      {activeTale === 'bigger' && (
        <BiggerPicture onContinue={() => setActiveTale('artemis')} />
      )}

      {/* ═══════════════════════════════════════════
          ACT 2: THE ARTEMIS WAY
          ═══════════════════════════════════════════ */}
      {activeTale === 'artemis' && (
        <ActSteps
          title="The Artemis Way"
          subtitle="A system designed for the planetary century — for the learner, for humanity"
          steps={ARTEMIS_STEPS}
          color="#8A0000"
          bgColor="bg-white"
          textColor="text-[#141414]"
          onContinue={() => setActiveTale('intro')}
          continueLabel="Return to the beginning"
          actLabel="Act II"
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ACT STEPS COMPONENT
// ═══════════════════════════════════════════════════════════
function ActSteps({
  title, subtitle, steps, color, bgColor, textColor, onContinue, continueLabel, actLabel,
}: {
  title: string;
  subtitle: string;
  steps: StepData[];
  color: string;
  bgColor: string;
  textColor: string;
  onContinue: () => void;
  continueLabel: string;
  actLabel: string;
}) {
  return (
    <div className={`${bgColor} ${textColor}`}>
      {/* Act Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color }}>{actLabel}</span>
          <span className="flex-1 h-[1px] opacity-20" style={{ background: color }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">{steps.length} steps</span>
        </div>
        <h2 className="text-[36px] sm:text-[48px] md:text-[60px] font-black leading-[0.95] tracking-tighter mb-4">{title}</h2>
        <p className="text-[16px] sm:text-[18px] opacity-50 max-w-2xl leading-relaxed font-light">{subtitle}</p>
      </div>

      {/* Steps */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        {steps.map((step, i) => (
          <StepSection key={i} step={step} index={i} color={color} isDark={bgColor.includes('1a1a1a')} />
        ))}
      </div>

      {/* Continue button */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 text-center">
        <button
          onClick={onContinue}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] transition-all"
          style={{
            background: color === '#6b7280' ? '#8A0000' : '#0c0a09',
            color: '#fff',
          }}
        >
          {continueLabel}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STEP SECTION COMPONENT
// ═══════════════════════════════════════════════════════════
function StepSection({ step, index, color, isDark }: { step: StepData; index: number; color: string; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = step.icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: '-15% 0px', threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 lg:py-24 ${
        index > 0 ? 'border-t' : ''
      } ${isDark ? 'border-white/10' : 'border-gray-200'}`}
    >
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`relative ${isEven ? '' : 'lg:order-2'}`}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Step number badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
            <span className="text-[10px] font-black tracking-wider text-white">{step.num}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{step.phase}</span>
          </div>
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className={isEven ? '' : 'lg:order-1'}
      >
        {/* Age tag */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${color}15` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{step.age}</div>
            <div className="text-[12px] font-bold" style={{ color }}>{step.phase}</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[24px] sm:text-[30px] font-black tracking-tight leading-[1.1] mb-4">{step.title}</h3>

        {/* Description */}
        <p className="text-[15px] sm:text-[16px] leading-relaxed mb-4 opacity-70">{step.desc}</p>

        {/* Detail */}
        <p className="text-[14px] leading-[1.75] opacity-50 mb-6">{step.detail}</p>

        {/* Consequence */}
        <div
          className="p-5 rounded-xl border-l-4 mb-4"
          style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderColor: color }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color }} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color }}>
                {index < 12 ? 'Consequence' : 'Benefit'}
              </div>
              <p className="text-[13px] leading-relaxed opacity-70">{step.consequence}</p>
            </div>
          </div>
        </div>

        {/* What Success Means */}
        <div
          className="p-5 rounded-xl border-l-4"
          style={{ background: isDark ? 'rgba(212,168,83,0.05)' : 'rgba(212,168,83,0.08)', borderColor: '#D4A853' }}
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[#D4A853]" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 text-[#D4A853]">
                What Success Means Here
              </div>
              <p className="text-[13px] leading-relaxed opacity-70">{step.success}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BIGGER PICTURE COMPONENT
// ═══════════════════════════════════════════════════════════
function BiggerPicture({ onContinue }: { onContinue: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { val: '$1.7T', label: 'US Student Debt', desc: 'A generation indentured to the system that was supposed to set them free.' },
    { val: '169%', label: 'Tuition Rise Since 1980', desc: 'Far outstripping wages. The cost of a degree has become a lifetime burden.' },
    { val: '36%', label: 'Public Confidence in Higher Ed', desc: 'Down from 57% in 2015. The institution has lost the trust of the public it serves.' },
    { val: '50%', label: 'Drop in Breakthrough Discovery', desc: 'More papers, more researchers, more journals — but fewer paradigm-shifting ideas.' },
    { val: '84%', label: 'Excluded from Higher Education', desc: '1.4 billion university-age people; only 220 million enrolled. The system cannot scale.' },
    { val: '40yr', label: 'Same Pedagogy', desc: 'The lecture model has not changed in 800 years. The world has changed beyond recognition.' },
  ];

  return (
    <div className="bg-[#0c0a09] text-white min-h-screen">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6b6b]">The Bigger Picture</span>
          </div>
          <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-black leading-[0.95] tracking-tighter mb-6 max-w-3xl">
            It's not just one learner.<br/>It's the whole species.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-white/50 max-w-2xl leading-relaxed font-light">
            The traditional system does not just fail individual learners. It fails humanity. The consequences scale from the personal to the planetary — and they compound across generations.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
            >
              <div className="text-[36px] sm:text-[44px] font-black text-[#ff6b6b] leading-none mb-3">{stat.val}</div>
              <div className="text-[12px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">{stat.label}</div>
              <p className="text-[13px] text-white/50 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The human cost */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20"
        >
          <div>
            <h3 className="text-[28px] sm:text-[36px] font-black tracking-tight mb-6 leading-tight">
              The human cost is not abstract.
            </h3>
            <div className="space-y-4 text-[15px] text-white/50 leading-relaxed">
              <p>It is the 19-year-old who tests poorly and concludes they are not smart — when the test measures conformity, not intelligence.</p>
              <p>It is the 23-year-old who graduates with $50,000 in debt and takes the corporate job not because they want it, but because they must pay the loan.</p>
              <p>It is the 35-year-old whose skills are obsolete, who has no path to re-learn, and who will spend the next 30 years on a plateau.</p>
              <p>It is the 65-year-old who exits the workforce and is told their contribution is over — when their wisdom is needed more than ever.</p>
              <p>It is the 1.2 billion university-age people in the Global South who have no institution to attend — not because they lack talent, but because the system cannot scale to reach them.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://sfile.chatglm.cn/images-ppt/498b8659d855.jpg"
              alt="Earth from space"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* The question */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center max-w-3xl mx-auto py-12"
        >
          <p className="text-[20px] sm:text-[24px] text-white/70 leading-relaxed mb-8 font-light italic">
            "The system was not designed to fail. It was designed for a different century. The question is not whether to fix it — the question is whether we can build something better before it's too late."
          </p>
          <button
            onClick={onContinue}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#8A0000] hover:bg-[#6B0000] transition-all text-white text-[14px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl shadow-[#8A0000]/30"
          >
            <Sparkles size={18} />
            Enter the Artemis Way
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
