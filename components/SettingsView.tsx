import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Lock, Bell, Shield, Save, Camera, Check } from 'lucide-react';
import { Button } from './Button';

interface UserProfile {
  displayName: string;
  avatar: string;
  bio: string;
  email: string;
}

interface SettingsViewProps {
  user: UserProfile;
  onSave: (user: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onSave }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if prop changes
  useEffect(() => {
    setDisplayName(user.displayName);
    setBio(user.bio);
    setAvatar(user.avatar);
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      ...user,
      displayName,
      bio,
      avatar
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="animate-in fade-in duration-300 pb-10 max-w-2xl mx-auto">
      <div className="mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-extrabold text-gray-900 mb-2">个人设置</h1>
           <p className="text-gray-500 text-sm">管理您的个人资料、账号安全及通知偏好。</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
           <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
             <User size={20} className="text-broad-600" /> 个人资料
           </h2>
           
           <div className="flex flex-col sm:flex-row gap-6 mb-6 items-start">
              <div 
                className="relative group cursor-pointer shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                 <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={24} />
                 </div>
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              <div className="flex-1 space-y-4 w-full">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">显示名称</label>
                    <input 
                      type="text" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-2 focus:ring-broad-100 transition-all text-sm"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">简介</label>
                    <textarea 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-broad-500 focus:ring-2 focus:ring-broad-100 transition-all text-sm resize-none"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
           <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Shield size={20} className="text-broad-600" /> 账号安全
           </h2>
           <div className="space-y-4">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">绑定邮箱</label>
                 <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="email" 
                          value={user.email} 
                          disabled
                          className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm cursor-not-allowed"
                        />
                    </div>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">更改</Button>
                 </div>
              </div>
           </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
           <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Bell size={20} className="text-broad-600" /> 通知偏好
           </h2>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div>
                    <p className="text-sm font-bold text-gray-900">邮件通知</p>
                    <p className="text-xs text-gray-500">接收关于新回复和提及的邮件摘要</p>
                 </div>
                 <div 
                   className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${emailNotif ? 'bg-broad-600' : 'bg-gray-200'}`}
                   onClick={() => setEmailNotif(!emailNotif)}
                 >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${emailNotif ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
              </div>
              <div className="flex items-center justify-between">
                 <div>
                    <p className="text-sm font-bold text-gray-900">推送通知</p>
                    <p className="text-xs text-gray-500">在浏览器中接收实时提醒</p>
                 </div>
                 <div 
                   className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${pushNotif ? 'bg-broad-600' : 'bg-gray-200'}`}
                   onClick={() => setPushNotif(!pushNotif)}
                 >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${pushNotif ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-4 sticky bottom-6 z-20">
           <div className="bg-white/80 backdrop-blur shadow-lg border border-gray-100 rounded-full p-1.5 flex gap-2">
              <Button variant="ghost" className="rounded-full px-6" onClick={() => {
                setDisplayName(user.displayName);
                setBio(user.bio);
                setAvatar(user.avatar);
              }}>取消</Button>
              <Button 
                className={`px-8 transition-all rounded-full ${isSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-broad-600 hover:bg-broad-700'} text-white shadow-md`} 
                onClick={handleSave}
              >
                 {isSaved ? <span className="flex items-center gap-2"><Check size={18} /> 已保存</span> : <span className="flex items-center gap-2"><Save size={18} /> 保存更改</span>}
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};