import React, { useState, useEffect } from 'react';
import { X, ArrowRight, User, Lock, RefreshCw, Smile } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Generate random 4-digit number
  const generateCaptcha = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setGeneratedCaptcha(randomNum.toString());
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      // Reset fields
      setUsername('');
      setDisplayName('');
      setPassword('');
      setConfirmPassword('');
      setCaptchaInput('');
      setAgreed(false);
      setIsRegister(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!username) {
        alert("请输入用户名");
        return;
    }
    
    // Register checks
    if (isRegister) {
        if (!displayName) {
             alert("请输入显示名称（昵称）");
             return;
        }
        if (!password) {
            alert("请输入密码");
            return;
        }
        if (!confirmPassword) {
            alert("请确认密码");
            return;
        }
        if (password !== confirmPassword) {
            alert("两次输入的密码不一致");
            return;
        }
        if (captchaInput !== generatedCaptcha) {
            alert("验证码错误");
            generateCaptcha();
            setCaptchaInput('');
            return;
        }
        if (!agreed) {
            alert('请阅读并勾选用户协议');
            return;
        }
    } else {
        // Login checks
        if (!password) {
            alert("请输入密码");
            return;
        }
    }

    // Mock Login Success
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          {/* Header */}
          <div className="mb-4 transform scale-110">
             <Logo />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {isRegister ? '创建您的账号' : '登录 BROADFORUM'}
          </h2>
          <p className="text-gray-500 text-xs mb-8">
            {isRegister ? '加入社区，开启广阔视界' : '欢迎回来，继续您的探索之旅'}
          </p>

          {/* Form */}
          <div className="w-full space-y-4">
             {/* Register Specific Fields - Display Name */}
             {isRegister && (
               <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-broad-500 transition-colors">
                    <Smile size={18} strokeWidth={1.5} />
                  </div>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="显示名称 / 昵称" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-broad-500/20 focus:border-broad-500 transition-all text-sm placeholder-gray-400" 
                  />
               </div>
             )}

             {/* Username Input */}
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-broad-500 transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="用户名 / 账号" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-broad-500/20 focus:border-broad-500 transition-all text-sm placeholder-gray-400" 
                />
             </div>

             {/* Password Input */}
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-broad-500 transition-colors">
                  <Lock size={18} strokeWidth={1.5} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="密码" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-broad-500/20 focus:border-broad-500 transition-all text-sm placeholder-gray-400" 
                />
             </div>

             {/* Register Specific Fields */}
             {isRegister && (
               <>
                 {/* Confirm Password */}
                 <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-broad-500 transition-colors">
                      <Lock size={18} strokeWidth={1.5} />
                    </div>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="确认密码" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-broad-500/20 focus:border-broad-500 transition-all text-sm placeholder-gray-400" 
                    />
                 </div>

                 {/* Captcha */}
                 <div className="flex gap-3">
                   <input 
                      type="text" 
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="验证码" 
                      maxLength={4}
                      className="flex-1 min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-broad-500/20 focus:border-broad-500 transition-all text-sm placeholder-gray-400 text-center tracking-widest" 
                    />
                    <div 
                      onClick={generateCaptcha}
                      className="w-28 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors select-none relative overflow-hidden"
                      title="点击刷新"
                    >
                      <span className="text-xl font-bold font-mono text-broad-600 tracking-[0.2em] italic z-10">{generatedCaptcha}</span>
                      {/* Noise dots */}
                      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                      <div className="absolute right-1 bottom-1 text-blue-300">
                        <RefreshCw size={10} />
                      </div>
                    </div>
                 </div>
               </>
             )}

             {/* Submit Button */}
             <Button 
               variant="primary" 
               className="w-full py-3 bg-broad-600 hover:bg-broad-700 shadow-md shadow-blue-200/50 mt-4" 
               onClick={handleSubmit}
             >
                <span className="mr-2">{isRegister ? '注册' : '登录'}</span>
                {!isRegister && <ArrowRight size={16} />}
             </Button>
             
             {/* Agreement (Only for register) */}
             {isRegister && (
               <div className="flex items-start gap-2 text-left mt-2">
                  <input 
                    type="checkbox" 
                    id="agreement" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-3.5 h-3.5 rounded border-gray-300 text-broad-600 focus:ring-broad-500 cursor-pointer" 
                  />
                  <label htmlFor="agreement" className="text-xs text-gray-400 leading-tight cursor-pointer">
                    我已阅读并同意 <a href="#" className="text-broad-600 hover:underline">《用户服务协议》</a> 和 <a href="#" className="text-broad-600 hover:underline">《隐私政策》</a>。
                  </label>
               </div>
             )}
          </div>
        </div>
        
        {/* Footer Toggle */}
        <div className="bg-gray-50/80 px-8 py-4 text-center border-t border-gray-100">
           <p className="text-sm text-gray-600">
             {isRegister ? '已有账号？' : '还没有账号？'} 
             <button 
               className="ml-1 text-broad-600 font-bold hover:underline" 
               onClick={() => {
                 setIsRegister(!isRegister);
                 generateCaptcha(); // Refresh captcha on toggle
               }}
             >
               {isRegister ? '直接登录' : '立即注册'}
             </button>
           </p>
        </div>
      </div>
    </div>
  );
};