export type UserRole = 'employee' | 'store_manager' | 'area_manager' | 'ops_manager' | 'gm' | 'rd' | 'ceo';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  hiringDate: string;
  mobile: string;
  store: string;
  area?: string;
  department?: string;
  avatarColor: string;
  avatarInitials: string;
}

export type Page =
  | { id: 'dashboard' }
  | { id: 'profile'; employeeId: string }
  | { id: 'manager' }
  | { id: 'executive'; section?: string }
  | { id: 'privilege' };

export const DEMO_USERS: Record<string, { password: string; profile: UserProfile }> = {
  emp001: { password: '1234', profile: { id: 'emp001', name: 'Sara Ahmed', role: 'employee', title: 'Barista', hiringDate: '2022-03-15', mobile: '+971 50 123 4567', store: 'Barzilio - Downtown', avatarColor: '#E8640A', avatarInitials: 'SA' } },
  mgr001: { password: '1234', profile: { id: 'mgr001', name: 'Khaled Al-Mansoori', role: 'store_manager', title: 'Store Manager', hiringDate: '2020-06-01', mobile: '+971 55 987 6543', store: 'Barzilio - Downtown', avatarColor: '#5C3317', avatarInitials: 'KM' } },
  area001: { password: '1234', profile: { id: 'area001', name: 'Noura Hassan', role: 'area_manager', title: 'Area Manager', hiringDate: '2019-01-10', mobile: '+971 52 456 7890', store: 'Head Office', area: 'Dubai North', avatarColor: '#16697A', avatarInitials: 'NH' } },
  ops001: { password: '1234', profile: { id: 'ops001', name: 'Tariq Mahmoud', role: 'ops_manager', title: 'Operations Manager', hiringDate: '2018-08-20', mobile: '+971 54 321 0987', store: 'Head Office', avatarColor: '#2D6A4F', avatarInitials: 'TM' } },
  gm001: { password: '1234', profile: { id: 'gm001', name: 'Fatima Al-Zaabi', role: 'gm', title: 'General Manager', hiringDate: '2017-04-05', mobile: '+971 50 555 1234', store: 'Head Office', avatarColor: '#1D3557', avatarInitials: 'FZ' } },
  rd001: { password: '1234', profile: { id: 'rd001', name: 'Omar Rashid', role: 'rd', title: 'R&D Director', hiringDate: '2018-11-15', mobile: '+971 56 789 0123', store: 'Head Office', department: 'R&D', avatarColor: '#6B2D8B', avatarInitials: 'OR' } },
  ceo001: { password: '1234', profile: { id: 'ceo001', name: 'Ahmad Al-Barzilio', role: 'ceo', title: 'Chief Executive Officer', hiringDate: '2015-01-01', mobile: '+971 50 100 0001', store: 'Head Office', avatarColor: '#E8640A', avatarInitials: 'AB' } },
};

export const ALL_EMPLOYEES = [
  { id: 'emp001', name: 'Sara Ahmed', title: 'Barista', store: 'Barzilio - Downtown', area: 'Dubai Central', avatarInitials: 'SA', avatarColor: '#E8640A', department: 'Operations' },
  { id: 'emp002', name: 'Mohammed Ali', title: 'Cashier', store: 'Barzilio - Downtown', area: 'Dubai Central', avatarInitials: 'MA', avatarColor: '#5C3317', department: 'Operations' },
  { id: 'emp003', name: 'Lina Nasser', title: 'Shift Lead', store: 'Barzilio - Downtown', area: 'Dubai Central', avatarInitials: 'LN', avatarColor: '#2D6A4F', department: 'Operations' },
  { id: 'emp004', name: 'Hassan Yousef', title: 'Barista', store: 'Barzilio - Marina', area: 'Dubai North', avatarInitials: 'HY', avatarColor: '#1D3557', department: 'Operations' },
  { id: 'emp005', name: 'Reem Al-Ali', title: 'Baker', store: 'Barzilio - Marina', area: 'Dubai North', avatarInitials: 'RA', avatarColor: '#6B2D8B', department: 'Operations' },
  { id: 'emp006', name: 'Faisal Omar', title: 'Cashier', store: 'Barzilio - Jumeirah', area: 'Dubai North', avatarInitials: 'FO', avatarColor: '#C0392B', department: 'Operations' },
  { id: 'emp007', name: 'Aisha Malik', title: 'HR Specialist', store: 'Head Office', area: 'HQ', avatarInitials: 'AM', avatarColor: '#E8640A', department: 'HR' },
  { id: 'emp008', name: 'Bilal Hassan', title: 'Finance Analyst', store: 'Head Office', area: 'HQ', avatarInitials: 'BH', avatarColor: '#16697A', department: 'Finance' },
  { id: 'emp009', name: 'Dana Al-Rashid', title: 'Marketing Manager', store: 'Head Office', area: 'HQ', avatarInitials: 'DR', avatarColor: '#8B4513', department: 'Marketing' },
  { id: 'emp010', name: 'Eisa Al-Shehhi', title: 'IT Engineer', store: 'Head Office', area: 'HQ', avatarInitials: 'ES', avatarColor: '#1A6B3C', department: 'IT' },
  { id: 'emp011', name: 'Fatma Saeed', title: 'Warehouse Supervisor', store: 'Head Office', area: 'HQ', avatarInitials: 'FS', avatarColor: '#7B4F2E', department: 'Warehouse' },
  { id: 'emp012', name: 'Ghaith Nour', title: 'Maintenance Tech', store: 'Head Office', area: 'HQ', avatarInitials: 'GN', avatarColor: '#4A4A8A', department: 'Maintenance' },
];

