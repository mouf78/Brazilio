import { useState } from 'react';
import { type UserProfile, type Page, DEPT_STATS, ALL_EMPLOYEES, STORES, AREAS } from '../data/mock';

interface ExecutiveViewProps {
  user: UserProfile;
  section?: string;
  setPage: (p: Page) => void;
}

const DEPARTMENTS = ['HR', 'Marketing', 'Finance', 'Warehouse', 'Maintenance', 'IT'];

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function DeptCard({ dept, color, onClick }: { dept: string; color: string; onClick: () => void }) {
  const stats = DEPT_STATS[dept];
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md transition-all hover:border-opacity-50 w-full"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-700 text-bz-brown text-sm">{dept}</h3>
        <span className="text-xs font-600 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
          {stats.staff} staff
        </span>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">Performance</span>
          <span className="font-700" style={{ color }}>{stats.performance}%</span>
        </div>
        <ProgressBar pct={stats.performance} color={color} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-3">
        <span>Plans: <strong className="text-gray-700">{stats.plansAchieved}/{stats.plansTotal}</strong></span>
        <span>Open Cases: <strong className="text-red-600">{stats.openCases}</strong></span>
      </div>
    </button>
  );
}

function RDDashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const dept = selectedDept ? DEPT_STATS[selectedDept] : null;
  const deptEmployees = selectedDept ? ALL_EMPLOYEES.filter(e => e.department === selectedDept) : [];

  const PLANS: Record<string, { goal: string; status: 'achieved' | 'in-progress' | 'pending' }[]> = {
    HR: [
      { goal: 'Reduce turnover to below 12%', status: 'achieved' },
      { goal: 'Complete 100% onboarding digitization', status: 'achieved' },
      { goal: 'Launch employee wellbeing program Q4', status: 'in-progress' },
    ],
    Marketing: [
      { goal: 'Reach 50k Instagram followers', status: 'achieved' },
      { goal: 'Launch Barzilio loyalty app v2', status: 'in-progress' },
      { goal: 'Holiday campaign ROI +30%', status: 'pending' },
    ],
    Finance: [
      { goal: 'Close Q3 within 3 days of quarter end', status: 'achieved' },
      { goal: 'Implement automated invoice processing', status: 'achieved' },
      { goal: 'Reduce operating costs by 8%', status: 'in-progress' },
    ],
    Warehouse: [
      { goal: 'Achieve 99% inventory accuracy', status: 'in-progress' },
      { goal: 'Reduce waste by 15%', status: 'achieved' },
      { goal: 'Implement FIFO for all perishables', status: 'achieved' },
    ],
    Maintenance: [
      { goal: 'Zero unplanned downtime in Q3', status: 'in-progress' },
      { goal: 'Preventive maintenance for all equipment', status: 'achieved' },
      { goal: 'New vendor contracts at 10% savings', status: 'pending' },
    ],
    IT: [
      { goal: 'ERP system rollout 100% stores', status: 'in-progress' },
      { goal: 'Cybersecurity audit passed', status: 'achieved' },
      { goal: 'POS upgrade all branches', status: 'achieved' },
    ],
  };

  const CASES: Record<string, { id: string; title: string; status: 'open' | 'closed'; priority: 'high' | 'medium' | 'low' }[]> = {
    HR: [
      { id: 'HR-041', title: 'Salary dispute — Downtown branch', status: 'open', priority: 'high' },
      { id: 'HR-042', title: 'Harassment complaint — under review', status: 'open', priority: 'high' },
      { id: 'HR-039', title: 'Annual leave recalculation batch', status: 'closed', priority: 'medium' },
    ],
    Marketing: [
      { id: 'MK-015', title: 'Brand assets audit — Q3', status: 'open', priority: 'medium' },
      { id: 'MK-014', title: 'Campaign A/B test analysis', status: 'closed', priority: 'low' },
    ],
    Finance: [
      { id: 'FN-088', title: 'VAT filing adjustment — Aug 2026', status: 'open', priority: 'high' },
      { id: 'FN-087', title: 'Vendor payment reconciliation', status: 'closed', priority: 'medium' },
    ],
    Warehouse: [
      { id: 'WH-022', title: 'Stock discrepancy — Marina branch', status: 'open', priority: 'high' },
      { id: 'WH-021', title: 'Damaged goods writeoff Q3', status: 'open', priority: 'medium' },
      { id: 'WH-023', title: 'Reorder level review — coffee beans', status: 'open', priority: 'medium' },
      { id: 'WH-020', title: 'Supplier audit — Arabica supplier', status: 'closed', priority: 'low' },
      { id: 'WH-019', title: 'Cold storage calibration', status: 'closed', priority: 'medium' },
    ],
    Maintenance: [
      { id: 'MT-031', title: 'Espresso machine failure — Deira', status: 'open', priority: 'high' },
      { id: 'MT-032', title: 'HVAC service — Abu Dhabi Mall', status: 'open', priority: 'medium' },
      { id: 'MT-033', title: 'Fire suppression inspection due', status: 'open', priority: 'medium' },
      { id: 'MT-030', title: 'Grinder maintenance batch — Sept', status: 'closed', priority: 'low' },
    ],
    IT: [
      { id: 'IT-056', title: 'ERP sync failure — Jumeirah POS', status: 'open', priority: 'high' },
      { id: 'IT-057', title: 'WiFi dead zone — Marina branch', status: 'open', priority: 'medium' },
      { id: 'IT-055', title: 'Backup verification Q3', status: 'closed', priority: 'low' },
    ],
  };

  const priorityStyle: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-gray-100 text-gray-600',
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-lg font-700 text-bz-brown">R&D Dashboard</h2>
          <p className="text-xs text-gray-500">Select a department to explore performance, staff, and plans</p>
        </div>
      </div>

      {/* Department selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedDept(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${!selectedDept ? 'bg-bz-orange text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-bz-orange'}`}
        >
          All Departments
        </button>
        {DEPARTMENTS.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDept(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${selectedDept === d ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-bz-orange'}`}
            style={selectedDept === d ? { backgroundColor: DEPT_STATS[d].color } : {}}
          >
            {d}
          </button>
        ))}
      </div>

      {!selectedDept ? (
        // Overview grid
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {DEPARTMENTS.map(d => (
            <DeptCard key={d} dept={d} color={DEPT_STATS[d].color} onClick={() => setSelectedDept(d)} />
          ))}
        </div>
      ) : (
        // Department detail
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-700 text-sm"
              style={{ backgroundColor: dept!.color }}>{selectedDept[0]}</div>
            <div>
              <h3 className="font-700 text-bz-brown">{selectedDept} Department</h3>
              <p className="text-xs text-gray-400">Performance · Staff · Plans · Cases</p>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Staff', value: dept!.staff, suffix: '' },
              { label: 'Performance', value: dept!.performance, suffix: '%' },
              { label: 'Plans Achieved', value: `${dept!.plansAchieved}/${dept!.plansTotal}`, suffix: '' },
              { label: 'Open Cases', value: dept!.openCases, suffix: '' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
                <div className="text-xl font-800" style={{ color: dept!.color }}>{k.value}{k.suffix}</div>
                <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Staff */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h4 className="font-700 text-bz-brown text-sm mb-3">Staff</h4>
              {deptEmployees.length === 0 ? (
                <p className="text-xs text-gray-400">No staff listed.</p>
              ) : (
                <div className="space-y-2">
                  {deptEmployees.map(e => (
                    <div key={e.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-700"
                        style={{ backgroundColor: e.avatarColor }}>{e.avatarInitials}</div>
                      <div>
                        <div className="text-xs font-600 text-bz-brown">{e.name}</div>
                        <div className="text-xs text-gray-400">{e.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Plans */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h4 className="font-700 text-bz-brown text-sm mb-3">Plans & Goals</h4>
              <div className="space-y-2">
                {(PLANS[selectedDept] || []).map((plan, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`flex-shrink-0 mt-0.5 text-sm ${
                      plan.status === 'achieved' ? 'text-emerald-500' :
                      plan.status === 'in-progress' ? 'text-amber-500' : 'text-gray-400'
                    }`}>
                      {plan.status === 'achieved' ? '✓' : plan.status === 'in-progress' ? '◎' : '○'}
                    </span>
                    <span className="text-xs text-gray-700 leading-relaxed">{plan.goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cases */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h4 className="font-700 text-bz-brown text-sm mb-3">Cases & Docs</h4>
              <div className="space-y-2">
                {(CASES[selectedDept] || []).map(c => (
                  <div key={c.id} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-500 text-gray-700 truncate">{c.title}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-gray-400">{c.id}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-600 ${priorityStyle[c.priority]}`}>{c.priority}</span>
                      </div>
                    </div>
                    <span className={`text-xs flex-shrink-0 font-600 ${c.status === 'open' ? 'text-red-600' : 'text-emerald-600'}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GMDashboard() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-700 text-bz-brown">Departments Overview</h2>
        <p className="text-xs text-gray-500">HR · Marketing · Finance · Warehouse · Maintenance · IT</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {DEPARTMENTS.map(d => {
          const stats = DEPT_STATS[d];
          return (
            <button key={d} onClick={() => setSelectedDept(selectedDept === d ? null : d)}
              className={`bg-white rounded-xl border shadow-sm p-3 text-center hover:shadow-md transition-all ${selectedDept === d ? 'ring-2' : 'border-gray-100'}`}
              style={{ borderTop: `3px solid ${stats.color}`, '--tw-ring-color': stats.color } as React.CSSProperties}>
              <div className="font-800 text-lg" style={{ color: stats.color }}>{stats.performance}%</div>
              <div className="text-xs font-600 text-bz-brown">{d}</div>
              <div className="text-xs text-gray-400">{stats.staff} staff</div>
            </button>
          );
        })}
      </div>

      {/* Full department cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {DEPARTMENTS.map(d => {
          const stats = DEPT_STATS[d];
          return (
            <div key={d} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 text-white font-700 text-sm flex items-center justify-between"
                style={{ backgroundColor: stats.color }}>
                <span>{d} Department</span>
                <span className="font-400 text-xs opacity-80">{stats.staff} people</span>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500">Overall Performance</span>
                    <span className="font-700" style={{ color: stats.color }}>{stats.performance}%</span>
                  </div>
                  <ProgressBar pct={stats.performance} color={stats.color} />
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-3">
                  <div>
                    <span className="text-gray-400">Plans: </span>
                    <span className="font-600">{stats.plansAchieved}/{stats.plansTotal} achieved</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Cases: </span>
                    <span className={`font-600 ${stats.openCases > 3 ? 'text-red-600' : 'text-gray-600'}`}>{stats.openCases} open</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CEODashboard({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-700 text-bz-brown">CEO Overview — Barzilio Group</h2>
        <p className="text-xs text-gray-500">Full enterprise access · September 2026</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Revenue', value: '411,000 AED', color: '#E8640A', sub: 'Sep 2026' },
          { label: 'Total Staff', value: '54', color: '#5C3317', sub: '5 stores' },
          { label: 'NPS Score', value: '88/100', color: '#059669', sub: 'Avg across stores' },
          { label: 'Open Cases', value: '17', color: '#DC2626', sub: 'All departments' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <div className="text-2xl font-800" style={{ color: k.color }}>{k.value}</div>
            <div className="text-xs font-600 text-bz-brown mt-0.5">{k.label}</div>
            <div className="text-xs text-gray-400">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Store performance */}
      <div className="mb-5">
        <h3 className="font-700 text-bz-brown text-sm mb-3">Store Performance</h3>
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bz-brown text-white text-xs">
                  <th className="text-left px-4 py-3">Store</th>
                  <th className="text-left px-4 py-3">Area</th>
                  <th className="text-left px-4 py-3">Manager</th>
                  <th className="text-right px-4 py-3">Staff</th>
                  <th className="text-right px-4 py-3">Revenue (AED)</th>
                  <th className="text-right px-4 py-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {STORES.map((store, i) => (
                  <tr key={store.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-4 py-2.5 text-xs font-600 text-bz-brown">{store.name}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{store.area}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{store.manager}</td>
                    <td className="px-4 py-2.5 text-xs text-right font-600">{store.staff}</td>
                    <td className="px-4 py-2.5 text-xs text-right font-600 text-emerald-700">{store.revenue}</td>
                    <td className="px-4 py-2.5 text-xs text-right">
                      <span className="bg-amber-100 text-amber-700 font-600 px-1.5 py-0.5 rounded">{store.rating}★</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Department summary */}
      <GMDashboard />
    </div>
  );
}

export default function ExecutiveView({ user, section, setPage }: ExecutiveViewProps) {
  if (section === 'rd' || user.role === 'rd') {
    return <RDDashboard setPage={setPage} />;
  }
  if (user.role === 'ceo') {
    return <CEODashboard setPage={setPage} />;
  }
  return <GMDashboard />;
}
