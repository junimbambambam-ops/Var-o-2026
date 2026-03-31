
import React from 'react';
import { Shield, Search, CheckCircle, Menu, X, FileText, UserCheck, MessageSquare, HeartHandshake, LogIn, LogOut, User, Lock, Users, MessageCircle, ChevronRight, Bell } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME, SUPPORT_EMAIL } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isMale, isAuthenticated, isAdmin } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const NavItem = ({ to, icon: Icon, label, restrictedToMen, restrictedToAdmin }: { to: string, icon: any, label: string, restrictedToMen?: boolean, restrictedToAdmin?: boolean }) => {
    if (!isAuthenticated) return null;
    if (restrictedToAdmin && !isAdmin) return null;
    if (restrictedToMen && isAuthenticated && !isMale && !isAdmin) return null;
    
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={`flex items-center justify-between px-8 py-5 transition-all duration-300 border-b border-white/5 group ${
          isActive 
            ? 'text-gold-500 bg-white/5' 
            : 'text-gray-500 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-4">
          <Icon size={20} className={isActive ? 'text-gold-500' : 'text-gray-600 group-hover:text-gold-500 transition-colors'} />
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold flex items-center gap-2">
            {label}
            {restrictedToMen && <span className="text-[8px] bg-gold-500/10 px-2 py-0.5 rounded-sm text-gold-500 border border-gold-500/20">ELITE</span>}
            {restrictedToAdmin && <span className="text-[8px] bg-gold-500 text-black px-2 py-0.5 rounded-sm font-bold">ADM</span>}
          </span>
        </div>
        <ChevronRight size={14} className={`transition-transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-luxury-black text-gray-200 flex flex-col font-sans selection:bg-gold-500 selection:text-black pb-20 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-luxury-dark/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="text-gold-500 group-hover:scale-110 transition-transform duration-500" size={32} />
              <div className="absolute inset-0 bg-gold-500/20 blur-lg rounded-full -z-10 group-hover:bg-gold-500/40 transition-all"></div>
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter text-white">
              VARÃO<span className="text-gold-500">10</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {isAuthenticated ? (
                <>
                    <Link to="/consult" className="text-[10px] font-bold text-gray-500 hover:text-gold-500 transition-all uppercase tracking-[0.2em]">Consultar</Link>
                    <Link to="/verified" className="text-[10px] font-bold text-gray-500 hover:text-gold-500 transition-all uppercase tracking-[0.2em]">Verificadas</Link>
                    
                    {(isMale || isAdmin) && (
                    <>
                        <Link to="/desabafo" className="text-[10px] font-bold text-gray-500 hover:text-gold-500 transition-all uppercase tracking-[0.2em] flex items-center gap-2">
                          <MessageSquare size={14}/> Desabafo
                        </Link>
                        <Link to="/community" className="text-[10px] font-bold text-gray-500 hover:text-gold-500 transition-all uppercase tracking-[0.2em] flex items-center gap-2">
                          <Users size={14}/> Comunidade
                        </Link>
                        <Link to="/are-you-okay" className="text-[10px] font-bold text-gray-500 hover:text-gold-500 transition-all uppercase tracking-[0.2em] flex items-center gap-2">
                          <HeartHandshake size={14}/> Apoio
                        </Link>
                    </>
                    )}

                    {isAdmin && (
                    <Link to="/admin" className="text-[10px] font-bold text-gold-500 border border-gold-500/30 px-4 py-2 rounded-sm hover:bg-gold-500 hover:text-black transition-all uppercase tracking-[0.2em] flex items-center gap-2">
                        <Lock size={12}/> Admin
                    </Link>
                    )}
                </>
            ) : null}
            
            {!isAuthenticated ? (
               <Link to="/login" className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all flex items-center gap-2 shadow-lg shadow-gold-500/10">
                 <LogIn size={16} /> Entrar
               </Link>
            ) : (
              <div className="flex items-center gap-6 border-l border-white/10 pl-8 ml-2">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                      {user?.avatarUrl ? (
                        <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full border border-gold-500/30 object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold text-sm">
                          {user?.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-luxury-dark rounded-full"></div>
                    </div>
                    <div className="hidden xl:block">
                      <p className="text-sm font-bold text-white leading-none tracking-tight">{user?.name}</p>
                      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mt-1">
                        {user?.role === 'ADMIN' ? 'Administrador' : (user?.gender === 'MALE' ? 'Membro Elite' : 'Usuária')}
                      </p>
                    </div>
                 </div>
                 <button onClick={handleLogout} className="text-gray-700 hover:text-red-500 transition-all p-2 bg-white/5 rounded-sm border border-white/5">
                   <LogOut size={18} />
                 </button>
              </div>
            )}
          </nav>

          {/* Mobile Profile/Login Button */}
          <div className="flex items-center gap-4 lg:hidden">
            {!isAuthenticated ? (
              <Link to="/login" className="text-gold-500 p-2 bg-white/5 rounded-sm border border-white/5">
                <LogIn size={24} />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <button className="text-gray-600 p-2 bg-white/5 rounded-sm border border-white/5">
                  <Bell size={20} />
                </button>
                <button onClick={toggleMenu} className="relative p-1">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full border border-gold-500/30 object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold text-sm">
                      {user?.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-luxury-dark rounded-full"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-luxury-black lg:hidden flex flex-col"
          >
            <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <Shield className="text-gold-500" size={28} />
                <span className="font-display font-bold text-xl tracking-tighter text-white">MENU <span className="text-gold-500">ELITE</span></span>
              </div>
              <button onClick={toggleMenu} className="p-2 bg-white/5 rounded-sm border border-white/5 text-gold-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-8">
              {isAuthenticated && (
                 <div className="px-8 mb-10">
                    <div className="flex items-center gap-5 p-6 bg-white/5 rounded-sm border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 blur-2xl rounded-full -z-10"></div>
                      <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold text-3xl shadow-2xl shadow-gold-500/20">
                        {user?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-xl font-bold tracking-tight">{user?.name}</p>
                        <p className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.2em] mt-1">
                          {user?.role === 'ADMIN' ? 'Administrador' : (user?.gender === 'MALE' ? 'Membro Elite' : 'Usuária')}
                        </p>
                      </div>
                    </div>
                 </div>
              )}

              <div className="flex flex-col">
                <NavItem to="/" icon={Shield} label="Início" />
                <NavItem to="/consult" icon={Search} label="Consultar Perfil" />
                <NavItem to="/verified" icon={CheckCircle} label="Perfis Verificados" />
                
                <div className="px-8 py-6">
                  <div className="h-px bg-white/5"></div>
                </div>
                
                <NavItem to="/desabafo" icon={MessageSquare} label="Espaço Desabafo" restrictedToMen={true} />
                <NavItem to="/community" icon={Users} label="Comunidade" restrictedToMen={true} />
                <NavItem to="/are-you-okay" icon={HeartHandshake} label="Você está bem?" restrictedToMen={true} />
                
                {isAdmin && (
                  <NavItem to="/admin" icon={Lock} label="Painel Administrativo" restrictedToAdmin={true} />
                )}

                <div className="px-8 py-6">
                  <div className="h-px bg-white/5"></div>
                </div>
                
                {isAuthenticated && !isMale && !isAdmin && (
                  <NavItem to="/verification-request" icon={UserCheck} label="Validar meu Perfil" />
                )}
                
                <NavItem to="/blueprint" icon={FileText} label="Arquitetura" />
                <NavItem to="/support" icon={HeartHandshake} label="Suporte" />
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-white/2">
               {!isAuthenticated ? (
                 <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center w-full bg-gold-500 py-5 text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-sm shadow-2xl shadow-gold-500/20"
                 >
                   Entrar / Cadastrar
                 </Link>
               ) : (
                 <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full border border-white/10 py-5 text-white/50 font-bold uppercase text-[10px] tracking-[0.2em] rounded-sm hover:bg-white/5 transition-all"
                 >
                   Sair da Conta
                 </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex items-center justify-around safe-area-bottom">
        <BottomNavItem to="/" icon={Shield} label="Home" />
        <BottomNavItem to="/consult" icon={Search} label="Consultar" />
        <BottomNavItem to="/verified" icon={CheckCircle} label="Verificados" />
        {isAuthenticated && (isMale || isAdmin) ? (
          <BottomNavItem to="/community" icon={Users} label="Comu" />
        ) : (
          <BottomNavItem to="/blueprint" icon={FileText} label="Info" />
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-luxury-dark border-t border-white/5 py-20 mt-20 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <Shield className="text-gold-500" size={28} />
              <span className="font-display font-bold text-xl tracking-tighter text-white">
                VARÃO<span className="text-gold-500">10</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Plataforma líder em segurança e verificação de integridade para relacionamentos modernos. Protegendo o seu legado através da inteligência.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Comunidade</h4>
            {isAuthenticated ? (
                <ul className="space-y-4 text-xs text-gray-500 font-medium">
                    <li><Link to="/desabafo" className="hover:text-gold-500 transition-colors uppercase tracking-widest">Fórum Desabafo</Link></li>
                    <li><Link to="/community" className="hover:text-gold-500 transition-colors uppercase tracking-widest">Eventos & Grupos</Link></li>
                    <li><Link to="/are-you-okay" className="hover:text-gold-500 transition-colors uppercase tracking-widest">Rede de Apoio</Link></li>
                </ul>
            ) : (
                <p className="text-gray-700 text-[10px] uppercase tracking-widest font-bold">Acesso Restrito</p>
            )}
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Legal</h4>
            <ul className="space-y-4 text-xs text-gray-500 font-medium">
                <li><Link to="/blueprint" className="hover:text-gold-500 transition-colors uppercase tracking-widest">Termos de Uso</Link></li>
                <li><Link to="/blueprint" className="hover:text-gold-500 transition-colors uppercase tracking-widest">Privacidade</Link></li>
                <li><Link to="/support" className="hover:text-gold-500 transition-colors uppercase tracking-widest">Suporte</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Contato</h4>
             <p className="text-gray-500 text-xs mb-8 font-mono">{SUPPORT_EMAIL}</p>
             
             <a 
               href="https://wa.me/5531992561343?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20patrocinar%20o%20Var%C3%A3o10." 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:text-gold-500 transition-all border border-white/5 px-6 py-4 rounded-sm bg-white/5 hover:bg-white/10"
             >
                <MessageCircle size={16} className="text-gold-500" />
                Patrocínio
             </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-gray-700 uppercase tracking-[0.3em] font-bold">
            © {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[9px] text-gray-800 uppercase tracking-widest font-bold">Protocolo Seguro v2.5</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] text-gray-800 uppercase tracking-widest font-bold">Servidores Ativos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const BottomNavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center py-2 px-4 rounded-sm transition-all duration-500 relative ${
        isActive ? 'text-gold-500' : 'text-gray-600 hover:text-gray-400'
      }`}
    >
      <Icon size={22} className={`transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} />
      <span className="text-[9px] mt-1.5 font-bold uppercase tracking-widest">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="bottomNavActive"
          className="absolute -bottom-3 left-0 right-0 h-1 bg-gold-500 rounded-t-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        />
      )}
    </Link>
  );
};
