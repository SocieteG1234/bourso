import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";

export default function ProfilPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-10">
        <div className="max-w-xl mx-auto flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/dashboard")} className="text-white">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-white font-bold text-lg">Mon profil</h1>
        </div>

        {/* AVATAR */}
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-extrabold">
            {currentUser?.name?.charAt(0) ?? "C"}
          </div>
          <div>
            <p className="text-white font-bold text-lg">{currentUser?.name ?? "Client"}</p>
            <p className="text-blue-300 text-sm">{currentUser?.email ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 -mt-4 space-y-4">

        {/* INFOS PERSO */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Informations personnelles</p>
          </div>
          {[
            { label: "Nom", value: currentUser?.name },
            { label: "Email", value: currentUser?.email },
            { label: "Téléphone", value: currentUser?.phone },
            { label: "Ville", value: currentUser?.city },
            { label: "Pays", value: currentUser?.country },
            { label: "Conseiller", value: currentUser?.manager },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-gray-50 last:border-0">
              <span className="text-gray-500 text-sm">{item.label}</span>
              <span className="text-gray-800 text-sm font-medium text-right max-w-[60%] truncate">{item.value}</span>
            </div>
          ))}
        </div>

        {/* RIB */}
        <button
          onClick={() => navigate("/rib")}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm">Mon RIB</p>
              <p className="text-gray-400 text-xs">Voir et partager mon RIB</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </button>

        {/* HISTORIQUE */}
        <button
          onClick={() => navigate("/historique")}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm">Historique</p>
              <p className="text-gray-400 text-xs">Voir toutes mes opérations</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </button>

        {/* DÉCONNEXION */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition"
        >
          <LogOut size={18} />
          Se déconnecter
        </button>
      </div>

      <BottomNav active="profil" />
    </div>
  );
}