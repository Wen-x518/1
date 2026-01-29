import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Plus, Menu, User, ChevronDown, LogOut, Settings, Box, Sparkles, X } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';
import { Community } from '../types';

interface NavbarProps {
  isLoggedIn: boolean;
  currentUser?: { displayName: string; avatar: string };
  onOpenLoginModal: () => void;
  onOpenCreatePost: () => void;
  onLogout: () => void;
  onNavigateToSettings: () => void;
  onNavigateToManageApps: () => void;
  onNavigateHome: () => void;
  onNavigateToAiChat: (query: string) => void;
  onToggleMobileMenu?: () => void;
  currentCommunity?: Community;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn, 
  currentUser, 
  onOpenLoginModal, 
  onOpenCreatePost, 
  onLogout, 
  onNavigateToSettings,
  onNavigateToManageApps,
  onNavigateHome,
  onNavigateToAiChat,
  onToggleMobileMenu,
  currentCommunity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  // Controls whether we are searching in context or globally
  const [showCommunityContext, setShowCommunityContext] = useState(false);

  // Sync state with prop
  useEffect(() => {
    if (currentCommunity) {
      setShowCommunityContext(true);
    } else {
      setShowCommunityContext(false);
    }
  }, [currentCommunity]);

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

  const handleNormalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    if (showCommunityContext && currentCommunity) {
        alert(`正在 r/${currentCommunity.name} 内搜索: ${searchQuery} (模拟结果)`);
    } else {
        alert(`正在执行全站搜索: ${searchQuery} (模拟结果)`);
    }
  };

  const handleAiSearch = () => {
      if (!isLoggedIn) {
        onOpenLoginModal();
        return;
      }
      onNavigateToAiChat(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center px-4 justify-between transition-shadow duration-200">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 lg:gap-3">
        <button 
          className="lg:hidden p-2 hover:bg-gray-50 rounded-full text-gray-600 transition-colors"
          onClick={onToggleMobileMenu}
        >
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
      <div className="flex-1 max-w-2xl px-2 sm:px-4 lg:px-8">
        <form 
          onSubmit={handleNormalSearch} 
          className="relative group flex items-center w-full h-10 bg-gray-100/50 border border-gray-200 rounded-full hover:bg-white hover:border-broad-300 focus-within:bg-white focus-within:border-broad-500 focus-within:ring-4 focus-within:ring-broad-50 transition-all"
        >
          {/* Search Icon */}
          <div className="pl-3 text-gray-400 group-focus-within:text-broad-500 transition-colors shrink-0">
             <Search size={18} strokeWidth={2} />
          </div>

          {/* Community Chip / Pill */}
          {showCommunityContext && currentCommunity && (
              <div className="ml-2 flex items-center gap-1 bg-gray-200/80 rounded-full px-2 py-0.5 text-xs font-bold text-gray-700 animate-in fade-in zoom-in-95 duration-200 shrink-0 max-w-[150px]">
                 <span className="truncate">r/{currentCommunity.name}</span>
                 <button 
                   type="button" 
                   onClick={() => setShowCommunityContext(false)}
                   className="p-0.5 hover:bg-gray-300 rounded-full text-gray-500 transition-colors"
                 >
                    <X size={12} strokeWidth={3} />
                 </button>
              </div>
          )}
          
          {/* Input */}
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={showCommunityContext && currentCommunity ? "搜索社区内容..." : "搜索 BroadForum..."}
            className="flex-1 w-full bg-transparent border-none outline-none focus:ring-0 text-sm placeholder-gray-400 text-gray-900 px-3 h-full"
          />
          
           {/* Right Actions */}
           <div className="flex items-center gap-1 pr-1 shrink-0">
             {/* Normal Search Button (Mobile mostly, or explicit click) */}
             <button 
                type="submit"
                className="hidden sm:block p-1.5 rounded-full text-gray-400 hover:text-broad-600 hover:bg-gray-100 transition-colors"
                title="搜索"
             >
                <div className="w-0.5 h-0.5"></div> {/* Spacer or hidden visual if needed, currently reusing Search icon from left visually */}
             </button>

             <div className="w-[1px] h-5 bg-gray-200 mx-0.5 hidden sm:block"></div>

             {/* AI Search Button */}
             <button 
                type="button"
                onClick={handleAiSearch}
                className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 border border-orange-100 hover:from-orange-100 hover:to-red-100 hover:border-orange-200 transition-all group/ai"
                title="进入 AI 对话模式"
             >
                <Sparkles size={14} className="group-hover/ai:animate-pulse" />
                <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">Ask 火妙AI</span>
                <span className="text-xs font-bold whitespace-nowrap sm:hidden">AI</span>
             </button>
          </div>
        </form>
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
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-none font-bold whitespace-nowrap px-3 sm:px-4"
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
            <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-full relative transition-colors hidden sm:block">
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               <Bell size={22} strokeWidth={1.5} />
            </button>
            <button 
              onClick={onOpenCreatePost}
              className="flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors border border-transparent hover:border-gray-200"
            >
               <Plus size={22} strokeWidth={1.5} />
               <span className="text-sm font-medium hidden sm:inline">发帖</span>
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
                       onClick={() => { setIsProfileMenuOpen(false); onNavigateToManageApps(); }}
                       className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-broad-600 flex items-center gap-2 transition-colors"
                    >
                       <Box size={16} strokeWidth={1.5} />
                       管理我的应用
                    </button>
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