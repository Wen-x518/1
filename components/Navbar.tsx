import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Plus, Menu, Zap, User, LogIn, ChevronDown, LogOut, Settings } from 'lucide-react';
import { Button } from './Button';
import { askGemini } from '../services/gemini';
import { Logo } from './Logo';

interface NavbarProps {
  isLoggedIn: boolean;
  currentUser?: { displayName: string; avatar: string };
  onOpenLoginModal: () => void;
  onOpenCreatePost: () => void;
  onLogout: () => void;
  onNavigateToSettings: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn, 
  currentUser, 
  onOpenLoginModal, 
  onOpenCreatePost, 
  onLogout, 
  onNavigateToSettings,
  onNavigateHome
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiResponse(null);
    const result = await askGemini(searchQuery);
    setAiResponse(result);
    setIsSearching(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-white/90 backdrop-blur-md border-b border-gray-100/80 flex items-center px-4 justify-between transition-shadow duration-200">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 lg:gap-3">
        <button className="lg:hidden p-2 hover:bg-gray-50 rounded-full text-gray-600 transition-colors">
          <Menu size={22} strokeWidth={1.5} />
        </button>
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
          className="flex items-center gap-3 group"
        >
          <Logo />
          <div className="hidden lg:flex flex-col justify-center">
            <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-none group-hover:text-broad-600 transition-colors">BROAD</span>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 leading-none group-hover:text-broad-500 transition-colors">FORUM</span>
          </div>
        </a>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-2xl px-4 lg:px-12 relative group">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-broad-500 transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索 BROADFORUM..."
            className="w-full h-10 pl-11 pr-16 bg-gray-50 border border-gray-200 rounded-full hover:bg-white hover:border-broad-300 focus:bg-white focus:border-broad-500 focus:outline-none transition-all text-sm focus:shadow-sm placeholder-gray-400"
          />
          {searchQuery && (
             <button 
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs bg-broad-600 text-white px-3 py-1.5 rounded-full hover:bg-broad-700 font-medium transition-colors"
                disabled={isSearching}
             >
               {isSearching ? '...' : 'AI 搜索'}
             </button>
          )}
        </form>

        {/* AI Response Dropdown */}
        {aiResponse && (
          <div className="absolute top-full left-4 right-4 lg:left-12 lg:right-12 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-black/5">
            <div className="flex items-center gap-2 mb-3 text-broad-600 font-bold text-sm uppercase tracking-wide">
              <Zap size={16} strokeWidth={1.5} className="animate-pulse" />
              Broad AI 智能回答
            </div>
            <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">{aiResponse}</p>
            <div className="mt-3 text-right">
              <button 
                onClick={() => setAiResponse(null)}
                className="text-xs font-medium text-gray-400 hover:text-gray-700 underline decoration-gray-200 underline-offset-2 transition-colors"
              >
                关闭回答
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Button 
              variant="ghost" 
              size="md" 
              className="hidden sm:inline-flex text-gray-600 font-medium hover:bg-gray-50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-2">
                <span className="truncate">获取应用</span>
              </div>
            </Button>
            <Button 
              variant="secondary" 
              size="md" 
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-none font-bold"
              onClick={onOpenLoginModal}
            >
              登录
            </Button>
            <Button 
              variant="primary" 
              size="md" 
              className="hidden sm:inline-flex bg-broad-600 hover:bg-broad-700 shadow-sm shadow-blue-200"
              onClick={onOpenLoginModal}
            >
              注册
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-full relative transition-colors">
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               <Bell size={22} strokeWidth={1.5} />
            </button>
            <button 
              onClick={onOpenCreatePost}
              className="hidden sm:flex items-center justify-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors border border-transparent hover:border-gray-200"
            >
               <Plus size={22} strokeWidth={1.5} />
               <span className="text-sm font-medium">发帖</span>
            </button>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
               <button 
                 className={`ml-1 flex items-center gap-1 pl-1 pr-2 py-1 hover:bg-gray-100 rounded-full transition-all border ${isProfileMenuOpen ? 'bg-gray-100 border-gray-200' : 'border-transparent hover:border-gray-200'}`}
                 onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
               >
                 <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 shadow-sm">
                   <img src={currentUser?.avatar || "https://picsum.photos/100/100"} alt="User" className="w-full h-full object-cover" />
                 </div>
                 <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-gray-700 leading-none">{currentUser?.displayName || 'User'}</p>
                    <p className="text-[10px] text-gray-400 leading-none mt-0.5">1.2k karma</p>
                 </div>
                 <ChevronDown size={14} className={`text-gray-400 ml-1 hidden lg:block transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
              </button>
              
              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                 <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1 lg:hidden">
                       <p className="text-sm font-bold text-gray-900">{currentUser?.displayName}</p>
                       <p className="text-xs text-gray-500">1.2k karma</p>
                    </div>
                    <button 
                       onClick={() => { setIsProfileMenuOpen(false); onNavigateToSettings(); }}
                       className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-broad-600 flex items-center gap-2 transition-colors"
                    >
                       <Settings size={16} strokeWidth={1.5} />
                       个人设置
                    </button>
                    <div className="my-1 border-t border-gray-50"></div>
                    <button 
                       onClick={() => { setIsProfileMenuOpen(false); onLogout(); }}
                       className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2 transition-colors"
                    >
                       <LogOut size={16} strokeWidth={1.5} />
                       注销登录
                    </button>
                 </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};