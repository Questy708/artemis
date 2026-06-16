import { NextResponse } from 'next/server';

// GET /api/campaign — fetch the active founding campaign with milestones, perks, events
export async function GET() {
  try {
    // Return campaign data — in production this would come from the database
    // For now, using rich static data that can be seeded later
    const campaign = {
      id: 'founding-campaign',
      slug: 'founding-campaign',
      title: 'Building the Future of Knowledge',
      subtitle: 'The Artemis Founding Campaign',
      goalAmount: 100000000,
      raisedAmount: 2100000,
      donorCount: 342,
      currency: 'USD',
      phase: 'public_launch',
      milestones: [
        { id: 'm1', title: 'Digital Foundation', targetAmount: 5000000, isReached: true, description: 'Core platform, secure infrastructure, and global access layer — deployed and operational across 3 continents.' },
        { id: 'm2', title: 'First Residential Hub', targetAmount: 15000000, isReached: false, description: 'Geneva — the first physical node with residential colleges, faculty offices, and a dedicated research wing.' },
        { id: 'm3', title: 'Inaugural Cohort', targetAmount: 30000000, isReached: false, description: 'Full scholarship fund for 500 students across multiple nodes with dedicated faculty and mentorship networks.' },
        { id: 'm4', title: 'Research Endowment', targetAmount: 55000000, isReached: false, description: 'Perpetual endowment for ten flagship research institutes with 20-year operational runway.' },
        { id: 'm5', title: 'Ten-Node Network', targetAmount: 75000000, isReached: false, description: 'Ten nodes on six continents — a planetary university with borderless access to knowledge.' },
        { id: 'm6', title: 'Global Scale', targetAmount: 100000000, isReached: false, description: 'Complete the founding campaign — 2,000 students, 200 faculty, and perpetual independence for centuries.' },
      ],
      perks: [
        { id: 'p1', title: 'Founding Cipher', description: 'A unique cryptographic token permanently recording your contribution on the Artemis ledger. Your name, encrypted, becomes part of the university\'s foundation.', minAmount: 25, category: 'digital', icon: 'Hash' },
        { id: 'p2', title: 'The Artemis Dispatch', description: 'Quarterly intelligence brief from the Chancellor — exclusive essays, research previews, and strategic updates from inside the founding.', minAmount: 100, category: 'digital', icon: 'Mail' },
        { id: 'p3', title: 'Node Access Pass', description: 'Priority invitation to visit any Artemis node worldwide during the founding year. Experience the spaces, meet the community, witness the build.', minAmount: 500, category: 'experience', icon: 'Compass' },
        { id: 'p4', title: 'Founders\' Book', description: 'A limited-edition leather-bound volume documenting the founding of Artemis — with your name inscribed in the founding roll.', minAmount: 1000, category: 'physical', icon: 'BookOpen' },
        { id: 'p5', title: 'Scholarship Patron', description: 'Fully fund a named micro-scholarship for one student. You choose the focus. They carry your name through their Artemis journey.', minAmount: 5000, category: 'naming', icon: 'GraduationCap' },
        { id: 'p6', title: 'Lab Dedication', description: 'Name a research lab within a node. A permanent plaque, a dedication ceremony, and annual reports from the researchers who work there.', minAmount: 25000, category: 'naming', icon: 'FlaskConical' },
        { id: 'p7', title: 'Commons Naming', description: 'Name one of the 12 Living Commons. Your name becomes part of daily life at Artemis — spoken by every resident, written on every map.', minAmount: 100000, category: 'naming', icon: 'Home' },
        { id: 'p8', title: 'Node Patron', description: 'Become the patron of an entire Artemis node. The building bears your name. The community carries your legacy. A seat on the Founders\' Council.', minAmount: 1000000, category: 'naming', icon: 'Building2' },
      ],
      events: [
        { id: 'e1', title: 'The Founding Convocation', eventType: 'gala', description: 'An evening of vision and commitment. Meet the Chancellor, the founding faculty, and fellow patrons at the Geneva node.', date: '2026-09-15', location: 'Geneva, Switzerland', isVirtual: false, capacity: 200, registered: 87, ticketPrice: 500 },
        { id: 'e2', title: 'Inside the Build: Virtual Site Tour', eventType: 'webinar', description: 'Walk through the digital and physical architecture of Artemis with the design team. Live Q&A with founding engineers.', date: '2026-07-22', location: 'Online', isVirtual: true, capacity: 1000, registered: 432, ticketPrice: 0 },
        { id: 'e3', title: 'Double Impact Day', eventType: 'matching_day', description: 'Every donation made today is matched dollar-for-dollar by the Catalyst Foundation. Your $1 becomes $2. 24 hours only.', date: '2026-10-01', location: 'Global', isVirtual: true, capacity: null, registered: 0, ticketPrice: null },
        { id: 'e4', title: 'The Artemis Auction', eventType: 'auction', description: 'Bid on naming rights, original artwork, and exclusive experiences — all proceeds fund the Global Scholars Fund.', date: '2026-11-20', location: 'London, UK', isVirtual: false, capacity: 150, registered: 34, ticketPrice: 250 },
        { id: 'e5', title: 'Hack the Future: 48-Hour Build', eventType: 'hackathon', description: 'A founding-weekend hackathon where donors and students co-build tools for the Artemis platform. Prizes. Glory. Pizza.', date: '2026-08-08', location: 'San Francisco, USA', isVirtual: false, capacity: 100, registered: 61, ticketPrice: 0 },
        { id: 'e6', title: 'Spring Benefactor Dinner', eventType: 'gala', description: 'An intimate dinner for major donors at the Valletta node. Michelin-starred cuisine, Mediterranean views, and the future of knowledge.', date: '2027-03-14', location: 'Valletta, Malta', isVirtual: false, capacity: 80, registered: 22, ticketPrice: 1000 },
      ],
    };

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Campaign fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
  }
}
