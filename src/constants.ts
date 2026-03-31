import { Profile, VerificationBadge, ForumPost, SupportResource, CommunityEvent } from './types';

export const APP_NAME = "VARÃO10";
export const GOLD_COLOR = "#D4AF37";
export const SUPPORT_EMAIL = "redesocialdoalfredo@gmail.com";

export const MOCK_VERIFIED_PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Amanda Oliveira',
    age: 26,
    city: 'São Paulo, SP',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    verified: true,
    badges: [VerificationBadge.IDENTITY_CONFIRMED, VerificationBadge.NO_CRIMINAL_RECORD, VerificationBadge.SOCIALS_AUTHENTICATED],
    bio: 'Advogada, focada em carreira e família.',
    socialLinks: ['instagram.com/amanda']
  },
  {
    id: '2',
    name: 'Juliana Costa',
    age: 29,
    city: 'Rio de Janeiro, RJ',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    verified: true,
    badges: [VerificationBadge.IDENTITY_CONFIRMED, VerificationBadge.NO_CRIMINAL_RECORD, VerificationBadge.NO_ACTIVE_LAWSUITS],
    bio: 'Empresária no ramo de estética.',
    socialLinks: ['linkedin.com/juliana']
  },
  {
    id: '3',
    name: 'Patricia Lima',
    age: 31,
    city: 'Curitiba, PR',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    verified: true,
    badges: [VerificationBadge.IDENTITY_CONFIRMED, VerificationBadge.SOCIALS_AUTHENTICATED],
    bio: 'Médica veterinária, amo animais e natureza.',
    socialLinks: ['facebook.com/patricia']
  }
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Guerreiro_SP',
    content: 'Cuidado com perfis que pedem PIX logo na primeira semana. Aconteceu comigo, mas graças ao app consegui verificar antes.',
    likes: 42,
    timestamp: '2h atrás',
    topic: 'Alerta',
    replies: [
      {
        id: 'r1',
        author: 'Carlos M.',
        content: 'Isso é clássico. Boa, irmão. Olho aberto sempre.',
        timestamp: '1h atrás'
      },
      {
        id: 'r2',
        author: 'Anônimo',
        content: 'Aconteceu comigo mês passado. Lição aprendida.',
        timestamp: '30min atrás'
      }
    ]
  },
  {
    id: '2',
    author: 'Anônimo',
    content: 'Alguém recomenda advogados de família em BH? Preciso me blindar antes de um divórcio.',
    likes: 15,
    timestamp: '5h atrás',
    topic: 'Conselho',
    replies: [
      {
        id: 'r3',
        author: 'Rogerio Adv',
        content: 'Posso te passar um contato no privado. Força aí.',
        timestamp: '2h atrás'
      }
    ]
  },
  {
    id: '3',
    author: 'Carlos M.',
    content: 'O foco no desenvolvimento pessoal é a melhor defesa. Foquem no trabalho e na saúde, varões.',
    likes: 128,
    timestamp: '1d atrás',
    topic: 'Geral',
    replies: []
  }
];

export const MOCK_COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: '1',
    title: 'Futebol dos Varões - SP Capital',
    category: 'ESPORTE',
    date: 'Quarta-feira, 20h',
    location: 'Arena Tatuapé',
    participants: 14,
    description: 'Futebol semanal para resenha e networking. Nível amador.',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bde9be51?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    title: 'Grupo de Corrida Matinal',
    category: 'ESPORTE',
    date: 'Sábados, 06h',
    location: 'Parque Ibirapuera',
    participants: 32,
    description: 'Corrida leve de 5km para começar o final de semana com energia.',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-4695c316af69?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    title: 'Clube do Livro & Negócios',
    category: 'ESTUDO',
    date: 'Mensal (Online)',
    location: 'Google Meet',
    participants: 120,
    description: 'Discussão sobre livros de desenvolvimento pessoal, estoicismo e finanças.',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600'
  }
];

export const SUPPORT_RESOURCES: SupportResource[] = [
  {
    id: '1',
    title: 'CVV - Valorização da Vida',
    description: 'Apoio emocional gratuito e sigiloso, 24 horas por dia.',
    contact: 'Ligue 188',
    type: 'EMERGENCY',
    icon: 'Phone'
  },
  {
    id: '2',
    title: 'Dr. Roberto Mendes',
    description: 'Psicólogo especializado em saúde mental masculina e conflitos familiares.',
    contact: '11 99999-9999',
    type: 'PROFESSIONAL',
    icon: 'User'
  },
  {
    id: '3',
    title: 'Defesa Masculina Legal',
    description: 'Escritório jurídico focado em direito de família para homens.',
    contact: 'contato@defesa.com',
    type: 'PROFESSIONAL',
    icon: 'Scale'
  }
];

export const DISCLAIMER_TEXT = `
  O Varão10 realiza consultas apenas em fontes de dados públicas e abertas (OSINT),
  respeitando a LGPD e a legislação vigente. Não realizamos invasão de privacidade,
  apenas centralizamos informações que já estão disponíveis publicamente ou foram
  fornecidas voluntariamente pela usuária. O uso destas informações é de inteira
  responsabilidade do consultante.
`;