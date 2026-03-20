import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Download, Share2, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";

export default function RecuPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Données passées depuis VirementPage via navigate state
  const recu = location.state ?? {};

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Reçu de virement BoursoBank",
        text: `Virement de ${recu.montant} € vers ${recu.beneficiaire} — Réf: ${recu.reference}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={36} className="text-green-400" />
          </div>
          <h1 className="text-white font-extrabold text-xl">Virement effectué</h1>
          <p className="text-blue-300 text-sm mt-1">Votre virement a bien été enregistré</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">

        {/* CARTE REÇU */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* Header carte */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide">Reçu de virement</p>
              <p className="text-white font-extrabold text-lg mt-0.5">{recu.montant} €</p>
            </div>
            <div className="text-right">
              <span className="bg-green-400/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                ✓ Traité
              </span>
            </div>
          </div>

          {/* Détails */}
          <div className="p-5 space-y-0">
            {[
              { label: "Référence", value: recu.reference, mono: true },
              { label: "Date", value: recu.date },
              { label: "Émetteur", value: currentUser?.name },
              { label: "Bénéficiaire", value: recu.beneficiaire },
              { label: "Email destinataire", value: recu.email },
              { label: "IBAN", value: recu.iban, mono: true, small: true },
              { label: "BIC", value: recu.bic, mono: true },
              { label: "Motif", value: recu.motif || "—" },
            ].map((item, i) => (
              <div key={i} className={`flex items-start justify-between py-3 ${i < 7 ? "border-b border-gray-50" : ""}`}>
                <span className="text-gray-400 text-sm flex-shrink-0 w-36">{item.label}</span>
                <span className={`text-gray-900 font-semibold text-sm text-right ${item.mono ? "font-mono" : ""} ${item.small ? "text-xs" : ""}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-pink-500 px-5 py-4 flex items-center justify-between">
            <span className="text-pink-100 font-medium text-sm">Montant total débité</span>
            <span className="text-white font-extrabold text-xl">{recu.montant} €</span>
          </div>
        </div>

        {/* INFO EMAIL */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">📧</span>
          <p className="text-blue-700 text-sm">
            Un email de confirmation a été envoyé à <strong>{recu.email}</strong>
          </p>
        </div>

        {/* BOUTONS */}
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition"
          >
            <Share2 size={18} />
            Partager le reçu
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition"
          >
            <Home size={18} />
            Retour à l'accueil
          </button>

          <button
            onClick={() => navigate("/historique")}
            className="w-full border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-full hover:bg-gray-50 transition text-sm"
          >
            Voir l'historique
          </button>
        </div>
      </div>

      <BottomNav active="virement" />
    </div>
  );
}