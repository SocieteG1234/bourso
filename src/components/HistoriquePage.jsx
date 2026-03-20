import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Search, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";

export default function HistoriquePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");

  const transactions = currentUser?.transactions ?? [];

  const filtered = transactions.filter(t =>
    t.reference?.toLowerCase().includes(search.toLowerCase()) ||
    t.type?.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (t) => {
    if (t.status === "pending") return <Clock size={18} className="text-orange-400" />;
    if (t.isCredit) return <ArrowDownLeft size={18} className="text-green-600" />;
    return <ArrowUpRight size={18} className="text-red-400" />;
  };

  const getIconBg = (t) => {
    if (t.status === "pending") return "bg-orange-50";
    if (t.isCredit) return "bg-green-100";
    return "bg-red-50";
  };

  const getAmountColor = (t) => {
    if (t.status === "pending") return "text-orange-400";
    if (t.isCredit) return "text-green-600";
    return "text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-6">
        <div className="max-w-xl mx-auto flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="text-white">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-white font-bold text-lg">Historique</h1>
        </div>

        {/* SEARCH */}
        <div className="max-w-xl mx-auto relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une opération..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-xl pl-9 pr-4 py-3 text-sm text-gray-700 outline-none"
          />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-400 text-sm">
              Aucune opération trouvée
            </div>
          ) : (
            filtered.map((t, i) => (
              <div
                key={t.id ?? i}
                className={`flex items-center justify-between px-4 py-4 ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBg(t)}`}>
                    {getIcon(t)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 text-sm font-medium">{t.type}</p>
                      {t.status === "pending" && (
                        <span className="bg-orange-100 text-orange-500 text-xs font-bold px-2 py-0.5 rounded-full">
                          En attente
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs">{t.date} · {t.reference}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${getAmountColor(t)}`}>
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