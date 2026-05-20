import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { translations, type Language } from '../../locales/locales';
import { 
  Shield, 
  Store, 
  User, 
  ShieldAlert, 
  Globe, 
  Sun, 
  Moon, 
  RotateCcw,
  AlertTriangle,
  Lock,
  UserCheck
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { 
    activeRole, 
    setRole, 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    currentUser, 
    resetDatabase 
  } = useGlobalState();

  const [langOpen, setLangOpen] = useState(false);
  const t = translations[language];

  // Sync theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  const handleRoleChange = (role: 'restaurant' | 'customer' | 'admin') => {
    setRole(role);
    // Visual cue
    const beep = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
    beep.play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 transition-colors duration-300 font-sans">
      {/* Top Header Deck */}
      <header className="sticky top-0 z-50 w-full glass-panel shadow-lg transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleRoleChange('customer')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20">
                <Shield className="h-6 w-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gradient-brand leading-none">
                  {t.appTitle}
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                  AI Guard
                </span>
              </div>
            </div>

            {/* Portal Role Selector Desktop */}
            <nav className="hidden md:flex items-center gap-1 rounded-xl bg-slate-900/60 p-1 border border-slate-800/80">
              <button
                onClick={() => handleRoleChange('restaurant')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeRole === 'restaurant'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Store className="h-4 w-4" />
                {t.roleRestaurant}
              </button>
              <button
                onClick={() => handleRoleChange('customer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeRole === 'customer'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <User className="h-4 w-4" />
                {t.roleCustomer}
              </button>
              <button
                onClick={() => handleRoleChange('admin')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeRole === 'admin'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                {t.roleAdmin}
              </button>
            </nav>

            {/* Utility Deck */}
            <div className="flex items-center gap-3">
              {/* Reset database button */}
              <button 
                onClick={() => {
                  if (confirm("Reset local database to initial demo values?")) {
                    resetDatabase();
                    window.location.reload();
                  }
                }}
                title="Reset Database"
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-500" />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-medium"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{currentLangObj.flag} {currentLangObj.name}</span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1 animate-fade-in z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-slate-800 transition-colors ${
                          language === lang.code ? 'text-blue-400 bg-blue-500/5' : 'text-slate-300'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span>{lang.flag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Card */}
              <div className="hidden sm:flex items-center gap-2 border-l border-slate-850 pl-3">
                <img
                  src={currentUser.profile_image}
                  alt={currentUser.full_name}
                  className="h-8 w-8 rounded-full border border-slate-700 bg-slate-800 object-cover"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-slate-200 leading-none">{currentUser.full_name}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">
                    {activeRole === 'restaurant' ? 'Kitchen Staff' : activeRole === 'admin' ? 'Security Admin' : 'Customer'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Role Deck */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-900 p-2 bg-slate-950/80">
          <button
            onClick={() => handleRoleChange('restaurant')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
              activeRole === 'restaurant' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400'
            }`}
          >
            <Store className="h-4 w-4" />
            <span>{t.roleRestaurant}</span>
          </button>
          <button
            onClick={() => handleRoleChange('customer')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
              activeRole === 'customer' ? 'text-purple-500 bg-purple-500/10' : 'text-slate-400'
            }`}
          >
            <User className="h-4 w-4" />
            <span>{t.roleCustomer}</span>
          </button>
          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
              activeRole === 'admin' ? 'text-rose-500 bg-rose-500/10' : 'text-slate-400'
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span>{t.roleAdmin}</span>
          </button>
        </div>
      </header>

      {/* Global Status Warning Deck */}
      {activeRole === 'customer' && currentUser.account_status !== 'active' && (
        <div className="w-full bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                {currentUser.account_status === 'warning' 
                  ? t.accountWarning 
                  : t.accountSuspended
                }
              </span>
            </div>
            {currentUser.account_status === 'suspended' && (
              <span className="font-semibold text-rose-400 flex items-center gap-1 font-mono uppercase tracking-wider text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                <Lock className="h-3 w-3" /> Account Suspended
              </span>
            )}
          </div>
        </div>
      )}

      {/* Admin Operations Banner */}
      {activeRole === 'admin' && (
        <div className="w-full bg-emerald-500/10 border-b border-emerald-500/20 py-1.5 px-4 font-mono text-[11px] text-emerald-400 flex items-center justify-center gap-2">
          <UserCheck className="h-3.5 w-3.5" /> SECURE SESSION ACTIVE • ROLE-BASED ACCESS CONTROL (RBAC) • SHA-256 BLOCKCHAIN INTEGRITY VERIFIED
        </div>
      )}

      {/* Main Core Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/60 mt-auto py-6 bg-slate-950 text-slate-500 dark:text-slate-500 light:text-slate-400">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FoodShield. All Rights Reserved. Protecting food quality through immutable video evidence.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">GDPR & DPDP Act Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
