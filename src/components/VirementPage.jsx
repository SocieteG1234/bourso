import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Send, User, CreditCard, Euro, MessageSquare,
  Mail, Building2, AlertCircle, Loader2, Lock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import UserService from "../services/UserService";
import emailjs from "@emailjs/browser";
import BottomNav from "./BottomNav";

const recentBeneficiaries = [
  { id: 1, name: "Sophie Martin", email: "sophie.martin@example.com", iban: "FR76 3000 4000 0100 0123 4567 657", bic: "BNPAFRPPXXX", avatar: "SM" },
  { id: 2, name: "Jean Dupont", email: "jean.dupont@example.com", iban: "FR89 3000 4000 0200 0234 5678 234", bic: "BNPAFRPPXXX", avatar: "JD" },
  { id: 3, name: "Marie Leroux", email: "marie.leroux@example.com", iban: "FR45 3000 4000 0300 0345 6789 891", bic: "BNPAFRPPXXX", avatar: "ML" },
];

export default function VirementPage() {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    beneficiaire: "", iban: "", bic: "", email: "", montant: "", motif: "",
  });

  const validateIBAN = (iban) => {
    const clean = iban.replace(/\s/g, "");
    const lengths = { FR: 27, CI: 28, BE: 16, DE: 22, ES: 24, IT: 27, GB: 22 };
    const country = clean.substring(0, 2);
    if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(clean)) return false;
    if (lengths[country] && clean.length !== lengths[country]) return false;
    return true;
  };

  const validateBIC = (bic) => /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic.replace(/\s/g, "").toUpperCase());
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser?.isBlocked && !currentUser?.canTransferWhenBlocked) {
      setShowBlockedModal(true);
      return;
    }

    const newErrors = {};
    if (!formData.beneficiaire.trim() || formData.beneficiaire.trim().length < 3)
      newErrors.beneficiaire = "Le nom doit contenir au moins 3 caractères";
    if (!formData.email.trim() || !validateEmail(formData.email))
      newErrors.email = "Format d'email invalide";
    if (!formData.iban.trim() || !validateIBAN(formData.iban))
      newErrors.iban = "Format d'IBAN invalide";
    if (!formData.bic.trim() || !validateBIC(formData.bic))
      newErrors.bic = "Format BIC/SWIFT invalide (8 ou 11 caractères)";
    const montant = parseFloat(formData.montant);
    if (!formData.montant || isNaN(montant) || montant <= 0)
      newErrors.montant = "Le montant doit être supérieur à 0";
    else if (montant > (currentUser?.balance ?? 0))
      newErrors.montant = "Solde insuffisant";

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      await UserService.createTransfer(currentUser.id, {
        amount: montant, iban: formData.iban, bic: formData.bic,
        beneficiary: formData.beneficiaire, email: formData.email, motif: formData.motif,
      });

      const updatedUser = await UserService.getUserById(currentUser.id);
      updateUser(updatedUser);

      const reference = `VIR${Date.now()}`;

      try {
        await emailjs.send("service_6lnids6", "template_4c60x4j", {
          beneficiaire_nom: formData.beneficiaire,
          beneficiaire_email: formData.email,
          emetteur_nom: currentUser?.name,
          montant: `${montant.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`,
          reference,
          date: new Date().toLocaleDateString("fr-FR"),
          heure: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          motif: formData.motif || "Virement bancaire",
          iban: formData.iban,
          bic: formData.bic,
          total: `${montant.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`,
        }, "s0N4AR3th7wPYUFyy");
      } catch (emailError) {
        console.warn("Email non envoyé:", emailError.message);
      }

      navigate("/recu", {
        state: {
          montant: `${montant.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`,
          beneficiaire: formData.beneficiaire,
          email: formData.email,
          iban: formData.iban,
          bic: formData.bic,
          motif: formData.motif,
          reference,
          date: new Date().toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        }
      });
    } catch (error) {
      setErrors({ global: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* ===== MODAL BLOCAGE ===== */}
      {showBlockedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock size={28} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">Compte bloqué</h2>
                <p className="text-sm text-gray-500">Virement impossible</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              Bonjour <strong>{currentUser?.name}</strong>, votre compte est actuellement <span className="text-red-600 font-bold">bloqué</span>.
            </p>

            {currentUser?.blockReason && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-3">
                <p className="text-xs font-semibold text-blue-800 mb-1">Raison :</p>
                <p className="text-xs text-blue-700">{currentUser.blockReason}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4 mb-5 flex items-center justify-between">
              <span className="text-gray-600 text-sm font-medium">Frais de déblocage</span>
              <span className="text-xl font-extrabold text-pink-500">
                {currentUser?.unlockFee?.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </span>
            </div>

            <button
              onClick={() => setShowBlockedModal(false)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full transition"
            >
              J'ai compris
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Contactez votre conseiller pour débloquer votre compte
            </p>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-6">
        <div className="max-w-xl mx-auto flex items-center gap-3 mb-5">
          <button onClick={() => navigate("/dashboard")} className="text-white">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-white font-bold text-lg">Nouveau virement</h1>
        </div>

        <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-4 border border-white/20">
          <p className="text-blue-300 text-xs mb-1">Solde disponible</p>
          <p className="text-white text-2xl font-extrabold">
            {currentUser?.balance?.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">

        {currentUser?.isBlocked && currentUser?.canTransferWhenBlocked && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-800">Compte en cours de vérification</p>
              <p className="text-xs text-yellow-700 mt-1">Votre compte est temporairement restreint, mais les virements restent disponibles.</p>
            </div>
          </div>
        )}

        {/* BÉNÉFICIAIRES RÉCENTS */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3">Bénéficiaires récents</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentBeneficiaries.map(b => (
              <button
                key={b.id}
                onClick={() => setFormData({ beneficiaire: b.name, email: b.email, iban: b.iban, bic: b.bic, montant: "", motif: "" })}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-extrabold text-sm">{b.avatar}</span>
                </div>
                <span className="text-xs text-gray-500">{b.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-900">Informations du virement</h3>

          {errors.global && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              <p className="text-red-600 text-sm">{errors.global}</p>
            </div>
          )}

          {[
            { name: "beneficiaire", label: "Bénéficiaire", icon: <User size={16} />, placeholder: "Nom du bénéficiaire", type: "text" },
            { name: "email", label: "Email du destinataire", icon: <Mail size={16} />, placeholder: "exemple@email.com", type: "email" },
            { name: "iban", label: "IBAN", icon: <CreditCard size={16} />, placeholder: "FR76 XXXX XXXX XXXX", type: "text", mono: true },
            { name: "bic", label: "Code BIC/SWIFT", icon: <Building2 size={16} />, placeholder: "BNPAFRPPXXX", type: "text", mono: true, upper: true },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide flex items-center gap-1 mb-1">
                {field.icon} {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full border-b-2 py-2 text-sm bg-transparent outline-none transition ${field.mono ? "font-mono" : ""} ${field.upper ? "uppercase" : ""} ${errors[field.name] ? "border-red-400" : "border-gray-200 focus:border-pink-500"}`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* MONTANT */}
          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide flex items-center gap-1 mb-1">
              <Euro size={16} /> Montant
            </label>
            <input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className={`w-full border-b-2 py-2 text-2xl font-extrabold bg-transparent outline-none transition ${errors.montant ? "border-red-400" : "border-gray-200 focus:border-pink-500"}`}
            />
            <p className="text-gray-400 text-xs mt-1">
              Maximum : {currentUser?.balance?.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
            </p>
            {errors.montant && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.montant}
              </p>
            )}
          </div>

          {/* MOTIF */}
          <div>
            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide flex items-center gap-1 mb-1">
              <MessageSquare size={16} /> Motif (optionnel)
            </label>
            <textarea
              name="motif"
              value={formData.motif}
              onChange={handleChange}
              placeholder="Ex: Loyer, Remboursement..."
              rows={3}
              maxLength={140}
              className="w-full border-b-2 border-gray-200 focus:border-pink-500 py-2 text-sm bg-transparent outline-none transition resize-none"
            />
            <p className="text-gray-400 text-xs text-right">{formData.motif.length}/140</p>
          </div>
        </div>

        {/* BOUTON VALIDER */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white font-bold py-4 rounded-full transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 size={20} className="animate-spin" /> Envoi en cours...</>
          ) : (
            <><Send size={20} /> Effectuer le virement</>
          )}
        </button>
      </div>

      <BottomNav active="virement" />
    </div>
  );
}