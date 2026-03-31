
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, CornerDownRight, Lock, Star, Filter, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_FORUM_POSTS } from '../constants';
import { ForumPost } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Desabafo: React.FC = () => {
  const { user, isAuthenticated, isMale, isAdmin } = useAuth();
  
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
          O Espaço Desabafo é uma área exclusiva para a comunidade masculina. 
          Isso garante um ambiente de privacidade e liberdade para troca de experiências entre homens de valor.
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
                Para acessar o fórum e interagir com a comunidade, você precisa se identificar como Homem.
              </p>
              <Link to="/login" className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-black px-12 py-5 font-bold uppercase tracking-widest rounded-sm transition-all shadow-xl shadow-gold-500/20">
                 Entrar / Cadastrar
                 <MessageSquare size={18} />
              </Link>
            </motion.div>
        </div>
     );
  }

  const [posts, setPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [activeTopic, setActiveTopic] = useState<string>('Todos');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');

  const topics = ['Todos', 'Geral', 'Alerta', 'Conselho', 'História'];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: user?.name || 'Anônimo',
      content: newPostContent,
      likes: 0,
      timestamp: 'Agora mesmo',
      topic: 'Geral',
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !!post.userHasLiked;
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          userHasLiked: !isLiked
        };
      }
      return post;
    }));
  };

  const handleReplySubmit = (postId: string) => {
    if (!replyContent.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: Date.now().toString(),
              author: user?.name || 'Você',
              content: replyContent,
              timestamp: 'Agora mesmo'
            }
          ]
        };
      }
      return post;
    }));
    
    setReplyContent('');
  };

  const filteredPosts = activeTopic === 'Todos' 
    ? posts 
    : posts.filter(post => post.topic === activeTopic);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
          <MessageCircle size={14} className="text-gold-500" />
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Espaço de Diálogo</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
          Espaço <span className="text-gold-500">Desabafo</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
          Um ambiente seguro para trocar experiências, alertar outros irmãos e buscar conselhos. 
          O respeito e a discrição são as nossas leis fundamentais.
        </p>
      </motion.div>

      {/* Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-luxury-card border border-white/5 p-8 md:p-10 rounded-sm mb-16 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-[60px] rounded-full -z-10"></div>
        
        <form onSubmit={handlePostSubmit}>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500 mb-4 ml-1">
            Compartilhe sua visão, {user?.name}
          </label>
          <textarea
            className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-sm focus:border-gold-500/50 focus:outline-none transition-all min-h-[120px] placeholder:text-gray-700 text-sm"
            placeholder="Escreva aqui seu relato, dúvida ou alerta..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
             <div className="flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
               <Lock size={12} /> Criptografia de Ponta a Ponta
             </div>
             <button 
                type="submit"
                disabled={!newPostContent.trim()}
                className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-black px-10 py-4 font-bold uppercase text-[10px] tracking-[0.2em] rounded-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-gold-500/10"
             >
                <Send size={16} />
                Publicar Relato
             </button>
          </div>
        </form>
      </motion.div>

      {/* Feed Filters */}
      <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex items-center gap-2 text-gray-600 shrink-0">
          <Filter size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Filtrar:</span>
        </div>
        <div className="flex gap-2">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all whitespace-nowrap ${
                activeTopic === topic 
                  ? 'bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/10' 
                  : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-luxury-card border border-white/5 p-8 md:p-10 rounded-sm hover:border-white/10 transition-all duration-500 shadow-xl"
            >
              
              {/* Post Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold-500/30 transition-colors">
                    <User size={20} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">{post.author}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">{post.timestamp}</span>
                      <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                      <span className="text-[9px] bg-gold-500/10 px-2 py-0.5 rounded-sm text-gold-500 font-bold uppercase tracking-widest border border-gold-500/20">{post.topic}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-700 hover:text-white transition-colors">
                  <Star size={18} />
                </button>
              </div>
              
              {/* Post Content */}
              <div className="relative pl-6 md:pl-10 mb-10">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500/50 to-transparent"></div>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                  {post.content}
                </p>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-8 border-t border-white/5 pt-8">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all group ${post.userHasLiked ? 'text-gold-500' : 'text-gray-600 hover:text-gold-500'}`}
                >
                  <ThumbsUp size={18} className={`transition-transform group-hover:scale-110 ${post.userHasLiked ? 'fill-gold-500' : ''}`} />
                  {post.likes} <span className="hidden sm:inline">Concordam</span>
                </button>
                
                <button 
                  onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${expandedPostId === post.id ? 'text-white' : 'text-gray-600 hover:text-white'}`}
                >
                  <MessageSquare size={18} />
                  {post.replies.length} Respostas
                  {expandedPostId === post.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Replies Section */}
              <AnimatePresence>
                {expandedPostId === post.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                      
                      {/* Existing Replies */}
                      <div className="space-y-6">
                        {post.replies.length > 0 ? (
                          post.replies.map((reply, ridx) => (
                            <motion.div 
                              key={reply.id} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ridx * 0.1 }}
                              className="flex gap-4 pl-4 md:pl-10"
                            >
                               <CornerDownRight className="text-gray-800 shrink-0 mt-1" size={18} />
                               <div className="bg-white/5 p-5 rounded-sm border border-white/5 w-full shadow-inner">
                                  <div className="flex justify-between items-center mb-2">
                                     <span className="text-xs font-bold text-gray-300">{reply.author}</span>
                                     <span className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-500 font-light leading-relaxed">{reply.content}</p>
                               </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-center text-[10px] text-gray-700 uppercase tracking-widest font-bold py-4 italic">Seja o primeiro a responder este irmão.</p>
                        )}
                      </div>

                      {/* Reply Input */}
                      <div className="flex gap-3 pl-4 md:pl-10 pt-4">
                        <input 
                          type="text" 
                          className="flex-grow bg-white/5 border border-white/10 text-white text-sm p-4 rounded-sm focus:border-gold-500/50 focus:outline-none transition-all placeholder:text-gray-800"
                          placeholder="Escreva uma resposta de apoio..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit(post.id)}
                        />
                        <button 
                          onClick={() => handleReplySubmit(post.id)}
                          className="bg-white/10 hover:bg-gold-500 hover:text-black text-white px-6 rounded-sm transition-all shadow-lg"
                        >
                          <Send size={18} />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
