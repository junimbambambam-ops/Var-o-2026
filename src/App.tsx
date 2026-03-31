
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Shield } from 'lucide-react';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ConsultProfile = lazy(() => import('./pages/ConsultProfile').then(m => ({ default: m.ConsultProfile })));
const Results = lazy(() => import('./pages/Results').then(m => ({ default: m.Results })));
const VerifiedList = lazy(() => import('./pages/VerifiedList').then(m => ({ default: m.VerifiedList })));
const VerificationRequest = lazy(() => import('./pages/VerificationRequest').then(m => ({ default: m.VerificationRequest })));
const Support = lazy(() => import('./pages/Support').then(m => ({ default: m.Support })));
const Blueprint = lazy(() => import('./pages/Blueprint').then(m => ({ default: m.Blueprint })));
const Desabafo = lazy(() => import('./pages/Desabafo').then(m => ({ default: m.Desabafo })));
const AreYouOkay = lazy(() => import('./pages/AreYouOkay').then(m => ({ default: m.AreYouOkay })));
const Community = lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <Shield className="text-gold-500 animate-pulse" size={48} />
    <p className="text-gold-500 font-display font-bold tracking-widest animate-pulse uppercase text-xs">Carregando Varão10...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/blueprint" element={<Blueprint />} />
                    
                    {/* Protected Routes - Login Required */}
                    <Route path="/consult" element={
                      <ProtectedRoute>
                        <ConsultProfile />
                      </ProtectedRoute>
                    } />
                    <Route path="/results" element={
                      <ProtectedRoute>
                        <Results />
                      </ProtectedRoute>
                    } />
                    <Route path="/verified" element={
                      <ProtectedRoute>
                        <VerifiedList />
                      </ProtectedRoute>
                    } />
                    <Route path="/verification-request" element={
                      <ProtectedRoute>
                        <VerificationRequest />
                      </ProtectedRoute>
                    } />
                    <Route path="/desabafo" element={
                      <ProtectedRoute>
                        <Desabafo />
                      </ProtectedRoute>
                    } />
                    <Route path="/community" element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    } />
                    <Route path="/are-you-okay" element={
                      <ProtectedRoute>
                        <AreYouOkay />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/support" element={
                      <ProtectedRoute>
                        <Support />
                      </ProtectedRoute>
                    } />
                </Routes>
              </Suspense>
            </Layout>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
