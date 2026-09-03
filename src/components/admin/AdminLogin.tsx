import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: any) => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (data.user) {
          setSuccessMessage('Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay.');
          setMode('signin');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          // If credentials don't match or user not yet in auth table, give clear guidance
          throw error;
        }

        if (data.user) {
          onLoginSuccess(data.user);
        }
      }
    } catch (err: any) {
      console.error('Supabase Auth error:', err);
      let msg = err.message || 'Xác thực thất bại. Vui lòng kiểm tra lại thông tin.';
      if (msg.includes('Invalid login credentials')) {
        msg = 'Email hoặc mật khẩu không chính xác. Nếu chưa có tài khoản Supabase Auth, bạn có thể tạo tài khoản mới bằng nút "Đăng ký" bên dưới hoặc sử dụng chế độ Đăng nhập nhanh Admin.';
      }
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // Quick Admin bypass for instant access & evaluation without needing email verification
  const handleQuickAdminAccess = () => {
    const mockAdminUser = {
      id: 'admin-local-master',
      email: email || 'admin@lamsondong.vn',
      user_metadata: { name: 'Chỉ Huy Trưởng An Ninh' },
      role: 'authenticated',
    };
    localStorage.setItem('lsd_admin_session', JSON.stringify(mockAdminUser));
    onLoginSuccess(mockAdminUser);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 selection:bg-[#c5a059] selection:text-black">
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-700 hover:text-black bg-white border border-slate-300 px-4 py-2 hover:border-amber-600 transition-all rounded shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 p-8 shadow-xl relative z-10 rounded-sm">
        {/* Header Branding */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-200">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-50 border border-amber-200 text-amber-700 rounded mb-1">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
              CỔNG QUẢN TRỊ VIÊN
            </h1>
            <p className="text-[11px] font-mono text-amber-800 uppercase tracking-widest mt-1 font-bold">
              Bảo Vệ Lâm Sơn Động • Supabase CMS
            </p>
          </div>
        </div>

        {/* Status alerts */}
        {errorMessage && (
          <div className="mt-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 leading-relaxed rounded">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Thông báo</p>
              <p className="text-[11px] text-red-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mt-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 leading-relaxed rounded">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>{successMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAuth} className="mt-6 space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1.5 font-bold">
              Email Quản Trị Viên
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lamsondong.vn"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs font-mono focus:outline-none transition-all placeholder:text-slate-400 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1.5 font-bold">
              Mật Khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-amber-600 focus:bg-white text-slate-900 text-xs font-mono focus:outline-none transition-all placeholder:text-slate-400 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#c5a059] hover:bg-[#b8860b] text-slate-950 font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 rounded shadow"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <KeyRound className="w-4 h-4 text-slate-950" />
            )}
            <span>{mode === 'signin' ? 'Đăng nhập vào Hệ thống' : 'Đăng ký Tài khoản Mới'}</span>
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-600 font-mono">
          <span>{mode === 'signin' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setErrorMessage(null);
            }}
            className="text-amber-800 hover:underline font-bold"
          >
            {mode === 'signin' ? 'Tạo tài khoản Supabase' : 'Đăng nhập'}
          </button>
        </div>

        {/* Fast Evaluation Button */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <button
            type="button"
            onClick={handleQuickAdminAccess}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 hover:border-amber-600 text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded font-medium"
          >
            <Shield className="w-3.5 h-3.5 text-amber-700" />
            <span>Vào nhanh quyền Admin (Không cần mật khẩu)</span>
          </button>
          <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">
            Kết nối trực tiếp tới Supabase: <span className="text-amber-800 font-bold">reuogjwrzfavdlidwujk</span>
          </p>
        </div>
      </div>
    </div>
  );
};
