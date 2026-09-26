import { useState } from 'react';
import { type UserProfile, type Page, ALL_EMPLOYEES, STORES, AREAS } from '../data/mock';

interface ManagerViewProps {
  user: UserProfile;
  setPage: (p: Page) => void;
}

function Avatar({ initials, color, size = 'md' }: { initials: string; color: string; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div className={`${cls} rounded-full flex items-center justify-center text-white font-700 flex-shrink-0`}
      style={{ backgroundColor: color }}>
      {initials}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
      <div className="text-2xl font-800" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-500 font-500 mt-0.5">{label}</div>
    </div>
  );
}

export default function ManagerView({ user, setPage }: ManagerViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const isStoreManager = user.role === 'store_manager';
  const isAreaManager = user.role === 'area_manager';
  const isOpsOrCEO = user.role === 'ops_manager' || user.role === 'ceo';

  // Employees the manager can see
  const visibleEmployees = ALL_EMPLOYEES.filter(e => {
    if (isStoreManager) return e.store === user.store;
    if (isAreaManager) return e.area === user.area;
    return true; // ops, ceo
  }).filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleStores = isStoreManager
    ? STORES.filter(s => s.name === user.store)
    : isAreaManager
    ? STORES.filter(s => s.area === user.area)
    : STORES;

  const title = isStoreManager
    ? `My Branch — ${user.store}`
    : isAreaManager
    ? `My Area — ${user.area || 'Dubai North'}`
    : 'Operations Overview';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-lg font-700 text-bz-brown">{title}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {visibleEmployees.length} staff · {visibleStores.length} stores
          </p>
        </div>
        <div className="relative">
          <svg className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search employees…"
            className="pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-bz-orange transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Staff" value={visibleEmployees.length} color="#E8640A" />
        <StatCard label="Stores" value={visibleStores.length} color="#5C3317" />
        <StatCard label="Areas" value={isOpsOrCEO ? AREAS.length : 1} color="#16697A" />
        <StatCard label="Avg Rating" value="4.7 ★" color="#D97706" />
      </div>

      {/* Areas overview for ops/ceo */}
      {isOpsOrCEO && (
        <div className="mb-6">
          <h3 className="font-700 text-bz-brown text-sm mb-3">Areas Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {AREAS.map(area => (
              <div key={area.id} className="bg-white rounded-xl border border-orange-100 shadow-sm p-4"
                style={{ borderLeft: '4px solid #E8640A' }}>
                <div className="font-600 text-bz-brown text-sm">{area.name}</div>
                <div className="text-xs text-gray-400 mt-1">{area.manager}</div>
                <div className="flex gap-3 mt-2">
                  <span className="text-xs text-gray-600">{area.stores} stores</span>
                  <span className="text-xs text-gray-600">{area.totalStaff} staff</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stores */}
      <div className="mb-6">
        <h3 className="font-700 text-bz-brown text-sm mb-3">
          {isStoreManager ? 'Store Details' : 'Stores'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {visibleStores.map(store => (
            <button
              key={store.id}
              onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
              className={`bg-white rounded-xl border shadow-sm p-4 text-left transition-all hover:shadow-md ${
                selectedStore === store.id ? 'border-bz-orange ring-1 ring-bz-orange/20' : 'border-orange-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="font-600 text-bz-brown text-sm">{store.name}</div>
                <span className="text-xs bg-amber-100 text-amber-700 font-600 px-1.5 py-0.5 rounded-md">{store.rating}★</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{store.area} · {store.manager}</div>
              <div className="flex gap-3 mt-2.5">
                <div className="text-center">
                  <div className="font-700 text-bz-orange text-sm">{store.staff}</div>
                  <div className="text-xs text-gray-400">Staff</div>
                </div>
                <div className="text-center">
                  <div className="font-700 text-emerald-600 text-sm">{store.revenue}</div>
                  <div className="text-xs text-gray-400">AED/mo</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Employee list */}
      <div>
        <h3 className="font-700 text-bz-brown text-sm mb-3">
          Staff Directory {searchQuery && <span className="font-400 text-gray-400">— {visibleEmployees.length} results</span>}
        </h3>
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          {visibleEmployees.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">No employees found.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {visibleEmployees.map(emp => (
                <div key={emp.id} className="flex items-center gap-3 px-4 py-3 hover:bg-bz-orange-pale/30 transition-colors">
                  <Avatar initials={emp.avatarInitials} color={emp.avatarColor} />
                  <div className="flex-1 min-w-0">
                    <div className="font-600 text-bz-brown text-sm">{emp.name}</div>
                    <div className="text-xs text-gray-400 truncate">{emp.title} · {emp.store}</div>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-400 hidden sm:block">{emp.department}</div>
                  <button
                    onClick={() => setPage({ id: 'profile', employeeId: emp.id })}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-600 text-bz-orange bg-bz-orange-pale hover:bg-bz-orange hover:text-white transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
