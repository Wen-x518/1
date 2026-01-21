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
import { Post, Community } from './types';
import { Rocket, Flame, Clock, Grid, LayoutList, Search, Users, Globe, MessageCircle, Cpu, UploadCloud, Folder, FileCode, Server, Star, GitFork, Activity, ChevronRight, Hash, MessageSquare, Check } from 'lucide-react';
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
  {
    id: '4',
    subreddit: 'OPC',
    subredditIcon: 'https://picsum.photos/40/40?random=103',
    author: 'DevOps_Master',
    timeAgo: '1小时前',
    title: '发布 OPC UA 协议的新版网关适配器',
    content: '修复了在断网重连时的丢包问题，并优化了多线程数据采集的性能。欢迎社区测试并反馈。我们特别增强了边缘端的缓存机制，确保数据在网络抖动时零丢失。',
    upvotes: 450,
    comments: 89,
    isJoined: true
  }
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

// Updated Mock Data: Specific Communities requested by user
const COMMUNITIES_DATA: Community[] = [
  { id: 'c1', name: '能源', desc: '聚焦清洁能源、分布式能源及能源管理系统。', members: '12.5k', icon: 'https://picsum.photos/60/60?random=101' },
  { id: 'c2', name: '空调', desc: '暖通空调技术、非电空调与节能温控方案讨论。', members: '8.2k', icon: 'https://picsum.photos/60/60?random=102' },
  { id: 'c3', name: 'OPC', desc: '工业互联、开放平台通信与边缘计算技术。', members: '15k', icon: 'https://picsum.photos/60/60?random=103' },
  { id: 'c4', name: '活楼', desc: '工厂化建筑、不锈钢芯板结构与未来居住形态。', members: '9.8k', icon: 'https://picsum.photos/60/60?random=104' },
  { id: 'c5', name: '空气', desc: '室内空气品质、新风系统与洁净技术研究。', members: '11k', icon: 'https://picsum.photos/60/60?random=105' },
  { id: 'c6', name: '酒店运营', desc: '智能化酒店管理、客户体验与绿色运营模式。', members: '5.4k', icon: 'https://picsum.photos/60/60?random=106' },
  { id: 'c7', name: '集团综合', desc: '企业文化、集团新闻与跨部门综合事务交流。', members: '22k', icon: 'https://picsum.photos/60/60?random=107' },
  { id: 'c8', name: '管脑', desc: '物联网控制中心、数据可视化与楼宇自控系统。', members: '7.6k', icon: 'https://picsum.photos/60/60?random=108' },
  { id: 'c9', name: '可建', desc: '可持续建筑技术、BCORE 材料应用与施工案例。', members: '10.2k', icon: 'https://picsum.photos/60/60?random=109' },
  { id: 'c10', name: '再生资源', desc: '废旧物资回收、循环经济与环保再生技术。', members: '6.5k', icon: 'https://picsum.photos/60/60?random=110' },
];

