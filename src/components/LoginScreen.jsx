import React, { useState } from "react";
import { Eye, EyeOff, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(username, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Identifiant ou mot de passe incorrect");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 py-4 px-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <img src="images/L1.jpeg" alt="BoursoBank" className="h-8 object-contain" />
          <Bot size={26} className="text-blue-500" />
        </div>
      </div>

      {/* CONTENU */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-extrabold text-blue-900 mb-2">
            Connexion
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Accédez à votre espace client BoursoBank
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* IDENTIFIANT */}
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                Identifiant (8 chiffres)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="00000000"
                maxLength="8"
                autoComplete="off"
                disabled={isLoading}
                className="w-full mt-2 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-3 text-gray-900 text-xl tracking-widest bg-transparent transition"
              />
            </div>

            {/* MOT DE PASSE */}
            <div>
              <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  maxLength="6"
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="w-full mt-2 border-b-2 border-gray-300 focus:border-pink-500 outline-none py-3 pr-10 text-gray-900 text-xl tracking-widest bg-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 translate-y-1 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERREUR */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* BOUTON */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white font-bold text-lg py-4 rounded-full transition shadow-lg mt-4"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>

            {/* LIENS */}
            <div className="text-center space-y-2 pt-2">
              <p className="text-blue-500 text-sm cursor-pointer hover:underline">
                Identifiant oublié ?
              </p>
              <p className="text-blue-500 text-sm cursor-pointer hover:underline">
                Mot de passe oublié ?
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4 text-center">
              <p className="text-gray-500 text-sm mb-3">Pas encore client ?</p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full border-2 border-pink-500 text-pink-500 font-bold py-3 rounded-full hover:bg-pink-50 transition"
              >
                Devenir client
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}