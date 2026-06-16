'use client';

import React, { useState } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface Props {
  goToPage: (page: string) => void;
}

/* ─── Step data ─── */
const applicationCycles = [
  { value: 'early-action', label: 'Early Action (Deadline: 1 Nov 2026)' },
  { value: 'regular-1', label: 'Regular Decision I (Deadline: 13 Jan 2027)' },
  { value: 'regular-2', label: 'Regular Decision II (Deadline: 24 Feb 2027)' },
  { value: 'extended', label: 'Extended Decision (Deadline: 7 Apr 2027 — No Aid)' },
];

const concentrationOptions = [
  { value: '', label: 'Select a concentration...' },
  { value: 'natural-sciences', label: 'Natural Sciences' },
  { value: 'computational-sciences', label: 'Computational Sciences' },
  { value: 'social-sciences', label: 'Social Sciences' },
  { value: 'arts-humanities', label: 'Arts & Humanities' },
  { value: 'engineering-technology', label: 'Engineering & Technology' },
  { value: 'health-medicine', label: 'Health & Medicine' },
  { value: 'business-governance', label: 'Business & Governance' },
  { value: 'education-development', label: 'Education & Human Development' },
  { value: 'undecided', label: 'Undecided / Interdisciplinary' },
];

const countryOptions = [
  '', 'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Egypt', 'Ethiopia', 'France', 'Germany', 'Ghana', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kenya', 'Korea, South', 'Lebanon', 'Malaysia', 'Mexico', 'Morocco', 'Nepal', 'Netherlands', 'Nigeria', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Singapore', 'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Venezuela', 'Vietnam', 'Zambia', 'Zimbabwe',
];

const howHeardOptions = [
  '', 'Web search', 'Social media', 'Friend or family', 'Teacher or counsellor', 'University fair or event', 'News article', 'Alumni recommendation', 'Partner organisation', 'Other',
];

const gradingScaleOptions = [
  '', '4.0 GPA Scale', '4.0 Weighted GPA', '5.0 GPA Scale', '10-point scale', '100-point scale', 'Percentage (0-100)', 'IB Points (24-45)', 'UK A-Levels (A*-E)', 'French Baccalaureate (0-20)', 'German Abitur (1-6)', 'Other international scale',
];

const stepLabels = [
  { short: 'Personal', full: 'Personal Information' },
  { short: 'Academic', full: 'Academic Record' },
  { short: 'Portfolio', full: 'Accomplishments & Statements' },
  { short: 'Review', full: 'Financial Aid & Submit' },
];

