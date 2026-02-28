import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Expediente from './pages/Expediente';
import Generacion from './pages/Generacion';

type Page = 'dashboard' | 'expediente' | 'generacion';

export function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const handleSetPage = (page: string) => {
    setActivePage(page as Page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={handleSetPage} />;
      case 'expediente':
        return <Expediente />;
      case 'generacion':
        return <Generacion />;
      default:
        return <Dashboard setActivePage={handleSetPage} />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F8FAFB', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar activePage={activePage} setActivePage={handleSetPage} />
      <div className="flex-1 flex flex-col overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
