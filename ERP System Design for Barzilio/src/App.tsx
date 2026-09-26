import { useState } from 'react';
import { DEMO_USERS, type UserProfile, type Page } from './data/mock';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeeProfile from './components/EmployeeProfile';
import ManagerView from './components/ManagerView';
import ExecutiveView from './components/ExecutiveView';
import PrivilegePanel from './components/PrivilegePanel';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [page, setPage] = useState<Page>({ id: 'dashboard' });

  const handleLogin = (userId: string, password: string): boolean => {
    const match = DEMO_USERS[userId];
    if (match && match.password === password) {
      setUser(match.profile);
      setPage({ id: 'dashboard' });
      return true;
    }
    return false;
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout user={user} page={page} setPage={setPage} onLogout={() => setUser(null)}>
      {page.id === 'dashboard' && <Dashboard user={user} setPage={setPage} />}
      {page.id === 'profile' && (
        <EmployeeProfile
          currentUser={user}
          employeeId={page.employeeId}
          setPage={setPage}
        />
      )}
      {page.id === 'manager' && <ManagerView user={user} setPage={setPage} />}
      {page.id === 'executive' && <ExecutiveView user={user} section={(page as { id: 'executive'; section?: string }).section} setPage={setPage} />}
      {page.id === 'privilege' && <PrivilegePanel user={user} />}
    </Layout>
  );
}
