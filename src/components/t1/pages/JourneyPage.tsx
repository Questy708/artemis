'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import {
  Lock, Users, Clock, TrendingDown, AlertTriangle, X,
  Sparkles, ChevronDown, ArrowRight, CheckCircle2, Infinity as InfinityIcon,
  BookOpen, FlaskConical, Target, Brain, Zap, Heart, Globe, Compass,
  GraduationCap, Rocket, User, Briefcase
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════
interface Persona {
  role: string;
  perspective: string;
}

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
  student: Persona;
  tutor: Persona;
}

// ═══════════════════════════════════════════════════════════
// TRADITIONAL STEPS
// ═══════════════════════════════════════════════════════════
const TRADITIONAL_STEPS: StepData[] = [
  {
    num: '01', age: 'Age 5–11', phase: 'Primary School',
    title: 'The Sorting Begins',
    desc: 'Children are placed into age-based cohorts and sorted by standardized tests that measure conformity over curiosity.',
    detail: 'From the first day of primary school, children are grouped not by interest or ability but by birth year. A child fascinated by astronomy sits beside a child who cannot yet read, both taught the same curriculum at the same pace. Standardized tests begin early, sorting children into "gifted" and "regular" tracks — labels that often stick for life.',
    consequence: 'Curiosity is replaced by compliance. Children who do not fit the age-based mold learn that they are "not smart," regardless of their actual potential.',
    success: 'Success means scoring well on standardized tests and being labeled "gifted." The child learns that their worth is a number.',
    image: 'https://sfile.chatglm.cn/images-ppt/1477a32b7b80.jpg',
    icon: Lock,
    student: { role: 'The Student', perspective: 'I loved asking questions. Then they gave me a test and told me I was average. I stopped asking.' },
    tutor: { role: 'The Educator', perspective: 'I can see the spark in some children dying. But the curriculum says move on. The test is coming. We must prepare.' },
  },
  {
    num: '02', age: 'Age 12–17', phase: 'Secondary School',
    title: 'The Exam Gauntlet',
    desc: 'Years of schooling are reduced to a single metric: exam scores. Learning becomes test preparation.',
    detail: 'Secondary school is dominated by the exam gauntlet. Every lesson, every homework assignment, every extracurricular activity is ultimately evaluated by how it contributes to a test score. Students learn to optimize for the test, not for understanding. They memorize, regurgitate, and forget.',
    consequence: 'Students develop test-taking skills, not life skills. They can pass exams but cannot think critically, solve real problems, or adapt to change.',
    success: 'Success means a high exam score that secures a place at a selective university. The student learns that the destination matters more than the journey.',
    image: 'https://sfile.chatglm.cn/images-ppt/c5e720f31370.jpg',
    icon: AlertTriangle,
    student: { role: 'The Student', perspective: 'I memorized 200 pages of biology for the exam. Two weeks later, I remembered none of it. But I got an A.' },
    tutor: { role: 'The Educator', perspective: 'I know this content will be forgotten. But my performance review is tied to their test scores. I teach to the test because I must.' },
  },
  {
    num: '03', age: 'Age 17–18', phase: 'University Applications',
    title: 'The Gatekeeper',
    desc: 'A single application, a single test score, a single admissions decision determines the trajectory of a lifetime.',
    detail: 'The university admissions process is a gatekeeper of life chances. A single standardized test score — the SAT, A-Levels, Gaokao, JEE — can open or close doors to elite institutions, which in turn gatekeep access to elite careers. The system claims to be meritocratic, but it rewards those who can afford test prep and cultural capital.',
    consequence: 'Talent is wasted. Brilliant students from poor backgrounds are filtered out not by lack of ability but by lack of access to test preparation.',
    success: "Success means admission to a prestigious university — regardless of whether that university will actually serve the student's growth. The gate is the goal.",
    image: 'https://sfile.chatglm.cn/images-ppt/a46d47ba293a.jpg',
    icon: Lock,
    student: { role: 'The Student', perspective: 'My friend scored higher because her parents paid $5,000 for a tutor. I scored lower because I worked after school. They call that merit.' },
    tutor: { role: 'The Educator', perspective: 'I write recommendation letters knowing they matter more than what the student actually learned in my class. The system is broken, but I am part of it.' },
  },
  {
    num: '04', age: 'Age 18–19', phase: 'Year 1 — Foundation',
    title: 'The Lecture Hall',
    desc: '200 students in a lecture hall. One professor at the front. Content that could be a YouTube video.',
    detail: 'The first year of university is dominated by the lecture hall. Hundreds of students sit in tiered rows while a professor speaks at them for 50 minutes. The content is often identical to what is available for free on YouTube. Questions are discouraged by the format. The student is a passive recipient.',
    consequence: 'Students learn to be passive consumers of information, not active creators of knowledge. The habit of passive learning persists for life.',
    success: 'Success means passing the first-year exams with a GPA high enough to stay. The student has survived; whether they have learned is secondary.',
    image: 'https://sfile.chatglm.cn/images-ppt/60c58320d536.jpg',
    icon: Users,
    student: { role: 'The Student', perspective: 'I sit in the back. The professor does not know my name. I watch videos on my phone. Nobody notices. Nobody cares.' },
    tutor: { role: 'The Educator', perspective: 'I have 300 students. I cannot learn their names. I deliver the lecture, write the exam, grade the exam. The system does not let me teach — it lets me process.' },
  },
  {
    num: '05', age: 'Age 19–20', phase: 'Year 2 — Declaring a Major',
    title: 'The Silo',
    desc: 'Students must choose a single discipline — and are locked into it. Cross-disciplinary curiosity becomes a scheduling nightmare.',
    detail: 'In the second year, students are forced to declare a major. This choice, made at age 19, determines the courses they will take, the faculty they will interact with, and the degree they will receive. A computer science student who discovers a passion for philosophy must navigate bureaucratic hurdles. Departments are silos with their own faculty and curricula.',
    consequence: 'Graduates think in silos. The most consequential problems of the 21st century — climate, AI governance, pandemics — span disciplines that the silo model cannot address.',
    success: 'Success means completing the major requirements with a competitive GPA. The student has checked the boxes; whether the boxes were worth checking is not asked.',
    image: 'https://sfile.chatglm.cn/images-ppt/76dbdb01b7b4.png',
    icon: Lock,
    student: { role: 'The Student', perspective: 'I wanted to study both computer science and philosophy. They told me to pick one. I picked the one that pays more. I lost something.' },
    tutor: { role: 'The Educator', perspective: 'A student from another department asked to join my seminar. The registrar said no — it is not in their degree plan. I am not allowed to teach the students who want to learn.' },
  },
  {
    num: '06', age: 'Age 20–21', phase: 'Year 3 — The GPA Game',
    title: 'Grade Point Average',
    desc: 'Learning is reduced to a number. The GPA becomes the sole metric of academic worth, driving strategic course selection.',
    detail: 'By the third year, the GPA has become the student\'s identity. Every course is evaluated not by what it teaches but by how it affects the GPA. Students select "easy A" courses to protect their average. Collaboration is discouraged — if you help a peer, you might curve yourself down. The system is a zero-sum competition.',
    consequence: 'Students optimize for grades, not for learning. They avoid risk, avoid challenge, and avoid the kind of intellectual struggle that produces genuine growth.',
    success: 'Success means a 3.8+ GPA that keeps professional school or elite employer options open. The number, not the knowledge, is the achievement.',
    image: 'https://sfile.chatglm.cn/images-ppt/bebbcf66b86a.jpg',
    icon: TrendingDown,
    student: { role: 'The Student', perspective: 'I stopped helping my classmates because the curve punishes generosity. I take easy courses to protect my GPA. I have become a worse person.' },
    tutor: { role: 'The Educator', perspective: 'I know students take my class because it is an easy A. I could make it harder, more honest. But then enrollment drops, and my department loses funding.' },
  },
  {
    num: '07', age: 'Age 21–22', phase: 'Year 4 — The Job Hunt',
    title: 'The Credential',
    desc: 'The degree is a signal to employers, not a measure of capability. The job hunt reduces four years to a single line on a resume.',
    detail: 'In the final year, the purpose of the degree becomes clear: it is a credential, a signal to employers. The four years of lectures, exams, and GPAs are reduced to a single line on a resume. Employers use the degree as a filter, not because it indicates capability but because it indicates conformity.',
    consequence: 'Employers hire credentials, not capability. Graduates who passed through the system without acquiring real skills are indistinguishable from those who did.',
    success: 'Success means a job offer from a recognized employer. The degree has been converted into income — the only metric the system recognizes.',
    image: 'https://sfile.chatglm.cn/images-ppt/7921490a0b19.jpg',
    icon: X,
    student: { role: 'The Student', perspective: 'I spent four years here and the recruiter only asked about my GPA and my school name. Nothing about what I actually know or can do.' },
    tutor: { role: 'The Educator', perspective: 'I see brilliant students who cannot get interviews because their school is not prestigious enough. And I see mediocre students from elite schools who get every interview. The system rewards the brand, not the brain.' },
  },
  {
    num: '08', age: 'Age 22', phase: 'Graduation',
    title: 'The Identical Caps',
    desc: 'Hundreds of identical caps and gowns. A ceremony that celebrates conformity, not individuality.',
    detail: 'Graduation is the culmination of the system. Hundreds of students wear identical caps and gowns, walk across a stage in identical fashion, and receive identical-looking diplomas. The ceremony celebrates the completion of a standardized process. The individuality, curiosity, and potential that each student brought to the institution has been processed into a uniform output.',
    consequence: 'Graduates enter the world as standardized products, not as the unique thinkers and makers the world needs.',
    success: 'Success means walking across the stage, receiving the diploma, and having your photo taken. The ceremony confirms you are done.',
    image: 'https://sfile.chatglm.cn/images-ppt/8883bca2004b.jpg',
    icon: Users,
    student: { role: 'The Student', perspective: 'We all look the same. Same cap, same gown, same diploma. Four years and I am one of hundreds. I do not feel special. I feel processed.' },
    tutor: { role: 'The Educator', perspective: 'I watch them walk across the stage and wonder how many I actually taught. Some I never met. The ceremony celebrates the institution, not the learner.' },
  },
  {
    num: '09', age: 'Age 22–25', phase: 'Early Career',
    title: 'The Cubicle',
    desc: 'The degree gets you the interview. The cubicle is the reward. The work often has nothing to do with what you studied.',
    detail: 'The degree gets the graduate an interview. The interview gets them a job. The job, more often than not, is a cubicle — a standardized workspace in a standardized organization doing standardized work. The specific knowledge acquired over four years is rarely used. What matters is that the graduate can survive a bureaucratic process.',
    consequence: 'Graduates spend their most energetic years in environments that do not use their talents, do not challenge them to grow, and do not connect their work to anything they care about.',
    success: "Success means a stable salary, benefits, and a career trajectory. The cubicle is not a failure — it is the system's intended outcome.",
    image: 'https://sfile.chatglm.cn/images-ppt/7a15e7d450af.jpg',
    icon: Lock,
    student: { role: 'The Student', perspective: 'I studied biology for four years. Now I enter data into spreadsheets. Nobody asks what I think. Nobody cares what I know.' },
    tutor: { role: 'The Educator', perspective: 'I hear from alumni. They are grateful for the degree but lost in the cubicle. I wonder if I prepared them for a career or for a cage.' },
  },
  {
    num: '10', age: 'Age 22–30', phase: 'The Debt',
    title: 'The Chain',
    desc: 'The average US graduate carries $37,000 in student debt. The degree that was supposed to be an investment becomes a chain.',
    detail: 'The financial consequence of the traditional path is debt. In the United States, the average graduate carries $37,000 in student loans; many carry $100,000 or more. This debt shapes every decision: the jobs they can afford to take, the risks they can afford to take, the businesses they can afford to start. The degree that was supposed to be an investment in freedom becomes a chain.',
    consequence: 'Debt strips graduates of the freedom to take risks, pursue purpose, or change direction. The system that promised upward mobility delivers indentured servitude.',
    success: 'Success means paying off the student loans — eventually. Financial freedom, not intellectual freedom, becomes the life goal.',
    image: 'https://sfile.chatglm.cn/images-ppt/42109eba11ca.jpg',
    icon: AlertTriangle,
    student: { role: 'The Student', perspective: 'I wanted to start a company. I wanted to work at a nonprofit. But I have $45,000 in loans. I took the corporate job. I had no choice.' },
    tutor: { role: 'The Educator', perspective: 'I tell my students to follow their dreams. Then I remember they will graduate with more debt than I earned in my first five years of teaching. I feel like a fraud.' },
  },
  {
    num: '11', age: 'Age 30–50', phase: 'Mid-Career Stagnation',
    title: 'The Plateau',
    desc: 'The skills that got you the job are obsolete. The system that trained you offers no path to re-learn.',
    detail: 'By mid-career, the skills acquired in university are obsolete. The technology has changed, the field has evolved. But the traditional system offers no path to re-learn. Continuing education is expensive, inconvenient, and disconnected from the workplace. The graduate is stuck with a 15-year-old education in a 40-year-old world.',
    consequence: 'Millions of professionals in their peak years are intellectually stagnant, trapped by a system that educated them once and then abandoned them.',
    success: 'Success means a promotion, a title, a corner office. The metrics of success are external, defined by the organization, not the individual.',
    image: 'https://sfile.chatglm.cn/images-ppt/a62337fe896d.png',
    icon: TrendingDown,
    student: { role: 'The Student', perspective: 'I have been doing the same work for 12 years. I am good at it. But I am bored. And the skills I learned in school are useless now. Nobody offers me a way to re-learn.' },
    tutor: { role: 'The Educator', perspective: 'Alumni come back and ask about continuing education. We have a program. It costs $15,000 and takes two years. They cannot afford the time or the money. I have nothing to offer them.' },
  },
  {
    num: '12', age: 'Age 65+', phase: 'Retirement',
    title: 'The Exit',
    desc: 'After 40 years in the system, retirement is the exit. Learning is over. Contribution is over. The mind is left to atrophy.',
    detail: 'Retirement is the final stage of the traditional path. After 40 years of work, the graduate exits the workforce. In the traditional model, this is the end of learning and contribution. The skills are obsolete, the network is retired, and the mind is left to atrophy. The wisdom accumulated over a lifetime has no outlet.',
    consequence: 'Society loses the wisdom, mentorship, and ongoing contribution of its elders — the very people best positioned to provide perspective and intergenerational knowledge transfer.',
    success: 'Success means a pension and a comfortable retirement. Learning is over; the goal is to rest after 40 years of the system.',
    image: 'https://sfile.chatglm.cn/images-ppt/2547658d53eb.jpg',
    icon: X,
    student: { role: 'The Student', perspective: 'I retired last year. I have wisdom, experience, things to teach. But nobody asks. Society says I am done. I am not done.' },
    tutor: { role: 'The Educator', perspective: 'The best teachers are the elders who have lived it. But the system retires them at 65 and replaces them with me — someone who has read about it but not lived it. We waste our greatest resource.' },
  },
];

