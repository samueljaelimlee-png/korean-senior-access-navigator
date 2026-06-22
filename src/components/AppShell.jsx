import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Gift, ScrollText, Home } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const NAV = [
  { path: '/', label: '홈', icon: Home },
  { path: '/pas1', label: 'PAS-1 신청', icon: FileText },
  { path: '/benefits', label: '정부 혜택 안내', icon: Gift },
  { path: '/will-guide', label: '유언장 가이드', icon: ScrollText },
];

export default function AppShell({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    let sessionId = localStorage.getItem('ksan_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('ksan_session_id', sessionId);
    }
    if (!sessionStorage.getItem('ksan_visit_tracked')) {
      sessionStorage.setItem('ksan_visit_tracked', '1');
      base44.functions.invoke('trackActivity', { type: 'visit', session_id: sessionId, page: pathname }).catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="no-print bg-primary text-primary-foreground px-4 py-2 sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <div>
              <div className="text-sm font-bold leading-tight">Korean Senior Access Navigator</div>
              <div className="text-[10px] text-primary-foreground/60 leading-tight">한인 시니어 복지 길라잡이</div>
            </div>
          </Link>
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV.slice(1).map(({ path, label, icon: NavIcon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                  ${pathname === path
                    ? 'bg-white/20 text-white'
                    : 'text-primary-foreground/70 hover:bg-white/10 hover:text-white'}`}
              >
                <NavIcon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 pb-16 sm:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="no-print sm:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 flex">
        {NAV.map(({ path, label, icon: NavIcon }) => (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors
              ${pathname === path ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <NavIcon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}