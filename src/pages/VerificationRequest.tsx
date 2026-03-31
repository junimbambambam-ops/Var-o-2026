
import React, { useState } from 'react';
import { Upload, Camera, FileText, ShieldCheck, CheckCircle2, ArrowRight, Star, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VerificationRequest: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-luxury-card border border-gold-500/30 p-12 md:p-20 rounded-sm shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 opacity-5">
            <Star size={200} className="text-gold-500" />
          </div>
          <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/20">
            <CheckCircle2 size={48} className="text-gold-500" />
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">Solicitação Enviada</h2>
          <p className="text-gray-500 mb-10 text-sm leading-relaxed max-w-sm mx-auto font-light">
            Sua documentação foi recebida com sucesso e está agora em nossa fila de análise prioritária. 
            O prazo médio para resposta é de <span className="text-gold-500 font-bold">24 a 48 horas úteis</span>.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-black px-10 py-4 font-bold uppercase tracking-widest rounded-sm transition-all shadow-xl shadow-gold-500/20"
          >
            Voltar ao Início
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
          <ShieldCheck size={14} className="text-gold-500" />
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Selo de Transparência</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">Varão10 Verificada</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
          Obtenha o selo de credibilidade máxima. Demonstre transparência total e ausência de pendências legais. 
          Seus documentos são criptografados e usados exclusivamente para validação interna.
        </p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-luxury-card border border-white/5 p-8 md:p-12 rounded-sm space-y-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 blur-[80px] rounded-full -z-10"></div>
        
        {/* Step 1: Personal Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <span className="w-8 h-8 bg-gold-500 text-black flex items-center justify-center rounded-full text-xs font-bold">1</span>
            <h3 className="text-xl font-display font-bold text-white tracking-tight uppercase">Dados Pessoais</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold ml-1">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Como no RG/CNH" 
                className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-sm focus:border-gold-500/50 focus:outline-none transition-all placeholder:text-gray-800" 
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold ml-1">CPF</label>
              <input 
                type="text" 
                placeholder="000.000.000-00" 
                className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-sm focus:border-gold-500/50 focus:outline-none transition-all placeholder:text-gray-800" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold ml-1">Data de Nascimento</label>
            <input 
              type="date" 
              className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-sm focus:border-gold-500/50 focus:outline-none transition-all" 
              required
            />
          </div>
        </div>

        {/* Step 2: Uploads */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <span className="w-8 h-8 bg-gold-500 text-black flex items-center justify-center rounded-full text-xs font-bold">2</span>
            <h3 className="text-xl font-display font-bold text-white tracking-tight uppercase">Documentação Oficial</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <UploadBox icon={<FileText size={24} />} label="RG/CNH (Frente)" />
            <UploadBox icon={<FileText size={24} />} label="RG/CNH (Verso)" />
          </div>

          <div className="border border-dashed border-white/10 rounded-sm p-10 text-center hover:border-gold-500/50 transition-all cursor-pointer bg-white/5 group">
            <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Camera className="text-gold-500" size={32} />
            </div>
            <p className="text-xs text-white uppercase tracking-widest font-bold mb-2">Selfie com Documento</p>
            <p className="text-[10px] text-gray-500 max-w-xs mx-auto leading-relaxed">
              Segure o documento ao lado do rosto. Certifique-se de que os dados do documento e seu rosto estejam nítidos.
            </p>
            <input type="file" className="hidden" />
          </div>
        </div>

        {/* Step 3: Consent */}
        <div className="space-y-6">
           <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <span className="w-8 h-8 bg-gold-500 text-black flex items-center justify-center rounded-full text-xs font-bold">3</span>
            <h3 className="text-xl font-display font-bold text-white tracking-tight uppercase">Termos & Consentimento</h3>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
             <label className="flex items-start gap-4 cursor-pointer group">
               <div className="relative flex items-center mt-1">
                 <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute" required />
                 <div className="w-5 h-5 border-2 border-white/20 rounded-sm peer-checked:bg-gold-500 peer-checked:border-gold-500 transition-all flex items-center justify-center">
                   <div className="w-2 h-3 border-r-2 border-b-2 border-black rotate-45 mb-0.5"></div>
                 </div>
               </div>
               <span className="text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors">
                 Aceito os Termos de Uso e autorizo o Varão10 a consultar meus antecedentes criminais e processuais para fins de emissão do selo de verificação. 
                 Estou ciente que meu perfil (nome, foto e selos) ficará visível na galeria de "Verificados" após aprovação.
               </span>
             </label>
          </div>
        </div>

        <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-[0.2em] py-5 rounded-sm transition-all shadow-xl shadow-gold-500/20 flex items-center justify-center gap-3 group">
          Enviar para Análise Elite
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>

      </motion.form>
      
      <div className="mt-12 flex items-center justify-center gap-4 text-gray-600">
        <div className="flex items-center gap-1.5">
          <Info size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Processo 100% Criptografado</span>
        </div>
      </div>
    </div>
  );
};

const UploadBox: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <div className="border border-dashed border-white/10 rounded-sm p-8 text-center hover:border-gold-500/50 transition-all cursor-pointer bg-white/5 group relative overflow-hidden">
    <div className="text-gray-600 group-hover:text-gold-500 transition-colors mb-3 flex justify-center">
      {icon}
    </div>
    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors">{label}</p>
    <input type="file" className="hidden" />
  </div>
);
