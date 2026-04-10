"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react"; // Import ajouté pour l'icône de retour

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  const res = await signIn("credentials", {
    email,
    password,
    redirect: true,
    callbackUrl: "/dashboard",
  });
    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative">
      
      {/* Grilles de fond */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ── BOUTON RETOUR À L'ACCUEIL (Positionné en haut à gauche) ── */}
      <Link 
        href="/" 
        className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group z-10"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-sm md:text-base">Retour à l'accueil</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        
        {/* ── GRAND TITRE INSPEKT ET TEXTE D'ACCROCHE ── */}
        <div className="text-center mb-8 mt-12">
          <h1 className="text-6xl md:text-7xl font-black text-white leading-none tracking-tight mb-8">
            Inspe<span className="text-cyan-400">k</span>t
          </h1>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Bon retour !</h2>
          <p className="text-slate-400">Connectez-vous à votre compte</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl">
          {/* Microsoft OAuth */}
          <button
            onClick={() => signIn("azure-ad", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl font-semibold text-sm transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
              <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
              <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
            </svg>
            Continuer avec Microsoft
          </button>
          {/* Google OAuth */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-gray-100 text-black rounded-xl font-semibold text-sm transition-all mb-4 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuer avec Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-500 text-xs">ou</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/30 mt-2"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}