import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";
import BottomNav from "./BottomNav";

const allTransactions = [
  { label: "Virement reçu", montant: +1500, date: "20 mars 2026", type: "credit", cat: "Virement" },
  { label: "Achat Carrefour", montant: -43.20, date: "19 mars 2026", type: "debit", cat: "Courses" },
  { label: "Abonnement Netflix", montant: -15.99, date: "18 mars 2026", type: "debit", cat: "Loisirs" },
  { label: "Remboursement", montant: +200, date: "17 mars 2026", type: "credit", cat: "Virement" },
  { label: "Restaurant Le Bistrot", montant: -32.50, date: "16 mars 2026", type: "debit", cat: "Restauration" },
  { label: "Salaire mars", montant: +2800, date: "15 mars 2026", type: "credit", cat: "Salaire" },
  { label: "EDF Facture", montant: -89.00, date: "14 mars 2026", type: "debit", cat: "Factures" },
  { label: "Amazon", montant: -67.30, date: "13 mars 2026", type: "debit", cat: "Shopping" },
  { label: "Pharmacie", montant: -12.40, date: "12 mars 2026", type: "debit", cat: "Santé" },
  { label: "Remboursement ami", montant: +50, date: "11 mars 2026", type: "credit", cat: "Virement" },
];

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = allTransactions.filter(t =>
    t.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-6">
        <div className="max-w-xl mx-auto flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/dashboard")} className="text-white">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-white font-bold text-lg">Mes opérations</h1>
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
            <div className="py-10 text-center text-gray-400 text-sm">Aucune opération trouvée</div>
          ) : (
            filtered.map((t, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-4 ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === "credit" ? "bg-green-100" : "bg-red-50"}`}>
                    {t.type === "credit"
                      ? <ArrowDownLeft size={18} className="text-green-600" />
                      : <ArrowUpRight size={18} className="text-red-400" />}
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-medium">{t.label}</p>
                    <p className="text-gray-400 text-xs">{t.date} · {t.cat}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${t.type === "credit" ? "text-green-600" : "text-gray-800"}`}>
                  {t.type === "credit" ? "+" : ""}{t.montant.toFixed(2)} €
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