
import React from 'react';
import { MOCK_VERIFIED_PROFILES } from '../constants';
import { CheckCircle, Shield, Star, ArrowUpRight, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const VerifiedList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
          <Star size={14} className="text-gold-500" />
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Elite Transparency</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">Perfis Verificados</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
          Abaixo estão listados perfis de mulheres que optaram pela transparência total. 
          Elas enviaram documentação, passaram por checagem criminal e validaram suas redes sociais.
        </p>
      </motion.div>

      {/* Filter/Search Bar Placeholder */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou cidade..." 
            className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-gold-500/50 focus:outline-none transition-all placeholder:text-gray-700 text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <FilterButton label="Todas" active />
          <FilterButton label="São Paulo" />
          <FilterButton label="Rio de Janeiro" />
          <FilterButton label="Curitiba" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {MOCK_VERIFIED_PROFILES.map((profile, index) => (
          <motion.div 
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-luxury-card border border-white/5 rounded-sm overflow-hidden group hover:border-gold-500/30 transition-all duration-500 shadow-xl hover:shadow-gold-500/5"
          >
            <div className="aspect-[4/5] bg-gray-900 relative overflow-hidden">
              <img 
                src={profile.imageUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute top-4 right-4">
                <div className="bg-luxury-black/60 backdrop-blur-md border border-white/10 p-2 rounded-full">
                  <Shield size={16} className="text-gold-500" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    {profile.name}, {profile.age}
                  </h3>
                  <CheckCircle size={18} className="text-gold-500" fill="black" />
                </div>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">{profile.city}</p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-gray-500 text-sm italic line-clamp-2 font-light leading-relaxed">"{profile.bio}"</p>
              
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((badge, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gold-500/5 border border-gold-500/10 text-[9px] text-gold-500 font-bold uppercase tracking-widest rounded-sm">
                    {badge}
                  </span>
                ))}
              </div>

              <button className="w-full py-4 bg-white/5 hover:bg-gold-500 hover:text-black border border-white/10 hover:border-gold-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group">
                Ver Perfil Completo
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => (
  <button className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all whitespace-nowrap border ${
    active 
      ? 'bg-gold-500 text-black border-gold-500' 
      : 'bg-white/5 text-gray-500 border-white/10 hover:border-white/20 hover:text-white'
  }`}>
    {label}
  </button>
);
