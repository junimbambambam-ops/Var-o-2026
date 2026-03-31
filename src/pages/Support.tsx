
import React from 'react';
import { MessageCircle, ShieldAlert, HelpCircle, Mail, Phone, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const Support: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
          <ShieldAlert size={14} className="text-gold-500" />
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Suporte & Segurança</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">Estamos à Disposição</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-lg leading-relaxed font-light">
          Nossa equipe de segurança está disponível para auxiliar em dúvidas sobre o processo de verificação ou receber denúncias de perfis falsos.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <SupportCard 
          icon={<MessageCircle size={32} className="text-white" />}
          title="WhatsApp Oficial"
          description="Atendimento rápido para dúvidas sobre pagamentos e verificação de perfil."
          actionText="Falar no WhatsApp"
          actionUrl="https://wa.me/5511999999999"
          color="bg-[#25D366]"
          delay={0.1}
        />
        <SupportCard 
          icon={<Mail size={32} className="text-gold-500" />}
          title="E-mail de Segurança"
          description="Para denúncias formais, envio de documentos ou parcerias institucionais."
          actionText="Enviar E-mail"
          actionUrl="mailto:suporte@varao10.com"
          color="bg-white/5 border border-white/10"
          delay={0.2}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-luxury-card border border-white/5 p-10 md:p-16 rounded-sm relative overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-10 -right-10 opacity-5">
          <Star size={200} className="text-gold-500" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight">Horário de Atendimento Elite</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Nossa equipe opera em regime de alta disponibilidade para garantir que sua experiência seja impecável.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 w-full md:w-auto">
            <TimeItem label="Segunda a Sexta" time="09h às 18h" />
            <TimeItem label="Sábado" time="09h às 13h" />
            <TimeItem label="Domingo" time="Apenas Urgências" />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold mb-4">Perguntas Frequentes</p>
        <div className="flex flex-wrap justify-center gap-4">
          <FAQLink label="Como funciona a verificação?" />
          <FAQLink label="Meus dados estão seguros?" />
          <FAQLink label="Como denunciar um perfil?" />
        </div>
      </motion.div>
    </div>
  );
};

const SupportCard: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  actionText: string, 
  actionUrl: string, 
  color: string,
  delay: number
}> = ({ icon, title, description, actionText, actionUrl, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-luxury-card border border-white/5 p-10 rounded-sm flex flex-col items-center text-center group hover:border-gold-500/30 transition-all duration-500 shadow-2xl"
  >
    <div className={`w-20 h-20 flex items-center justify-center rounded-full mb-8 group-hover:scale-110 transition-transform ${color.includes('bg-') ? color : 'bg-white/5'}`}>
      {icon}
    </div>
    <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 text-sm mb-10 leading-relaxed font-light">{description}</p>
    <a 
      href={actionUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-full py-5 rounded-sm font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl ${
        color.includes('bg-[#25D366]') 
          ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[#25D366]/10' 
          : 'bg-gold-500 hover:bg-gold-400 text-black shadow-gold-500/10'
      }`}
    >
      {actionText}
      <ExternalLink size={14} />
    </a>
  </motion.div>
);

const TimeItem: React.FC<{ label: string, time: string }> = ({ label, time }) => (
  <div className="flex items-center justify-between gap-10 px-6 py-4 bg-white/5 border border-white/10 rounded-sm">
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold text-gold-500">{time}</span>
  </div>
);

const FAQLink: React.FC<{ label: string }> = ({ label }) => (
  <button className="text-xs text-gray-500 hover:text-gold-500 transition-colors flex items-center gap-2 group">
    {label}
    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
  </button>
);
