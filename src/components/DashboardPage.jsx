import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Bell, ChevronRight, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [soldeVisible, setSoldeVisible] = useState(true);

  const solde = currentUser?.balance ?? 0;
  const transactions = currentUser?.transactions ?? [];
  const dernieres = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-20">
        <div className="max-w-xl mx-auto flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-300 text-sm">Bonjour,</p>
            <p className="text-white font-bold text-lg">{currentUser?.name ?? "Client"}</p>
          </div>
          <button className="relative">
            <Bell size={24} className="text-white" />
            {currentUser?.notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {currentUser.notifications}
              </span>
            )}
          </button>
        </div>

        {/* CARTE SOLDE */}
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-1">
            <p className="text-blue-200 text-sm">Compte courant</p>
            <button onClick={() => setSoldeVisible(!soldeVisible)}>
              {soldeVisible ? <EyeOff size={18} className="text-blue-200" /> : <Eye size={18} className="text-blue-200" />}
            </button>
          </div>
          <p className="text-white text-3xl font-extrabold mb-1">
            {soldeVisible ? `${solde.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €` : "••••••"}
          </p>
          <p className="text-blue-300 text-xs">{currentUser?.rib?.iban ?? ""}</p>
        </div>
      </div>

      {/* BOUTONS RAPIDES */}
      <div className="max-w-xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-md p-4 grid grid-cols-4 gap-3">
          {[
            { label: "Virement", icon: "💸", route: "/virement" },
            { label: "RIB", icon: "📄", route: "/rib" },
            { label: "Carte", icon: "💳", route: "/carte" },
            { label: "Historique", icon: "📋", route: "/historique" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={() => navigate(btn.route)}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-xl hover:bg-blue-100 transition">
                {btn.icon}
              </div>
              <span className="text-xs text-gray-600 font-medium">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DERNIÈRES TRANSACTIONS */}
      <div className="max-w-xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900 text-base">Dernières opérations</h2>
          <button onClick={() => navigate("/historique")} className="text-pink-500 text-sm font-semibold flex items-center gap-1">
            Tout voir <ChevronRight size={14} />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {dernieres.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-sm">Aucune opération</div>
          ) : (
            dernieres.map((t, i) => (
              <div key={t.id ?? i} className={`flex items-center justify-between px-4 py-3 ${i < dernieres.length - 1 ? "border-b border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.isCredit ? "bg-green-100" : "bg-red-50"}`}>
                    {t.isCredit
                      ? <ArrowDownLeft size={16} className="text-green-600" />
                      : <ArrowUpRight size={16} className="text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-medium">{t.type}</p>
                    <p className="text-gray-400 text-xs">{t.date} · {t.reference}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${t.isCredit ? "text-green-600" : "text-gray-800"}`}>
                  {t.isCredit ? "+" : "-"}{t.amount?.toFixed(2)} €
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav active="accueil" />
    </div>
  );
}