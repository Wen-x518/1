import React, { useState } from 'react';
import { Home, TrendingUp, Gamepad2, Trophy, HelpCircle, FileText, Briefcase, Mic, ChevronDown, ChevronUp, Star, Users, Code, Info, Globe, Cpu, Settings, Plus } from 'lucide-react';
import { Community } from '../types';

interface SidebarProps {
  currentView: 'home' | 'popular' | 'communities' | 'broad' | 'opc' | 'settings' | 'community_detail';
  onNavigate: (view: 'home' | 'popular' | 'communities' | 'broad' | 'opc') => void;
  isLoggedIn: boolean;
  myCommunities: Community[];
  onNavigateToCommunity: (community: Community) => void;
}

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-3 last:border-0">
      {title && (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 uppercase tracking-wider transition-colors"
        >
          {title}
          {isOpen ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
        </button>
      )}
      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  );
};

const SidebarItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  comingSoon?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, comingSoon, onClick }) => (
  <button 
    onClick={comingSoon ? undefined : onClick}
    disabled={comingSoon}
    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-r-full mr-2 text-left 
      ${active ? 'bg-blue-50 text-broad-600 border-l-4 border-broad-600' : 'border-l-4 border-transparent'}
      ${comingSoon ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
    `}
  >
    <span className={`${active ? 'text-broad-600' : 'text-gray-400'} ${comingSoon ? '' : 'group-hover:text-gray-600'}`}>
      {icon}
    </span>
    <span className="truncate">{label}</span>
    {comingSoon && (
      <span className="ml-auto text-[10px] leading-none px-1.5 py-1 rounded bg-gray-100 text-gray-400 border border-gray-200 font-normal whitespace-nowrap">
        待开发
      </span>
    )}
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isLoggedIn, myCommunities, onNavigateToCommunity }) => {
  return (
    <nav className="w-64 flex-shrink-0 bg-white border-r border-gray-100 h-[calc(100vh-64px)] sticky top-[64px] overflow-y-auto hidden lg:block custom-scrollbar pt-4 select-none">
      <div className="pb-2">
        <SidebarItem 
          icon={<Home size={20} strokeWidth={1.5} />} 
          label="主页" 
          active={currentView === 'home'} 
          onClick={() => onNavigate('home')}
        />
        <SidebarItem 
          icon={<TrendingUp size={20} strokeWidth={1.5} />} 
          label="热门" 
          active={currentView === 'popular'} 
          onClick={() => onNavigate('popular')}
        />
        <SidebarItem 
          icon={<Users size={20} strokeWidth={1.5} />} 
          label="社区广场" 
          active={currentView === 'communities'} 
          onClick={() => onNavigate('communities')}
        />
      </div>

      {/* Conditional Rendering: My Communities (Only when logged in) */}
      {isLoggedIn && (
        <SidebarSection title="我的社区">
           <SidebarItem 
              icon={<Settings size={20} strokeWidth={1.5} />} 
              label="管理社区" 
              onClick={() => {}}
           />
           {myCommunities.map(community => (
             <SidebarItem 
                key={community.id}
                icon={<img src={community.icon} className="w-5 h-5 rounded-full object-cover" alt="" />} 
                label={community.name} 
                onClick={() => onNavigateToCommunity(community)}
             />
           ))}
           {myCommunities.length === 0 && (
             <div className="px-4 py-2 text-xs text-gray-400 italic">暂未加入任何社区</div>
           )}
        </SidebarSection>
      )}

      <SidebarSection title="主题板块">
        {/* Active Custom Sections */}
        {/* BROAD 视界 Removed as per request */}
        
        <SidebarItem 
          icon={<Cpu size={20} strokeWidth={1.5} />} 
          label="OPC 开放平台" 
          active={currentView === 'opc'} 
          onClick={() => onNavigate('opc')} 
        />
        
        {/* Coming Soon Sections */}
        <div className="my-2 border-t border-gray-50"></div>
        <SidebarItem icon={<Gamepad2 size={20} strokeWidth={1.5} />} label="游戏世界" comingSoon />
        <SidebarItem icon={<Trophy size={20} strokeWidth={1.5} />} label="体育竞技" comingSoon />
        <SidebarItem icon={<Briefcase size={20} strokeWidth={1.5} />} label="商业财经" comingSoon />
        <SidebarItem icon={<Code size={20} strokeWidth={1.5} />} label="编程技术" comingSoon />
        <SidebarItem icon={<Star size={20} strokeWidth={1.5} />} label="影视娱乐" comingSoon />
        <SidebarItem icon={<Mic size={20} strokeWidth={1.5} />} label="播客访谈" comingSoon />
      </SidebarSection>

      <SidebarSection title="平台资源">
        <SidebarItem icon={<Info size={18} strokeWidth={1.5} />} label="关于我们" comingSoon />
        <SidebarItem icon={<HelpCircle size={18} strokeWidth={1.5} />} label="帮助中心" comingSoon />
        <SidebarItem icon={<FileText size={18} strokeWidth={1.5} />} label="官方博客" comingSoon />
        <SidebarItem icon={<Briefcase size={18} strokeWidth={1.5} />} label="加入我们" comingSoon />
      </SidebarSection>
      
      <div className="px-4 py-8 text-xs text-gray-300">
        <p>BROADFORUM © 2024.</p>
        <p className="mt-1">汇聚多元视角，连接无限可能。</p>
      </div>
    </nav>
  );
};