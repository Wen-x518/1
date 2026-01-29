import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { CommunityDetail } from './components/CommunityDetail';
import { LoginModal } from './components/LoginModal';
import { CreatePostModal } from './components/CreatePostModal';
import { SettingsView } from './components/SettingsView';
import { UploadAppModal } from './components/UploadAppModal';
import { AiChatView } from './components/AiChatView';
import { Post, Community, OpcApp } from './types';
import { Rocket, Flame, Clock, Grid, LayoutList, Search, Users, Globe, MessageCircle, Cpu, UploadCloud, Folder, FileCode, Server, Star, GitFork, Activity, ChevronRight, Hash, MessageSquare, Check, MailOpen, Box, ExternalLink, ShieldCheck, User as UserIcon, Pencil, Trash2, ArrowLeft, Settings, Trophy } from 'lucide-react';
import { Button } from './components/Button';

// Mock Data: Home Feed
const HOME_POSTS: Post[] = [
  {
    id: '1',
    subreddit: '能源',
    subredditIcon: 'https://picsum.photos/40/40?random=101',
    author: 'EcoWarrior',
    timeAgo: '4小时前',
    title: '分布式光伏在城市建筑中的应用前景探讨',
    image: 'https://picsum.photos/800/400?random=2',
    upvotes: 14500,
    comments: 890,
    isJoined: true,
    content: "随着城市化进程加快，如何在有限的建筑表面积上最大化利用太阳能成为热门话题。本文分析了最新的柔性光伏材料效率数据，以及与传统玻璃幕墙结合的成本效益比。"
  },
  {
    id: '2',
    subreddit: '活楼',
    subredditIcon: 'https://picsum.photos/40/40?random=104',
    author: 'BuildTech_01',
    timeAgo: '9小时前',
    title: '不锈钢芯板建筑结构的抗震性能测试报告',
    content: '我们最近对新型活楼模块进行了 9 级地震模拟测试。结果令人惊讶，结构完整性保持率达到了 98% 以上。详细数据请见附件。相比传统混凝土结构，这种新材料的韧性极大地提升了安全系数。',
    upvotes: 5597,
    comments: 2734,
    isJoined: false
  },
];

// Mock Data: Popular Feed
const POPULAR_POSTS: Post[] = [
  {
    id: '101',
    subreddit: '空气',
    subredditIcon: 'https://picsum.photos/40/40?random=105',
    author: 'FreshAir_Fan',
    timeAgo: '2小时前',
    title: '室内静电除尘技术 vs HEPA 滤网：长期成本分析',
    image: 'https://picsum.photos/800/500?random=21',
    upvotes: 45200,
    comments: 1200,
    isJoined: false,
    content: '静电除尘虽然前期投入较高，但无耗材的特性使其在5年周期的TCO（总拥有成本）上具有显著优势。'
  },
  {
    id: '3',
    subreddit: '管脑',
    subredditIcon: 'https://picsum.photos/40/40?random=108',
    author: 'IoT_Engineer',
    timeAgo: '3小时前',
    title: '利用 LoRaWAN 实现大规模传感器组网的实践',
    image: 'https://picsum.photos/800/400?random=5',
    upvotes: 8200,
    comments: 1200,
    isJoined: true,
    content: "在复杂的工业环境中，无线信号的穿透力是关键。我们分享了在 50 万平米厂房内部署管脑系统的经验，包括网关点位规划和信号干扰排查。"
  },
];

