import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2, ArrowLeft, User, Link as LinkIcon, Check } from 'lucide-react';
import { Post, Comment, Community } from '../types';
import { Button } from './Button';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  isLoggedIn: boolean;
  currentUser?: { displayName: string; avatar: string };
  onOpenLogin: () => void;
  onNavigateToCommunity: (community: Community) => void;
  allCommunities: Community[];
}

// Mock Comments Data
const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'SolarExpert_99',
    content: '这篇文章的数据分析非常扎实，特别是在柔性材料的转换效率方面。我觉得未来5年内，BIPV（光伏建筑一体化）会成为主流。',
    upvotes: 156,
    timeAgo: '3小时前'
  },
  {
    id: 'c2',
    author: 'GreenBuilder',
    content: '作为一名建筑师，我主要担心的是维护成本。高层建筑外立面的清洁和组件更换仍然是一个难题。文中提到的自清洁涂层技术成熟了吗？',
    upvotes: 89,
    timeAgo: '2小时前'
  },
  {
    id: 'c3',
    author: 'TechObserver',
    content: '同意楼主的观点。另外，储能系统的配合也是关键。单纯发电如果不储存，对电网的冲击太大了。',
    upvotes: 45,
    timeAgo: '1小时前'
  }
];

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, isLoggedIn, currentUser, onOpenLogin, onNavigateToCommunity, allCommunities }) => {
  const [voteCount, setVoteCount] = useState(post.upvotes);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);

  // Share Menu State
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    if (isShareOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowCopyFeedback(true);
      setTimeout(() => {
        setShowCopyFeedback(false);
        setIsShareOpen(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleVote = (direction: 'up' | 'down') => {
    if (voteStatus === direction) {
      setVoteStatus(null);
      setVoteCount(direction === 'up' ? voteCount - 1 : voteCount + 1);
    } else {
      const diff = voteStatus === 'up' ? -1 : voteStatus === 'down' ? 1 : 0;
      const newDiff = direction === 'up' ? 1 : -1;
      setVoteStatus(direction);
      setVoteCount(voteCount + diff + newDiff);
    }
  };

  const handlePostComment = () => {
    if (!isLoggedIn) {
      onOpenLogin();
      return;
    }
    
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUser?.displayName || 'User_99',
      content: commentText,
      upvotes: 0,
      timeAgo: '刚刚'
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleCommunityClick = () => {
    const comm = allCommunities.find(c => c.name === post.subreddit);
    if (comm) {
      onNavigateToCommunity(comm);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-100px)] animate-in slide-in-from-right-4 duration-300">
      {/* Top Bar */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-2 flex items-center gap-4 mb-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors flex items-center gap-1 text-sm font-bold"
        >
           <ArrowLeft size={18} />
           返回
        </button>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-gray-900 truncate max-w-[500px]">{post.title}</h2>
          <p className="text-xs text-gray-500 cursor-pointer hover:underline" onClick={handleCommunityClick}>
            发布于 r/{post.subreddit}
          </p>
        </div>
      </div>

      <div className="px-4 pb-10">
        {/* Main Post Content */}
        <div className="flex gap-4 mb-6">
           {/* Content Column (Removed Left Vote Sidebar) */}
           <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Post Header */}
              <div className="p-4 sm:p-6 pb-2">
                 <div className="flex items-center text-xs text-gray-500 mb-4">
                    <img src={post.subredditIcon} alt={post.subreddit} className="w-6 h-6 rounded-full mr-2 border border-gray-100" />
                    <span 
                      className="font-bold text-gray-900 hover:underline mr-1 cursor-pointer" 
                      onClick={handleCommunityClick}
                    >
                      r/{post.subreddit}
                    </span>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-gray-400">u/{post.author} 发布于 {post.timeAgo}</span>
                 </div>
                 <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
                 
                  {/* Body */}
                  {post.content && (
                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">
                      {post.content}
                    </div>
                  )}
                  {post.image && (
                    <div className="mb-6 rounded-lg overflow-hidden border border-gray-100">
                      <img src={post.image} alt={post.title} className="w-full object-contain max-h-[600px] bg-gray-50" />
                    </div>
                  )}
              </div>

              {/* Actions Footer */}
              <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-gray-500 text-sm font-bold">
                  {/* Vote Buttons (Inline) */}
                  <div className="flex items-center bg-gray-100 rounded-full border border-transparent hover:border-gray-200 transition-colors mr-2">
                       <button 
                         onClick={() => handleVote('up')}
                         className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${voteStatus === 'up' ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                       >
                         <ArrowUp size={20} strokeWidth={2.5} />
                       </button>
                       <span className={`px-1 min-w-[20px] text-center ${voteStatus === 'up' ? 'text-red-500' : voteStatus === 'down' ? 'text-blue-500' : 'text-gray-900'}`}>
                         {voteCount >= 1000 ? (voteCount / 1000).toFixed(1) + 'k' : voteCount}
                       </span>
                       <button 
                         onClick={() => handleVote('down')}
                         className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${voteStatus === 'down' ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                       >
                         <ArrowDown size={20} strokeWidth={2.5} />
                       </button>
                  </div>

                  <button className="flex items-center gap-2 hover:bg-gray-200/50 px-3 py-2 rounded-full transition-colors">
                      <MessageSquare size={20} strokeWidth={1.5} />
                      <span>{comments.length} 评论</span>
                  </button>
                  
                  {/* Share Menu */}
                  <div className="relative" ref={shareRef}>
                    <button 
                        onClick={() => setIsShareOpen(!isShareOpen)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${isShareOpen ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-200/50 text-gray-500'}`}
                    >
                        <Share2 size={20} strokeWidth={1.5} />
                        <span>分享</span>
                    </button>
                    
                    {isShareOpen && (
                        <div className="absolute left-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-10 animate-in fade-in zoom-in-95 duration-200">
                            <button 
                                onClick={handleCopyLink}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-broad-600 flex items-center gap-3 transition-colors font-medium"
                            >
                                {showCopyFeedback ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
                                {showCopyFeedback ? '链接已复制' : '复制链接'}
                            </button>
                        </div>
                    )}
                  </div>
              </div>

              {/* Comment Input Area */}
              <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/30">
                 <p className="text-sm text-gray-500 mb-2">作为 <span className="text-broad-600 font-bold">{isLoggedIn ? (currentUser?.displayName || 'User_99') : '游客'}</span> 评论</p>
                 <div className="relative">
                   <textarea 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={isLoggedIn ? "你的看法是什么？" : "请先登录后发表评论..."}
                      onClick={() => !isLoggedIn && onOpenLogin()}
                      className="w-full border border-gray-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-broad-500 focus:ring-1 focus:ring-broad-500/20 resize-y text-sm bg-white"
                   />
                   <div className="absolute bottom-3 right-3 flex gap-2">
                      <Button 
                        size="sm" 
                        disabled={!isLoggedIn && !commentText.trim()} 
                        className="bg-broad-600 hover:bg-broad-700 text-white disabled:bg-gray-200 disabled:text-gray-400"
                        onClick={handlePostComment}
                      >
                        发表评论
                      </Button>
                   </div>
                 </div>
              </div>

              {/* Comments Filter */}
              <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center gap-4">
                 <button className="text-xs font-bold text-gray-900 flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded">
                   默认排序 <ArrowDown size={14} />
                 </button>
              </div>

              {/* Comments List */}
              <div className="bg-gray-50/30">
                 {comments.map((comment, index) => (
                    <div key={comment.id} className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors ${index !== comments.length - 1 ? 'border-b border-gray-100' : ''}`}>
                       <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shrink-0 overflow-hidden">
                             {/* Simple avatar logic */}
                             {isLoggedIn && comment.author === currentUser?.displayName ? (
                               <img src={currentUser?.avatar} alt="" className="w-full h-full object-cover"/>
                             ) : (
                               <User size={16} />
                             )}
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                <span className="font-bold text-gray-900">{comment.author}</span>
                                <span>•</span>
                                <span>{comment.timeAgo}</span>
                             </div>
                             <p className="text-sm text-gray-800 leading-relaxed mb-2">{comment.content}</p>
                             <div className="flex items-center gap-4 text-gray-400 text-xs font-bold">
                                <div className="flex items-center gap-1">
                                   <button className="hover:text-red-500 hover:bg-gray-100 p-1 rounded"><ArrowUp size={16} /></button>
                                   <span>{comment.upvotes}</span>
                                   <button className="hover:text-blue-500 hover:bg-gray-100 p-1 rounded"><ArrowDown size={16} /></button>
                                </div>
                                <button className="hover:bg-gray-100 p-1 rounded px-2 flex items-center gap-1">
                                   <MessageSquare size={14} /> 回复
                                </button>
                                <button className="hover:bg-gray-100 p-1 rounded px-2">分享</button>
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};