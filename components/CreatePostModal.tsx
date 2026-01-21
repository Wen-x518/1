import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, Link as LinkIcon, List, CheckSquare, Quote, Image as ImageIcon, Video, Table, Code, Minus, Undo, Redo, Maximize, Smile, Type, Eraser, AlignJustify, ChevronDown } from 'lucide-react';
import { Community } from '../types';
import { Button } from './Button';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  communities: Community[];
  defaultCommunityId?: string;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, communities, defaultCommunityId }) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Initialize form when opened
  useEffect(() => {
    if (isOpen) {
       setTitle('');
       setCategoryId(defaultCommunityId || '');
       setSummary('');
       setContent('');
       setCoverImage(null);
    }
  }, [isOpen, defaultCommunityId]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title) return alert('请输入文章标题');
    if (!categoryId) return alert('请选择文章分类');
    if (!content) return alert('请输入文章内容');
    
    // Mock submit
    alert('文章发布成功！(模拟)');
    onClose();
  };

  const selectedCommunity = communities.find(c => c.id === categoryId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-broad-600 to-broad-700 text-white shrink-0 shadow-sm">
          <h2 className="text-lg font-bold tracking-wide flex items-center gap-2">
            <Plus size={20} strokeWidth={3} className="text-white/80" />
            发布新文章
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/90 hover:text-white">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gray-50/30">
          
          {/* Title Section */}
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
                  文章标题 <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs font-medium ${title.length === 100 ? 'text-red-500' : 'text-gray-400'}`}>
                  {title.length}/100
                </span>
             </div>
             <input 
               type="text" 
               value={title}
               onChange={(e) => setTitle(e.target.value.slice(0, 100))}
               placeholder="请输入引人注目的标题..." 
               className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-4 focus:ring-broad-100 text-base font-medium transition-all shadow-sm placeholder-gray-400"
             />
          </div>

          {/* Category Section */}
          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
               发布到 <span className="text-red-500">*</span>
             </label>
             {defaultCommunityId && selectedCommunity ? (
                 <div className="w-full sm:w-1/2 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2">
                    <img src={selectedCommunity.icon} className="w-5 h-5 rounded-full" alt="" />
                    {selectedCommunity.name}
                    <span className="text-gray-400 font-normal ml-auto text-xs">默认社区</span>
                 </div>
             ) : (
                 <div className="relative w-full sm:w-1/2">
                   <select 
                     value={categoryId}
                     onChange={(e) => setCategoryId(e.target.value)}
                     className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-4 focus:ring-broad-100 text-sm font-medium transition-all shadow-sm text-gray-700 cursor-pointer"
                   >
                     <option value="" disabled>选择一个社区 (Subreddit)</option>
                     {communities.map(c => (
                       <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                   </select>
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDown size={16} />
                   </div>
                 </div>
             )}
          </div>

          {/* Summary Section */}
          <div className="space-y-2">
             <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700">文章摘要 (选填)</label>
                <span className={`text-xs font-medium ${summary.length === 200 ? 'text-red-500' : 'text-gray-400'}`}>
                  {summary.length}/200
                </span>
             </div>
             <textarea 
               value={summary}
               onChange={(e) => setSummary(e.target.value.slice(0, 200))}
               placeholder="简要描述文章内容，帮助读者快速了解..." 
               className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-4 focus:ring-broad-100 text-sm transition-all shadow-sm min-h-[80px] resize-none placeholder-gray-400"
             />
          </div>

          {/* Cover Image Section */}
          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700">封面图片</label>
             <div 
               className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden group ${coverImage ? 'border-broad-300 bg-gray-50' : 'border-gray-300 hover:border-broad-400 hover:bg-broad-50/10'}`}
               onClick={() => fileInputRef.current?.click()}
             >
               {coverImage ? (
                 <>
                   <img src={coverImage} alt="Cover" className="w-full h-full object-contain" />
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <div className="bg-white/20 p-2 rounded-full text-white">
                        <Plus size={24} />
                      </div>
                      <span className="text-white text-sm font-bold ml-2">更换图片</span>
                   </div>
                 </>
               ) : (
                 <div className="text-center p-6">
                   <div className="w-12 h-12 bg-broad-50 text-broad-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} />
                   </div>
                   <p className="text-sm font-bold text-gray-700">点击上传封面</p>
                   <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG, WEBP • 建议 1200x600px</p>
                 </div>
               )}
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
             </div>
          </div>

          {/* Content Editor Section */}
          <div className="space-y-2 h-[500px] flex flex-col">
             <label className="text-sm font-bold text-gray-700 flex items-center gap-1">
               文章内容 <span className="text-red-500">*</span>
             </label>
             <div className="flex-1 flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 focus-within:ring-2 focus-within:ring-broad-500/50 focus-within:border-broad-500 transition-all">
               {/* Toolbar */}
               <div className="flex items-center flex-wrap gap-1 p-2 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm shrink-0">
                  <div className="flex bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
                    <ToolbarBtn icon={<Type size={15} />} tooltip="Heading" />
                    <ToolbarBtn icon={<Bold size={15} />} tooltip="Bold" />
                    <ToolbarBtn icon={<Italic size={15} />} tooltip="Italic" />
                  </div>
                  
                  <div className="flex bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
                    <ToolbarBtn icon={<AlignLeft size={15} />} tooltip="Align Left" />
                    <ToolbarBtn icon={<AlignCenter size={15} />} tooltip="Center" />
                    <ToolbarBtn icon={<AlignJustify size={15} />} tooltip="Justify" />
                  </div>

                  <div className="flex bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
                    <ToolbarBtn icon={<LinkIcon size={15} />} tooltip="Link" />
                    <ToolbarBtn icon={<ImageIcon size={15} />} tooltip="Image" />
                    <ToolbarBtn icon={<Quote size={15} />} tooltip="Quote" />
                    <ToolbarBtn icon={<Code size={15} />} tooltip="Code" />
                  </div>

                  <div className="flex-1"></div>
                  <ToolbarBtn icon={<Maximize size={15} />} tooltip="Fullscreen" />
               </div>
               
               {/* Editor Area */}
               <textarea 
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                 placeholder="在这里开始写作..."
                 className="flex-1 w-full p-6 resize-none focus:outline-none text-base text-gray-800 leading-7 font-serif"
               />
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
           <Button variant="ghost" onClick={onClose} className="hover:bg-gray-200/80 text-gray-600">存草稿</Button>
           <Button variant="primary" onClick={handleSubmit} className="px-8 bg-broad-600 hover:bg-broad-700 shadow-lg shadow-broad-200">
             发布文章
           </Button>
        </div>

      </div>
    </div>
  );
};

const ToolbarBtn: React.FC<{ icon: React.ReactNode, tooltip: string }> = ({ icon, tooltip }) => (
  <button 
    className="p-1.5 text-gray-500 hover:text-broad-600 hover:bg-broad-50 rounded-md transition-all active:scale-95"
    title={tooltip}
  >
    {icon}
  </button>
);