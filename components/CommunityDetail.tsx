import React from 'react';
import { Post, Community } from '../types';
import { PostCard } from './PostCard';
import { Button } from './Button';
import { Bell, MoreHorizontal, Cake, Users, Info, Check, Plus, Pin, MessageSquare } from 'lucide-react';

interface CommunityDetailProps {
  community: Community;
  posts: Post[];
  isJoined: boolean;
  onToggleJoin: () => void;
  onOpenPost: (post: Post) => void;
  onOpenCreatePost: () => void;
  cardViewMode: 'card' | 'compact';
}

export const CommunityDetail: React.FC<CommunityDetailProps> = ({ 
  community, 
  posts, 
  isJoined, 
  onToggleJoin, 
  onOpenPost,
  onOpenCreatePost,
  cardViewMode
}) => {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Community Header / Banner */}
      <div className="-mx-0 sm:-mx-6 -mt-6 mb-4">
         {/* Banner Image (Gradient fallback) */}
         <div className="h-24 sm:h-36 bg-gradient-to-r from-broad-600 to-blue-400 w-full"></div>
         
         {/* Header Info Bar */}
         <div className="bg-white px-4 sm:px-6 pb-4">
            <div className="max-w-[900px] mx-auto relative flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-8 sm:-mt-5">
               {/* Icon */}
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full p-1 shadow-md shrink-0">
                  <img src={community.icon} alt={community.name} className="w-full h-full rounded-full object-cover" />
               </div>
               
               {/* Title & Actions */}
               <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
                  <div className="mb-1">
                     <h1 className="text-2xl font-extrabold text-gray-900 leading-none">{community.name}</h1>
                     <p className="text-sm text-gray-500 font-medium">r/{community.name}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <Button 
                       variant={isJoined ? "outline" : "primary"} 
                       className={`rounded-full px-6 font-bold shadow-sm ${isJoined ? 'hover:text-red-600 hover:border-red-200 hover:bg-red-50' : 'bg-broad-600 hover:bg-broad-700'}`}
                       onClick={onToggleJoin}
                     >
                       {isJoined ? '已加入' : '加入社区'}
                     </Button>
                     <button className="p-2 border border-broad-600 text-broad-600 rounded-full hover:bg-broad-50 transition-colors">
                        <Bell size={18} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left: Feed */}
         <div className="lg:col-span-2 space-y-4">
             {/* Pinned Post (Thumbnail Style) */}
             <div 
               className="bg-white border border-gray-100 rounded-lg p-3 hover:border-broad-300 transition-all cursor-pointer shadow-sm group"
               onClick={() => alert('Opening Pinned Post...')}
             >
                 <div className="flex items-start gap-3">
                     {/* Thumbnail */}
                     <div className="w-[70px] h-[50px] bg-gray-100 rounded border border-gray-200 overflow-hidden shrink-0 relative">
                        <img src={community.icon} className="w-full h-full object-cover opacity-80 blur-[1px]" alt="Pinned" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <Pin size={18} className="text-green-500 fill-green-500 drop-shadow-sm transform -rotate-45" />
                        </div>
                     </div>
                     
                     {/* Content */}
                     <div className="flex-1 min-w-0 flex flex-col justify-center h-[50px]">
                         <div className="flex items-center gap-2 mb-1">
                             <span className="text-[10px] font-bold text-green-700 border border-green-200 bg-green-50 px-1.5 rounded-[4px] leading-none py-0.5">置顶</span>
                             <h3 className="text-sm font-bold text-gray-900 group-hover:text-broad-600 truncate leading-none">
                                欢迎来到 r/{community.name}！新人必读指南 & 版规说明
                             </h3>
                         </div>
                         <div className="flex items-center gap-3 text-xs text-gray-400">
                             <span>u/ModTeam • 2天前</span>
                             <span className="flex items-center gap-1">
                                <MessageSquare size={12} /> 45 条评论
                             </span>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Posts */}
             <div className={`space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden bg-white ${posts.length === 0 ? 'p-8 text-center' : ''}`}>
                 {posts.length > 0 ? (
                    posts.map(post => (
                       <PostCard 
                          key={post.id} 
                          post={post} 
                          viewMode={cardViewMode}
                          onClick={() => onOpenPost(post)}
                       />
                    ))
                 ) : (
                    <div className="text-gray-500">
                       <p className="font-bold text-lg mb-2">这里还很空旷</p>
                       <p className="text-sm">成为第一个在这个社区发帖的人吧！</p>
                    </div>
                 )}
             </div>
         </div>

         {/* Right: About Sidebar */}
         <div className="hidden lg:block space-y-4">
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
               <div className="bg-broad-600 px-4 py-3 flex items-center justify-between">
                  <span className="text-white font-bold text-sm">关于社区</span>
                  <MoreHorizontal className="text-white/80 cursor-pointer" size={16} />
               </div>
               <div className="p-4">
                  <div className="flex items-center gap-3 mb-4 text-gray-900 font-medium">
                     <img src={community.icon} className="w-8 h-8 rounded-full" />
                     r/{community.name}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                     {community.desc || "欢迎来到这个社区，在这里分享你的观点和发现。"}
                  </p>
                  
                  <div className="flex items-center gap-8 mb-4 border-b border-gray-100 pb-4">
                     <div>
                        <div className="text-base font-bold text-gray-900">{community.members}</div>
                        <div className="text-xs text-gray-500">成员</div>
                     </div>
                     <div>
                        <div className="text-base font-bold text-gray-900 flex items-center gap-1">
                           <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                           128
                        </div>
                        <div className="text-xs text-gray-500">在线</div>
                     </div>
                  </div>

                  <div className="space-y-3 mb-6">
                     <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Cake size={16} />
                        创建于 2023年 10月
                     </div>
                  </div>

                  <Button className="w-full bg-broad-600 hover:bg-broad-700" onClick={onOpenCreatePost}>创建帖子</Button>
               </div>
            </div>

            {/* Rules (Mock) */}
            <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                <h3 className="font-bold text-sm text-gray-900 mb-3 border-b border-gray-100 pb-2">r/{community.name} 版规</h3>
                <ol className="list-decimal list-inside space-y-2 text-xs text-gray-600 font-medium">
                   <li className="p-1 hover:bg-gray-50 rounded">保持友善，禁止人身攻击</li>
                   <li className="p-1 hover:bg-gray-50 rounded">发布内容需与主题相关</li>
                   <li className="p-1 hover:bg-gray-50 rounded">禁止发布垃圾广告</li>
                   <li className="p-1 hover:bg-gray-50 rounded">尊重版权和原创</li>
                </ol>
            </div>
         </div>
      </div>
    </div>
  );
};