// Updated Mock Data: Specific Communities
const COMMUNITIES_DATA: Community[] = [
  { id: 'c1', name: '能源', desc: '聚焦清洁能源、分布式能源及能源管理系统。', members: '12.5k', icon: 'https://picsum.photos/60/60?random=101' },
  { id: 'c2', name: '空调', desc: '暖通空调技术、非电空调与节能温控方案讨论。', members: '8.2k', icon: 'https://picsum.photos/60/60?random=102' },
  { id: 'c4', name: '活楼', desc: '工厂化建筑、不锈钢芯板结构与未来居住形态。', members: '9.8k', icon: 'https://picsum.photos/60/60?random=104' },
  { id: 'c5', name: '空气', desc: '室内空气品质、新风系统与洁净技术研究。', members: '11k', icon: 'https://picsum.photos/60/60?random=105' },
  { id: 'c6', name: '酒店运营', desc: '智能化酒店管理、客户体验与绿色运营模式。', members: '5.4k', icon: 'https://picsum.photos/60/60?random=106' },
  { id: 'c7', name: '集团综合', desc: '企业文化、集团新闻与跨部门综合事务交流。', members: '22k', icon: 'https://picsum.photos/60/60?random=107' },
  { id: 'c8', name: '管脑', desc: '物联网控制中心、数据可视化与楼宇自控系统。', members: '7.6k', icon: 'https://picsum.photos/60/60?random=108' },
  { id: 'c9', name: '可建', desc: '可持续建筑技术、BCORE 材料应用与施工案例。', members: '10.2k', icon: 'https://picsum.photos/60/60?random=109' },
  { id: 'c10', name: '再生资源', desc: '废旧物资回收、循环经济与环保再生技术。', members: '6.5k', icon: 'https://picsum.photos/60/60?random=110' },
  // Feedback Community Added
  { id: 'c11', name: '意见反馈', desc: '您的声音是我们进步的动力。欢迎在此反馈 Bug、提出建议。', members: '1.2k', icon: 'https://picsum.photos/60/60?random=999' },
];

