
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, User, MapPin, Link as LinkIcon, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DISCLAIMER_TEXT } from '../constants';

export const ConsultProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    socialLink: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/results', { state: { searchParams: formData } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
          <ShieldCheck size={14} className="text-gold-500" />
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Verificação de Integridade</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Consultar Perfil</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Insira os dados abaixo para iniciar uma varredura em fontes públicas e análise comportamental via inteligência artificial.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-luxury-card border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[60px] rounded-full -z-10"></div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500 ml-1">
              <User size={12} /> Nome Completo (Obrigatório)
            </label>
            <input 
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 text-white p-5 focus:border-gold-500/50 focus:outline-none transition-all rounded-sm placeholder:text-gray-700"
              placeholder="Ex: Maria da Silva"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">
                <MapPin size={12} /> Cidade/Estado (Opcional)
              </label>
              <input 
                type="text"
                className="w-full bg-white/5 border border-white/10 text-white p-5 focus:border-gold-500/50 focus:outline-none transition-all rounded-sm placeholder:text-gray-700"
                placeholder="Ex: São Paulo, SP"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">
                <LinkIcon size={12} /> Link Rede Social (Opcional)
              </label>
              <input 
                type="url"
                className="w-full bg-white/5 border border-white/10 text-white p-5 focus:border-gold-500/50 focus:outline-none transition-all rounded-sm placeholder:text-gray-700"
                placeholder="https://instagram.com/..."
                value={formData.socialLink}
                onChange={(e) => setFormData({...formData, socialLink: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-gold-500/5 border border-gold-500/10 p-6 rounded-sm flex gap-4 items-start">
            <AlertTriangle className="text-gold-500 shrink-0 mt-0.5" size={20} />
            <p className="text-[11px] text-gold-500/70 leading-relaxed italic">
              {DISCLAIMER_TEXT}
            </p>
          </div>

          <button 
            type="submit"
            className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-[0.2em] py-5 rounded-sm transition-all flex items-center justify-center gap-3 group shadow-xl shadow-gold-500/10"
          >
            <Search size={22} className="group-hover:scale-110 transition-transform" />
            Iniciar Varredura Elite
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          Sua consulta é 100% anônima e segura.
        </p>
      </motion.div>
    </div>
  );
};
