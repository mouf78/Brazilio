import { useState } from 'react';
import { type UserProfile, PRIVILEGE_MATRIX, ROLE_LABELS } from '../data/mock';

interface PrivilegePanelProps {
  user: UserProfile;
}

const PERMISSIONS = [
  { key: 'viewOwn', label: 'View Own Profile' },
  { key: 'viewTeam', label: 'View Team Profiles' },
  { key: 'viewStores', label: 'View Stores' },
  { key: 'viewAreas', label: 'View Areas' },
  { key: 'viewDepts', label: 'View Departments' },
  { key: 'viewRD', label: 'R&D Access' },
  { key: 'manageAccess', label: 'Manage Access Rules' },
] as const;

export default function PrivilegePanel({ user }: PrivilegePanelProps) {
  const [editMode, setEditMode] = useState(false);
  const canEdit = user.role === 'ceo';

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-lg font-700 text-bz-brown">Privilege & Access Control</h2>
          <p className="text-xs text-gray-500">Role-based access matrix for the Barzilio ERP system</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-xl text-xs font-600 transition-all ${
              editMode ? 'bg-bz-orange text-white' : 'bg-white border border-bz-orange text-bz-orange hover:bg-bz-orange-pale'
            }`}
          >
            {editMode ? 'Save Changes' : 'Edit Privileges'}
          </button>
        )}
      </div>

      {/* Current user's access summary */}
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-4 mb-5"
        style={{ borderLeft: '4px solid #E8640A' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-700 text-sm"
            style={{ backgroundColor: user.avatarColor }}>
            {user.avatarInitials}
          </div>
          <div>
            <div className="font-700 text-bz-brown text-sm">{user.name}</div>
            <div className="text-xs text-gray-400">{ROLE_LABELS[user.role]} · Your current access</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PERMISSIONS.map(perm => {
            const myRow = PRIVILEGE_MATRIX.find(r => r.role.toLowerCase().replace(/\s+/g, '_') === user.role || r.role === ROLE_LABELS[user.role]);
            const hasAccess = myRow ? myRow[perm.key as keyof typeof myRow] : false;
            return (
              <span key={perm.key} className={`text-xs px-2.5 py-1 rounded-full font-600 ${
                hasAccess ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
              }`}>
                {hasAccess ? '✓' : '✗'} {perm.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Matrix table */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #5C3317, #3D2010)' }}>
          <h3 className="text-white font-600 text-sm">Access Control Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-bz-orange-pale border-b border-orange-200">
                <th className="text-left px-4 py-3 font-700 text-bz-brown min-w-36">Role</th>
                {PERMISSIONS.map(p => (
                  <th key={p.key} className="px-3 py-3 font-600 text-bz-brown text-center min-w-24 leading-tight">{p.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRIVILEGE_MATRIX.map((row, i) => (
                <tr key={row.role} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                  <td className="px-4 py-3 font-600 text-bz-brown whitespace-nowrap">{row.role}</td>
                  {PERMISSIONS.map(perm => {
                    const val = row[perm.key as keyof typeof row] as boolean;
                    return (
                      <td key={perm.key} className="px-3 py-3 text-center">
                        {editMode && canEdit ? (
                          <input
                            type="checkbox"
                            checked={val}
                            readOnly
                            className="w-4 h-4 accent-bz-orange cursor-pointer"
                          />
                        ) : (
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-700 ${
                            val ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {val ? '✓' : '–'}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!canEdit && (
          <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
            <p className="text-xs text-amber-700">
              <span className="font-600">Note:</span> Only the CEO can modify access privileges. Contact the CEO to request a privilege change.
            </p>
          </div>
        )}
      </div>

      {/* Role descriptions */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {[
          { role: 'Employee', desc: 'Access own profile, salary, attendance, loans, and documents. No visibility into other profiles.', color: '#E8640A' },
          { role: 'Store Manager', desc: 'Own profile plus full visibility into branch team profiles and performance.', color: '#5C3317' },
          { role: 'Area Manager', desc: 'Access to all stores and employees within the managed area.', color: '#16697A' },
          { role: 'Operations Manager', desc: 'Full access to all stores, areas, managers, and staff across the company.', color: '#2D6A4F' },
          { role: 'General Manager', desc: 'Operational access plus department-level (HR, Finance, Marketing, etc.) dashboards.', color: '#1D3557' },
          { role: 'R&D Director', desc: 'Full department access with research dashboards, plans, goals, and case management.', color: '#6B2D8B' },
          { role: 'CEO', desc: 'Unrestricted access to all modules plus the ability to manage and assign privileges.', color: '#E8640A' },
        ].map(item => (
          <div key={item.role} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            style={{ borderLeft: `3px solid ${item.color}` }}>
            <div className="font-700 text-bz-brown text-sm mb-1.5">{item.role}</div>
            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
