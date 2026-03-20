import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Lock, Unlock, Settings, ChevronRight, Globe, Smartphone, ShoppingCart, Banknote, X, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";

export default function CartePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showNumber, setShowNumber] = useState(false);
  const [carteBloquee, setCarteBloquee] = useState(false);
  const [showParams, setShowParams] = useState(false);

  // Paramètres carte
  const [paiementInternational, setPaiementInternational] = useState(
    currentUser?.cards?.[0]?.internationalPaymentEnabled ?? true
  );
  const [paiementSansContact, setPaiementSansContact] = useState(true);
  const [paiementEnLigne, setPaiementEnLigne] = useState(true);
  const [retraitAtm, setRetraitAtm] = useState(true);
  const [limiteRetrait, setLimiteRetrait] = useState(
    currentUser?.cards?.[0]?.dailyWithdrawalLimit ?? 500
  );
  const [limitePaiement, setLimitePaiement] = useState(
    currentUser?.cards?.[0]?.weeklyPaymentLimit ?? 2000
  );
  const [saved, setSaved] = useState(false);

  const carte = currentUser?.cards?.[0];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowParams(false);
    }, 1500);
  };

  // ===== PAGE PARAMÈTRES =====
  if (showParams) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans pb-24">
        <div className="bg-blue-900 px-4 pt-10 pb-6">
          <div className="max-w-xl mx-auto flex items-center gap-3">
            <button onClick={() => setShowParams(false)} className="text-white">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-white font-bold text-lg">Paramètres de la carte</h1>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-4 py-6 space-y-4">

          {/* ACTIVATION / DÉSACTIVATION */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Fonctionnalités</p>
            </div>

            {[
              {
                icon: <Globe size={20} className="text-blue-700" />,
                label: "Paiement international",
                desc: "Autoriser les paiements hors France",
                value: paiementInternational,
                toggle: () => setPaiementInternational(!paiementInternational)
              },
              {
                icon: <Smartphone size={20} className="text-blue-700" />,
                label: "Paiement sans contact",
                desc: "Activer le paiement NFC",
                value: paiementSansContact,
                toggle: () => setPaiementSansContact(!paiementSansContact)
              },
              {
                icon: <ShoppingCart size={20} className="text-blue-700" />,
                label: "Paiement en ligne",
                desc: "Autoriser les achats sur internet",
                value: paiementEnLigne,
                toggle: () => setPaiementEnLigne(!paiementEnLigne)
              },
              {
                icon: <Banknote size={20} className="text-blue-700" />,
                label: "Retrait DAB",
                desc: "Autoriser les retraits aux distributeurs",
                value: retraitAtm,
                toggle: () => setRetraitAtm(!retraitAtm)
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-4 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <p className="text-gray-800 font-medium text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                </div>
                <button
                  onClick={item.toggle}
                  className={`w-12 h-6 rounded-full transition-colors relative ${item.value ? "bg-pink-500" : "bg-gray-200"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${item.value ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>

          {/* LIMITES */}
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-5">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Limites</p>

            <div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-700 text-sm font-medium">Retrait journalier</p>
                <p className="text-blue-900 font-extrabold text-sm">{limiteRetrait} €</p>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={limiteRetrait}
                onChange={(e) => setLimiteRetrait(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>100 €</span>
                <span>2 000 €</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-700 text-sm font-medium">Paiement hebdomadaire</p>
                <p className="text-blue-900 font-extrabold text-sm">{limitePaiement} €</p>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={limitePaiement}
                onChange={(e) => setLimitePaiement(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>500 €</span>
                <span>10 000 €</span>
              </div>
            </div>
          </div>

          {/* OPPOSITION */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3">Zone de danger</p>
            <button className="w-full border-2 border-red-200 text-red-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition">
              <X size={18} />
              Faire opposition à la carte
            </button>
          </div>

          {/* SAUVEGARDER */}
          <button
            onClick={handleSave}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full transition flex items-center justify-center gap-2"
          >
            {saved ? <><Check size={18} /> Enregistré !</> : "Enregistrer les modifications"}
          </button>
        </div>

        <BottomNav active="carte" />
      </div>
    );
  }

  // ===== PAGE PRINCIPALE CARTE =====
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-6">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-white">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-white font-bold text-lg">Ma carte</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">

        {/* VISUEL CARTE */}
        <div className={`rounded-2xl p-6 shadow-lg ${carteBloquee ? "bg-gray-400" : "bg-gradient-to-br from-blue-900 to-blue-700"}`}>
          <div className="flex justify-between items-start mb-8">
            <span className="text-white font-extrabold text-lg opacity-80">VISA</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${carteBloquee ? "bg-red-500 text-white" : "bg-white/20 text-white"}`}>
              {carteBloquee ? "BLOQUÉE" : "ACTIVE"}
            </span>
          </div>
          <p className="text-white text-xl font-mono tracking-widest mb-4">
            {showNumber
              ? carte?.cardNumber ?? "4567 8912 3456 7890"
              : carte?.maskedNumber ?? "•••• •••• •••• ••••"}
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-300 text-xs">Titulaire</p>
              <p className="text-white font-bold text-sm">{carte?.cardHolder ?? currentUser?.name?.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-blue-300 text-xs">Expire</p>
              <p className="text-white font-bold text-sm">{carte?.expiryDate ?? "12/25"}</p>
            </div>
          </div>
        </div>

        {/* ACTIONS CARTE */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowNumber(!showNumber)}
            className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-50 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              {showNumber ? <EyeOff size={20} className="text-blue-800" /> : <Eye size={20} className="text-blue-800" />}
              <span className="text-gray-800 font-medium text-sm">
                {showNumber ? "Masquer le numéro" : "Voir le numéro complet"}
              </span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => setCarteBloquee(!carteBloquee)}
            className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-50 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              {carteBloquee
                ? <Unlock size={20} className="text-green-600" />
                : <Lock size={20} className="text-red-500" />}
              <span className={`font-medium text-sm ${carteBloquee ? "text-green-600" : "text-red-500"}`}>
                {carteBloquee ? "Débloquer la carte" : "Bloquer la carte"}
              </span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => setShowParams(true)}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-blue-800" />
              <span className="text-gray-800 font-medium text-sm">Paramètres de la carte</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* INFOS */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <h3 className="font-bold text-gray-900">Informations</h3>
          {[
            { label: "Type de carte", value: carte?.type ?? "Visa Premier" },
            { label: "Limite retrait journalier", value: `${limiteRetrait} €` },
            { label: "Limite paiement hebdo", value: `${limitePaiement} €` },
            { label: "Paiement international", value: paiementInternational ? "Activé" : "Désactivé" },
            { label: "Paiement sans contact", value: paiementSansContact ? "Activé" : "Désactivé" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-gray-500 text-sm">{item.label}</span>
              <span className="text-gray-800 font-semibold text-sm">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="carte" />
    </div>
  );
}