export const STORES = [
  { id: 'store1', name: 'Barzilio - Downtown', area: 'Dubai Central', manager: 'Khaled Al-Mansoori', staff: 12, revenue: '85,400', rating: 4.8 },
  { id: 'store2', name: 'Barzilio - Marina', area: 'Dubai North', manager: 'Rania Khalil', staff: 9, revenue: '72,100', rating: 4.6 },
  { id: 'store3', name: 'Barzilio - Jumeirah', area: 'Dubai North', manager: 'Sami Al-Farsi', staff: 11, revenue: '91,200', rating: 4.9 },
  { id: 'store4', name: 'Barzilio - Deira', area: 'Dubai East', manager: 'Hind Jassim', staff: 8, revenue: '63,800', rating: 4.5 },
  { id: 'store5', name: 'Barzilio - Abu Dhabi Mall', area: 'Abu Dhabi', manager: 'Yousef Al-Hamad', staff: 14, revenue: '98,500', rating: 4.7 },
];

export const AREAS = [
  { id: 'area1', name: 'Dubai Central', stores: 1, manager: 'Noura Hassan', totalStaff: 12 },
  { id: 'area2', name: 'Dubai North', stores: 2, manager: 'Faris Al-Mutairi', totalStaff: 20 },
  { id: 'area3', name: 'Dubai East', stores: 1, manager: 'Mariam Ali', totalStaff: 8 },
  { id: 'area4', name: 'Abu Dhabi', stores: 1, manager: 'Salem Al-Dhaheri', totalStaff: 14 },
];

export const SALARY_DATA = {
  basicSalary: 4500,
  averageDay: 204.55,
  attendance: 22,
  paidOffDays: 2,
  absenceDays: 1,
  absenceDeduction: 204.55,
  socialInsurance: 225,
  commission: 650,
  netBeforeLoans: 4720.45,
  transportation: 300,
  loans: 500,
  netSalary: 4520.45,
};

export const ATTENDANCE_DATA = [
  { date: '2026-09-01', status: 'present', checkIn: '08:02', checkOut: '17:05' },
  { date: '2026-09-02', status: 'present', checkIn: '07:58', checkOut: '17:01' },
  { date: '2026-09-03', status: 'present', checkIn: '08:10', checkOut: '17:15' },
  { date: '2026-09-04', status: 'present', checkIn: '08:00', checkOut: '17:00' },
  { date: '2026-09-05', status: 'off', checkIn: '-', checkOut: '-' },
  { date: '2026-09-06', status: 'off', checkIn: '-', checkOut: '-' },
  { date: '2026-09-07', status: 'present', checkIn: '08:05', checkOut: '17:10' },
  { date: '2026-09-08', status: 'present', checkIn: '08:20', checkOut: '17:00' },
  { date: '2026-09-09', status: 'late', checkIn: '09:15', checkOut: '17:30' },
  { date: '2026-09-10', status: 'present', checkIn: '08:00', checkOut: '17:00' },
  { date: '2026-09-11', status: 'present', checkIn: '07:55', checkOut: '17:05' },
  { date: '2026-09-12', status: 'off', checkIn: '-', checkOut: '-' },
  { date: '2026-09-13', status: 'off', checkIn: '-', checkOut: '-' },
  { date: '2026-09-14', status: 'absent', checkIn: '-', checkOut: '-' },
  { date: '2026-09-15', status: 'present', checkIn: '08:03', checkOut: '17:00' },
  { date: '2026-09-16', status: 'present', checkIn: '08:00', checkOut: '17:00' },
  { date: '2026-09-17', status: 'present', checkIn: '08:12', checkOut: '17:08' },
  { date: '2026-09-18', status: 'present', checkIn: '07:59', checkOut: '17:02' },
  { date: '2026-09-19', status: 'off', checkIn: '-', checkOut: '-' },
  { date: '2026-09-20', status: 'off', checkIn: '-', checkOut: '-' },
  { date: '2026-09-21', status: 'present', checkIn: '08:01', checkOut: '17:00' },
  { date: '2026-09-22', status: 'present', checkIn: '08:00', checkOut: '17:00' },
  { date: '2026-09-23', status: 'present', checkIn: '08:05', checkOut: '17:10' },
];

