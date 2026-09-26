import { type UserProfile, type Page } from '../data/mock';

interface DashboardProps {
  user: UserProfile;
  setPage: (p: Page) => void;
}

const FEEDS = [
  {
    key: 'updates',
    title: 'Important Updates',
    icon: '📢',
    gradient: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    items: [
      { time: '2h ago', text: 'Ramadan hours policy update effective Oct 1 — all stores close at 11 PM.' },
      { time: '1d ago', text: 'New uniform rollout begins next Monday. Collect from store supervisor.' },
      { time: '3d ago', text: 'Health & Safety refresher training mandatory for all staff by Sep 30.' },
    ],
  },
  {
    key: 'prices',
    title: 'Price Changes',
    icon: '💲',
    gradient: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    items: [
      { time: 'Today', text: 'Specialty Espresso Blend: 85 AED/kg → 89 AED/kg (+4.7%)' },
      { time: '2d ago', text: 'Premium Colombian Single Origin raised by 6% due to harvest shortage.' },
      { time: '1w ago', text: 'Seasonal Pumpkin Spice Latte now 28 AED. Available Oct–Nov only.' },
    ],
  },
  {
    key: 'contest',
    title: 'Current Contest',
    icon: '🏆',
    gradient: 'from-violet-500 to-purple-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    items: [
      { time: 'Active', text: 'September Upselling Challenge — top 3 baristas win AED 500 gift voucher.' },
      { time: 'Active', text: 'Best Latte Art: Submit your photos on the staff portal by Sep 28.' },
      { time: 'Ended', text: 'August Customer Satisfaction Winners: Downtown & Marina branches 🎉' },
    ],
  },
  {
    key: 'benefits',
    title: 'Employee Benefits',
    icon: '🎁',
    gradient: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    items: [
      { time: 'New', text: '30% discount on all Barzilio products for staff and immediate family.' },
      { time: 'Active', text: 'Free specialty coffee training every second Wednesday. Register via HR.' },
      { time: 'Oct 2026', text: 'Annual health insurance renewal — update beneficiary info before Oct 15.' },
    ],
  },
  {
    key: 'vacancies',
    title: 'Current Vacancies',
    icon: '💼',
    gradient: 'from-rose-500 to-red-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    items: [
      { time: 'Open', text: 'Senior Barista — Barzilio Marina (2 positions). Apply via HR portal.' },
      { time: 'Open', text: 'Store Manager — Abu Dhabi Expansion (new store opening Nov 2026).' },
      { time: 'Open', text: 'Finance Coordinator — Head Office. Finance degree required.' },
    ],
  },
  {
    key: 'recognition',
    title: 'Staff Recognition & Rewards',
    icon: '⭐',
    gradient: 'from-amber-400 to-yellow-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    items: [
      { time: '🥇 Sep', text: 'Employee of the Month: Sara Ahmed — Downtown Barista. Outstanding service!' },
      { time: 'Award', text: 'Team of the Quarter: Jumeirah Branch — highest NPS score: 94/100.' },
      { time: 'Star', text: '5-year milestone: Khaled Al-Mansoori · Rania Khalil recognized this week.' },
    ],
  },
];

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div>
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-5 mb-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #E8640A 0%, #C04D00 60%, #5C3317 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-4 top-2 text-7xl">☕</div>
        </div>
        <div className="relative">
          <h2 className="text-xl font-700">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user.name.split(' ')[0]}!
          </h2>
          <p className="text-white/75 text-sm mt-0.5">
            Welcome to Barzilio ERP · {new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="flex gap-3 mt-3">
            <div className="bg-white/20 rounded-xl px-3 py-1.5 text-xs font-500 backdrop-blur-sm">{user.store}</div>
            <div className="bg-white/20 rounded-xl px-3 py-1.5 text-xs font-500 backdrop-blur-sm">{user.title}</div>
          </div>
        </div>
      </div>

      {/* Feed grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {FEEDS.map(feed => (
          <div key={feed.key} className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${feed.border}`}>
            {/* Card header */}
            <div className={`bg-gradient-to-r ${feed.gradient} px-4 py-3 flex items-center gap-2`}>
              <span className="text-xl">{feed.icon}</span>
              <h3 className="text-white font-600 text-sm">{feed.title}</h3>
            </div>

            {/* Feed items */}
            <div className={`${feed.bg} px-4 py-3 divide-y divide-white/60`}>
              {feed.items.map((item, i) => (
                <div key={i} className="py-2.5 flex gap-2.5 items-start">
                  <span className="text-xs font-500 text-gray-400 flex-shrink-0 pt-0.5 min-w-[42px]">{item.time}</span>
                  <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* View all */}
            <div className="px-4 py-2.5 border-t border-white/60 bg-white">
              <button className="text-xs font-500 text-bz-orange hover:underline">View all →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
