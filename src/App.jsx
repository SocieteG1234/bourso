import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages publiques
import HomePage from "./components/HomePage";
import LoginScreen from "./components/LoginScreen";

// Pages privées
import DashboardPage from "./components/DashboardPage";
import VirementPage from "./components/VirementPage";
import CartePage from "./components/CartePage";
import ProfilPage from "./components/ProfilPage";
import RibPage from "./components/RibPage";
import HistoriquePage from "./components/HistoriquePage";
import RecuPage from "./components/RecuPage";

function AppRoutes() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* PAGES PUBLIQUES */}
      <Route path="/" element={!isLoggedIn ? <HomePage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/login" element={!isLoggedIn ? <LoginScreen /> : <Navigate to="/dashboard" replace />} />

      {/* PAGES PRIVÉES */}
      <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />} />
      <Route path="/virement" element={isLoggedIn ? <VirementPage /> : <Navigate to="/login" replace />} />
      <Route path="/carte" element={isLoggedIn ? <CartePage /> : <Navigate to="/login" replace />} />
      <Route path="/profil" element={isLoggedIn ? <ProfilPage /> : <Navigate to="/login" replace />} />
      <Route path="/rib" element={isLoggedIn ? <RibPage /> : <Navigate to="/login" replace />} />
      <Route path="/historique" element={isLoggedIn ? <HistoriquePage /> : <Navigate to="/login" replace />} />
      <Route path="/recu" element={isLoggedIn ? <RecuPage /> : <Navigate to="/login" replace />} />

      {/* ROUTE PAR DÉFAUT */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}