const FilterButton: React.FC<{ active?: boolean; icon?: React.ReactNode; label: string; onClick?: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-full font-bold text-sm transition-all duration-200 border ${active ? 'bg-blue-50 text-broad-600 border-blue-100' : 'text-gray-500 hover:bg-gray-50 border-transparent hover:border-gray-100'}`}
  >
    {icon}
    {label}
  </button>
);

type ViewMode = 'home' | 'popular' | 'communities' | 'broad' | 'opc' | 'manage_apps' | 'post_detail' | 'settings' | 'community_detail' | 'ai_chat';
type SortMode = 'best' | 'hot' | 'new' | 'top';

export const App: React.FC = () => {
  const [cardViewMode, setCardViewMode] = useState<'card' | 'compact'>('card');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State
  const [createPostDefaultId, setCreatePostDefaultId] = useState<string | undefined>(undefined);
  
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [sortMode, setSortMode] = useState<SortMode>('hot'); // Add sort state

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  
  // AI Chat State
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);

  // OPC State
  const [opcApps, setOpcApps] = useState<OpcApp[]>([
      { id: '1', name: 'B-Core Design Tool', type: 'official', url: 'https://example.com/bcore', desc: '官方提供的芯板结构设计辅助工具，支持在线计算载荷。', stars: 1200 },
      { id: '2', name: 'Broad Link', type: 'official', url: 'https://example.com/link', desc: '设备互联调试助手，支持 Modbus/TCP 协议测试。', stars: 850 },
      { id: '3', name: 'Energy V', type: 'community', url: 'https://example.com/energyv', desc: '由社区开发者上传的简易能耗可视化看板，适用于小型项目。', stars: 45, author: 'Dev_Lee' },
  ]);
  const [opcCategory, setOpcCategory] = useState<'all' | 'official' | 'community'>('all');
  const [isUploadAppModalOpen, setIsUploadAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<OpcApp | null>(null);

  // User State
  const [currentUser, setCurrentUser] = useState({
    displayName: 'User_99',
    avatar: 'https://picsum.photos/100/100',
    bio: 'Exploring the future of tech and sustainable living.',
    email: 'user99@example.com'
  });
  
  // State for joined communities
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setJoinedCommunities([]);
    setCurrentView('home'); 
    setIsMobileMenuOpen(false);
  };

  const handleUpdateUser = (updatedUser: typeof currentUser) => {
    setCurrentUser(updatedUser);
  };

  const handleToggleJoinCommunity = (community: Community) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    const isJoined = joinedCommunities.some(c => c.id === community.id);
    if (isJoined) {
      setJoinedCommunities(prev => prev.filter(c => c.id !== community.id));
    } else {
      setJoinedCommunities(prev => [...prev, community]);
    }
  };

  const handleOpenPost = (post: Post) => {
    setSelectedPost(post);
    setCurrentView('post_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCommunity = (community: Community) => {
    setSelectedCommunity(community);
    setCurrentView('community_detail');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    // Reset sort when switching views for cleaner UX
    setSortMode('hot');
    setIsMobileMenuOpen(false);
    if (view !== 'post_detail') {
      setSelectedPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigateToAiChat = (initialQuery?: string) => {
      setAiInitialQuery(initialQuery);
      setCurrentView('ai_chat');
      setIsMobileMenuOpen(false);
  };

  // Handles both Creation and Update
  const handleSaveApp = (name: string, url: string, desc: string) => {
      if (editingApp) {
          // Update
          setOpcApps(prev => prev.map(app => 
              app.id === editingApp.id 
                  ? { ...app, name, url, desc } 
                  : app
          ));
      } else {
          // Create
          const newApp: OpcApp = {
              id: Date.now().toString(),
              name,
              url,
              desc: desc || '用户上传的应用',
              type: 'community',
              stars: 0,
              author: currentUser.displayName
          };
          setOpcApps([newApp, ...opcApps]);
      }
      // Reset is handled by modal close logic implicitly, but let's be safe
      setEditingApp(null);
  };

  const handleDeleteApp = (appId: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (window.confirm('确定要删除这个应用吗？此操作无法撤销。')) {
          setOpcApps(prev => prev.filter(app => app.id !== appId));
      }
  };

  const handleEditApp = (app: OpcApp, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setEditingApp(app);
      setIsUploadAppModalOpen(true);
  };

  const renderContent = () => {
    // --- SETTINGS VIEW ---
    if (currentView === 'settings') {
      return (
        <SettingsView 
          user={currentUser} 
          onSave={handleUpdateUser} 
        />
      );
    }

    // --- AI CHAT VIEW ---
    if (currentView === 'ai_chat') {
        return (
            <AiChatView 
                initialQuery={aiInitialQuery} 
                currentUser={isLoggedIn ? currentUser : undefined} 
            />
        );
    }

    // --- POST DETAIL VIEW ---
    if (currentView === 'post_detail' && selectedPost) {
      return (
        <PostDetail 
          post={selectedPost} 
          onBack={() => {
             // Return to the previous relevant view context
             if (selectedCommunity) {
               setCurrentView('community_detail');
             } else {
               handleNavigate('home');
             }
          }} 
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onNavigateToCommunity={handleNavigateToCommunity}
          allCommunities={COMMUNITIES_DATA}
        />
      );
    }

    // --- COMMUNITY DETAIL VIEW ---
    if (currentView === 'community_detail' && selectedCommunity) {
      // Filter posts for this community. Match by subreddit name.
      const allPosts = [...HOME_POSTS, ...POPULAR_POSTS];
      // De-duplicate in case post is in both lists (mock data)
      const uniquePosts = Array.from(new Map(allPosts.map(p => [p.id, p])).values());
      const communityPosts = uniquePosts.filter(p => p.subreddit === selectedCommunity.name);
      const isJoined = joinedCommunities.some(c => c.id === selectedCommunity.id);

      return (
        <CommunityDetail 
          community={selectedCommunity}
          posts={communityPosts}
          isJoined={isJoined}
          onToggleJoin={() => handleToggleJoinCommunity(selectedCommunity)}
          onOpenPost={handleOpenPost}
          onOpenCreatePost={() => setIsCreatePostModalOpen(true)}
          cardViewMode={cardViewMode}
        />
      );
    }

    // --- BROAD VIEW ---
    if (currentView === 'broad') {
        return <div>Broad View Removed</div>;
    }

    // --- OPC VIEW ---
    if (currentView === 'opc') {
       const filteredApps = opcCategory === 'all' ? opcApps : opcApps.filter(app => app.type === opcCategory);

       return (
         <div className="animate-in fade-in duration-300 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg shadow-gray-200">
                           <Box size={24} strokeWidth={2} />
                        </div>
                        OPC 开放平台
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-xl text-base leading-relaxed">
                        汇聚官方与社区开发的实用工具。在这里发现能提升效率的应用，或分享您的作品。
                    </p>
                 </div>
                 <div className="flex gap-3 shrink-0">
                    <Button 
                        variant="secondary" 
                        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm px-4 py-2.5 rounded-full"
                        onClick={() => {
                            if (isLoggedIn) {
                                setCurrentView('manage_apps');
                            } else {
                                setIsLoginModalOpen(true);
                            }
                        }}
                    >
                        <Settings size={18} className="mr-2" />
                        管理我的应用
                    </Button>
                    <Button 
                        variant="primary" 
                        className="bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200 border-none px-6 py-2.5 rounded-full"
                        onClick={() => {
                            if (isLoggedIn) {
                                setEditingApp(null);
                                setIsUploadAppModalOpen(true);
                            } else {
                                setIsLoginModalOpen(true);
                            }
                        }}
                    >
                        <UploadCloud size={18} className="mr-2" />
                        上传应用
                    </Button>
                 </div>
              </div>
              
              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
                 <FilterButton label="全部应用" active={opcCategory === 'all'} onClick={() => setOpcCategory('all')} />
                 <FilterButton label="官方应用" active={opcCategory === 'official'} onClick={() => setOpcCategory('official')} icon={<ShieldCheck size={16} />} />
                 <FilterButton label="社区贡献" active={opcCategory === 'community'} onClick={() => setOpcCategory('community')} icon={<Users size={16} />} />
              </div>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {filteredApps.map(app => (
                 <div key={app.id} className="relative bg-white border border-gray-100 rounded-xl p-5 hover:border-broad-300 hover:shadow-md transition-all group flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-start justify-between mb-3">
                           <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                               {app.type === 'official' ? <Box size={24} /> : <Cpu size={24} />}
                           </div>
                           <div className={`text-[10px] font-bold px-2 py-0.5 rounded border ${app.type === 'official' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                              {app.type === 'official' ? 'OFFICIAL' : 'COMMUNITY'}
                           </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-broad-600 transition-colors line-clamp-1 pr-1">{app.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px] leading-relaxed">
                           {app.desc}
                        </p>
                    </div>
                    
                    <div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                            {app.type === 'community' && app.author ? (
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                   <UserIcon size={12} />
                                   <span>{app.author}</span>
                                </div>
                            ) : (
                                <div className="text-xs text-gray-400 italic">Broad Official</div>
                            )}
                            <a 
                              href={app.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-xs font-bold bg-gray-100 hover:bg-broad-600 hover:text-white text-gray-700 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                            >
                               打开 <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                 </div>
               ))}
               
               {filteredApps.length === 0 && (
                   <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <p>暂无相关应用</p>
                   </div>
               )}
            </div>
         </div>
       );
    }

    // --- MANAGE APPS VIEW ---
    if (currentView === 'manage_apps') {
        const myApps = opcApps.filter(app => app.author === currentUser.displayName || app.type === 'official' /* Show official as demo for simplicity if user is admin mock */).filter(app => app.type === 'community');

        return (
            <div className="animate-in fade-in duration-300 pb-10">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                         <button 
                            onClick={() => setCurrentView('opc')}
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-900 mb-2 transition-colors"
                        >
                            <ArrowLeft size={16} /> 返回广场
                        </button>
                        <h2 className="text-2xl font-extrabold text-gray-900">应用管理控制台</h2>
                        <p className="text-gray-500 text-sm mt-1">查看、编辑或下架您发布的应用。</p>
                    </div>
                    <Button 
                        variant="primary" 
                        className="bg-broad-600 hover:bg-broad-700 text-white shadow-md rounded-full"
                        onClick={() => {
                            setEditingApp(null);
                            setIsUploadAppModalOpen(true);
                        }}
                    >
                        <UploadCloud size={18} className="mr-2" />
                        发布新应用
                    </Button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {myApps.length > 0 ? (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-gray-900">应用名称</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">状态</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">链接</th>
                                    <th className="px-6 py-4 font-bold text-gray-900 text-right">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {myApps.map(app => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <Cpu size={16} />
                                                </div>
                                                <span className="font-bold text-gray-900">{app.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                已发布
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                                            {app.url}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleEditApp(app)}
                                                    className="p-2 text-gray-500 hover:text-broad-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                                    title="编辑信息"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteApp(app.id)}
                                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                    title="删除应用"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Cpu size={32} />
                            </div>
                            <h3 className="text-gray-900 font-bold mb-1">暂无发布的应用</h3>
                            <p className="text-gray-500 text-sm mb-6">您还没有上传任何应用到 OPC 平台。</p>
                            <Button 
                                variant="outline"
                                onClick={() => {
                                    setEditingApp(null);
                                    setIsUploadAppModalOpen(true);
                                }}
                            >
                                立即发布
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- COMMUNITIES VIEW ---
    if (currentView === 'communities') {
      return (
        <div className="animate-in fade-in duration-300">
           {/* Feedback Collection Section */}
           <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                 {/* Decorative background circle */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-broad-600 shadow-sm shrink-0">
                       <MailOpen size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-gray-900 mb-1">意见收集箱</h3>
                       <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                          我们致力于打造更优质的社区体验。如果您有任何建议、功能请求或发现 Bug，欢迎随时告诉我们。您的每一条反馈都至关重要！
                       </p>
                    </div>
                 </div>
                 
                 <div className="relative z-10 shrink-0">
                    <Button 
                       variant="secondary"
                       className="bg-white text-broad-600 hover:bg-white/80 border border-broad-200 hover:border-broad-300 shadow-sm px-6"
                       onClick={() => {
                         // Find the feedback community
                         const feedbackComm = COMMUNITIES_DATA.find(c => c.name === '意见反馈');
                         if (feedbackComm) {
                             if (!isLoggedIn) {
                                 setIsLoginModalOpen(true);
                                 return;
                             }
                             // Open create post modal with Feedback community selected
                             setCreatePostDefaultId(feedbackComm.id);
                             setIsCreatePostModalOpen(true);
                         }
                       }}
                    >
                       去反馈
                    </Button>
                 </div>
              </div>
           </div>

          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users size={24} className="text-broad-600" />
              发现社区
            </h2>
            <div className="relative hidden sm:block">
              <input type="text" placeholder="查找社区..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-broad-400 w-48 transition-all" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMUNITIES_DATA.map(community => {
               const isJoined = joinedCommunities.some(c => c.id === community.id);
               return (
                <div key={community.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-broad-300 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between">
                  <div onClick={() => handleNavigateToCommunity(community)} className="cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <img src={community.icon} alt={community.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" />
                      <Button 
                        variant={isJoined ? "outline" : "outline"} 
                        size="sm" 
                        className={`rounded-full px-4 font-bold transition-all ${isJoined ? 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:text-red-500' : 'hover:bg-broad-50 hover:text-broad-600'}`}
                        onClick={(e) => { e.stopPropagation(); handleToggleJoinCommunity(community); }}
                      >
                        {isJoined ? (
                          <span className="flex items-center gap-1 group-hover:hidden"><Check size={14}/> 已加入</span>
                        ) : (
                          "加入"
                        )}
                        {isJoined && <span className="hidden group-hover:inline">退出</span>}
                      </Button>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-broad-600 transition-colors">{community.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{community.members} 成员</p>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{community.desc}</p>
                  </div>
                </div>
            )})}
          </div>
        </div>
      );
    }

    // --- HOME / POPULAR VIEW (Default Fallthrough) ---
    const postsToDisplay = currentView === 'popular' ? POPULAR_POSTS : HOME_POSTS;

    return (
        <div className="animate-in fade-in duration-300">
           {/* Filters */}
           <div className="mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
             <FilterButton label="最热" active={sortMode === 'hot'} onClick={() => setSortMode('hot')} icon={<Flame size={16} />} />
             <FilterButton label="最新" active={sortMode === 'new'} onClick={() => setSortMode('new')} icon={<Clock size={16} />} />
             <FilterButton label="上升" active={sortMode === 'top'} onClick={() => setSortMode('top')} icon={<Rocket size={16} />} />
             
             <div className="ml-auto flex items-center gap-2">
                <button 
                  onClick={() => setCardViewMode('card')}
                  className={`p-2 rounded hover:bg-gray-100 ${cardViewMode === 'card' ? 'text-broad-600 bg-blue-50' : 'text-gray-400'}`}
                >
                    <Grid size={18} />
                </button>
                <button 
                  onClick={() => setCardViewMode('compact')}
                  className={`p-2 rounded hover:bg-gray-100 ${cardViewMode === 'compact' ? 'text-broad-600 bg-blue-50' : 'text-gray-400'}`}
                >
                    <LayoutList size={18} />
                </button>
             </div>
           </div>
           
           {/* Posts */}
           <div className="space-y-2 sm:space-y-4">
               {postsToDisplay.map(post => (
                   <PostCard 
                      key={post.id} 
                      post={post} 
                      viewMode={cardViewMode}
                      onClick={() => handleOpenPost(post)}
                      onCommunityClick={(e) => {
                          e.stopPropagation();
                          const comm = COMMUNITIES_DATA.find(c => c.name === post.subreddit);
                          if (comm) handleNavigateToCommunity(comm);
                      }}
                   />
               ))}
           </div>
        </div>
    );
  };

  return (
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar 
          isLoggedIn={isLoggedIn} 
          currentUser={currentUser}
          onOpenLoginModal={() => setIsLoginModalOpen(true)} 
          onOpenCreatePost={() => setIsCreatePostModalOpen(true)}
          onLogout={handleLogout}
          onNavigateToSettings={() => handleNavigate('settings')}
          onNavigateToManageApps={() => handleNavigate('manage_apps')}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateToAiChat={handleNavigateToAiChat}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          currentCommunity={currentView === 'community_detail' && selectedCommunity ? selectedCommunity : undefined}
        />
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        <CreatePostModal 
          isOpen={isCreatePostModalOpen}
          onClose={() => {
              setIsCreatePostModalOpen(false);
              setCreatePostDefaultId(undefined); // Reset
          }}
          communities={COMMUNITIES_DATA}
          defaultCommunityId={createPostDefaultId || (currentView === 'community_detail' && selectedCommunity ? selectedCommunity.id : undefined)}
        />

        <UploadAppModal 
          isOpen={isUploadAppModalOpen}
          onClose={() => {
              setIsUploadAppModalOpen(false);
              setEditingApp(null);
          }}
          onSubmit={handleSaveApp}
          initialData={editingApp ? { name: editingApp.name, url: editingApp.url, desc: editingApp.desc } : undefined}
        />

        <div className="flex justify-center max-w-[1600px] mx-auto pt-[64px]">
          {/* Sidebar with Mobile Support */}
          <Sidebar 
            currentView={currentView as any} 
            onNavigate={(view) => handleNavigate(view)} 
            isLoggedIn={isLoggedIn}
            myCommunities={joinedCommunities}
            onNavigateToCommunity={handleNavigateToCommunity}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Main Content */}
          <main className={`flex-1 w-full ${currentView === 'ai_chat' ? 'px-0 max-w-full' : 'max-w-[900px] px-0 sm:px-6'} py-6 min-w-0 border-x-0 sm:border-x border-gray-100/50`}>
            {renderContent()}
          </main>

          {/* Right Sidebar - Pass Communities Data Slice & View All Handler */}
          {/* Only show Right Sidebar if NOT in AI Chat view to maximize focus space */}
          {currentView !== 'ai_chat' && (
            <RightSidebar 
              communities={COMMUNITIES_DATA.slice(0, 5)} 
              onViewAll={() => handleNavigate('communities')}
              onNavigateToCommunity={handleNavigateToCommunity}
            />
          )}
        </div>
      </div>
  );
};