/* ─── Hexagon Step Component (Minerva-inspired) ─── */
function HexStep({ index, label, active, completed }: { index: number; label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <div
        className={`relative w-12 h-12 flex items-center justify-center transition-all duration-500 ${
          completed
            ? 'bg-[#8A0000] text-white'
            : active
            ? 'bg-[#8A0000] text-white shadow-lg shadow-[#8A0000]/30'
            : 'bg-[#F3F4F6] text-gray-400'
        }`}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        {completed ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <span className="text-[14px] font-bold">{index + 1}</span>
        )}
      </div>
      <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
        completed || active ? 'text-[#8A0000]' : 'text-gray-400'
      }`}>
        {label}
      </span>
    </div>
  );
}

export default function Apply({ goToPage }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Part 1: Personal
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [dualCitizenship, setDualCitizenship] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [howHeardOther, setHowHeardOther] = useState('');
  const [applicationCycle, setApplicationCycle] = useState('');
  const [concentration, setConcentration] = useState('');

  // Part 2: Academic
  const [currentlyEnrolled, setCurrentlyEnrolled] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolCountry, setSchoolCountry] = useState('');
  const [schoolCity, setSchoolCity] = useState('');
  const [enrollmentStart, setEnrollmentStart] = useState('');
  const [enrollmentEnd, setEnrollmentEnd] = useState('');
  const [gradingScale, setGradingScale] = useState('');
  const [gpa, setGpa] = useState('');
  const [maxGpa, setMaxGpa] = useState('');
  const [satMath, setSatMath] = useState('');
  const [satReading, setSatReading] = useState('');
  const [actScore, setActScore] = useState('');
  const [isTestOptional, setIsTestOptional] = useState(false);

  // Part 3: Accomplishments & Statement
  const [accomplishments, setAccomplishments] = useState<{ title: string; description: string; role: string; impact: string }[]>([
    { title: '', description: '', role: '', impact: '' },
  ]);
  const [personalStatement, setPersonalStatement] = useState('');
  const [missionStatement, setMissionStatement] = useState('');

  // Part 4: Financial Aid & Agreements
  const [applyingForAid, setApplyingForAid] = useState('');
  const [householdIncome, setHouseholdIncome] = useState('');
  const [dependents, setDependents] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeCertification, setAgreeCertification] = useState(false);

  const activeSection = useActiveSection(['application', 'deadlines', 'financial-aid']);

  const addAccomplishment = () => {
    if (accomplishments.length < 6) {
      setAccomplishments([...accomplishments, { title: '', description: '', role: '', impact: '' }]);
    }
  };

  const updateAccomplishment = (index: number, field: string, value: string) => {
    const updated = [...accomplishments];
    updated[index] = { ...updated[index], [field]: value };
    setAccomplishments(updated);
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          birthdate,
          gender,
          pronoun,
          citizenship,
          dualCitizenship,
          address,
          city,
          state,
          postalCode,
          country,
          howHeard,
          applicationCycle,
          concentration,
          currentlyEnrolled,
          schoolName,
          schoolCountry,
          schoolCity,
          enrollmentStart,
          enrollmentEnd,
          gradingScale,
          gpa,
          maxGpa,
          satMath,
          satReading,
          actScore,
          isTestOptional,
          accomplishments,
          personalStatement,
          missionStatement,
          applyingForAid,
          householdIncome,
          dependents,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Shared form styles — Minerva-inspired warm aesthetic
  const inputClass = "w-full border border-gray-300 bg-[#F9F8F6] px-4 py-3.5 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all rounded-sm";
  const labelClass = "block text-[11px] font-bold text-gray-900 uppercase tracking-[0.15em] mb-2";
  const selectClass = "w-full border border-gray-300 bg-[#F9F8F6] px-4 py-3.5 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A0000]/30 focus:border-[#8A0000] transition-all rounded-sm appearance-none";

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full h-[40vh] min-h-[320px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1630480330188-1818487a2426?auto=format&fit=crop&q=80&w=1800"
              alt="Apply to Artemis"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Join Artemis</span>
              </div>
              <h1 className="text-[48px] md:text-[56px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4">
                Application for<br />Admission
              </h1>
              <p className="text-[17px] text-white/70 max-w-xl leading-relaxed font-light">
                Join the next generation of scholars, innovators, and leaders at the University of Artemis.
                No application fee. Standardised tests are optional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview — Minerva-inspired 3-step visual */}
      <section className="bg-[#F9F8F6] border-b border-gray-200">
        <div className="max-w-[1000px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-10">
          <div className="grid grid-cols-3 gap-6">
            {[
              { step: '01', label: 'Start Your Application', desc: 'Complete your personal, academic, and portfolio information', active: true },
              { step: '02', label: 'Admissions Review', desc: 'Our committee reviews your full profile holistically', active: currentStep === 4 },
              { step: '03', label: 'Decision Released', desc: 'Receive your admissions decision within the cycle timeline', active: submitted },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-10 h-10 flex items-center justify-center shrink-0 text-[13px] font-bold transition-colors ${
                  item.active ? 'bg-[#8A0000] text-white' : 'bg-gray-200 text-gray-500'
                }`}
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  {item.active ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    item.step
                  )}
                </div>
                <div>
                  <div className={`text-[13px] font-bold transition-colors ${item.active ? 'text-[#8A0000]' : 'text-gray-400'}`}>
                    {item.label}
                  </div>
                  <div className="text-[12px] text-gray-500 leading-relaxed mt-0.5 hidden sm:block">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="application" className="max-w-[860px] mx-auto w-full px-6 lg:px-20 pt-12 pb-24 scroll-mt-[110px]">

        {submitted ? (
          /* ═══ SUCCESS STATE ═══ */
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center bg-[#8A0000]"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="text-[32px] font-extrabold text-[#141414] tracking-tight mb-4">Application Received</h2>
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-md mx-auto mb-4">
              Thank you for your interest in the University of Artemis. We will be in touch regarding your application status.
            </p>
            <p className="text-[13px] text-gray-500 mb-10">You will receive a confirmation email at the address you provided.</p>
            <button onClick={() => goToPage('home')} className="px-10 py-4 bg-[#8A0000] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors">
              Return Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-0">

            {/* ═══ HEXAGONAL STEP NAVIGATION ═══ */}
            <div className="flex items-center justify-between mb-12 px-4">
              {stepLabels.map((step, i) => (
                <React.Fragment key={i}>
                  <button
                    type="button"
                    onClick={() => { if (i + 1 < currentStep) setCurrentStep(i + 1); }}
                    className={`flex flex-col items-center gap-2 ${i + 1 < currentStep ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <HexStep
                      index={i}
                      label={step.short}
                      active={currentStep === i + 1}
                      completed={i + 1 < currentStep}
                    />
                  </button>
                  {i < stepLabels.length - 1 && (
                    <div className={`flex-1 h-[2px] mx-2 transition-colors duration-500 ${
                      i + 1 < currentStep ? 'bg-[#8A0000]' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step label */}
            <div className="mb-10">
              <div className="mb-4 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <h2 className="text-[28px] md:text-[34px] font-extrabold tracking-tighter text-[#141414] leading-tight">
                {stepLabels[currentStep - 1].full}
              </h2>
            </div>

            {/* ═══ PART 1: PERSONAL INFORMATION ═══ */}
            {currentStep === 1 && (
              <div id="deadlines" className="space-y-8 scroll-mt-[110px]">
                <div className="bg-[#F9F8F6] p-8 md:p-10 border border-gray-100">
                  {/* Application Cycle */}
                  <div className="mb-8">
                    <label className={labelClass}>Application Cycle *</label>
                    <select required value={applicationCycle} onChange={e => setApplicationCycle(e.target.value)} className={selectClass}>
                      <option value="">Select a cycle...</option>
                      {applicationCycles.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClass} placeholder="Legal first name" />
                    </div>
                    <div>
                      <label className={labelClass}>Last / Family Name *</label>
                      <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={inputClass} placeholder="Legal family name" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className={labelClass}>Confirm Email *</label>
                      <input required type="email" value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} className={`${inputClass} ${confirmEmail && confirmEmail !== email ? 'border-red-400 focus:ring-red-200' : ''}`} placeholder="Re-enter email" />
                      {confirmEmail && confirmEmail !== email && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">Email addresses do not match</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Birthdate */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="+country code number" />
                    </div>
                    <div>
                      <label className={labelClass}>Date of Birth *</label>
                      <input required type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  {/* Gender & Pronoun */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Gender *</label>
                      <select required value={gender} onChange={e => setGender(e.target.value)} className={selectClass}>
                        <option value="">Select...</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not">Prefer not to say</option>
                        <option value="self-describe">Self-describe</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Pronoun (optional)</label>
                      <input type="text" value={pronoun} onChange={e => setPronoun(e.target.value)} className={inputClass} placeholder="e.g., she/her, they/them" />
                    </div>
                  </div>

                  {/* Citizenship */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>Primary Citizenship *</label>
                      <select required value={citizenship} onChange={e => setCitizenship(e.target.value)} className={selectClass}>
                        <option value="">Select country...</option>
                        {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Secondary Citizenship</label>
                      <select value={dualCitizenship} onChange={e => setDualCitizenship(e.target.value)} className={selectClass}>
                        <option value="">None / Select...</option>
                        {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <div className="mb-6 flex items-center space-x-3">
                      <span className="w-6 h-[1px] bg-[#8A0000]"></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">Mailing Address</span>
                    </div>
                    <div className="mb-6">
                      <label className={labelClass}>Street Address *</label>
                      <input required type="text" value={address} onChange={e => setAddress(e.target.value)} className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                      <div className="col-span-1">
                        <label className={labelClass}>City *</label>
                        <input required type="text" value={city} onChange={e => setCity(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>State / Province</label>
                        <input type="text" value={state} onChange={e => setState(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Postal Code</label>
                        <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Country *</label>
                        <select required value={country} onChange={e => setCountry(e.target.value)} className={selectClass}>
                          <option value="">Select...</option>
                          {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Concentration */}
                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <div className="mb-6">
                      <label className={labelClass}>Intended Concentration *</label>
                      <select required value={concentration} onChange={e => setConcentration(e.target.value)} className={selectClass}>
                        {concentrationOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                      <p className="text-[11px] text-gray-500 mt-1">You may change your concentration after enrolment.</p>
                    </div>

                    <div className="mb-6">
                      <label className={labelClass}>How did you learn about Artemis? *</label>
                      <select required value={howHeard} onChange={e => setHowHeard(e.target.value)} className={selectClass}>
                        {howHeardOptions.map((o, i) => <option key={i} value={o}>{o || 'Select...'}</option>)}
                      </select>
                    </div>
                    {howHeard === 'Other' && (
                      <div className="mb-6">
                        <label className={labelClass}>Please specify</label>
                        <input type="text" value={howHeardOther} onChange={e => setHowHeardOther(e.target.value)} className={inputClass} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={() => setCurrentStep(2)} className="flex items-center gap-3 px-10 py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors">
                    Continue <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            )}

            {/* ═══ PART 2: ACADEMIC INFORMATION ═══ */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="bg-[#F9F8F6] p-8 md:p-10 border border-gray-100">
                  {/* Currently enrolled */}
                  <div className="mb-8">
                    <label className={labelClass}>Are you currently enrolled in secondary school? *</label>
                    <div className="flex gap-8 mt-2">
                      <label className="flex items-center gap-3 text-[15px] cursor-pointer">
                        <input type="radio" name="enrolled" value="yes" checked={currentlyEnrolled === 'yes'} onChange={e => setCurrentlyEnrolled(e.target.value)} className="w-4 h-4 accent-[#8A0000]" />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 text-[15px] cursor-pointer">
                        <input type="radio" name="enrolled" value="no" checked={currentlyEnrolled === 'no'} onChange={e => setCurrentlyEnrolled(e.target.value)} className="w-4 h-4 accent-[#8A0000]" />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* School info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>School Name *</label>
                      <input required type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>School Country *</label>
                      <select required value={schoolCountry} onChange={e => setSchoolCountry(e.target.value)} className={selectClass}>
                        <option value="">Select...</option>
                        {countryOptions.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
                    <div>
                      <label className={labelClass}>School City *</label>
                      <input required type="text" value={schoolCity} onChange={e => setSchoolCity(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Enrolment Start *</label>
                      <input required type="text" value={enrollmentStart} onChange={e => setEnrollmentStart(e.target.value)} className={inputClass} placeholder="e.g., Sep 2022" />
                    </div>
                    <div>
                      <label className={labelClass}>Enrolment End *</label>
                      <input required type="text" value={enrollmentEnd} onChange={e => setEnrollmentEnd(e.target.value)} className={inputClass} placeholder="e.g., Jun 2026" />
                    </div>
                  </div>

                  {/* Grading */}
                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <div className="mb-6 flex items-center space-x-3">
                      <span className="w-6 h-[1px] bg-[#8A0000]"></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">Academic Performance</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6">
                      <div>
                        <label className={labelClass}>Grading Scale *</label>
                        <select required value={gradingScale} onChange={e => setGradingScale(e.target.value)} className={selectClass}>
                          {gradingScaleOptions.map((o, i) => <option key={i} value={o}>{o || 'Select...'}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Your GPA / Score *</label>
                        <input required type="text" value={gpa} onChange={e => setGpa(e.target.value)} className={inputClass} placeholder="e.g., 3.85" />
                      </div>
                      <div>
                        <label className={labelClass}>Maximum Possible *</label>
                        <input required type="text" value={maxGpa} onChange={e => setMaxGpa(e.target.value)} className={inputClass} placeholder="e.g., 4.0" />
                      </div>
                    </div>
                  </div>

                  {/* Standardised tests */}
                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.15em]">Standardised Tests</div>
                        <p className="text-[12px] text-gray-500 mt-1">Artemis is test-optional. Self-report if you choose.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsTestOptional(!isTestOptional)}
                        className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 border transition-colors ${
                          isTestOptional ? 'border-[#8A0000] text-[#8A0000] bg-[#8A0000]/5' : 'border-gray-300 text-gray-500 hover:border-[#8A0000] hover:text-[#8A0000]'
                        }`}
                      >
                        {isTestOptional ? 'Hide Scores' : 'Report Scores'}
                      </button>
                    </div>
                    {isTestOptional && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                        <div>
                          <label className={labelClass}>SAT Math</label>
                          <input type="number" min="200" max="800" value={satMath} onChange={e => setSatMath(e.target.value)} className={inputClass} placeholder="200–800" />
                        </div>
                        <div>
                          <label className={labelClass}>SAT Reading/Writing</label>
                          <input type="number" min="200" max="800" value={satReading} onChange={e => setSatReading(e.target.value)} className={inputClass} placeholder="200–800" />
                        </div>
                        <div>
                          <label className={labelClass}>ACT Composite</label>
                          <input type="number" min="1" max="36" value={actScore} onChange={e => setActScore(e.target.value)} className={inputClass} placeholder="1–36" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(1)} className="px-8 py-4 border-2 border-gray-300 text-gray-600 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors">
                    &larr; Back
                  </button>
                  <button type="button" onClick={() => setCurrentStep(3)} className="flex items-center gap-3 px-10 py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors">
                    Continue <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            )}

            {/* ═══ PART 3: ACCOMPLISHMENTS & STATEMENTS ═══ */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="bg-[#F9F8F6] p-8 md:p-10 border border-gray-100">
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-8 max-w-xl">
                    Describe your most meaningful achievements. Artemis does not define what counts as an
                    accomplishment — you choose what matters most. Provide between 3 and 6 items.
                  </p>

                  {/* Accomplishments */}
                  {accomplishments.map((acc, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-6 md:p-8 mb-6 last:mb-0">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#8A0000]/10 text-[#8A0000] text-[12px] font-bold">
                          {i + 1}
                        </div>
                        <span className="text-[11px] font-bold text-[#8A0000] uppercase tracking-[0.2em]">
                          Accomplishment {i + 1}
                        </span>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          <div>
                            <label className={labelClass}>Title *</label>
                            <input required type="text" value={acc.title} onChange={e => updateAccomplishment(i, 'title', e.target.value)} className={inputClass} placeholder="e.g., Founded community coding initiative" />
                          </div>
                          <div>
                            <label className={labelClass}>Your Role *</label>
                            <input required type="text" value={acc.role} onChange={e => updateAccomplishment(i, 'role', e.target.value)} className={inputClass} placeholder="e.g., Founder and lead organiser" />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Description *</label>
                          <textarea required rows={3} value={acc.description} onChange={e => updateAccomplishment(i, 'description', e.target.value)} className={`${inputClass} resize-none`} placeholder="What inspired this, what you did, and what you learned..." />
                        </div>
                        <div>
                          <label className={labelClass}>Impact / Outcome</label>
                          <textarea rows={2} value={acc.impact} onChange={e => updateAccomplishment(i, 'impact', e.target.value)} className={`${inputClass} resize-none`} placeholder="Measurable results, recognition, or lasting change..." />
                        </div>
                      </div>
                    </div>
                  ))}

                  {accomplishments.length < 6 && (
                    <button type="button" onClick={addAccomplishment} className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors mt-6">
                      + Add Accomplishment ({accomplishments.length}/6)
                    </button>
                  )}

                  {/* Personal Statement */}
                  <div className="pt-8 border-t border-gray-200 mt-8">
                    <div className="bg-white border border-gray-200 p-6 md:p-8 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.15em]">Personal Statement *</label>
                        <span className={`text-[11px] font-medium ${personalStatement.split(/\s+/).filter(Boolean).length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                          {personalStatement.split(/\s+/).filter(Boolean).length} / 500 words
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-500 mb-4">Tell us about your aspirations, what drives you, and why Artemis is the right environment for your growth.</p>
                      <textarea required rows={8} value={personalStatement} onChange={e => setPersonalStatement(e.target.value)} className={`${inputClass} resize-none`} placeholder="Write your personal statement here..." />
                    </div>

                    {/* Mission Statement */}
                    <div className="bg-white border border-gray-200 p-6 md:p-8">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.15em]">Mission Statement *</label>
                        <span className={`text-[11px] font-medium ${missionStatement.split(/\s+/).filter(Boolean).length > 250 ? 'text-red-500' : 'text-gray-400'}`}>
                          {missionStatement.split(/\s+/).filter(Boolean).length} / 250 words
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-500 mb-4">At Artemis, students declare missions, not majors. What global challenge or question do you want to dedicate your studies to?</p>
                      <textarea required rows={5} value={missionStatement} onChange={e => setMissionStatement(e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the mission you want to pursue..." />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(2)} className="px-8 py-4 border-2 border-gray-300 text-gray-600 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors">
                    &larr; Back
                  </button>
                  <button type="button" onClick={() => setCurrentStep(4)} className="flex items-center gap-3 px-10 py-4 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors">
                    Continue <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            )}

            {/* ═══ PART 4: FINANCIAL AID & AGREEMENTS ═══ */}
            {currentStep === 4 && (
              <div id="financial-aid" className="space-y-8 scroll-mt-[110px]">
                <div className="bg-[#F9F8F6] p-8 md:p-10 border border-gray-100">
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-8 max-w-xl">
                    Artemis is need-aware: financial need is taken into consideration when making final
                    admissions recommendations. Applying early maximises your aid prospects. All aid is
                    funded through private philanthropy, ensuring equitable access regardless of nationality.
                  </p>

                  {/* Applying for aid */}
                  <div className="mb-8">
                    <label className={labelClass}>Are you applying for financial aid? *</label>
                    <div className="flex gap-8 mt-2">
                      <label className="flex items-center gap-3 text-[15px] cursor-pointer">
                        <input type="radio" name="aid" value="yes" checked={applyingForAid === 'yes'} onChange={e => setApplyingForAid(e.target.value)} className="w-4 h-4 accent-[#8A0000]" />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 text-[15px] cursor-pointer">
                        <input type="radio" name="aid" value="no" checked={applyingForAid === 'no'} onChange={e => setApplyingForAid(e.target.value)} className="w-4 h-4 accent-[#8A0000]" />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {applyingForAid === 'yes' && (
                    <div className="bg-white border border-gray-200 p-6 md:p-8 mb-8">
                      <div className="mb-6 flex items-center space-x-3">
                        <span className="w-6 h-[1px] bg-[#8A0000]"></span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">Aid Details</span>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
                        <div>
                          <label className={labelClass}>Estimated Household Income (USD equivalent)</label>
                          <select value={householdIncome} onChange={e => setHouseholdIncome(e.target.value)} className={selectClass}>
                            <option value="">Select range...</option>
                            <option value="under-25k">Under $25,000</option>
                            <option value="25k-50k">$25,000 - $49,999</option>
                            <option value="50k-75k">$50,000 - $74,999</option>
                            <option value="75k-100k">$75,000 - $99,999</option>
                            <option value="100k-150k">$100,000 - $149,999</option>
                            <option value="150k-200k">$150,000 - $199,999</option>
                            <option value="200k-plus">$200,000+</option>
                            <option value="prefer-not">Prefer not to say</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Number of Dependents in Household</label>
                          <input type="number" min="0" value={dependents} onChange={e => setDependents(e.target.value)} className={inputClass} placeholder="e.g., 4" />
                        </div>
                      </div>
                      <div className="bg-[#F9F8F6] border border-gray-200 p-5 text-[13px] text-gray-600 leading-relaxed">
                        <strong className="text-[#141414]">Next steps for aid applicants:</strong> After submitting your application, you will receive access to the Artemis Financial Aid Centre, where you will complete a detailed financial questionnaire and upload supporting documents (income statements, bank statements, tax returns or local equivalents). The aid deadline is one week after the application deadline for your chosen cycle.
                      </div>
                    </div>
                  )}

                  {/* Agreements */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="mb-6 flex items-center space-x-3">
                      <span className="w-6 h-[1px] bg-[#8A0000]"></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A0000]">Agreements</span>
                    </div>
                    <div className="space-y-6">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input type="checkbox" required checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="w-4 h-4 accent-[#8A0000] mt-1 shrink-0" />
                        <span className="text-[14px] text-gray-700 leading-relaxed group-hover:text-[#141414] transition-colors">
                          I agree to the <strong>Terms of Use</strong> and <strong>Privacy Policy</strong> of the University of Artemis. I certify that all information provided in this application is true and complete to the best of my knowledge. *
                        </span>
                      </label>
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input type="checkbox" required checked={agreeCertification} onChange={e => setAgreeCertification(e.target.checked)} className="w-4 h-4 accent-[#8A0000] mt-1 shrink-0" />
                        <span className="text-[14px] text-gray-700 leading-relaxed group-hover:text-[#141414] transition-colors">
                          I understand that I may apply in only one admissions cycle per academic year, and that if denied, I may not reapply in a subsequent cycle. I certify that I have not previously been admitted to and declined an offer from the University of Artemis. *
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 text-[14px] font-medium">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(3)} className="px-8 py-4 border-2 border-gray-300 text-gray-600 text-[12px] font-bold uppercase tracking-widest hover:border-[#8A0000] hover:text-[#8A0000] transition-colors">
                    &larr; Back
                  </button>
                  <button type="submit" disabled={submitting} className="flex items-center gap-3 px-12 py-4 bg-[#8A0000] text-white text-[14px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors shadow-lg shadow-[#8A0000]/20 disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Submitting...' : 'Submit Application'} {!submitting && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
