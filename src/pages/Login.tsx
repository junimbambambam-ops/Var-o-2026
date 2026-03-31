
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Gender } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Sparkles, Lock, X, LogIn, UserPlus, ArrowLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  // @ts-ignore
  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  // States
  const [view, setView] = useState<'REGISTER' | 'LOGIN'>('REGISTER');
  const [step, setStep] = useState<'SELECT_ROLE' | 'FORM'>('SELECT_ROLE');
  const [role, setRole] = useState<Gender | null>(null);
  
  // Admin
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Forms
  const [loginName, setLoginName] = useState('');
  const [formData, setFormData] = useState({ name: '', city: '' });

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'Amesmacom*2025') {
        const adminUser: User = { id: 'admin', name: 'Admin', gender: 'MALE', city: 'Base', role: 'ADMIN', avatarUrl: 'https://ui-avatars.com/api/?name=Admin&background=D4AF37' };
        login(adminUser);
        navigate('/admin');
    } else {
        alert('Senha incorreta');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      gender: role!,
      city: formData.city,
      role: 'USER',
      avatarUrl: role === 'FEMALE' ? 'https://picsum.photos/200' : undefined
    };
    login(newUser);
    navigate('/');
  };

  const handleSimpleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUser: User = {
        id: 'existing-user',
        name: loginName,
        gender: 'MALE',
        city: 'Brasil',
        role: 'USER'
    };
    login(existingUser);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/5 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-500/5 blur-[100px] rounded-full -z-10"></div>
      
      {/* Admin Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-luxury-card border border-gold-500/30 p-8 rounded-sm max-w-sm w-full relative shadow-2xl shadow-gold-500/10"
              >
                  <button onClick={() => setShowAdminLogin(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                    <X size={24}/>
                  </button>
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mb-4">
                      <Lock className="text-gold-500" size={32} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white text-center">Acesso Restrito</h3>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Área Administrativa</p>
                  </div>
                  <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                      <input 
                        type="password" 
                        className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-sm focus:border-gold-500 focus:outline-none transition-all" 
                        placeholder="Chave de Acesso" 
                        value={adminPassword} 
                        onChange={e => setAdminPassword(e.target.value)} 
                        autoFocus 
                      />
                      <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 rounded-sm uppercase tracking-widest transition-all shadow-lg shadow-gold-500/20">
                        Autenticar
                      </button>
                  </form>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
            <h1 className="text-5xl font-display font-bold text-white mb-2 tracking-tighter">VARÃO<span className="text-gold-500">10</span></h1>
            <div className="h-1 w-12 bg-gold-500 mx-auto mb-4"></div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.4em] font-bold">Inteligência & Legado</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 mb-10">
            <button 
                onClick={() => { setView('REGISTER'); setStep('SELECT_ROLE'); }}
                className={`flex-1 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${view === 'REGISTER' ? 'text-gold-500' : 'text-gray-600 hover:text-gray-400'}`}
            >
                Criar Conta
                {view === 'REGISTER' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />}
            </button>
            <button 
                onClick={() => setView('LOGIN')}
                className={`flex-1 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${view === 'LOGIN' ? 'text-gold-500' : 'text-gray-600 hover:text-gray-400'}`}
            >
                Já tenho conta
                {view === 'LOGIN' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />}
            </button>
        </div>

        <AnimatePresence mode="wait">
          {/* VIEW: LOGIN */}
          {view === 'LOGIN' && (
              <motion.div 
                key="login-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-luxury-card p-10 border border-white/5 rounded-sm shadow-2xl"
              >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center">
                      <LogIn className="text-gold-500" size={20}/>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Entrar</h2>
                  </div>
                  
                  <form onSubmit={handleSimpleLogin} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Usuário</label>
                        <input 
                            type="text" 
                            placeholder="Seu nome de acesso" 
                            className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-sm focus:border-gold-500/50 focus:outline-none transition-all placeholder:text-gray-700"
                            value={loginName}
                            onChange={e => setLoginName(e.target.value)}
                            required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Senha</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-sm focus:border-gold-500/50 focus:outline-none transition-all placeholder:text-gray-700"
                            disabled
                        />
                        <p className="text-[9px] text-gray-600 italic mt-1">* Senha não necessária nesta versão</p>
                      </div>
                      
                      <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-widest py-4 rounded-sm transition-all shadow-lg shadow-gold-500/10 mt-4">
                          Acessar Plataforma
                      </button>
                  </form>
                  
                  <div className="mt-10 pt-8 border-t border-white/5 text-center">
                      <button onClick={() => setShowAdminLogin(true)} className="text-[10px] text-gray-600 hover:text-gold-500 uppercase tracking-widest font-bold flex items-center justify-center gap-2 mx-auto transition-colors">
                          <Lock size={12}/> Área Administrativa
                      </button>
                  </div>
              </motion.div>
          )}

          {/* VIEW: REGISTER - SELECT ROLE */}
          {view === 'REGISTER' && step === 'SELECT_ROLE' && (
              <motion.div 
                key="register-select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                  <button 
                    onClick={() => { setRole('MALE'); setStep('FORM'); }} 
                    className="w-full bg-luxury-card border border-white/5 p-8 rounded-sm flex items-center justify-between hover:border-gold-500/50 transition-all group text-left shadow-xl"
                  >
                      <div className="flex items-center gap-5">
                        <div className="bg-gold-500/10 w-14 h-14 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                          <Shield className="text-gold-500" size={28}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-gold-500 transition-colors">Sou Homem</h3>
                            <p className="text-xs text-gray-500 font-light">Acesso ao fórum e ferramentas de consulta.</p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-700 group-hover:text-gold-500 transition-colors" size={20} />
                  </button>

                  <button 
                    onClick={() => { setRole('FEMALE'); setStep('FORM'); }} 
                    className="w-full bg-luxury-card border border-white/5 p-8 rounded-sm flex items-center justify-between hover:border-rose-400/50 transition-all group text-left shadow-xl"
                  >
                      <div className="flex items-center gap-5">
                        <div className="bg-rose-500/10 w-14 h-14 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                          <Sparkles className="text-rose-400" size={28}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">Sou Mulher</h3>
                            <p className="text-xs text-gray-500 font-light">Criar perfil verificado e validar integridade.</p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-700 group-hover:text-rose-400 transition-colors" size={20} />
                  </button>
              </motion.div>
          )}

          {/* VIEW: REGISTER - FORM */}
          {view === 'REGISTER' && step === 'FORM' && (
              <motion.div 
                key="register-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-luxury-card p-10 border border-white/5 rounded-sm shadow-2xl relative"
              >
                  <button 
                    onClick={() => setStep('SELECT_ROLE')} 
                    className="absolute top-6 right-6 text-[10px] text-gray-600 hover:text-white flex items-center gap-1 uppercase tracking-widest font-bold transition-colors"
                  >
                    <ArrowLeft size={12} /> Voltar
                  </button>
                  
                  <div className="flex items-center gap-3 mb-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${role === 'MALE' ? 'bg-gold-500/10' : 'bg-rose-500/10'}`}>
                      <UserPlus className={role === 'MALE' ? 'text-gold-500' : 'text-rose-400'} size={20}/>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Cadastro</h2>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{role === 'MALE' ? 'Perfil Masculino' : 'Perfil Feminino'}</p>
                    </div>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Nome Completo</label>
                        <input 
                            type="text" 
                            placeholder="Como deseja ser chamado" 
                            className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-sm focus:border-white/30 focus:outline-none transition-all"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Cidade / Estado</label>
                        <input 
                            type="text" 
                            placeholder="Ex: São Paulo, SP" 
                            className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-sm focus:border-white/30 focus:outline-none transition-all"
                            value={formData.city}
                            onChange={e => setFormData({...formData, city: e.target.value})}
                            required
                        />
                      </div>

                      <button 
                        type="submit" 
                        className={`w-full font-bold uppercase tracking-widest py-4 rounded-sm text-black transition-all shadow-lg mt-4 ${
                          role === 'MALE' 
                            ? 'bg-gold-500 hover:bg-gold-400 shadow-gold-500/10' 
                            : 'bg-rose-400 hover:bg-rose-300 shadow-rose-400/10'
                        }`}
                      >
                          Finalizar Cadastro
                      </button>
                  </form>
              </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
