
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Users, Lock, Calendar, MapPin, ArrowRight, Star, MessageSquare, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Community: React.FC = () => {
  const { isAuthenticated, isMale, isAdmin } = useAuth();
  const { communityEvents } = useData();

  // Access Control: Allow Men OR Admins
  if (isAuthenticated && !isMale && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 p-12 rounded-full mb-8 border border-white/10 relative"
        >
          <Lock size={80} className="text-gold-500" />
          <div className="absolute inset-0 bg-gold-500/10 blur-3xl rounded-full -z-10"></div>
        </motion.div>
        <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Acesso Restrito</h2>
        <p className="text-gray-500 max-w-md mb-10 text-sm leading-relaxed">
          A Comunidade Varão10 é um ecossistema exclusivo para integração, networking e atividades entre homens de valor.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-black hover:bg-gold-500 uppercase text-[10px] font-bold tracking-[0.2em] border border-gold-500 px-10 py-4 rounded-sm transition-all">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  if (!isAuthenticated) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-md"
            >
              <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">Identidade Necessária</h2>
              <p className="text-gray-500 mb-10 text-sm leading-relaxed">
                Para participar dos grupos, eventos e discussões da nossa comunidade, você precisa estar autenticado na plataforma.
              </p>
              <Link to="/login" className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-black px-12 py-5 font-bold uppercase tracking-widest rounded-sm transition-all shadow-xl shadow-gold-500/20">
                 Entrar na Comunidade
                 <ArrowRight size={18} />
              </Link>
            </motion.div>
        </div>
     );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
              <Users size={14} className="text-gold-500" />
              <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Irmandade & Networking</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
                VARÃO<span className="text-gold-500">10</span> COMU
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-light">
                Futebol, corrida, networking e desenvolvimento. Conecte-se com homens que compartilham dos mesmos valores e buscam o topo.
            </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <CategoryTab label="Todos" active />
            <CategoryTab label="Esportes" />
            <CategoryTab label="Networking" />
            <CategoryTab label="Cultura" />
            <CategoryTab label="Treino" />
          </div>
          <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all">
            <Plus size={16} /> Sugerir Evento
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityEvents.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-luxury-card border border-white/5 rounded-sm overflow-hidden group hover:border-gold-500/30 transition-all duration-500 flex flex-col shadow-2xl"
                >
                    <div className="h-56 overflow-hidden relative">
                        <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-60"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-card to-transparent"></div>
                        <div className="absolute top-6 right-6 bg-luxury-black/60 backdrop-blur-md text-gold-500 text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-[0.2em] border border-gold-500/20">
                            {event.category}
                        </div>
                        <div className="absolute bottom-6 left-6">
                           <h3 className="text-2xl font-display font-bold text-white group-hover:text-gold-500 transition-colors tracking-tight">{event.title}</h3>
                        </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col">
                        <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed font-light">{event.description}</p>
                        
                        <div className="grid grid-cols-1 gap-4 mb-8">
                            <EventDetail icon={<Calendar size={16} className="text-gold-500"/>} label={event.date} />
                            <EventDetail icon={<MapPin size={16} className="text-gold-500"/>} label={event.location} />
                            <EventDetail icon={<Users size={16} className="text-gold-500"/>} label={`${event.participants} Confirmados`} />
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 bg-gold-500 hover:bg-gold-400 text-black py-4 font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/10">
                              Participar
                              <ArrowRight size={14}/>
                          </button>
                          <button className="w-14 h-14 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all group">
                              <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 glass-card p-12 md:p-20 rounded-sm text-center relative overflow-hidden"
        >
            <div className="absolute -top-10 -left-10 opacity-5">
              <Star size={200} className="text-gold-500" />
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">Expanda sua Rede</h3>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto text-sm leading-relaxed">Organize um evento na sua cidade, lidere um grupo de estudos ou promova um encontro de networking entre os varões.</p>
            <button className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-4 rounded-sm uppercase text-[10px] font-bold tracking-[0.2em] transition-all">
                <Plus size={16} /> Criar Novo Grupo
            </button>
        </motion.div>
    </div>
  );
};

const CategoryTab: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => (
  <button className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all whitespace-nowrap border ${
    active 
      ? 'bg-gold-500 text-black border-gold-500' 
      : 'bg-white/5 text-gray-500 border-white/10 hover:border-white/20 hover:text-white'
  }`}>
    {label}
  </button>
);

const EventDetail: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-gray-400 text-xs font-light">
      <div className="w-8 h-8 bg-white/5 flex items-center justify-center rounded-sm">
        {icon}
      </div>
      {label}
  </div>
);
