import React, { useState } from 'react';
import SubPageFooter from '@/components/artemis/SubPageFooter';

interface Props {
  goToPage: (page: string) => void;
}

export default function Dashboard({ goToPage }: Props) {
  // Simulate application progress
  const [appStatus, setAppStatus] = useState('in_progress'); // can be 'none', 'in_progress', 'submitted', 'admitted'

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F6]">
      {/* Dashboard Header */}
      <section className="bg-white border-b border-gray-200 pt-32 pb-12 px-6 lg:px-20 mt-14">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-[32px] md:text-[40px] font-extrabold tracking-tighter text-[#141414] mb-2">
            Applicant Portal
          </h1>
          <p className="text-[15px] text-gray-500 font-light">Welcome back, Scholar.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 max-w-[1200px] mx-auto w-full px-6 lg:px-20 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Alerts & Progress */}
        <div className="flex-1 space-y-8">
          <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
              Application Status
            </h2>
            
            {appStatus === 'in_progress' ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-bold text-gray-900">Artemis College Undergraduate Admission</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A0000] bg-[#8A0000]/10 px-3 py-1">In Progress</span>
                </div>
                <p className="text-[13px] text-gray-600 mb-6">You have completed 2 of 4 sections. The Regular Decision I deadline is 13 Jan 2027.</p>
                
                {/* Progress Bar */}
                <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
                  <div className="absolute top-0 left-0 h-full bg-[#8A0000] w-[50%] transition-all duration-1000"></div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-8">
                  <div className="flex flex-col items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-[#8A0000] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                     <span className="text-[9px] font-bold uppercase text-center text-gray-900">Personal</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-[#8A0000] text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                     <span className="text-[9px] font-bold uppercase text-center text-gray-900">Academic</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-white border border-[#8A0000] text-[#8A0000] flex items-center justify-center text-[10px] font-bold">3</span>
                     <span className="text-[9px] font-bold text-[#8A0000] uppercase text-center">Portfolio</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-bold">4</span>
                     <span className="text-[9px] font-bold text-gray-400 uppercase text-center">Review</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                   <button onClick={() => goToPage('apply')} className="px-6 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors">
                     Continue Application
                   </button>
                   <button onClick={() => goToPage('programs')} className="px-6 py-3 border border-gray-300 text-gray-600 text-[11px] font-bold uppercase tracking-widest hover:border-gray-400 transition-colors">
                     Compare Programs
                   </button>
                </div>
              </div>
            ) : (
               <div className="text-center py-10">
                 <p className="text-[14px] text-gray-600 mb-6">You have not started an application yet.</p>
                 <button onClick={() => goToPage('apply')} className="px-6 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors">
                   Start Application
                 </button>
               </div>
            )}
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="w-full md:w-[320px] flex flex-col gap-6">
           <div className="bg-white border border-gray-200 p-6 shadow-sm">
             <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-widest mb-4">Quick Links</h3>
             <ul className="space-y-3">
               <li><button onClick={() => goToPage('tuition-expenses')} className="text-[13px] text-gray-600 hover:text-[#8A0000] transition-colors">Financial Aid Portal</button></li>
               <li><button onClick={() => goToPage('application-deadlines')} className="text-[13px] text-gray-600 hover:text-[#8A0000] transition-colors">Important Dates</button></li>
               <li><button onClick={() => goToPage('programs')} className="text-[13px] text-gray-600 hover:text-[#8A0000] transition-colors">Browse Programs</button></li>
               <li><button onClick={() => goToPage('visit-campus')} className="text-[13px] text-gray-600 hover:text-[#8A0000] transition-colors">Schedule a Visit</button></li>
             </ul>
           </div>
        </div>

      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