export const LOANS_DATA = [
  { id: 'loan1', type: 'Personal Loan', total: 6000, monthly: 500, remaining: 4000, start: '2026-01-01', end: '2026-12-01', paid: 2000 },
  { id: 'loan2', type: 'Emergency Advance', total: 1000, monthly: 250, remaining: 500, start: '2026-08-01', end: '2026-09-30', paid: 500 },
];

export const DOCUMENTS_DATA = [
  { id: 'doc1', name: 'Employment Contract', date: '2022-03-15', type: 'PDF', status: 'verified', size: '245 KB' },
  { id: 'doc2', name: 'Emirates ID Copy', date: '2022-03-15', type: 'PDF', status: 'verified', size: '128 KB' },
  { id: 'doc3', name: 'Passport Copy', date: '2022-03-15', type: 'PDF', status: 'verified', size: '198 KB' },
  { id: 'doc4', name: 'Bank Details Form', date: '2022-03-20', type: 'PDF', status: 'verified', size: '89 KB' },
  { id: 'doc5', name: 'Salary Certificate Sep 2026', date: '2026-09-01', type: 'PDF', status: 'pending', size: '156 KB' },
  { id: 'doc6', name: 'Tardiness Warning Letter', date: '2026-09-09', type: 'PDF', status: 'verified', size: '72 KB' },
];

export const ACTIONS_DATA = [
  { id: 'act1', date: '2026-09-09', type: 'warning', title: 'Tardiness Warning', description: 'Late arrival — 75 min late. First formal warning issued.', by: 'Khaled Al-Mansoori' },
  { id: 'act2', date: '2026-07-15', type: 'commendation', title: 'Employee of the Month — July', description: 'Exceptional customer service and highest upselling score in the branch.', by: 'HR Department' },
  { id: 'act3', date: '2026-05-10', type: 'training', title: 'Barista Advanced Training', description: 'Completed Level 3 Specialty Coffee Training — scored 94%.', by: 'Training Department' },
  { id: 'act4', date: '2026-02-20', type: 'promotion', title: 'Promotion: Barista', description: 'Promoted from Junior Barista to Barista after annual performance review.', by: 'HR Department' },
];

export const DEPT_STATS: Record<string, { staff: number; performance: number; plansTotal: number; plansAchieved: number; openCases: number; color: string }> = {
  HR: { staff: 8, performance: 87, plansTotal: 12, plansAchieved: 10, openCases: 3, color: '#E8640A' },
  Marketing: { staff: 6, performance: 92, plansTotal: 8, plansAchieved: 7, openCases: 2, color: '#7C3AED' },
  Finance: { staff: 10, performance: 95, plansTotal: 15, plansAchieved: 14, openCases: 1, color: '#059669' },
  Warehouse: { staff: 14, performance: 78, plansTotal: 10, plansAchieved: 7, openCases: 5, color: '#D97706' },
  Maintenance: { staff: 9, performance: 82, plansTotal: 9, plansAchieved: 7, openCases: 4, color: '#DC2626' },
  IT: { staff: 7, performance: 91, plansTotal: 11, plansAchieved: 10, openCases: 2, color: '#2563EB' },
};

export const PRIVILEGE_MATRIX = [
  { role: 'Employee', viewOwn: true, viewTeam: false, viewStores: false, viewAreas: false, viewDepts: false, viewRD: false, manageAccess: false },
  { role: 'Store Manager', viewOwn: true, viewTeam: true, viewStores: false, viewAreas: false, viewDepts: false, viewRD: false, manageAccess: false },
  { role: 'Area Manager', viewOwn: true, viewTeam: true, viewStores: true, viewAreas: false, viewDepts: false, viewRD: false, manageAccess: false },
  { role: 'Operations Manager', viewOwn: true, viewTeam: true, viewStores: true, viewAreas: true, viewDepts: false, viewRD: false, manageAccess: false },
  { role: 'General Manager', viewOwn: true, viewTeam: true, viewStores: true, viewAreas: true, viewDepts: true, viewRD: false, manageAccess: false },
  { role: 'R&D Director', viewOwn: true, viewTeam: true, viewStores: true, viewAreas: true, viewDepts: true, viewRD: true, manageAccess: false },
  { role: 'CEO', viewOwn: true, viewTeam: true, viewStores: true, viewAreas: true, viewDepts: true, viewRD: true, manageAccess: true },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  employee: 'Employee',
  store_manager: 'Store Manager',
  area_manager: 'Area Manager',
  ops_manager: 'Operations Manager',
  gm: 'General Manager',
  rd: 'R&D Director',
  ceo: 'CEO',
};
