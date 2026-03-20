import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeftRight, CreditCard, User } from "lucide-react";

export default function BottomNav({ active }) {
  const navigate = useNavigate();

  const tabs = [
    { label: "Accueil", icon: Home, route: "/dashboard", key: "accueil" },
    { label: "Virements", icon: ArrowLeftRight, route: "/virement", key: "virement" },
    { label: "Carte", icon: CreditCard, route: "/carte", key: "carte" },
    { label: "Profil", icon: User, route: "/profil", key: "profil" },
  ];

  return (
    <>
      {/* Espace pour éviter que le contenu soit caché derrière le nav */}
      <div className="h-20" />

      {/* NAV FIXE */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50"
        style={{ boxShadow: "0 -4px 12px rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-xl mx-auto flex items-center justify-around py-3 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => navigate(tab.route)}
                className="flex flex-col items-center gap-1 flex-1 py-1"
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-2xl transition ${isActive ? "bg-pink-50" : ""}`}>
                  <Icon
                    size={22}
                    className={isActive ? "text-pink-500" : "text-gray-400"}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-pink-500" : "text-gray-400"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Safe area pour iPhone */}
        <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </nav>
    </>
  );
}