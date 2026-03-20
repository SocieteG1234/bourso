import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Share2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-50 transition"
    >
      {copied
        ? <Check size={20} className="text-green-500" />
        : <Copy size={20} className="text-blue-400" />
      }
    </button>
  );
}

export default function RibPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const rib = currentUser?.rib;

  const sections = [
    {
      title: "Titulaire du compte",
      lines: [
        currentUser?.name?.toUpperCase(),
        currentUser?.address,
        `${currentUser?.postalCode} ${currentUser?.city?.toUpperCase()}`,
      ].filter(Boolean),
      copyValue: `${currentUser?.name} ${currentUser?.address} ${currentUser?.postalCode} ${currentUser?.city}`,
    },
    {
      title: "Domiciliation",
      lines: [
        rib?.domiciliation ?? "BoursoBank",
        rib?.domiciliationAddress ?? "44 rue Traversière, CS 80134, 92772",
        rib?.domiciliationCity ?? "BOULOGNE-BILLANCOURT CEDEX, FRANCE",
      ],
      copyValue: `${rib?.domiciliation}, ${rib?.domiciliationAddress}, ${rib?.domiciliationCity}`,
    },
    {
      title: "BIC / SWIFT",
      lines: [rib?.bic?.replace(/(.{4})(.{2})(.{2})(.*)/, "$1 $2$3 $4") ?? "BOUS FRPP XXX"],
      copyValue: rib?.bic ?? "BOUSFRPPXXX",
    },
    {
      title: "IBAN",
      lines: [rib?.iban ?? "—"],
      copyValue: rib?.iban,
    },
  ];

  const handleShareAll = () => {
    const text = `RIB BoursoBank\nTitulaire : ${currentUser?.name}\nIBAN : ${rib?.iban}\nBIC : BOUSFRPPXXX`;
    if (navigator.share) {
      navigator.share({ title: "Mon RIB BoursoBank", text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* HEADER */}
      <div className="bg-blue-900 px-4 pt-10 pb-6">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/profil")} className="text-white">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-white font-bold text-lg">Mon RIB</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-3">

        {/* SECTIONS RIB */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`flex items-start justify-between px-5 py-4 ${i < sections.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="flex-1 pr-3">
                <p className="text-gray-900 font-bold text-base mb-1">{section.title}</p>
                {section.lines.map((line, j) => (
                  <p key={j} className="text-blue-600 text-sm leading-relaxed">{line}</p>
                ))}
              </div>
              <CopyButton value={section.copyValue} />
            </div>
          ))}
        </div>

        {/* BOUTONS */}
        <button
          onClick={handleShareAll}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition"
        >
          <Share2 size={18} />
          Partager mon RIB
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(rib?.iban ?? "");
          }}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition"
        >
          <Copy size={18} />
          Copier l'IBAN
        </button>

      </div>

      <BottomNav active="profil" />
    </div>
  );
}