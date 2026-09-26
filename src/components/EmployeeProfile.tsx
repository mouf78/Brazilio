import { useState } from 'react';
import {
  type UserProfile, type Page,
  ALL_EMPLOYEES, SALARY_DATA, ATTENDANCE_DATA, LOANS_DATA, DOCUMENTS_DATA, ACTIONS_DATA, ROLE_LABELS,
} from '../data/mock';

interface EmployeeProfileProps {
  currentUser: UserProfile;
  employeeId: string;
  setPage: (p: Page) => void;
}

type TabId = 'kpis' | 'salary' | 'attendance' | 'actions' | 'loans' | 'documents';

const TABS: { id: TabId; label: string }[] = [
  { id: 'kpis', label: 'My KPIs' },
  { id: 'salary', label: 'My Salary' },
  { id: 'attendance', label: 'My Attendance' },
  { id: 'actions', label: 'My Actions' },
  { id: 'loans', label: 'My Loans' },
  { id: 'documents', label: 'My Documents' },
];

function fmt(n: number) {
  return n.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SalaryTab() {
  const s = SALARY_DATA;
  const rows: { label: string; value: string; highlight?: 'deduct' | 'add' | 'total'; note?: string }[] = [
    { label: 'Basic Salary', value: `${fmt(s.basicSalary)} AED` },
    { label: 'Average Day', value: `${fmt(s.averageDay)} AED`, note: 'basic / 22 working days' },
    { label: 'Attendance', value: `${s.attendance} Days` },
    { label: 'Paid Off-Days', value: `${s.paidOffDays} Days` },
    { label: 'Absence (Days)', value: `${s.absenceDays} Day`, highlight: 'deduct' },
    { label: 'Absence (Deducted)', value: `– ${fmt(s.absenceDeduction)} AED`, highlight: 'deduct' },
    { label: 'Social Insurance', value: `– ${fmt(s.socialInsurance)} AED`, highlight: 'deduct' },
    { label: 'Commission', value: `+ ${fmt(s.commission)} AED`, highlight: 'add' },
    { label: 'Net Salary Before Loans', value: `${fmt(s.netBeforeLoans)} AED` },
    { label: 'Transportation Allowance', value: `+ ${fmt(s.transportation)} AED`, highlight: 'add' },
    { label: 'Loans Deduction', value: `– ${fmt(s.loans)} AED`, highlight: 'deduct' },
    { label: 'NET SALARY', value: `${fmt(s.netSalary)} AED`, highlight: 'total' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-700 text-bz-brown">September 2026</h3>
        <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-bz-orange">
          <option>September 2026</option>
          <option>August 2026</option>
          <option>July 2026</option>
        </select>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-5 py-3 ${
              i < rows.length - 1 ? 'border-b border-gray-100' : ''
            } ${
              row.highlight === 'total'
                ? 'bg-bz-orange text-white'
                : row.highlight === 'deduct'
                ? 'bg-red-50'
                : row.highlight === 'add'
                ? 'bg-emerald-50'
                : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
            }`}
          >
            <div>
              <span className={`text-sm font-${row.highlight === 'total' ? '700' : '500'} ${
                row.highlight === 'total' ? 'text-white' : 'text-gray-700'
              }`}>
                {row.label}
              </span>
              {row.note && <div className="text-xs text-gray-400">{row.note}</div>}
            </div>
            <span className={`text-sm font-700 ${
              row.highlight === 'total' ? 'text-white text-base' :
              row.highlight === 'deduct' ? 'text-red-600' :
              row.highlight === 'add' ? 'text-emerald-600' : 'text-bz-brown'
            }`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendanceTab() {
  const statusStyle: Record<string, string> = {
    present: 'bg-emerald-100 text-emerald-700',
    absent: 'bg-red-100 text-red-700',
    late: 'bg-amber-100 text-amber-700',
    off: 'bg-gray-100 text-gray-500',
  };

  const stats = {
    present: ATTENDANCE_DATA.filter(d => d.status === 'present').length,
    absent: ATTENDANCE_DATA.filter(d => d.status === 'absent').length,
    late: ATTENDANCE_DATA.filter(d => d.status === 'late').length,
    off: ATTENDANCE_DATA.filter(d => d.status === 'off').length,
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Present', count: stats.present, color: 'bg-emerald-500' },
          { label: 'Absent', count: stats.absent, color: 'bg-red-500' },
          { label: 'Late', count: stats.late, color: 'bg-amber-500' },
          { label: 'Off Days', count: stats.off, color: 'bg-gray-400' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
            <div className={`text-2xl font-800 ${s.color.replace('bg-', 'text-')}`}>{s.count}</div>
            <div className="text-xs text-gray-500 font-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bz-brown text-white text-xs">
                <th className="text-left px-4 py-3 font-600">Date</th>
                <th className="text-left px-4 py-3 font-600">Check In</th>
                <th className="text-left px-4 py-3 font-600">Check Out</th>
                <th className="text-left px-4 py-3 font-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {ATTENDANCE_DATA.map((day, i) => (
                <tr key={day.date} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-2.5 text-xs font-500 text-gray-700">
                    {new Date(day.date).toLocaleDateString('en-AE', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{day.checkIn}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{day.checkOut}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-600 capitalize ${statusStyle[day.status]}`}>
                      {day.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ActionsTab() {
  const typeStyle: Record<string, { bg: string; text: string; icon: string }> = {
    warning: { bg: 'bg-red-100 border-red-300', text: 'text-red-700', icon: '⚠' },
    commendation: { bg: 'bg-amber-100 border-amber-300', text: 'text-amber-700', icon: '⭐' },
    training: { bg: 'bg-blue-100 border-blue-300', text: 'text-blue-700', icon: '📚' },
    promotion: { bg: 'bg-emerald-100 border-emerald-300', text: 'text-emerald-700', icon: '🎯' },
  };

  return (
    <div className="space-y-3">
      {ACTIONS_DATA.map(action => {
        const style = typeStyle[action.type];
        return (
          <div key={action.id} className={`rounded-2xl border p-4 ${style.bg}`}>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{style.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className={`font-600 text-sm ${style.text}`}>{action.title}</h4>
                  <span className="text-xs text-gray-400">{new Date(action.date).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{action.description}</p>
                <p className="text-xs text-gray-400 mt-1.5">By: {action.by}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LoansTab() {
  return (
    <div className="space-y-4">
      {LOANS_DATA.map(loan => {
        const pctPaid = Math.round((loan.paid / loan.total) * 100);
        return (
          <div key={loan.id} className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-600 text-bz-brown text-sm">{loan.type}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{loan.start} → {loan.end}</p>
              </div>
              <span className="text-xs bg-bz-orange-pale text-bz-orange font-600 px-2 py-1 rounded-lg">Active</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center bg-gray-50 rounded-xl p-2.5">
                <div className="font-700 text-bz-brown text-sm">{loan.total.toLocaleString()} AED</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
              <div className="text-center bg-emerald-50 rounded-xl p-2.5">
                <div className="font-700 text-emerald-600 text-sm">{loan.paid.toLocaleString()} AED</div>
                <div className="text-xs text-gray-400">Paid</div>
              </div>
              <div className="text-center bg-red-50 rounded-xl p-2.5">
                <div className="font-700 text-red-600 text-sm">{loan.remaining.toLocaleString()} AED</div>
                <div className="text-xs text-gray-400">Remaining</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Repayment Progress</span>
                <span className="font-600 text-bz-orange">{pctPaid}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pctPaid}%`, background: 'linear-gradient(90deg, #E8640A, #F7A45C)' }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Monthly deduction: <span className="font-600 text-gray-600">{loan.monthly.toLocaleString()} AED</span></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {DOCUMENTS_DATA.map(doc => (
        <div key={doc.id} className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 text-red-600 font-700 text-xs">
            PDF
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-600 text-bz-brown text-sm truncate">{doc.name}</h4>
            <p className="text-xs text-gray-400 mt-0.5">{doc.size} · {new Date(doc.date).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-600 ${
              doc.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {doc.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
            </span>
          </div>
          <button className="flex-shrink-0 text-bz-orange hover:text-bz-brown transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

function KPIsTab() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-bz-orange-pale rounded-full flex items-center justify-center text-3xl mb-4">🎯</div>
      <h3 className="font-600 text-bz-brown text-lg mb-2">KPIs Coming Soon</h3>
      <p className="text-sm text-gray-500 max-w-xs">Performance metrics for this role are currently being defined by the management team. Check back soon.</p>
    </div>
  );
}

export default function EmployeeProfile({ currentUser, employeeId, setPage }: EmployeeProfileProps) {
  const [activeTab, setActiveTab] = useState<TabId>('salary');

  const isSelf = employeeId === currentUser.id;
  const emp = isSelf
    ? currentUser
    : ALL_EMPLOYEES.find(e => e.id === employeeId);

  if (!emp) {
    return <div className="text-center py-20 text-gray-400">Employee not found.</div>;
  }

  const profile = isSelf ? currentUser : {
    id: emp.id,
    name: emp.name,
    title: emp.title,
    store: emp.store,
    avatarColor: emp.avatarColor,
    avatarInitials: emp.avatarInitials,
    hiringDate: '2022-04-10',
    mobile: '+971 50 000 0000',
    role: 'employee' as const,
    department: emp.department,
    area: emp.area,
  } as UserProfile;

  const canViewSalary = isSelf || ['store_manager', 'area_manager', 'ops_manager', 'gm', 'rd', 'ceo'].includes(currentUser.role);

  return (
    <div>
      {/* Back button if viewing another employee */}
      {!isSelf && (
        <button
          onClick={() => setPage({ id: 'manager' })}
          className="flex items-center gap-1.5 text-sm text-bz-orange hover:text-bz-brown transition-colors mb-4 font-500"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to team
        </button>
      )}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Profile sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden sticky top-24">
            {/* Header gradient */}
            <div className="h-20 relative" style={{ background: 'linear-gradient(135deg, #E8640A, #5C3317)' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div
                  className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-white text-2xl font-800 shadow-md"
                  style={{ backgroundColor: profile.avatarColor }}
                >
                  {profile.avatarInitials}
                </div>
              </div>
            </div>

            <div className="pt-12 pb-5 px-4 text-center">
              <h3 className="font-700 text-bz-brown text-base">{profile.name}</h3>
              <span className="inline-block mt-1 text-xs bg-bz-orange-pale text-bz-orange font-600 px-2.5 py-1 rounded-full">
                {profile.title}
              </span>
              {profile.role !== 'employee' && (
                <div className="mt-1">
                  <span className="text-xs bg-bz-brown/10 text-bz-brown font-500 px-2 py-0.5 rounded-full">
                    {ROLE_LABELS[profile.role]}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 px-4 py-4 space-y-3">
              {[
                { icon: '📅', label: 'Hired', value: new Date(profile.hiringDate).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' }) },
                { icon: '📱', label: 'Mobile', value: profile.mobile },
                { icon: '🏪', label: 'Store', value: profile.store },
                ...(profile.area ? [{ icon: '📍', label: 'Area', value: profile.area }] : []),
                ...(profile.department ? [{ icon: '🏢', label: 'Dept', value: profile.department }] : []),
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span className="text-sm">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400">{item.label}</div>
                    <div className="text-xs font-600 text-bz-brown truncate">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {isSelf && (
              <div className="px-4 pb-4">
                <button className="w-full py-2 rounded-xl text-xs font-600 text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #E8640A, #C04D00)' }}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs area */}
        <div className="flex-1 min-w-0">
          {/* Tab bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 mb-4 overflow-hidden">
            <div className="flex overflow-x-auto">
              {TABS.filter(t => t.id !== 'salary' || canViewSalary).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-3.5 text-xs font-600 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-bz-orange text-bz-orange bg-bz-orange-pale'
                      : 'border-transparent text-gray-500 hover:text-bz-brown hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div>
            {activeTab === 'kpis' && <KPIsTab />}
            {activeTab === 'salary' && <SalaryTab />}
            {activeTab === 'attendance' && <AttendanceTab />}
            {activeTab === 'actions' && <ActionsTab />}
            {activeTab === 'loans' && <LoansTab />}
            {activeTab === 'documents' && <DocumentsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
