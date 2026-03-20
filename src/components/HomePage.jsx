import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Menu, X, Bot } from "lucide-react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const faqs = [
    "Comment utiliser ma carte avant sa réception ?",
    "Ma carte est-elle gratuite ?",
    "Quel est le délai pour l'envoi d'une carte ?",
    "A partir de quand puis-je parrainer et profiter de l'offre en cours ?",
    "Qui puis-je parrainer ?",
  ];

  const produits = [
    { img: "images/I1.jpeg", title: "Compte bancaire", desc: "Un compte gratuit, des cartes pour tous, un pilotage 100% mobile" },
    { img: "images/I2.jpeg", title: "Crédits", desc: "Des solutions de financement pour tous vos projets" },
    { img: "images/I3.jpeg", title: "Épargne", desc: "Une gamme complète de solutions d'épargne" },
    { img: "images/I4.jpeg", title: "Bourse", desc: "Un large choix de produits pour tous les profils" },
    { img: "images/I5.jpeg", title: "Assurances", desc: "Protégez ce qui vous est le plus cher" },
    { img: "images/I6.jpeg", title: "The Corner", desc: "Des remises exclusives sur plus de 140 partenaires dans 8 univers de consommation" },
    { img: "images/I7.jpeg", title: "Offre 12-17", desc: "Offre 100% mobile pour les 12-17 ans" },
    { img: "images/I8.jpeg", title: "Offre Bourso Business", desc: "Le compte pro à coût zéro" },
  ];

  const cartes = [
    { img: "images/I9.jpeg", nom: "WELCOME", desc: "La carte sans conditions de revenus", bg: "bg-gradient-to-r from-purple-900 to-blue-800" },
    { img: "images/I10.jpeg", nom: "ULTIM", desc: "La carte gratuite pour les voyageurs", bg: "bg-gray-900" },
    { img: "images/I11.jpeg", nom: "OFFRE METAL", desc: "Des services et avantages premium dans une seule offre", bg: "bg-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* ===== HEADER ===== */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <img src="images/L1.jpeg" alt="BoursoBank" className="h-8 object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <Bot size={26} className="text-blue-500 cursor-pointer" />
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={26} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Menu déroulant */}
        {menuOpen && (
          <div className="bg-white border-t border-gray-100 px-4 py-4 shadow-lg relative">
            <button onClick={() => setMenuOpen(false)} className="absolute top-3 right-4 text-gray-500">
              <X size={22} />
            </button>
            {["Compte bancaire", "Crédits", "Épargne", "Bourse", "Assurances", "The Corner", "Offre 12-17", "Bourso Business"].map((item) => (
              <div key={item} className="py-3 border-b border-gray-100 text-gray-700 font-medium text-sm flex justify-between items-center">
                {item} <ChevronRight size={16} className="text-gray-400" />
              </div>
            ))}
            <div className="pt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-pink-500 text-white font-bold py-3 rounded-full text-center"
              >
                Se connecter
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ===== BANNIÈRE BOURSO BUSINESS ===== */}
      <div className="bg-pink-50 px-4 py-3 max-w-xl mx-auto flex items-center gap-3">
        <span className="text-lg">💼</span>
        <div>
          <p className="text-gray-700 text-sm">Découvrez Bourso Business, l'offre gratuite réservée aux pros !</p>
          <span className="text-pink-500 text-sm font-semibold cursor-pointer">Découvrir</span>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="bg-gray-50 px-4 py-10 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-extrabold text-pink-500 leading-tight mb-6">
            Rejoignez la banque la moins chère depuis 18 ans<sup className="text-xl">(1)</sup>
          </h1>

          <div className="bg-white rounded-2xl shadow p-6 mb-6 text-left">
            <p className="text-gray-700 font-semibold text-center mb-1">Jusqu'à</p>
            <p className="text-3xl font-extrabold text-blue-800 text-center mb-3">130€ offerts</p>
            <div className="flex justify-center mb-4">
              <span className="bg-pink-100 text-pink-600 font-bold text-sm px-4 py-1 rounded-full">
                Code BBKOPE130
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              pour toute 1ère ouverture de compte bancaire suivie d'un 1er versement puis d'une opération
              par carte tous les mois pendant 3 mois et d'une mobilité bancaire
            </p>
            <p className="text-blue-500 text-sm mt-2 cursor-pointer">Détails des conditions</p>
          </div>

          <Link to="/login" className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg text-center">
            Devenir client
          </Link>
        </div>
      </section>

      {/* ===== LES + BOURSOBANK ===== */}
      <section className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-xl font-extrabold text-gray-900 mb-5">Les + BoursoBank</h2>
        <div className="space-y-4">
          {[
            { text: "Banque la moins chère depuis 18 ans", sup: "(1)" },
            { text: "Une gamme complète de produits performants" },
            { text: "1 000 fonctionnalités gratuites pour plus d'autonomie" },
            { text: "Des offres 100% mobile" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-pink-500 font-bold text-lg mt-0.5">✓</span>
              <p className="text-gray-800 text-sm font-medium">
                {item.text}{item.sup && <sup className="text-xs">{item.sup}</sup>}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== OFFRE COMPLÈTE ===== */}
      <section className="bg-blue-50 px-4 py-8 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-blue-800 mb-3">
            Bénéficiez d'une offre complète de produits performants
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Gérez vos comptes bancaires, épargnez, financez vos projets, assurez-vous et économisez de l'argent.
          </p>

          <div className="space-y-3">
            {produits.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-sm text-left">
                <img src={item.img} alt={item.title} className="w-10 h-10 sm:w-14 sm:h-14 object-contain rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-blue-800 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-tight">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>

          <Link to="/login" className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full mt-6 transition text-center">
            Devenir client
          </Link>
        </div>
      </section>

      {/* ===== CARTES BANCAIRES ===== */}
      <section className="bg-blue-50 px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-blue-800 text-center mb-2">
            Trouvez la carte bancaire qui vous correspond
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Une gamme complète de cartes bancaires à découvrir en version physique ou dématérialisée.
          </p>

          <div className="space-y-3">
            {cartes.map((carte, i) => (
              <div key={i} className={`${carte.bg} rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3`}>
                <div className="flex-1">
                  <p className="text-white font-extrabold text-base sm:text-lg">{carte.nom}</p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">{carte.desc}</p>
                </div>
                <img src={carte.img} alt={carte.nom} className="h-12 sm:h-16 w-auto object-contain flex-shrink-0" />
              </div>
            ))}
          </div>

          <p className="text-blue-500 font-semibold text-center mt-4 cursor-pointer">Comparez les cartes</p>
        </div>
      </section>

      {/* ===== FAITES LE CHOIX DES ECONOMIES ===== */}
      <section className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Faites le choix des économies</h2>
        <div className="space-y-5">
          {[
            { title: "Banque au quotidien", desc: "Désignée banque la moins chère depuis 18 ans avec en moyenne 10 € de frais bancaires par an." },
            { title: "Professionnels", desc: "BoursoBank, désignée banque la moins chère en 2026 pour les professionnels." },
            { title: "Bourse", desc: "Sur Boursomarkets, investissez à 0 € de frais de courtage." },
          ].map((item, i) => (
            <div key={i} className="border-b border-gray-100 pb-4">
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== REJOIGNEZ 8 MILLIONS ===== */}
      <section className="bg-blue-800 px-4 py-10">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white mb-8">
            Comme plus de 8 millions de clients, rejoignez-nous en quelques clics
          </h2>
          <div className="space-y-4">
            {[
              { num: 1, text: "Renseignez vos informations personnelles et téléchargez l'App" },
              { num: 2, text: "Continuez sur le parcours mobile et scannez vos pièces justificatives", link: "Préparez vos pièces justificatives" },
              { num: 3, text: "Signez votre contrat et procédez à votre premier versement" },
              { num: 4, text: "Profitez de votre compte BoursoBank et payez immédiatement avec votre portefeuille virtuel" },
            ].map((etape) => (
              <div key={etape.num} className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-300 text-blue-900 font-bold text-xs px-3 py-1 rounded-full">
                  Étape {etape.num}
                </div>
                <div className="bg-white rounded-xl p-5 pt-6 text-center">
                  <p className="text-gray-700 text-sm">{etape.text}</p>
                  {etape.link && <p className="text-blue-500 font-semibold text-sm mt-2 cursor-pointer">{etape.link}</p>}
                </div>
              </div>
            ))}
          </div>
          <Link to="/login" className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full mt-8 transition text-center">
            Devenir client
          </Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Questions fréquentes</h2>
        <div className="space-y-0">
          {faqs.map((q, i) => (
            <div
              key={i}
              className="border-b border-gray-100 py-4 flex items-center justify-between cursor-pointer"
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <p className="text-blue-500 text-sm font-medium pr-4">{q}</p>
              <ChevronRight size={18} className={`text-gray-400 flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-90" : ""}`} />
            </div>
          ))}
        </div>
        <p className="text-blue-500 font-semibold mt-4 cursor-pointer">Découvrir la FAQ</p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white px-4 py-8 border-t border-gray-100">
        <div className="max-w-xl mx-auto">
          {[
            { title: "Guides et brochures", links: ["Bien utiliser le chèque", "Glossaire Banque au quotidien", "Maîtriser mon budget", "Guide de la mobilité", "Solutions pour la Clientèle Fragile"] },
            { title: "Nos sites", links: ["Portail d'informations Boursorama", "Site Groupe & Recrutement", "Espace Client"] }
          ].map((section, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">{section.title}</h3>
              {section.links.map((link, j) => (
                <p key={j} className="text-gray-500 text-sm py-1 cursor-pointer hover:text-blue-500">{link}</p>
              ))}
            </div>
          ))}
          <p className="text-xs text-gray-400 mt-4">Copyright © 2026 — Boursorama SA</p>
        </div>
      </footer>

      {/* ===== FOOTER BAS SOMBRE ===== */}
      <div className="bg-blue-900 text-white px-4 py-8 text-center">
        <div className="max-w-xl mx-auto">
          <Link to="/" className="flex items-center justify-center mb-4">
            <img src="images/L1.jpeg" alt="BoursoBank" className="h-8 object-contain" />
          </Link>
          <div className="flex justify-center gap-5 mb-5">
            {["f", "✕", "▶"].map((icon, i) => (
              <div key={i} className="w-9 h-9 border-2 border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-blue-900 transition text-sm font-bold">
                {icon}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 mb-4">
            <img src="images/I12.jpeg" alt="App Store" className="h-10 w-auto object-contain cursor-pointer" />
            <p className="text-yellow-400 font-bold text-sm">★★★★★ 4,9</p>
            <img src="images/I13.jpeg" alt="Google Play" className="h-10 w-auto object-contain cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ===== BOUTON FIXE EN BAS ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
        <Link to="/login" className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full transition text-center max-w-xl mx-auto">
          Devenir client
        </Link>
      </div>

      <div className="h-20" />
    </div>
  );
}