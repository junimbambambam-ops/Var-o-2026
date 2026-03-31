
import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Layout as LayoutIcon, Globe, ShieldCheck, Database, Code, Zap, Lock } from 'lucide-react';

export const Blueprint: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
          <Cpu size={14} className="text-gold-500" />
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Engenharia de Software</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
          Arquitetura <span className="text-gold-500">Varão10</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-light">
          A infraestrutura técnica por trás da plataforma líder em segurança e verificação de integridade.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <BlueprintCard 
          icon={<Code className="text-gold-500" />}
          title="Stack Tecnológica"
          items={[
            "Frontend: React 18 (SPA) + TypeScript",
            "Estilização: Tailwind CSS (Mobile-first)",
            "Animações: Framer Motion (motion/react)",
            "Roteamento: React Router v6"
          ]}
          delay={0.1}
        />
        <BlueprintCard 
          icon={<Zap className="text-gold-500" />}
          title="Inteligência Artificial"
          items={[
            "Modelo: Google Gemini 2.5 Flash",
            "Análise: Riscos comportamentais em tempo real",
            "Processamento: Sumarização de dados públicos",
            "Segurança: Zero-retention policy para prompts"
          ]}
          delay={0.2}
        />
        <BlueprintCard 
          icon={<Database className="text-gold-500" />}
          title="Infraestrutura & Dados"
          items={[
            "Persistência: PostgreSQL / Firebase (Enterprise)",
            "Cache: Redis para consultas frequentes",
            "Arquivos: AWS S3 com encriptação AES-256",
            "Monitoramento: Sentry + CloudWatch"
          ]}
          delay={0.3}
        />
        <BlueprintCard 
          icon={<Lock className="text-gold-500" />}
          title="Segurança & LGPD"
          items={[
            "Protocolo: HTTPS + TLS 1.3",
            "Privacidade: Dados abertos e auditoria de logs",
            "Identidade: Firebase Auth + MFA",
            "Compliance: Total aderência à LGPD"
          ]}
          delay={0.4}
        />
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3 tracking-tight">
          <LayoutIcon className="text-gold-500" size={24} />
          Fluxo do Usuário (UX Strategy)
        </h2>
        <div className="bg-luxury-card p-8 md:p-12 rounded-sm border border-white/5 text-xs md:text-sm font-mono text-gray-500 leading-relaxed shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] rounded-full -z-10"></div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-gold-500 font-bold">01</span>
              <p>HOME {'>'} CONSULTAR PERFIL {'>'} [INPUT: NOME/CIDADE] {'>'} [PROCESSAMENTO: MOCK API + GEMINI ANALYSIS] {'>'} TELA RESULTADOS</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-gold-500 font-bold">02</span>
              <p>HOME {'>'} SOLICITAR SELO {'>'} [INPUT: DOCS + SELFIE] {'>'} [ENVIO SEGURO] {'>'} APROVAÇÃO PENDENTE (ADMIN)</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-gold-500 font-bold">03</span>
              <p>COMMUNITY {'>'} EVENTOS {'>'} [FILTRO CATEGORIA] {'>'} [DETALHES] {'>'} [CONFIRMAÇÃO PRESENÇA]</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3 tracking-tight">
          <Globe className="text-gold-500" size={24} />
          Endpoints de API (Simulados)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EndpointItem method="GET" path="/api/public-records?cpf=..." desc="Busca em tribunais estaduais." />
          <EndpointItem method="POST" path="/api/analyze-risk" desc="Envia dados para IA gerar relatório." />
          <EndpointItem method="POST" path="/api/verify-user" desc="Upload de documentos para bucket seguro." />
          <EndpointItem method="GET" path="/api/verified-profiles" desc="Listagem pública de perfis com opt-in." />
        </div>
      </motion.section>
    </div>
  );
};

const BlueprintCard: React.FC<{ icon: any, title: string, items: string[], delay: number }> = ({ icon, title, items, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-luxury-card border border-white/5 p-8 rounded-sm hover:border-white/10 transition-all duration-500 shadow-xl group"
  >
    <div className="mb-6 p-4 bg-white/5 w-fit rounded-sm border border-white/5 group-hover:border-gold-500/30 transition-colors">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{title}</h3>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-sm text-gray-500 font-light">
          <ShieldCheck size={16} className="text-gold-500/50 mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const EndpointItem: React.FC<{ method: string, path: string, desc: string }> = ({ method, path, desc }) => (
  <div className="bg-white/5 p-6 rounded-sm border border-white/5 hover:border-white/10 transition-all group">
    <div className="flex items-center gap-3 mb-3">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${
        method === 'GET' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
      }`}>
        {method}
      </span>
      <code className="text-xs text-gold-500 font-mono font-bold">{path}</code>
    </div>
    <p className="text-xs text-gray-600 font-light">{desc}</p>
  </div>
);
