
import React from 'react';
import { Shield, Search, CheckCircle, Menu, X, FileText, UserCheck, MessageSquare, HeartHandshake, LogIn, LogOut, User, Lock, Users, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME, SUPPORT_EMAIL } from '../constants';
import { useAuth } from '../contexts/AuthContext';

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
    // Hide if not authenticated (except for login which isn't a NavItem here)
    if (!isAuthenticated) return null;

    // Access Control Logic
    if (restrictedToAdmin && !isAdmin) return null;
    if (restrictedToMen && isAuthenticated && !isMale && !isAdmin) return null; // Admins can see male areas if needed
    
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={`flex items-center space-x-2 px-4 py-3 transition-colors duration-200 ${
          isActive 
            ? 'text-gold-500 bg-luxury-card border-l-2 border-gold-500' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon size={18} />
        <span className="uppercase tracking-wider text-sm font-medium flex items-center gap-2">
          {label}
          {restrictedToMen && <span className="text-[9px] bg-white/10 px-1 rounded text-gray-500">HOMENS</span>}
          {restrictedToAdmin && <span className="text-[9px] bg-gold-500 text-black px-1 rounded font-bold">ADM</span>}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-luxury-black text-gray-200 flex flex-col font-sans selection:bg-gold-500 selection:text-black pb-16 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-luxury-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="text-gold-500 group-hover:scale-110 transition-transform" size={28} />
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              VARÃO<span className="text-gold-500">10</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            
            {isAuthenticated ? (
                <>
                    <Link to="/consult" className="text-xs font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wide">Consultar</Link>
                    <Link to="/verified" className="text-xs font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wide">Verificadas</Link>
                    
                    {(isMale || isAdmin) && (
                    <>
                        <Link to="/desabafo" className="text-xs font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wide flex items-center gap-1">
                        <MessageSquare size={14}/> Desabafo
                        </Link>
                        <Link to="/community" className="text-xs font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wide flex items-center gap-1">
                        <Users size={14}/> Comunidade
                        </Link>
                        <Link to="/are-you-okay" className="text-xs font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wide flex items-center gap-1">
                        <HeartHandshake size={14}/> Você está bem?
                        </Link>
                    </>
                    )}

                    {isAdmin && (
                    <Link to="/admin" className="text-xs font-bold text-gold-500 border border-gold-500 px-2 py-1 rounded hover:bg-gold-500 hover:text-black transition-colors uppercase tracking-wide flex items-center gap-1">
                        <Lock size={12}/> Painel ADM
                    </Link>
                    )}
                </>
            ) : null}
            
            {!isAuthenticated ? (
               <Link to="/login" className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wide rounded-sm transition-colors flex items-center gap-2">
                 <LogIn size={14} /> Entrar
               </Link>
            ) : (
              <div className="flex items-center gap-4 border-l border-white/10 pl-4 ml-2">
                 <div className="flex items-center gap-2">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-gold-500 object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold">
                        {user?.name.charAt(0)}
                      </div>
                    )}
                    <div className="hidden xl:block">
                      <p className="text-xs font-bold text-white leading-none">{user?.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">
                        {user?.role === 'ADMIN' ? 'Administrador' : (user?.gender === 'MALE' ? 'Membro' : 'Usuária')}
                      </p>
                    </div>
                 </div>
                 <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors">
                   <LogOut size={18} />
                 </button>
              </div>
            )}
          </nav>

          {/* Mobile Profile/Login Button */}
          <div className="flex items-center gap-3 lg:hidden">
            {!isAuthenticated ? (
              <Link to="/login" className="text-gold-500 p-1">
                <LogIn size={24} />
              </Link>
            ) : (
              <button onClick={toggleMenu} className="text-gold-500 p-1">
                {isMenuOpen ? <X size={24} /> : (
                   user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-gold-500 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold text-xs">
                      {user?.name.charAt(0)}
                    </div>
                  )
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 pt-20 lg:hidden overflow-y-auto animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-1 pb-20">
            {isAuthenticated && (
               <div className="px-6 py-6 mb-4 border-b border-white/5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center text-black font-bold text-2xl shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-lg font-bold leading-tight">{user?.name}</p>
                    <p className="text-xs text-gold-500 font-medium uppercase tracking-wider">
                      {user?.role === 'ADMIN' ? 'Administrador do Sistema' : (user?.gender === 'MALE' ? 'Membro Varão10' : 'Usuária Cadastrada')}
                    </p>
                  </div>
               </div>
            )}

            <NavItem to="/" icon={Shield} label="Início" />
            <NavItem to="/consult" icon={Search} label="Consultar Perfil" />
            <NavItem to="/verified" icon={CheckCircle} label="Perfis Verificados" />
            
            <div className="h-px bg-white/5 my-2 mx-6"></div>
            
            <NavItem to="/desabafo" icon={MessageSquare} label="Espaço Desabafo" restrictedToMen={true} />
            <NavItem to="/community" icon={Users} label="Comunidade" restrictedToMen={true} />
            <NavItem to="/are-you-okay" icon={HeartHandshake} label="Você está bem?" restrictedToMen={true} />
            
            {isAdmin && (
              <NavItem to="/admin" icon={Lock} label="Painel Administrativo" restrictedToAdmin={true} />
            )}

            <div className="h-px bg-white/5 my-2 mx-6"></div>
            
            {isAuthenticated && !isMale && !isAdmin && (
              <NavItem to="/verification-request" icon={UserCheck} label="Validar meu Perfil" />
            )}
            
            <NavItem to="/blueprint" icon={FileText} label="Arquitetura do App" />
            <NavItem to="/support" icon={HeartHandshake} label="Suporte" />
            
            <div className="p-6 mt-4">
               {!isAuthenticated ? (
                 <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center w-full bg-gold-500 py-4 text-black font-bold uppercase rounded-sm shadow-lg shadow-gold-500/20"
                 >
                   Entrar / Cadastrar
                 </Link>
               ) : (
                 <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full border border-white/10 py-4 text-white/70 font-bold uppercase rounded-sm hover:bg-white/5 transition-colors"
                 >
                   Sair da Conta
                 </button>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-lg border-t border-white/10 px-2 py-2 flex items-center justify-around safe-area-bottom">
        <BottomNavItem to="/" icon={Shield} label="Home" />
        <BottomNavItem to="/consult" icon={Search} label="Consultar" />
        <BottomNavItem to="/verified" icon={CheckCircle} label="Verificados" />
        {isAuthenticated && (isMale || isAdmin) ? (
          <BottomNavItem to="/community" icon={Users} label="Comunidade" />
        ) : (
          <BottomNavItem to="/blueprint" icon={FileText} label="Info" />
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-luxury-dark border-t border-white/5 py-12 mt-12 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-gold-500 font-display font-bold text-xl mb-6">{APP_NAME}</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Plataforma líder em segurança e verificação de integridade para relacionamentos modernos. Protegendo o seu legado.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Comunidade</h4>
            {isAuthenticated ? (
                <ul className="space-y-3 text-sm text-gray-500">
                    <li><Link to="/desabafo" className="hover:text-gold-500 transition-colors">Fórum Desabafo</Link></li>
                    <li><Link to="/community" className="hover:text-gold-500 transition-colors">Eventos & Grupos</Link></li>
                    <li><Link to="/are-you-okay" className="hover:text-gold-500 transition-colors">Rede de Apoio</Link></li>
                </ul>
            ) : (
                <p className="text-gray-600 text-sm">Faça login para acessar os links da comunidade.</p>
            )}
          </div>
          <div>
             <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contato & Suporte</h4>
             <p className="text-gray-500 text-sm mb-6">{SUPPORT_EMAIL}</p>
             
             <a 
               href="https://wa.me/5531992561343?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20patrocinar%20o%20Var%C3%A3o10." 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider hover:text-gold-500 transition-all border border-white/10 px-4 py-3 rounded-sm bg-white/5"
             >
                <MessageCircle size={14} className="text-gold-500" />
                Contato Patrocínio
             </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase tracking-widest">
          © {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
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
      className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all duration-300 ${
        isActive ? 'text-gold-500' : 'text-gray-500'
      }`}
    >
      <Icon size={20} className={isActive ? 'scale-110' : ''} />
      <span className="text-[10px] mt-1 font-medium uppercase tracking-tighter">{label}</span>
      {isActive && <div className="w-1 h-1 bg-gold-500 rounded-full mt-0.5"></div>}
    </Link>
  );
};
