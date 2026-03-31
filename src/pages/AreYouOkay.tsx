
import React, { useState } from 'react';
import { HeartHandshake, Phone, ArrowRight, BrainCircuit, Loader2, ExternalLink, Lock, Star, ShieldCheck, MessageSquare, Heart } from 'lucide-react';
import { getSupportiveAdvice } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const AreYouOkay: React.FC = () => {
  const { isAuthenticated, isMale, isAdmin } = useAuth();
  const { sponsors, supportResources } = useData();
  
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
          Esta área é destinada exclusivamente ao suporte emocional masculino, abordando temas sensíveis à realidade dos homens de valor.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-black hover:bg-gold-500 uppercase text-[10px] font-bold tracking-[0.2em] border border-gold-500 px-10 py-4 rounded-sm transition-all">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  const [story, setStory] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeekAdvice = async () => {
    if (!story.trim()) return;
    setLoading(true);
    try {
      const response = await getSupportiveAdvice(story);
      setAiResponse(response);
    } catch (error) {
      setAiResponse("Desculpe, tive um problema ao processar sua solicitação. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
          <Heart size={14} className="text-gold-500" />
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Suporte Masculino</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">Você não está <span className="text-gold-500">sozinho</span></h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-light">
          Todos nós passamos por batalhas silenciosas. Aqui você encontra ferramentas para fortalecer sua mente e contatos para momentos de crise.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        
        {/* Left Column: AI Support */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-luxury-card border border-gold-500/10 p-8 md:p-12 rounded-sm relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <BrainCircuit size={180} className="text-white" />
            </div>
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center">
                <BrainCircuit className="text-gold-500" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white tracking-tight">Mentor Virtual Elite</h2>
                <p className="text-[10px] text-gold-500 uppercase tracking-widest font-bold">Perspectiva Estoica & Racional</p>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {!aiResponse ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10"
                >
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed font-light">
                    Está passando por algo difícil? Escreva abaixo. Nossa IA está treinada para ouvir e oferecer uma perspectiva estoica e racional para te ajudar a colocar a cabeça no lugar.
                  </p>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-sm focus:border-gold-500/50 focus:outline-none transition-all min-h-[180px] mb-6 placeholder:text-gray-700 text-sm"
                    placeholder="Desabafe aqui... O que está te pressionando hoje?"
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                  />
                  <button 
                    onClick={handleSeekAdvice}
                    disabled={loading || !story.trim()}
                    className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest py-5 rounded-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold-500/10"
                  >
                    {loading ? <Loader2 className="animate-spin" size={22}/> : <MessageSquare size={22} />}
                    {loading ? 'Processando Pensamentos...' : 'Buscar Orientação Elite'}
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="response"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-10"
                >
                  <div className="bg-white/5 border border-white/10 p-8 rounded-sm mb-8 shadow-inner">
                    <p className="text-gray-300 leading-relaxed italic font-light text-lg">"{aiResponse}"</p>
                  </div>
                  <button 
                    onClick={() => { setAiResponse(null); setStory(''); }}
                    className="text-gold-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors border border-gold-500/20 px-6 py-3 rounded-sm hover:bg-gold-500/5"
                  >
                    Nova Consulta de Mentor
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-900/10 border border-red-500/20 p-8 rounded-sm flex flex-col sm:flex-row items-center gap-6 shadow-xl"
          >
             <div className="bg-red-500/10 p-5 rounded-full shrink-0">
               <Phone className="text-red-500" size={32} />
             </div>
             <div className="text-center sm:text-left">
               <h3 className="text-white font-display font-bold text-xl mb-1 tracking-tight">Emergência Emocional?</h3>
               <p className="text-gray-500 text-sm mb-4 font-light">Se você sente que não há saída, por favor, fale com um especialista agora. Sua vida importa.</p>
               <a href="tel:188" className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all shadow-lg shadow-red-500/20">
                 Ligar para o CVV (188)
                 <ExternalLink size={14} />
               </a>
             </div>
          </motion.div>
        </div>

        {/* Right Column: Support Network */}
        <div className="lg:col-span-5 space-y-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3"
          >
            <ShieldCheck className="text-gold-500" size={24} />
            Rede de Apoio Profissional
          </motion.h2>
          
          <div className="space-y-4">
            {supportResources.map((resource, index) => (
              <motion.div 
                key={resource.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="bg-luxury-card border border-white/5 p-8 rounded-sm hover:border-gold-500/30 transition-all duration-500 group shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm mb-3 inline-block ${
                      resource.type === 'EMERGENCY' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-gold-500/10 text-gold-500 border border-gold-500/20'
                    }`}>
                      {resource.type === 'PROFESSIONAL' ? 'Profissional' : resource.type === 'EMERGENCY' ? 'Emergência' : 'Grupo'}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-gold-500 transition-colors tracking-tight">{resource.title}</h3>
                  </div>
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-gold-500/10 transition-colors">
                    <ExternalLink size={16} className="text-gray-600 group-hover:text-gold-500 transition-colors" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed">{resource.description}</p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                   <p className="text-white font-mono text-sm tracking-wider">{resource.contact}</p>
                   <button className="text-[10px] font-bold text-gold-500 uppercase tracking-widest hover:text-white transition-colors">Contatar</button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 p-10 rounded-sm border border-dashed border-white/10 text-center"
          >
            <p className="text-gray-500 text-sm mb-6 font-light">Você é um profissional (psicólogo, advogado) e deseja contribuir com a rede?</p>
            <button className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.2em] border border-gold-500/30 px-8 py-4 rounded-sm hover:bg-gold-500 hover:text-black transition-all">
              Cadastre-se na Rede Elite
            </button>
          </motion.div>
        </div>
      </div>

      {/* SPONSORS SECTION */}
      {sponsors.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="border-t border-white/5 pt-24"
        >
            <div className="text-center mb-16">
              <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight flex items-center justify-center gap-4">
                  <Star size={24} className="text-gold-500 fill-gold-500/20"/>
                  Patrocinadores Oficiais & Parceiros
                  <Star size={24} className="text-gold-500 fill-gold-500/20"/>
              </h3>
              <div className="h-1 w-20 bg-gold-500/30 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sponsors.map((sponsor, index) => (
                    <motion.div 
                      key={sponsor.id}
                      whileHover={{ y: -5 }}
                      className="bg-luxury-card border border-white/5 p-8 rounded-sm text-center group hover:border-gold-500/30 transition-all duration-500 shadow-xl"
                    >
                        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white/5 group-hover:border-gold-500/20 transition-all">
                           {sponsor.imageUrl ? <img src={sponsor.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer"/> : <span className="text-black font-bold text-2xl">{sponsor.name.charAt(0)}</span>}
                        </div>
                        <h4 className="text-white font-bold mb-2 group-hover:text-gold-500 transition-colors tracking-tight">{sponsor.name}</h4>
                        <p className="text-gray-500 text-[10px] mb-6 uppercase tracking-widest font-bold">{sponsor.description}</p>
                        {sponsor.websiteUrl && (
                            <a href={sponsor.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">
                                Visitar Site
                                <ExternalLink size={12} />
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
      )}

    </div>
  );
};
