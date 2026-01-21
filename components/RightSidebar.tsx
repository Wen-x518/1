import React from 'react';
import { Button } from './Button';
import { Community } from '../types';
import { ShieldCheck, Info } from 'lucide-react';

interface RightSidebarProps {
  communities: Community[];
  onViewAll?: () => void;
  onNavigateToCommunity: (community: Community) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ communities, onViewAll, onNavigateToCommunity }) => {
  return (
    <aside className="w-[312px] flex-shrink-0 hidden xl:block py-6 pr-6 space-y-4 pl-4 border-l border-gray-100/50">
      {/* Community Card */}
      <div className="bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
           <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">热门社区</h2>
           <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" strokeWidth={1.5} />
        </div>
        <ul className="divide-y divide-gray-100">
          {communities.map((comm) => (
            <li 
              key={comm.id} 
              className="flex items-center justify-between px-4 py-3 hover:bg-white cursor-pointer transition-colors group"
              onClick={() => onNavigateToCommunity(comm)}
            >
              <div className="flex items-center gap-3">
                <img src={comm.icon} alt={comm.name} className="w-8 h-8 rounded-full border border-gray-100 object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 group-hover:underline decoration-gray-300">{comm.name}</span>
                  <span className="text-xs text-gray-400">{comm.members} 成员</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-3">
          <Button 
            variant="outline" 
            className="w-full text-sm py-2 border-gray-200 text-gray-600 hover:text-broad-600 hover:border-broad-300"
            onClick={onViewAll}
          >
            查看更多
          </Button>
        </div>
      </div>

      {/* Premium / Ad Placeholder */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl border border-gray-100 p-4 relative overflow-hidden group hover:border-broad-200 transition-colors shadow-sm">
        <div className="flex items-center gap-2 mb-2 relative z-10">
             <ShieldCheck className="text-broad-600" size={20} strokeWidth={1.5} />
             <span className="font-bold text-xs text-gray-900 tracking-wide">BROAD PREMIUM</span>
        </div>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed relative z-10">支持独立思考，享受无干扰的阅读空间。</p>
        <Button 
          variant="secondary" 
          disabled
          className="w-full text-sm relative z-10 bg-gray-200 text-gray-400 cursor-not-allowed border-none shadow-none"
        >
          待开发
        </Button>
      </div>

      {/* Footer Links */}
      <div className="text-xs text-gray-400 px-2 space-y-3 sticky top-[80px]">
         <div className="pt-3 border-t border-gray-100">
            BROADFORUM © 2024. All rights reserved.
         </div>
      </div>
    </aside>
  );
};