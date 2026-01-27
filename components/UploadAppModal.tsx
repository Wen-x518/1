import React, { useState, useEffect } from 'react';
import { X, Link as LinkIcon, Type, FileText, Save, UploadCloud } from 'lucide-react';
import { Button } from './Button';

interface UploadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, url: string, description: string) => void;
  initialData?: { name: string; url: string; desc: string };
}

export const UploadAppModal: React.FC<UploadAppModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  // Reset or populate form when opening
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setUrl(initialData.url);
        setDesc(initialData.desc);
      } else {
        setName('');
        setUrl('');
        setDesc('');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('请输入应用名称');
      return;
    }
    if (!url.trim()) {
      alert('请输入应用地址');
      return;
    }
    // Simple URL validation
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
    }

    onSubmit(name, finalUrl, desc);
    setName('');
    setUrl('');
    setDesc('');
    onClose();
  };

  const isEditMode = !!initialData;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-lg">
            {isEditMode ? '编辑应用信息' : '提交 OPC 应用'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">应用名称 <span className="text-red-500">*</span></label>
            <div className="relative group">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-broad-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-2 focus:ring-broad-100 transition-all text-sm placeholder-gray-400" 
                placeholder="例如：能源监控看板" 
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">应用地址 (URL) <span className="text-red-500">*</span></label>
             <div className="relative group">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-broad-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-2 focus:ring-broad-100 transition-all text-sm placeholder-gray-400" 
                placeholder="example.com/app" 
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 ml-1">用户点击后将跳转至该地址</p>
          </div>

           <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">简介</label>
            <div className="relative group">
                <FileText className="absolute left-3 top-3 text-gray-400 group-focus-within:text-broad-500 transition-colors" size={18} />
                <textarea 
                  value={desc} 
                  onChange={e => setDesc(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-2 focus:ring-broad-100 transition-all text-sm placeholder-gray-400 resize-none h-24" 
                  placeholder="简要描述应用的功能..." 
                />
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full bg-broad-600 hover:bg-broad-700 text-white py-2.5 shadow-md shadow-broad-200 flex items-center justify-center gap-2"
          >
            {isEditMode ? <Save size={18} /> : <UploadCloud size={18} />}
            {isEditMode ? '保存更改' : '提交应用'}
          </Button>
        </div>
      </div>
    </div>
  );
};