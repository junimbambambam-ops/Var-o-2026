
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertOctagon, Scale, BrainCircuit, Loader2, ShieldCheck, Download, Share2, ArrowLeft, Star, Zap, Lock } from 'lucide-react';
import { SearchParams } from '../types';
import { analyzeProfileRisk } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state?.searchParams as SearchParams;
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [mockRecords, setMockRecords] = useState<any>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Conectando aos Tribunais de Justiça...",
    "Varrendo Antecedentes Criminais...",
    "Analisando Pegada Digital em Redes Sociais...",
    "Processando Dados via Inteligência Artificial...",
    "Gerando Relatório de Integridade..."
  ];

  useEffect(() => {
    if (!searchParams) return;

    const fetchData = async () => {
      // Simulate loading steps
      const stepInterval = setInterval(() => {
        setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 1500);

      // Simulate Database Delay
      await new Promise(resolve => setTimeout(resolve, 6000));
      
      // Generate Mock Records based on input (Deterministic for demo)
      const hasRedFlagName = searchParams.fullName.toLowerCase().includes('teste') || searchParams.fullName.toLowerCase().includes('perigo');
      
      setMockRecords({
        criminal: hasRedFlagName ? 1 : 0,
        civil: hasRedFlagName ? 2 : 0,
        socialScore: hasRedFlagName ? 45 : 92,
        protocol: Math.floor(Math.random() * 900000) + 100000
      });

      // Call Gemini
      try {
        const analysis = await analyzeProfileRisk(searchParams);
        setAiAnalysis(analysis);
      } catch (error) {
        setAiAnalysis("Erro ao processar análise de IA. Por favor, tente novamente.");
      } finally {
        clearInterval(stepInterval);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (!searchParams) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 p-10 rounded-full mb-8 border border-white/10"
        >
          <AlertOctagon size={64} className="text-red-500" />
        </motion.div>
        <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">Acesso Inválido</h2>
        <p className="text-gray-500 mb-10 max-w-xs mx-auto text-sm">Não foi possível localizar os parâmetros de busca para gerar o relatório.</p>
        <Link to="/consult" className="inline-flex items-center gap-2 text-gold-500 hover:text-white uppercase text-[10px] font-bold tracking-widest border border-gold-500 px-10 py-4 rounded-sm transition-all">
          <ArrowLeft size={14} /> Voltar para busca
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="relative mb-12">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-2 border-gold-500/20 border-t-gold-500 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BrainCircuit className="text-gold-500 animate-pulse" size={40} />
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={loadingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4 tracking-tight">Varredura Elite</h2>
            <p className="text-gold-500 text-xs uppercase tracking-[0.3em] font-bold animate-pulse">
              {loadingMessages[loadingStep]}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 w-full max-w-xs bg-white/5 h-1 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
            className="h-full bg-gold-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="px-2 py-0.5 bg-gold-500 text-black text-[9px] font-bold uppercase tracking-widest rounded-sm">Confidencial</div>
            <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Protocolo #{mockRecords.protocol}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">Relatório de <span className="text-gold-500">Integridade</span></h1>
          <p className="text-gray-500 mt-4 text-sm md:text-lg font-light">
            Análise detalhada para: <span className="text-white font-bold uppercase tracking-wide">{searchParams.fullName}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 md:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2">
            <Download size={14} /> PDF
          </button>
          <button className="flex-1 md:flex-none px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2">
            <Share2 size={14} /> Compartilhar
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SummaryStat 
              label="Registros Criminais" 
              value={mockRecords.criminal === 0 ? "Limpo" : `${mockRecords.criminal} Encontrado`} 
              status={mockRecords.criminal === 0 ? "success" : "danger"} 
            />
            <SummaryStat 
              label="Processos Cíveis" 
              value={mockRecords.civil === 0 ? "Nenhum" : `${mockRecords.civil} Ativos`} 
              status={mockRecords.civil === 0 ? "success" : "warning"} 
            />
            <SummaryStat 
              label="Score de Confiança" 
              value={`${mockRecords.socialScore}/100`} 
              status={mockRecords.socialScore > 80 ? "success" : "warning"} 
            />
          </div>

          {/* Section: Judiciary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-luxury-card border border-white/5 p-8 md:p-10 rounded-sm shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="flex items-center gap-3 text-xl font-display font-bold text-white">
                <Scale className="text-gold-500" size={24} />
                Varredura Judiciária
              </h3>
              <div className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Fontes Públicas</div>
            </div>
            
            <div className="space-y-4">
              <ResultRow 
                label="Antecedentes Criminais (Estadual/Federal)" 
                status={mockRecords.criminal === 0 ? 'NADA CONSTA' : 'REGISTRO LOCALIZADO'} 
                isDanger={mockRecords.criminal > 0}
              />
              <ResultRow 
                label="Processos Cíveis e Trabalhistas" 
                status={mockRecords.civil === 0 ? 'NADA CONSTA' : `${mockRecords.civil} PROCESSOS PÚBLICOS`} 
                isDanger={mockRecords.civil > 0}
              />
              <ResultRow 
                label="Mandados de Prisão em Aberto" 
                status="NADA CONSTA" 
                isDanger={false}
              />
              <ResultRow 
                label="Participação em Empresas (Receita Federal)" 
                status="VERIFICADO" 
                isDanger={false}
              />
            </div>
            <p className="mt-8 text-[10px] text-gray-600 italic leading-relaxed">
              * A base de dados consulta apenas processos não sigilosos e informações de domínio público. 
              A precisão depende da atualização dos órgãos governamentais.
            </p>
          </motion.div>

          {/* Section: AI Analysis */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-luxury-card border border-gold-500/10 p-8 md:p-12 rounded-sm relative overflow-hidden shadow-2xl"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <BrainCircuit size={150} className="text-gold-500" />
             </div>
             
             <div className="flex items-center gap-4 mb-10 relative z-10">
               <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center">
                 <BrainCircuit className="text-gold-500" size={24} />
               </div>
               <div>
                 <h3 className="text-2xl font-display font-bold text-white tracking-tight">Análise Comportamental IA</h3>
                 <p className="text-[10px] text-gold-500 uppercase tracking-widest font-bold">Processamento de Linguagem Natural</p>
               </div>
             </div>

             <div className="relative z-10 space-y-6">
               {aiAnalysis.split('\n').filter(line => line.trim()).map((line, i) => (
                 <motion.p 
                   key={i} 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.6 + (i * 0.1) }}
                   className={line.startsWith('#') 
                    ? 'text-lg font-display font-bold text-gold-500 mt-8 mb-4' 
                    : 'text-gray-400 text-sm md:text-base leading-relaxed font-light'
                   }
                 >
                   {line.replace(/#/g, '').trim()}
                 </motion.p>
               ))}
             </div>
          </motion.div>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Score Card */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
             className="bg-luxury-card p-10 rounded-sm border border-white/5 text-center shadow-2xl relative overflow-hidden"
           >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
             <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8 font-bold">Índice de Transparência</h4>
             
             <div className="relative inline-flex items-center justify-center mb-8">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={440}
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * mockRecords.socialScore) / 100 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                    className={mockRecords.socialScore > 80 ? 'text-green-500' : 'text-gold-500'}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-display font-bold ${mockRecords.socialScore > 80 ? 'text-green-500' : 'text-gold-500'}`}>
                    {mockRecords.socialScore}
                  </span>
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Pontos</span>
                </div>
             </div>
             
             <p className="text-xs text-gray-500 font-light leading-relaxed">
               Este score reflete a consistência dos dados públicos encontrados em relação à identidade declarada.
             </p>
           </motion.div>

           {/* Verification Status */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.7 }}
             className="bg-luxury-card p-8 rounded-sm border border-white/5 shadow-2xl"
           >
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                 <AlertOctagon size={20} className="text-red-500" />
               </div>
               <h4 className="text-sm font-bold text-white uppercase tracking-wider">Identidade Não Validada</h4>
             </div>
             
             <p className="text-xs text-gray-500 mb-8 leading-relaxed font-light">
               Este perfil não submeteu documentação oficial (RG/CPF) para validação manual pela equipe Varão10. 
               As informações são baseadas exclusivamente em varredura algorítmica.
             </p>
             
             <button disabled className="w-full py-4 bg-white/5 text-gray-700 text-[10px] font-bold uppercase tracking-widest rounded-sm cursor-not-allowed border border-white/5 flex items-center justify-center gap-2">
               <Lock size={14} /> Documentos Restritos
             </button>
           </motion.div>

           {/* Next Steps */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.9 }}
             className="bg-gold-500 p-8 rounded-sm shadow-2xl shadow-gold-500/20"
           >
             <div className="flex items-center gap-3 mb-4">
               <Zap size={20} className="text-black" />
               <h4 className="text-sm font-bold text-black uppercase tracking-wider">Ação Recomendada</h4>
             </div>
             <p className="text-black/80 text-xs mb-6 leading-relaxed font-medium">
               Deseja uma investigação mais profunda ou monitoramento contínuo deste perfil?
             </p>
             <button className="w-full py-4 bg-black text-gold-500 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-black/90 transition-all flex items-center justify-center gap-2">
               Upgrade para Monitoramento
               <Star size={14} />
             </button>
           </motion.div>

        </div>

      </div>
      
      {/* Footer Action */}
      <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Relatório gerado em {new Date().toLocaleString('pt-BR')}</p>
        <Link to="/consult" className="text-gold-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Nova Consulta
        </Link>
      </div>
    </div>
  );
};

const SummaryStat: React.FC<{ label: string, value: string, status: 'success' | 'warning' | 'danger' }> = ({ label, value, status }) => {
  const colors = {
    success: 'text-green-500',
    warning: 'text-gold-500',
    danger: 'text-red-500'
  };
  
  return (
    <div className="bg-luxury-card border border-white/5 p-6 rounded-sm shadow-xl">
      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-2">{label}</p>
      <p className={`text-xl font-display font-bold ${colors[status]}`}>{value}</p>
    </div>
  );
};

const ResultRow: React.FC<{ label: string, status: string, isDanger: boolean }> = ({ label, status, isDanger }) => (
  <div className="flex items-center justify-between p-5 bg-white/5 rounded-sm border border-white/5 hover:border-white/10 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDanger ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
        {isDanger ? <AlertOctagon className="text-red-500" size={16} /> : <CheckCircle className="text-green-500" size={16} />}
      </div>
      <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </div>
    <div className="text-right">
      <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase ${isDanger ? 'text-red-500' : 'text-green-500'}`}>
        {status}
      </span>
    </div>
  </div>
);