// ═══════════════════════════════════════════════════════════
// ARTEMIS STEPS
// ═══════════════════════════════════════════════════════════
const ARTEMIS_STEPS: StepData[] = [
  {
    num: '01', age: 'Lifelong', phase: 'Open-Loop Learning',
    title: 'The Infinite Continuum',
    desc: 'Learning begins at birth and never ends. There is no "first day of school" — only the continuation of a natural process.',
    detail: 'Artemis rejects the idea that learning has a start date and an end date. The Infinite Learning Continuum treats learning as a lifelong process that begins at birth and continues until death. A 7-year-old, a 17-year-old, a 37-year-old, and a 70-year-old are all learners, all in different stages of the same journey, all able to learn from and teach each other.',
    consequence: 'No one is "too young" or "too old" to learn. The intergenerational exchange enriches everyone.',
    success: 'Success means the child retains their curiosity, asks questions fearlessly, and sees themselves as a lifelong learner — not as a test score.',
    image: 'https://sfile.chatglm.cn/images-ppt/e7445750dbd4.jpg',
    icon: InfinityIcon,
    student: { role: 'The Student', perspective: 'My grandmother is in my learning circle. She teaches me history. I teach her technology. We are both learners. Nobody is done.' },
    tutor: { role: 'The Educator', perspective: 'I teach a circle that includes a 19-year-old and a 68-year-old. The 19-year-old brings energy; the 68-year-old brings wisdom. I facilitate both. This is what teaching should be.' },
  },
  {
    num: '02', age: 'All Ages', phase: 'Adaptive Paced Learning',
    title: 'Your Rhythm, Not the Clock',
    desc: 'Students progress when they master the material, not when the semester ends. No one is "behind" or "ahead."',
    detail: 'Adaptive Paced Learning replaces the factory-model clock. Students do not progress through material at a uniform pace determined by the academic calendar. They progress when they have demonstrated mastery of the current material. A student who masters algebra in three months moves on. A student who needs six months gets six months. No one is "behind" because there is no behind.',
    consequence: 'No student is left behind by the clock, and no student is held back by it. Mastery, not time, is the metric.',
    success: 'Success means the student has genuinely mastered the material at their own pace, with deep understanding rather than superficial memorization.',
    image: 'https://sfile.chatglm.cn/images-ppt/d5c47a826274.jpg',
    icon: Clock,
    student: { role: 'The Student', perspective: 'I struggled with calculus. In the old system, I would have failed. Here, I got three extra months. Now I understand it deeply. Nobody rushed me. Nobody shamed me.' },
    tutor: { role: 'The Educator', perspective: 'I do not teach to a calendar. I teach to mastery. When a student gets it, we move on. When they do not, we stay. I have never seen students learn this deeply.' },
  },
  {
    num: '03', age: 'Age 17+', phase: 'Purpose Learning',
    title: 'Declare a Mission, Not a Major',
    desc: 'Students do not choose a major. They declare a mission — a real-world problem they commit to advancing.',
    detail: 'Purpose Learning replaces the major with the mission. A student does not declare "Computer Science." They declare: "To make clean water accessible across the Sahel." The mission, not a departmental curriculum, shapes the student\'s course selection, capstone project, and Center of Inquiry affiliation. The education serves the mission.',
    consequence: 'Graduates know what they are working toward and why. The education is not a credential but a toolkit for purpose.',
    success: 'Success means the student has found a mission that ignites their passion — and built a curriculum that serves it, not the other way around.',
    image: 'https://sfile.chatglm.cn/images-ppt/74b9fa64a49f.jpg',
    icon: Target,
    student: { role: 'The Student', perspective: 'I do not have a major. I have a mission: to build AI systems that serve underserved communities. Every course I take serves that mission. I have never been more motivated.' },
    tutor: { role: 'The Educator', perspective: 'Students ask me what courses to take. I ask them what problem they want to solve. The answer shapes everything. This is education with direction.' },
  },
  {
    num: '04', age: 'Year 1–2', phase: 'Four-Pillar Foundation',
    title: 'Epistemology, Computation, Systems, Expression',
    desc: 'Every Artemis graduate completes a four-pillar foundation: how to know, how to compute, how to see systems, how to make.',
    detail: 'The four-pillar curriculum provides the shared intellectual substrate. Epistemology: how we know what we know. Computational Thinking: the algorithmic decomposition of problems. Global Systems: the interlocking systems of the planetary century. Creative Expression: making as knowing. Every graduate can reason across these four dimensions.',
    consequence: 'Graduates can think across disciplines. They have the tools to approach any problem, in any field, with any team.',
    success: 'Success means the student can reason epistemologically, computationally, systemically, and creatively — the foundation for any future inquiry.',
    image: 'https://sfile.chatglm.cn/images-ppt/bcba72be5b41.png',
    icon: BookOpen,
    student: { role: 'The Student', perspective: 'I came here to study engineering. Now I am also studying philosophy, climate systems, and design. I did not expect to love all four. I do. They connect.' },
    tutor: { role: 'The Educator', perspective: 'I teach epistemology to engineering students. At first they resist. Then they realize that understanding how we know changes how they engineer. The pillars are not separate — they are one foundation.' },
  },
  {
    num: '05', age: 'Weekly', phase: 'The Tutorial System',
    title: 'Three Students, One Faculty Member',
    desc: 'Weekly 75-minute tutorials in groups of three. Socratic inquiry, not passive lecture. Every student accountable every week.',
    detail: 'The tutorial is the core of the Artemis pedagogy. Every student meets weekly in a tutorial of three students and one faculty member — a 75-minute deep discussion. The tutorial is not a mini-lecture; it is a Socratic interrogation. The 3:1 ratio means no one can hide. Every student is accountable every week.',
    consequence: 'Students learn to think on their feet, articulate their reasoning, and defend their ideas — the skills that matter in the real world.',
    success: 'Success means the student can articulate, defend, and refine their ideas in real-time — the skill that defines leadership in every field.',
    image: 'https://sfile.chatglm.cn/images-ppt/f41d2efe3144.jpg',
    icon: Users,
    student: { role: 'The Student', perspective: 'Three of us, one professor, 75 minutes. She asks me a question. I have to answer. I cannot hide. It is terrifying. It is the best learning I have ever had.' },
    tutor: { role: 'The Educator', perspective: 'I know every student by name. I know what they understand and what they do not. I can push each one individually. This is why I became a teacher.' },
  },
  {
    num: '06', age: '24/7', phase: 'The AI Tutor',
    title: 'Socratic Guidance, Anytime',
    desc: 'Every course is paired with an AI tutor that asks questions, never gives answers. Available at 2am when you are stuck.',
    detail: 'Every Artemis course is paired with an AI assistant — a large language model fine-tuned on the Center of Inquiry\'s domain knowledge and the Socratic method. The AI tutor is available 24/7, not to deliver answers but to ask questions. When a student is stuck at 2am, the AI asks: "What have you tried?" "What assumption are you making?" It is calibrated to the student\'s competency level.',
    consequence: 'Every student has a personal tutor that never sleeps, never tires, and never judges — but always pushes them to think harder.',
    success: 'Success means the student is never stuck, never alone with a problem — the AI tutor ensures thinking never stops, even at 2am.',
    image: 'https://sfile.chatglm.cn/images-ppt/6e9ff026f6c0.jpg',
    icon: Brain,
    student: { role: 'The Student', perspective: 'I was stuck on a problem at 2am. The AI tutor did not give me the answer. It asked me three questions. By the third question, I had figured it out myself. That felt amazing.' },
    tutor: { role: 'The Educator', perspective: 'The AI handles the repetitive clarification so I can focus on the deep Socratic work in tutorials. It is not replacing me — it is freeing me to do what only I can do.' },
  },
  {
    num: '07', age: '4 Years', phase: 'Six-City Rotation',
    title: 'Six Cities, Four Continents',
    desc: 'Undergraduate students rotate through six hostel cities — Valletta, Berlin, Nairobi, Singapore, São Paulo, Vancouver.',
    detail: 'The Darwin Voyage is the physical expression of the planetary mandate. Undergraduate students rotate through six cities over four years — Valletta, Berlin, Nairobi, Singapore, São Paulo, Vancouver — spending two semesters in each. Each city hosts a residential college with full academic facilities, and the curriculum is synchronised so the student continues their course sequence seamlessly.',
    consequence: 'Graduates have lived in six countries, speak multiple languages, and understand the world from multiple cultural perspectives — not from a textbook.',
    success: 'Success means the student has lived in six countries, speaks multiple languages, and understands the world not from a book but from experience.',
    image: 'https://sfile.chatglm.cn/images-ppt/ccd09531d741.jpg',
    icon: Globe,
    student: { role: 'The Student', perspective: 'I lived in Nairobi for a year. I worked with a local water utility on distribution modeling. I learned more about global systems in that year than in any classroom.' },
    tutor: { role: 'The Educator', perspective: 'I teach in Berlin this semester, Nairobi next. The students who arrive from São Paulo bring perspectives my Berlin students have never heard. The rotation is the curriculum.' },
  },
  {
    num: '08', age: 'All Years', phase: 'Centers of Inquiry',
    title: 'No Departments, Only Problems',
    desc: '19 interdisciplinary Centers replace departments. Faculty are appointed to Centers, not silos. Research flows across boundaries.',
    detail: 'The 19 Centers of Inquiry replace traditional academic departments. Each Center is an interdisciplinary hub organised around a problem domain: Synthetic Intelligence, Bio-Regenerative Arts, Cosmological Humanities, Urban Futures, and more. Faculty are appointed to Centers, not departments. Students affiliate with the Center whose research agenda most aligns with their mission.',
    consequence: 'Research and teaching are organized around the world\'s problems, not around 19th-century disciplinary boundaries.',
    success: 'Success means the student has contributed to real research at the frontier of human knowledge — not merely studied what others have done.',
    image: 'https://sfile.chatglm.cn/images-ppt/c54aa4b2c65e.jpg',
    icon: FlaskConical,
    student: { role: 'The Student', perspective: 'My Center combines biology, architecture, and materials science. We are developing self-healing concrete. No department could do this. The Center makes it possible.' },
    tutor: { role: 'The Educator', perspective: 'I am a biologist working alongside architects and artists. In my old department, I never met them. Here, we share a lab, share students, share problems. The boundaries are gone.' },
  },
  {
    num: '09', age: 'All Years', phase: 'Competency-Based Grading',
    title: 'Mastery, Not Ranking',
    desc: 'No GPA. No class rank. No curve. Students are assessed against mastery standards — "mastery," "proficiency," or "in progress."',
    detail: 'SkillPrints replaces the GPA with competency-based assessment. Students are not ranked against each other; they are assessed against published mastery standards. A student demonstrates mastery of a competency through coursework, projects, and oral examinations, and receives a designation of "mastery," "proficiency," or "in progress." The transcript describes what the student can actually do, not how they ranked.',
    consequence: 'Collaboration replaces competition. Students help each other because helping does not lower your grade. The transcript is a skill portfolio, not a ranking.',
    success: 'Success means the student has a portfolio of demonstrated competencies — what they can do, not how they ranked.',
    image: 'https://sfile.chatglm.cn/images-ppt/14bd7911f75e.png',
    icon: CheckCircle2,
    student: { role: 'The Student', perspective: 'I help my classmates because it does not hurt me. My transcript says what I can do, not how I ranked. I have never been more collaborative or more honest.' },
    tutor: { role: 'The Educator', perspective: 'I assess what students can do, not how they compare. A mastery designation means the same thing in 2026 and 2050. The standard is absolute. I can finally be honest about what a student has learned.' },
  },
  {
    num: '10', age: 'Final Year', phase: 'The Capstone',
    title: 'Advance Your Mission',
    desc: 'Every student completes a capstone that advances their declared mission. Evaluated on epistemic contribution and civic impact.',
    detail: 'The capstone is the culmination of the Artemis education. Every student completes a capstone project in their final year, and the capstone must advance the student\'s declared mission. This is not a thesis — it is a contribution. A water-access student might design and prototype a low-cost filtration system deployed in a Sahel community. The capstone is evaluated on a dual criterion: epistemic contribution and civic impact.',
    consequence: 'Graduates leave with a portfolio of real work, not just a transcript. They have already made a contribution before they graduate.',
    success: 'Success means the student has advanced their mission — made a real contribution to a real problem before they even graduate.',
    image: 'https://sfile.chatglm.cn/images-ppt/313d3da6e819.jpg',
    icon: Rocket,
    student: { role: 'The Student', perspective: 'My capstone is a water filtration prototype deployed in three Sahel communities. Real people are using it. This is not a paper. This is impact.' },
    tutor: { role: 'The Educator', perspective: 'I do not grade capstones. I evaluate them the way I evaluate research: did it advance knowledge? Did it help people? This is the standard the institution holds itself to. We hold students to the same.' },
  },
  {
    num: '11', age: 'Post-Graduation', phase: 'The Forge & Innovation',
    title: 'From Breakthrough to Venture',
    desc: 'The Forge incubator spins research into ventures within 12 months. 5% equity flows to the endowment. Graduates can build.',
    detail: 'The Forge is Artemis\'s translational engine. It takes breakthroughs from the Centers of Inquiry and spins them into independent ventures within 12 months. ClimatIQ from Urban Futures. NeuroBridge from Synthetic Intelligence. BioWeave from Bio-Regenerative Arts. Each venture addresses a real-world problem and carries 5% equity for the Artemis endowment. Graduates are not just prepared to join existing organizations — they are prepared to build new ones.',
    consequence: 'Graduates can build ventures, not just join them. The institution supports their ambitions with capital, mentorship, and infrastructure.',
    success: 'Success means the graduate can build, not just join — with the capital, mentorship, and infrastructure to launch ventures that matter.',
    image: 'https://sfile.chatglm.cn/images-ppt/77ee5cfc9f08.jpg',
    icon: Zap,
    student: { role: 'The Student', perspective: 'I graduated, and instead of sending resumes, I pitched my venture to the Forge. They funded it. I am building my company. The institution did not just educate me — it invested in me.' },
    tutor: { role: 'The Educator', perspective: 'My best student did not get a job. She built one. The Forge backed her. I am on her advisory board. This is what education should produce: builders, not just employees.' },
  },
  {
    num: '12', age: 'For Life', phase: 'The Lifelong Continuum',
    title: 'Learning Never Stops',
    desc: 'Graduation is not the end. Alumni continue learning, teaching, and contributing through the Artemis network for life.',
    detail: 'Because learning is an infinite continuum, graduation is not the end of the journey — it is a milestone. Artemis alumni continue to have access to the institution\'s courses, Centers, and Knowledge Core for life. They can return for a semester, audit a course, mentor a student, or contribute to a Center\'s research. The 70-year-old alumnus and the 20-year-old student are both learners, both in different stages of the same continuum.',
    consequence: 'The institution supports its learners for life, not for four years. The wisdom of elders flows back to the young, and the energy of the young flows to the elders.',
    success: 'Success means the graduate continues to learn, teach, and contribute for life — the continuum never ends, and neither does the impact.',
    image: 'https://sfile.chatglm.cn/images-ppt/09ad7b45d48d.jpg',
    icon: Heart,
    student: { role: 'The Student', perspective: 'I graduated five years ago. I still take courses. I mentor three students. I am learning more now than I did in school. The continuum is real.' },
    tutor: { role: 'The Educator', perspective: 'My alumni come back — to learn, to teach, to mentor. The institution is not a place they left. It is a community they belong to. For life. This is what I always hoped education could be.' },
  },
];

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function JourneyPage({ goTo }: { goTo: (page: string) => void }) {
  const [activeTale, setActiveTale] = useState<'intro' | 'traditional' | 'bigger' | 'artemis'>('intro');

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {activeTale === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Intro onChoose={setActiveTale} />
          </motion.div>
        )}
        {activeTale === 'traditional' && (
          <motion.div key="traditional" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollJourney
              title="The Traditional Way"
              subtitle="A system designed for the industrial age — still running on a factory clock"
              steps={TRADITIONAL_STEPS}
              theme="dark"
              onContinue={() => setActiveTale('bigger')}
              continueLabel="See the bigger picture"
              actLabel="Act I"
            />
          </motion.div>
        )}
        {activeTale === 'bigger' && (
          <motion.div key="bigger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BiggerPicture onContinue={() => setActiveTale('artemis')} />
          </motion.div>
        )}
        {activeTale === 'artemis' && (
          <motion.div key="artemis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollJourney
              title="The Artemis Way"
              subtitle="A system designed for the planetary century — for the learner, for humanity"
              steps={ARTEMIS_STEPS}
              theme="light"
              onContinue={() => setActiveTale('intro')}
              continueLabel="Return to the beginning"
              actLabel="Act II"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// INTRO
// ═══════════════════════════════════════════════════════════
function Intro({ onChoose }: { onChoose: (t: 'intro' | 'traditional' | 'bigger' | 'artemis') => void }) {
  const [hovered, setHovered] = useState<'traditional' | 'artemis' | null>(null);

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] bg-[#0c0a09] text-white overflow-hidden flex flex-col">
      {/* Top: title section */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16 pb-8 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-[1px] bg-[#8A0000]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#ff6b6b]">A Tale of Two Ways</span>
          <span className="w-8 h-[1px] bg-[#8A0000]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[36px] sm:text-[52px] md:text-[68px] font-black leading-[0.9] tracking-tighter text-center mb-5"
        >
          The Learner's Journey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[15px] sm:text-[17px] text-white/45 max-w-xl text-center leading-relaxed font-light"
        >
          Two paths. One walked for 200 years. One being built now. Choose a way to follow.
        </motion.p>
      </div>

      {/* Bottom: two large clickable cards side by side */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 max-h-[55vh]">
        {/* Traditional */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => onChoose('traditional')}
          onMouseEnter={() => setHovered('traditional')}
          onMouseLeave={() => setHovered(null)}
          className="group relative bg-[#1a1a1a] overflow-hidden cursor-pointer flex flex-col justify-between p-8 lg:p-10 text-left transition-all duration-500"
        >
          {/* Hover glow */}
          <div className={`absolute inset-0 bg-gradient-to-br from-gray-700/20 to-transparent transition-opacity duration-500 ${hovered === 'traditional' ? 'opacity-100' : 'opacity-0'}`} />

          {/* Top content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                <Lock size={18} className="text-gray-400" />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500">Act I</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">12 Steps</div>
              </div>
            </div>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] font-black tracking-tight leading-[1.0] text-gray-200 mb-3">
              The Traditional Way
            </h2>
            <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed max-w-md">
              A system designed for the industrial age. Still running on a factory clock. Follow the loopholes, the consequences, and the human cost — from age 5 to retirement.
            </p>
          </div>

          {/* Bottom: enter prompt */}
          <div className="relative z-10 flex items-center gap-2 mt-6">
            <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${hovered === 'traditional' ? 'text-white' : 'text-gray-500'}`}>
              Enter the Old Way
            </span>
            <ArrowRight size={14} className={`text-gray-500 transition-all ${hovered === 'traditional' ? 'translate-x-1 text-white' : ''}`} />
          </div>

          {/* Number watermark */}
          <div className="absolute -bottom-8 -right-4 text-[120px] font-black text-white/[0.03] leading-none pointer-events-none select-none">
            01
          </div>
        </motion.button>

        {/* Artemis */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => onChoose('artemis')}
          onMouseEnter={() => setHovered('artemis')}
          onMouseLeave={() => setHovered(null)}
          className="group relative bg-[#8A0000] overflow-hidden cursor-pointer flex flex-col justify-between p-8 lg:p-10 text-left transition-all duration-500"
        >
          {/* Hover glow */}
          <div className={`absolute inset-0 bg-gradient-to-br from-[#ff3333]/20 to-transparent transition-opacity duration-500 ${hovered === 'artemis' ? 'opacity-100' : 'opacity-0'}`} />
          <div className="absolute -top-1/4 -right-1/4 w-[30vw] h-[30vw] rounded-full bg-white/5 blur-[60px] pointer-events-none" />

          {/* Top content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 border border-white/20">
                <Sparkles size={18} className="text-white/80" />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">Act II</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">12 Steps</div>
              </div>
            </div>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] font-black tracking-tight leading-[1.0] text-white mb-3">
              The Artemis Way
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed max-w-md">
              A system designed for the planetary century. For the learner, for humanity. Follow the new way — missions, tutorials, rotation, Centers, and lifelong learning.
            </p>
          </div>

          {/* Bottom: enter prompt */}
          <div className="relative z-10 flex items-center gap-2 mt-6">
            <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${hovered === 'artemis' ? 'text-white' : 'text-white/70'}`}>
              Enter the New Way
            </span>
            <ArrowRight size={14} className={`text-white/70 transition-all ${hovered === 'artemis' ? 'translate-x-1 text-white' : ''}`} />
          </div>

          {/* Number watermark */}
          <div className="absolute -bottom-8 -right-4 text-[120px] font-black text-white/[0.05] leading-none pointer-events-none select-none">
            02
          </div>
        </motion.button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCROLL JOURNEY — full-screen step-by-step scroll
// ═══════════════════════════════════════════════════════════
function ScrollJourney({
  title, subtitle, steps, theme, onContinue, continueLabel, actLabel,
}: {
  title: string; subtitle: string; steps: StepData[]; theme: 'dark' | 'light';
  onContinue: () => void; continueLabel: string; actLabel: string;
}) {
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[#0c0a09]' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-[#141414]';
  const accent = '#8A0000';
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`${bg} ${text}`}>
      {/* Act Header — full screen */}
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>{actLabel}</span>
          <span className="flex-1 h-[1px] opacity-20" style={{ background: accent }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">{steps.length} steps</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-[36px] sm:text-[48px] md:text-[64px] font-black leading-[0.95] tracking-tighter mb-4">
          {title}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-[16px] sm:text-[18px] opacity-50 max-w-2xl leading-relaxed font-light mb-12">
          {subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex items-center gap-2 opacity-40">
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll to begin</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>

      {/* Steps — each is a full-screen section */}
      {steps.map((step, i) => (
        <FullScreenStep key={i} step={step} index={i} isDark={isDark} accent={accent} total={steps.length} />
      ))}

      {/* Continue */}
      <div className="min-h-[60vh] flex items-center justify-center max-w-[1400px] mx-auto px-6 lg:px-12">
        <button onClick={onContinue} className="group inline-flex items-center gap-3 px-10 py-5 rounded-full text-[14px] font-bold uppercase tracking-[0.2em] transition-all bg-[#8A0000] hover:bg-[#6B0000] text-white shadow-xl shadow-[#8A0000]/30">
          {continueLabel} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FULL SCREEN STEP — each scroll reveals a new step
// ═══════════════════════════════════════════════════════════
function FullScreenStep({ step, index, isDark, accent, total }: { step: StepData; index: number; isDark: boolean; accent: string; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); } }, { rootMargin: '-20% 0px -20% 0px', threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative min-h-[100vh] flex items-center py-20 ${isEven ? '' : ''} ${isDark ? 'border-t border-white/5' : 'border-t border-gray-100'}`}>
      {/* Progress dots on the right */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? 'scale-150' : ''}`} style={{ background: i === index ? accent : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: isEven ? -30 : 30 }}
            animate={visible ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`relative ${isEven ? '' : 'lg:order-2'}`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src={step.image} alt={step.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Step number overlay */}
              <div className="absolute top-5 left-5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white text-[18px] font-black border border-white/20">
                  {step.num}
                </div>
                <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{step.phase}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={isEven ? '' : 'lg:order-1'}
          >
            {/* Age + icon */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${accent}15` }}>
                <Icon size={20} style={{ color: accent }} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{step.age}</div>
                <div className="text-[12px] font-bold" style={{ color: accent }}>{step.phase}</div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[28px] sm:text-[36px] font-black tracking-tight leading-[1.05] mb-4">{step.title}</h3>

            {/* Description */}
            <p className="text-[16px] sm:text-[17px] leading-relaxed mb-4 opacity-70">{step.desc}</p>

            {/* Detail */}
            <p className="text-[14px] leading-[1.75] opacity-50 mb-6">{step.detail}</p>

            {/* Consequence / Benefit */}
            <div className="p-5 rounded-xl border-l-4 mb-4" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderColor: accent }}>
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: accent }}>{index < 12 ? 'Consequence' : 'Benefit'}</div>
                  <p className="text-[13px] leading-relaxed opacity-70">{step.consequence}</p>
                </div>
              </div>
            </div>

            {/* What Success Means */}
            <div className="p-5 rounded-xl border-l-4 mb-4" style={{ background: 'rgba(212,168,83,0.08)', borderColor: '#D4A853' }}>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[#D4A853]" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 text-[#D4A853]">What Success Means Here</div>
                  <p className="text-[13px] leading-relaxed opacity-70">{step.success}</p>
                </div>
              </div>
            </div>

            {/* Persona perspectives */}
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${accent}15` }}>
                    <User size={14} style={{ color: accent }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>{step.student.role}</span>
                </div>
                <p className="text-[12px] leading-relaxed opacity-60 italic">"{step.student.perspective}"</p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${accent}15` }}>
                    <Briefcase size={14} style={{ color: accent }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>{step.tutor.role}</span>
                </div>
                <p className="text-[12px] leading-relaxed opacity-60 italic">"{step.tutor.perspective}"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BIGGER PICTURE
// ═══════════════════════════════════════════════════════════
function BiggerPicture({ onContinue }: { onContinue: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const stats = [
    { val: '$1.7T', label: 'US Student Debt', desc: 'A generation indentured to the system that was supposed to set them free.' },
    { val: '169%', label: 'Tuition Rise Since 1980', desc: 'Far outstripping wages. The cost of a degree has become a lifetime burden.' },
    { val: '36%', label: 'Public Confidence', desc: 'Down from 57% in 2015. The institution has lost the trust of the public.' },
    { val: '50%', label: 'Drop in Breakthroughs', desc: 'More papers, more researchers — but fewer paradigm-shifting ideas.' },
    { val: '84%', label: 'Excluded from Higher Ed', desc: '1.4 billion university-age people; only 220 million enrolled.' },
    { val: '800yr', label: 'Same Pedagogy', desc: 'The lecture model has not changed in 800 years. The world has.' },
  ];

  return (
    <div className="bg-[#0c0a09] text-white min-h-screen">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#8A0000]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6b6b]">The Bigger Picture</span>
          </div>
          <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-black leading-[0.95] tracking-tighter mb-6 max-w-3xl">
            It's not just one learner.<br />It's the whole species.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-white/50 max-w-2xl leading-relaxed font-light">
            The traditional system does not just fail individual learners. It fails humanity. The consequences scale from the personal to the planetary — and they compound across generations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }} className="p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors">
              <div className="text-[36px] sm:text-[44px] font-black text-[#ff6b6b] leading-none mb-3">{stat.val}</div>
              <div className="text-[12px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">{stat.label}</div>
              <p className="text-[13px] text-white/50 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="text-center max-w-3xl mx-auto py-12">
          <p className="text-[20px] sm:text-[24px] text-white/70 leading-relaxed mb-8 font-light italic">
            "The system was not designed to fail. It was designed for a different century. The question is not whether to fix it — the question is whether we can build something better before it's too late."
          </p>
          <button onClick={onContinue} className="group inline-flex items-center gap-3 px-10 py-5 bg-[#8A0000] hover:bg-[#6B0000] transition-all text-white text-[14px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl shadow-[#8A0000]/30">
            <Sparkles size={18} /> Enter the Artemis Way <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
