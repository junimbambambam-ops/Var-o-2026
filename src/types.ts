export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  imageUrl: string;
  verified: boolean;
  badges: VerificationBadge[];
  bio: string;
  socialLinks: string[];
}

export enum VerificationBadge {
  IDENTITY_CONFIRMED = 'Identidade Confirmada',
  NO_CRIMINAL_RECORD = 'Nada Consta Criminal',
  NO_ACTIVE_LAWSUITS = 'Sem Processos Ativos',
  SOCIALS_AUTHENTICATED = 'Redes Sociais Autenticadas'
}

export interface ScanResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
  criminalRecordsFound: number;
  lawsuitsFound: number;
  publicMentions: number;
  flags: string[];
  aiAnalysis: string;
}

export interface SearchParams {
  fullName: string;
  city?: string;
  state?: string;
  socialLink?: string;
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  userIsAdmin?: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
  topic: 'Geral' | 'Alerta' | 'Conselho' | 'História';
  replies: ForumReply[];
  userHasLiked?: boolean;
  userIsAdmin?: boolean;
}

export interface SupportResource {
  id: string;
  title: string;
  description: string;
  contact: string;
  type: 'PROFESSIONAL' | 'EMERGENCY' | 'GROUP';
  icon: string;
}

export interface Sponsor {
  id: string;
  name: string;
  imageUrl?: string;
  websiteUrl?: string;
  description: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: 'ESPORTE' | 'LAZER' | 'NETWORKING' | 'ESTUDO';
  date: string;
  location: string;
  participants: number;
  description: string;
  imageUrl: string;
}

// Auth Types
export type Gender = 'MALE' | 'FEMALE';
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  gender: Gender;
  city: string;
  avatarUrl?: string;
  isVerified?: boolean;
  role: UserRole;
}

export interface PendingVerification {
  id: string;
  userName: string;
  requestDate: string;
  documentsStatus: 'VALID' | 'INVALID' | 'PENDING';
  photoUrl: string;
}