// Mock Data: OPC Projects
const OPC_PROJECTS = [
  { id: 'o1', name: 'Edge Server X1', type: 'hardware', status: '进行中', desc: '专为边缘计算设计的低功耗服务器蓝图，支持 5G 模组。', stars: 230, forks: 45, icon: <Server size={20} className="text-gray-600" /> },
  { id: 'o2', name: 'LlamaTune', type: 'ai', status: '已发布', desc: '基于 Llama 架构的特定领域微调模型权重，针对金融数据优化。', stars: 1205, forks: 340, icon: <Cpu size={20} className="text-gray-600" /> },
  { id: 'o3', name: 'Liquid Cooling Mod', type: 'hardware', status: '审核中', desc: '高效能数据中心液冷改造套件，降低 PUE 至 1.05。', stars: 89, forks: 12, icon: <Flame size={20} className="text-gray-600" /> },
  { id: 'o4', name: 'Broad OS Kernel', type: 'software', status: '进行中', desc: '针对 Broad 硬件优化的轻量级操作系统内核，实时性增强。', stars: 567, forks: 89, icon: <FileCode size={20} className="text-gray-600" /> },
  { id: 'o5', name: 'Vision API SDK', type: 'software', status: '已发布', desc: '通用视觉识别接口的 Python 封装库。', stars: 330, forks: 67, icon: <Activity size={20} className="text-gray-600" /> },
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

type ViewMode = 'home' | 'popular' | 'communities' | 'broad' | 'opc' | 'post_detail' | 'settings' | 'community_detail';

const App: React.FC = () => {
  const [cardViewMode, setCardViewMode] = useState<'card' | 'compact'>('card');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [opcCategory, setOpcCategory] = useState<'all' | 'hardware' | 'software' | 'ai'>('all');
  
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
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    if (view !== 'post_detail') {
      setSelectedPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
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
       const filteredProjects = opcCategory === 'all' 
          ? OPC_PROJECTS 
          : OPC_PROJECTS.filter(p => p.type === opcCategory);

       return (
        <div className="animate-in fade-in duration-300 pb-10">
           {/* Header */}
           <div className="flex flex-col gap-6 mb-8 border-b border-gray-100 pb-8">
              <div className="flex items-center justify-between">
                 <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                   <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                     <Cpu size={24} strokeWidth={2} />
                   </div>
                   OPC 开放平台
                 </h2>
                 <Button 
                    variant="primary" 
                    className="bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200 border-none"
                    onClick={() => isLoggedIn ? alert('上传界面') : setIsLoginModalOpen(true)}
                 >
                    <UploadCloud size={18} className="mr-2" />
                    发布项目
                 </Button>
              </div>
              <p className="text-gray-500 max-w-2xl text-base leading-relaxed">
                 共建开放计算未来。浏览、复刻并贡献最新的硬件设计、AI 模型与系统架构。
              </p>
              
              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                 <FilterButton label="全部项目" active={opcCategory === 'all'} onClick={() => setOpcCategory('all')} />
                 <FilterButton label="硬件架构" active={opcCategory === 'hardware'} onClick={() => setOpcCategory('hardware')} icon={<Server size={16} />} />
                 <FilterButton label="AI 模型" active={opcCategory === 'ai'} onClick={() => setOpcCategory('ai')} icon={<Cpu size={16} />} />
                 <FilterButton label="系统软件" active={opcCategory === 'software'} onClick={() => setOpcCategory('software')} icon={<FileCode size={16} />} />
              </div>
           </div>

           {/* Projects Grid */}
           <div className="grid grid-cols-1 gap-4">
              {filteredProjects.map(proj => (
                 <div key={proj.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-broad-300 hover:shadow-md transition-all group cursor-pointer flex flex-col sm:flex-row gap-5">
                    {/* Icon/Thumbnail Area */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                       {React.cloneElement(proj.icon as React.ReactElement, { size: 28, className: "text-gray-700" })}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                       <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-lg text-gray-900 group-hover:text-broad-600 transition-colors truncate pr-4">{proj.name}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border whitespace-nowrap ${proj.status === '已发布' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                             {proj.status}
                          </span>
                       </div>
                       <p className="text-sm text-gray-500 mb-3 line-clamp-2">{proj.desc}</p>
                       
                       {/* Meta Info */}
                       <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                          <span className="flex items-center gap-1 hover:text-gray-600 transition-colors"><Star size={14} /> {proj.stars}</span>
                          <span className="flex items-center gap-1 hover:text-gray-600 transition-colors"><GitFork size={14} /> {proj.forks}</span>
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 uppercase tracking-wide text-[10px]">{proj.type}</span>
                       </div>
                    </div>

                    {/* Action Arrow (Desktop) */}
                    <div className="hidden sm:flex items-center justify-end text-gray-300 group-hover:text-broad-500 transition-colors pl-2 border-l border-gray-50">
                       <ChevronRight size={24} />
                    </div>
                 </div>
              ))}
           </div>
        </div>
       );
    }

    // --- COMMUNITIES VIEW ---
    if (currentView === 'communities') {
      return (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users size={24} className="text-broad-600" />
              发现社区
            </h2>
            <div className="relative">
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

    // --- HOME / POPULAR VIEW ---
    const postsToDisplay = currentView === 'popular' ? POPULAR_POSTS : HOME_POSTS;

    return (
      <>
        {/* Filter Bar */}
        <div className="mb-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <FilterButton active={currentView === 'popular'} icon={currentView === 'popular' ? <Flame size={18} strokeWidth={1.5} /> : <Rocket size={18} strokeWidth={1.5} />} label={currentView === 'popular' ? "高热度" : "最佳"} onClick={() => setCurrentView('popular')} />
            <FilterButton icon={currentView === 'popular' ? <Rocket size={18} strokeWidth={1.5} /> : <Flame size={18} strokeWidth={1.5} />} label={currentView === 'popular' ? "上升中" : "热门"} onClick={() => setCurrentView('home')} />
            <FilterButton icon={<Clock size={18} strokeWidth={1.5} />} label="最新" onClick={() => setCurrentView('home')} />
          </div>
          
          <div className="flex items-center gap-2">
              <button 
                onClick={() => setCardViewMode('card')} 
                className={`p-2 rounded hover:bg-gray-100 transition-colors ${cardViewMode === 'card' ? 'text-broad-600 bg-gray-50' : 'text-gray-400'}`}
                title="Card View"
              >
                <Grid size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setCardViewMode('compact')} 
                className={`p-2 rounded hover:bg-gray-100 transition-colors ${cardViewMode === 'compact' ? 'text-broad-600 bg-gray-50' : 'text-gray-400'}`}
                title="Compact View"
              >
                <LayoutList size={20} strokeWidth={1.5} />
              </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className={`space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500 ${cardViewMode === 'compact' ? 'bg-white' : ''}`}>
            {postsToDisplay.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                viewMode={cardViewMode}
                onClick={() => handleOpenPost(post)} 
                onCommunityClick={(e) => {
                  e.stopPropagation();
                  // Find community object by name
                  const comm = COMMUNITIES_DATA.find(c => c.name === post.subreddit);
                  if (comm) handleNavigateToCommunity(comm);
                }}
              />
            ))}
        </div>

        {/* Loading Indicator */}
        <div className="py-10 text-center text-broad-500 font-bold flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-[3px] border-gray-100 border-t-broad-500 rounded-full animate-spin"></div>
            <span className="text-xs text-gray-400 font-normal">加载更多内容...</span>
        </div>
      </>
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
        onNavigateHome={() => handleNavigate('home')}
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <CreatePostModal 
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        communities={COMMUNITIES_DATA}
        defaultCommunityId={currentView === 'community_detail' && selectedCommunity ? selectedCommunity.id : undefined}
      />

      <div className="flex justify-center max-w-[1600px] mx-auto pt-[64px]">
        {/* Left Sidebar - Pass props for logic */}
        <Sidebar 
          currentView={currentView as any} 
          onNavigate={(view) => handleNavigate(view)} 
          isLoggedIn={isLoggedIn}
          myCommunities={joinedCommunities}
          onNavigateToCommunity={handleNavigateToCommunity}
        />

        {/* Main Content */}
        <main className="flex-1 w-full max-w-[900px] px-0 sm:px-6 py-6 min-w-0 border-x border-gray-100/50">
          {renderContent()}
        </main>

        {/* Right Sidebar - Pass Communities Data Slice & View All Handler */}
        <RightSidebar 
          communities={COMMUNITIES_DATA.slice(0, 5)} 
          onViewAll={() => handleNavigate('communities')}
          onNavigateToCommunity={handleNavigateToCommunity}
        />
      </div>
    </div>
  );
};

export default App;