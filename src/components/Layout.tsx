import { useState } from 'react';
import logo2 from '@/assets/logo2.png';
import { type UserProfile, type Page, ROLE_LABELS } from '../data/mock';

interface LayoutProps {
  user: UserProfile;
  page: Page;
  setPage: (p: Page) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  page: Page;
  icon: string;
}

function getNavItems(user: UserProfile): NavItem[] {
  const items: NavItem[] = [
    { label: 'Home', page: { id: 'dashboard' }, icon: '⌂' },
    { label: 'My Profile', page: { id: 'profile', employeeId: user.id }, icon: '◉' },
  ];

  if (user.role === 'store_manager') {
    items.push({ label: 'My Branch', page: { id: 'manager' }, icon: '⊞' });
  } else if (user.role === 'area_manager') {
    items.push({ label: 'My Area', page: { id: 'manager' }, icon: '◈' });
  } else if (user.role === 'ops_manager') {
    items.push({ label: 'Operations', page: { id: 'manager' }, icon: '◆' });
  } else if (user.role === 'gm') {
    items.push({ label: 'Departments', page: { id: 'executive' }, icon: '❖' });
  } else if (user.role === 'rd') {
    items.push({ label: 'R&D Dashboard', page: { id: 'executive', section: 'rd' }, icon: '⊙' });
  } else if (user.role === 'ceo') {
    items.push({ label: 'Operations', page: { id: 'manager' }, icon: '◆' });
    items.push({ label: 'Departments', page: { id: 'executive' }, icon: '❖' });
    items.push({ label: 'R&D', page: { id: 'executive', section: 'rd' }, icon: '⊙' });
  }

  items.push({ label: 'Privilege', page: { id: 'privilege' }, icon: '⚙' });
  return items;
}

function isActive(page: Page, navPage: Page): boolean {
  if (page.id !== navPage.id) return false;
  if (page.id === 'profile' && navPage.id === 'profile') return page.employeeId === navPage.employeeId;
  if (page.id === 'executive' && navPage.id === 'executive') {
    return (page as { id: 'executive'; section?: string }).section === (navPage as { id: 'executive'; section?: string }).section;
  }
  return true;
}

export default function Layout({ user, page, setPage, onLogout, children }: LayoutProps) {
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = getNavItems(user);

  return (
    <div className="min-h-screen flex flex-col bg-bz-cream">
      {/* Navbar */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo + brand */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <img src={logo2} alt="Barzilio" className="w-8 h-8 object-contain" />
            <span className="font-700 text-bz-brown text-sm hidden sm:block">Barzilio ERP</span>
          </div>

          {/* Avatar + user info */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-700 flex-shrink-0 ring-2 ring-offset-1 ring-bz-orange/40"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.avatarInitials}
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-600 text-bz-brown leading-tight">{user.name}</div>
              <div className="text-xs text-gray-400">{ROLE_LABELS[user.role]}</div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm mx-2">
            <div className="relative">
              <svg className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search employees…"
                className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-bz-orange transition-colors"
              />
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => setPage(item.page)}
                className={`px-3 py-1.5 rounded-lg text-xs font-500 transition-all ${
                  isActive(page, item.page)
                    ? 'bg-bz-orange text-white'
                    : 'text-gray-600 hover:bg-bz-orange-pale hover:text-bz-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Notifications + Logout */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-bz-orange-pale hover:text-bz-orange transition-colors relative">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-bz-orange rounded-full" />
            </button>

            <button
              onClick={onLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-500 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-bz-orange-pale"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-orange-100 bg-white px-4 py-3 flex flex-wrap gap-2">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => { setPage(item.page); setMobileOpen(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-500 transition-all ${
                  isActive(page, item.page)
                    ? 'bg-bz-orange text-white'
                    : 'text-gray-600 bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-500 text-red-600 bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-xs text-gray-400 border-t border-orange-100 bg-white">
        © 2026 Barzilio Coffee & Bakery · ERP System v2.0
      </footer>
    </div>
  );
}
