import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2, MoreHorizontal, Flag, ExternalLink } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  viewMode?: 'card' | 'compact';
  onCommunityClick?: (e: React.MouseEvent) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick, viewMode = 'card', onCommunityClick }) => {
  const [voteCount, setVoteCount] = useState(post.upvotes);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleVote = (direction: 'up' | 'down') => {
    if (voteStatus === direction) {
      // Toggle off
      setVoteStatus(null);
      setVoteCount(direction === 'up' ? voteCount - 1 : voteCount + 1);
    } else {
      // Switch or New vote
      const diff = voteStatus === 'up' ? -1 : voteStatus === 'down' ? 1 : 0;
      const newDiff = direction === 'up' ? 1 : -1;
      setVoteStatus(direction);
      setVoteCount(voteCount + diff + newDiff); 
    }
  };

  const formatCount = (count: number) => {
      return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;
  };

  // --- COMPACT VIEW ---
  if (viewMode === 'compact') {
      return (
        <div 
          className="bg-white hover:bg-gray-50 border-b border-gray-100 last:border-0 p-2 pl-2 flex items-center gap-3 cursor-pointer group transition-colors"
          onClick={onClick}
        >
            {/* Votes */}
            <div className="flex flex-col items-center gap-0.5 min-w-[40px] bg-gray-50/50 p-1 rounded">
                 <button 
                    onClick={(e) => {e.stopPropagation(); handleVote('up')}} 
                    className={`hover:bg-gray-200 p-0.5 rounded transition-colors ${voteStatus === 'up' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                 >
                     <ArrowUp size={16} strokeWidth={2.5}/>
                 </button>
                 <span className={`text-xs font-bold leading-none ${voteStatus === 'up' ? 'text-red-500' : voteStatus === 'down' ? 'text-blue-500' : 'text-gray-500'}`}>
                    {formatCount(voteCount)}
                 </span>
                 <button 
                    onClick={(e) => {e.stopPropagation(); handleVote('down')}} 
                    className={`hover:bg-gray-200 p-0.5 rounded transition-colors ${voteStatus === 'down' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
                 >
                     <ArrowDown size={16} strokeWidth={2.5}/>
                 </button>
            </div>

             {/* Thumbnail */}
             {post.image ? (
                 <div className="w-[80px] h-[60px] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden shrink-0 relative">
                     <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                 </div>
             ) : (
                 <div className="w-[80px] h-[60px] bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center shrink-0 text-gray-300">
                    <MessageSquare size={24} strokeWidth={1.5} />
                 </div>
             )}

             {/* Content */}
             <div className="flex-1 min-w-0 py-1">
                 <h3 className="text-base font-medium text-gray-900 truncate pr-4 group-hover:text-broad-600 mb-1">{post.title}</h3>
                 <div className="flex items-center text-xs text-gray-400 gap-1.5 flex-wrap">
                     <span className="font-bold text-gray-700 hover:underline z-10" onClick={onCommunityClick || ((e) => e.stopPropagation())}>{post.subreddit}</span>
                     <span>•</span>
                     <span className="hover:underline z-10" onClick={(e) => e.stopPropagation()}>u/{post.author}</span>
                     <span>•</span>
                     <span>{post.timeAgo}</span>
                     
                     <div className="ml-auto flex items-center gap-3 pr-2">
                        <span className="flex items-center gap-1 hover:bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                            <MessageSquare size={14} /> {formatCount(post.comments)} 评论
                        </span>
                        <button className="hover:bg-gray-100 p-1 rounded text-gray-400 hover:text-gray-600" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal size={14} />
                        </button>
                     </div>
                 </div>
             </div>
        </div>
      );
  }

  // --- CARD VIEW ---
  return (
    <div 
      className="bg-white hover:bg-gray-50/80 transition-colors duration-200 cursor-pointer group border-b border-gray-100 last:border-0 relative"
      onClick={onClick}
    >
      <div className="p-4 sm:p-5 flex gap-4">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
            {/* Header: Subreddit & Author */}
            <div className="flex items-center text-xs text-gray-500 mb-2.5">
              <img src={post.subredditIcon} alt={post.subreddit} className="w-6 h-6 rounded-full mr-2.5 border border-gray-100" />
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-bold text-gray-900 hover:underline mr-1" onClick={onCommunityClick || ((e) => e.stopPropagation())}>{post.subreddit}</span>
                <span className="hidden sm:inline mx-1 text-gray-300">•</span>
                <span className="text-gray-400">u/{post.author}</span>
                <span className="mx-1 text-gray-300">•</span>
                <span className="text-gray-400">{post.timeAgo}</span>
              </div>
              
              {/* More / Menu Button */}
              <div className="ml-auto relative" ref={menuRef}>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                  className={`p-1 rounded-full transition-colors ${showMenu ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  <MoreHorizontal size={16} />
                </button>
                {showMenu && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <button 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2 transition-colors font-medium"
                            onClick={(e) => { e.stopPropagation(); alert('已收到举报，我们将尽快处理。'); setShowMenu(false); }}
                        >
                            <Flag size={14} />
                            举报
                        </button>
                    </div>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug group-hover:text-broad-600 transition-colors">{post.title}</h3>

            {/* Content / Image */}
            <div className="mb-3">
            {post.image && (
                <div className="rounded-xl overflow-hidden border border-gray-100 my-3 bg-gray-50 flex justify-center max-h-[500px] shadow-sm">
                <img src={post.image} alt={post.title} className="object-contain w-full h-full" />
                </div>
            )}
            {post.content && (
                <div className="text-sm text-gray-600 leading-relaxed overflow-hidden max-h-[250px] relative">
                    <p>{post.content}</p>
                    {post.content.length > 200 && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent group-hover:from-gray-50"></div>
                    )}
                </div>
            )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
            
            {/* Vote Buttons (Inline) */}
            <div className="flex items-center bg-gray-100 rounded-full border border-transparent hover:border-gray-200 transition-colors mr-2">
                 <button 
                   onClick={(e) => {e.stopPropagation(); handleVote('up')}} 
                   className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition-colors ${voteStatus === 'up' ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                 >
                   <ArrowUp size={18} strokeWidth={2.5}/>
                 </button>
                 <span className={`px-1 min-w-[20px] text-center ${voteStatus === 'up' ? 'text-red-500' : voteStatus === 'down' ? 'text-blue-500' : 'text-gray-900'}`}>
                    {formatCount(voteCount)}
                 </span>
                 <button 
                   onClick={(e) => {e.stopPropagation(); handleVote('down')}} 
                   className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition-colors ${voteStatus === 'down' ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                 >
                   <ArrowDown size={18} strokeWidth={2.5}/>
                 </button>
            </div>

            <button 
              onClick={(e) => {
                // Let event bubble to card click to open detail
              }}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            >
                <MessageSquare size={18} strokeWidth={1.5} />
                <span>{formatCount(post.comments)} 评论</span>
            </button>

            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            >
                <Share2 size={18} strokeWidth={1.5} />
                <span className="hidden sm:inline">分享</span>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};