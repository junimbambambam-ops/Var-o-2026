
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Shield, Check, X, Users, AlertTriangle, FileText, Lock, Plus, Trash, HeartHandshake, Briefcase, Phone, Settings, Activity, TrendingUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const { sponsors, addSponsor, removeSponsor, supportResources, addSupportResource, removeSupportResource } = useData();
  
  const [pendingRequests, setPendingRequests] = useState([
    { id: '1', name: 'Carla Souza', date: '12/10/2023', status: 'PENDING', photo: 'https://picsum.photos/200?random=10' },
    { id: '2', name: 'Fernanda Lima', date: '13/10/2023', status: 'PENDING', photo: 'https://picsum.photos/200?random=11' },
  ]);

  // Sponsor Form State
  const [newSponsor, setNewSponsor] = useState({ name: '', description: '', websiteUrl: '' });
  const [isAddingSponsor, setIsAddingSponsor] = useState(false);

  // Resource Form State
  const [newResource, setNewResource] = useState({ title: '', description: '', contact: '', type: 'PROFESSIONAL' });
  const [isAddingResource, setIsAddingResource] = useState(false);

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSponsor.name && newSponsor.description) {
        addSponsor({
            id: Date.now().toString(),
            name: newSponsor.name,
            description: newSponsor.description,
            websiteUrl: newSponsor.websiteUrl,
            imageUrl: 'https://via.placeholder.com/150/D4AF37/000000?text=' + newSponsor.name.charAt(0)
        });
        setNewSponsor({ name: '', description: '', websiteUrl: '' });
        setIsAddingSponsor(false);
    }
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (newResource.title && newResource.contact) {
        addSupportResource({
            id: Date.now().toString(),
            title: newResource.title,
            description: newResource.description,
            contact: newResource.contact,
            type: newResource.type as 'PROFESSIONAL' | 'EMERGENCY' | 'GROUP',
            icon: newResource.type === 'EMERGENCY' ? 'Phone' : 'User'
        });
        setNewResource({ title: '', description: '', contact: '', type: 'PROFESSIONAL' });
        setIsAddingResource(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-500/10 p-12 rounded-full mb-8 border border-red-500/20"
        >
          <Lock size={80} className="text-red-500" />
        </motion.div>
        <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Acesso Negado</h2>
        <p className="text-gray-500 max-w-md mb-10 text-sm leading-relaxed">Esta área é restrita para administradores do sistema Varão10 Elite.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-black hover:bg-gold-500 uppercase text-[10px] font-bold tracking-[0.2em] border border-gold-500 px-10 py-4 rounded-sm transition-all">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  const handleApprove = (id: string) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
  };

  const handleReject = (id: string) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8"
      >
        <div>
           <div className="flex items-center gap-2 mb-4">
             <Settings size={16} className="text-gold-500" />
             <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.2em]">Painel de Controle</span>
           </div>
           <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">
             Admin <span className="text-gold-500">Dashboard</span>
           </h1>
           <p className="text-gray-500 mt-4 font-light">Gestão estratégica do ecossistema Varão10.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-gold-500/10 border border-gold-500/20 rounded-sm text-gold-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
             <Activity size={14} />
             Sistema Online
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatCard icon={<Users size={24} />} label="Usuários Totais" value="1,240" trend="+12%" />
        <StatCard icon={<Shield size={24} />} label="Perfis Verificados" value="856" trend="+5%" />
        <StatCard icon={<AlertTriangle size={24} />} label="Denúncias" value="3" color="text-red-500" trend="-2%" />
        <StatCard icon={<FileText size={24} />} label="Consultas" value="12,504" trend="+18%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Pending Verifications */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 bg-luxury-card border border-white/5 rounded-sm p-8 md:p-10 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
              <Shield className="text-gold-500" size={22} />
              Solicitações ({pendingRequests.length})
            </h3>
            <button className="text-gray-600 hover:text-white transition-colors">
              <Search size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {pendingRequests.length === 0 ? (
                 <p className="text-gray-600 italic text-sm py-10 text-center">Nenhuma solicitação pendente.</p>
              ) : (
                pendingRequests.map(req => (
                  <motion.div 
                    key={req.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between bg-white/5 p-5 rounded-sm border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <img src={req.photo} alt={req.name} className="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-gold-500/30 transition-colors" />
                      <div>
                        <p className="text-white font-bold text-sm tracking-tight">{req.name}</p>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">{req.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleReject(req.id)}
                        className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-sm transition-all" title="Rejeitar"
                      >
                        <X size={18} />
                      </button>
                      <button 
                        onClick={() => handleApprove(req.id)}
                        className="p-3 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-sm transition-all" title="Aprovar"
                      >
                        <Check size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Sponsor Management */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 bg-luxury-card border border-white/5 rounded-sm p-8 md:p-10 shadow-2xl"
        >
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                    <Users className="text-gold-500" size={22} />
                    Gestão de Patrocinadores
                </h3>
                <button 
                    onClick={() => setIsAddingSponsor(!isAddingSponsor)}
                    className={`p-3 rounded-sm transition-all ${isAddingSponsor ? 'bg-red-500 text-white' : 'bg-gold-500 text-black shadow-lg shadow-gold-500/10'}`}
                >
                    {isAddingSponsor ? <X size={18}/> : <Plus size={18}/>}
                </button>
            </div>

            <AnimatePresence>
              {isAddingSponsor && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleAddSponsor} 
                    className="bg-white/5 p-6 rounded-sm mb-8 border border-gold-500/20 overflow-hidden"
                  >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input 
                            className="w-full bg-black/50 border border-white/10 text-white p-4 rounded-sm text-sm focus:border-gold-500/50 focus:outline-none transition-all" 
                            placeholder="Nome da Empresa/Parceiro" 
                            value={newSponsor.name}
                            onChange={(e) => setNewSponsor({...newSponsor, name: e.target.value})}
                        />
                        <input 
                            className="w-full bg-black/50 border border-white/10 text-white p-4 rounded-sm text-sm focus:border-gold-500/50 focus:outline-none transition-all" 
                            placeholder="Descrição curta (ex: Psicologia)" 
                            value={newSponsor.description}
                            onChange={(e) => setNewSponsor({...newSponsor, description: e.target.value})}
                        />
                      </div>
                      <input 
                          className="w-full bg-black/50 border border-white/10 text-white p-4 mb-6 rounded-sm text-sm focus:border-gold-500/50 focus:outline-none transition-all" 
                          placeholder="Link do site (opcional)" 
                          value={newSponsor.websiteUrl}
                          onChange={(e) => setNewSponsor({...newSponsor, websiteUrl: e.target.value})}
                      />
                      <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-black text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-sm transition-all shadow-xl shadow-gold-500/10">
                        Adicionar Parceiro
                      </button>
                  </motion.form>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                <AnimatePresence mode="popLayout">
                  {sponsors.length === 0 ? (
                      <p className="col-span-2 text-gray-600 italic text-sm py-10 text-center">Nenhum patrocinador ativo.</p>
                  ) : (
                      sponsors.map(sponsor => (
                          <motion.div 
                            key={sponsor.id} 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-between bg-white/5 p-5 rounded-sm border border-white/5 group hover:border-white/10 transition-all"
                          >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gold-500/10 rounded-sm flex items-center justify-center text-gold-500 font-bold">
                                  {sponsor.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm tracking-tight">{sponsor.name}</p>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">{sponsor.description}</p>
                                </div>
                              </div>
                              <button 
                                  onClick={() => removeSponsor(sponsor.id)}
                                  className="text-gray-700 hover:text-red-500 transition-colors p-2"
                              >
                                  <Trash size={16} />
                              </button>
                          </motion.div>
                      ))
                  )}
                </AnimatePresence>
            </div>
        </motion.div>

        {/* Support Resources Management */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-12 bg-luxury-card border border-white/5 rounded-sm p-8 md:p-10 shadow-2xl"
        >
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                    <HeartHandshake className="text-gold-500" size={22} />
                    Rede de Apoio Profissional
                </h3>
                <button 
                    onClick={() => setIsAddingResource(!isAddingResource)}
                    className={`p-3 rounded-sm transition-all ${isAddingResource ? 'bg-red-500 text-white' : 'bg-gold-500 text-black shadow-lg shadow-gold-500/10'}`}
                >
                    {isAddingResource ? <X size={18}/> : <Plus size={18}/>}
                </button>
            </div>

            <AnimatePresence>
              {isAddingResource && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleAddResource} 
                    className="bg-white/5 p-8 rounded-sm mb-10 border border-gold-500/20 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-2">Nome / Título Profissional</label>
                            <input 
                                className="w-full bg-black/50 border border-white/10 text-white p-4 rounded-sm text-sm focus:border-gold-500/50 focus:outline-none transition-all" 
                                placeholder="Ex: Dr. João Silva" 
                                value={newResource.title}
                                onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-2">Tipo de Recurso</label>
                            <select 
                                 className="w-full bg-black/50 border border-white/10 text-white p-4 rounded-sm text-sm focus:border-gold-500/50 focus:outline-none transition-all appearance-none"
                                 value={newResource.type}
                                 onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                            >
                                <option value="PROFESSIONAL">Profissional (Advogado/Psicólogo)</option>
                                <option value="EMERGENCY">Emergência / 24h</option>
                                <option value="GROUP">Grupo de Apoio</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-2">Descrição / Especialidade</label>
                             <input 
                                className="w-full bg-black/50 border border-white/10 text-white p-4 rounded-sm text-sm focus:border-gold-500/50 focus:outline-none transition-all" 
                                placeholder="Ex: Especialista em Direito de Família" 
                                value={newResource.description}
                                onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                            />
                        </div>
                        <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 block mb-2">Contato (Tel, Email ou Site)</label>
                             <input 
                                className="w-full bg-black/50 border border-white/10 text-white p-4 rounded-sm text-sm focus:border-gold-500/50 focus:outline-none transition-all" 
                                placeholder="Ex: 11 99999-9999" 
                                value={newResource.contact}
                                onChange={(e) => setNewResource({...newResource, contact: e.target.value})}
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-black text-[10px] font-bold uppercase tracking-[0.2em] py-5 rounded-sm transition-all shadow-xl shadow-gold-500/10">
                      Cadastrar Profissional na Rede
                    </button>
                  </motion.form>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {supportResources.length === 0 ? (
                      <p className="col-span-full text-gray-600 italic text-sm py-10 text-center">Nenhum recurso cadastrado.</p>
                  ) : (
                      supportResources.map(resource => (
                          <motion.div 
                            key={resource.id} 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-start justify-between bg-white/5 p-6 rounded-sm border border-white/5 hover:border-white/10 transition-all group"
                          >
                              <div className="flex gap-4">
                                  <div className={`p-4 rounded-sm h-fit ${resource.type === 'EMERGENCY' ? 'bg-red-500/10 text-red-500' : 'bg-gold-500/10 text-gold-500'}`}>
                                      {resource.type === 'EMERGENCY' ? <Phone size={20} /> : <Briefcase size={20} />}
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold text-sm tracking-tight">{resource.title}</h4>
                                      <div className="mt-2 mb-3">
                                        <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-sm text-gray-400 uppercase font-bold tracking-widest border border-white/5">{resource.type}</span>
                                      </div>
                                      <p className="text-xs text-gray-500 leading-relaxed font-light mb-4">{resource.description}</p>
                                      <p className="text-xs text-gold-500 font-mono font-bold">{resource.contact}</p>
                                  </div>
                              </div>
                              <button 
                                  onClick={() => removeSupportResource(resource.id)}
                                  className="text-gray-700 hover:text-red-500 p-2 transition-colors"
                              >
                                  <Trash size={18} />
                              </button>
                          </motion.div>
                      ))
                  )}
                </AnimatePresence>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, label: string, value: string, color?: string, trend: string }> = ({ icon, label, value, color = 'text-gold-500', trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-luxury-card border border-white/5 p-8 rounded-sm shadow-xl relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <TrendingUp size={14} className="text-green-500" />
    </div>
    <div className={`mb-6 ${color} p-4 bg-white/5 w-fit rounded-sm border border-white/5`}>{icon}</div>
    <div className="flex items-baseline gap-2">
      <div className="text-4xl font-display font-bold text-white tracking-tighter">{value}</div>
      <span className="text-[10px] font-bold text-green-500">{trend}</span>
    </div>
    <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold mt-2">{label}</div>
  </motion.div>
);
