
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Lock, Eye, ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
             <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold-500)_0%,_transparent_70%)] opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 border border-gold-500/30 rounded-full px-4 py-1.5 mb-8 bg-gold-500/10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
            <span className="text-gold-400 text-[10px] font-bold tracking-[0.2em] uppercase">Sistema de Inteligência Masculina</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight"
          >
            Proteja seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 drop-shadow-sm">Legado</span>.
            <br />
            Garanta sua Paz.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A primeira plataforma de verificação de perfis para integridade masculina. 
            Valide informações, antecedentes e redes sociais com sigilo absoluto.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/consult" 
              className="w-full sm:w-auto px-10 py-5 bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-widest rounded-sm transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 group"
            >
              <Search size={20} />
              Consultar Agora
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/verified" 
              className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={20} />
              Verificadas
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-luxury-dark/50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value="15k+" label="Consultas Realizadas" />
          <StatItem value="2.4k" label="Perfis Verificados" />
          <StatItem value="98%" label="Precisão de Dados" />
          <StatItem value="100%" label="Sigilo Garantido" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-luxury-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-gold-500 font-display font-bold text-sm uppercase tracking-[0.3em] mb-4">Funcionalidades Elite</h2>
            <p className="text-3xl md:text-4xl font-bold text-white">Tecnologia a favor da sua segurança</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Eye className="text-gold-500" size={32} />}
              title="Varredura Pública"
              description="Acesso a bancos de dados públicos de antecedentes e processos judiciais de forma simplificada."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-gold-500" size={32} />}
              title="Selo de Confiança"
              description="Mulheres podem solicitar verificação oficial enviando documentos para nossa equipe de análise."
            />
            <FeatureCard 
              icon={<Lock className="text-gold-500" size={32} />}
              title="Privacidade Total"
              description="Ninguém saberá que você realizou uma consulta. Seus dados e buscas são criptografados."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto glass-card p-12 md:p-20 rounded-sm text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Star size={120} className="text-gold-500" />
           </div>
           <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">Pronto para tomar decisões inteligentes?</h2>
           <p className="text-gray-400 mb-10 max-w-xl mx-auto">Junte-se a milhares de homens que priorizam a paz e a segurança em seus relacionamentos.</p>
           <Link 
              to="/login" 
              className="inline-flex items-center gap-3 px-12 py-5 bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-widest rounded-sm transition-all shadow-xl shadow-gold-500/20"
            >
              Começar Agora
              <ArrowRight size={20} />
            </Link>
        </div>
      </section>
    </div>
  );
};

const StatItem: React.FC<{ value: string, label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl md:text-4xl font-display font-bold text-gold-500 mb-1">{value}</p>
    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">{label}</p>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-10 bg-luxury-card border border-white/5 hover:border-gold-500/30 transition-all rounded-sm group"
  >
    <div className="mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-sm group-hover:bg-gold-500/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);
