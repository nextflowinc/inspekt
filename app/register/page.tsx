"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

// ── SEULEMENT 3 PLANS ──
const PLANS = [
  { id: "free",    name: "Gratuit", price: "0$",  priceId: "" },
  { id: "starter", name: "Starter", price: "16$", priceId: "price_starter_id" },
  { id: "pro",     name: "Pro",     price: "32$", priceId: "price_pro_id" },
];

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("pro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'inscription");
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative font-sans">
      
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[200px] pointer-events-none z-0" />

      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors z-20 font-medium text-sm bg-slate-900/50 p-2 pr-4 rounded-full border border-slate-800 backdrop-blur-md hover:border-cyan-500/50"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à l'accueil
      </Link>

      <div className="relative z-10 flex flex-col items-center mb-10 mt-12 md:mt-0 text-center">
      <h1 className="text-8xl md:text-9xl font-black text-white leading-none tracking-tight mb-4 opacity-90">
                INSPE<span className="text-cyan-400">K</span>T
              </h1>

      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-[#0b1121]/80 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl shadow-black/60">
          
          <div className="flex flex-col items-center mb-10 text-center">
             <h2 className="text-3xl font-black text-white mb-3">Créer votre compte</h2>
             <p className="text-slate-400 text-sm max-w-sm">Commencez votre diagnostic web dès aujourd'hui</p>
          </div>

          <button
            onClick={() => signIn("azure-ad", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#1e293b] hover:bg-slate-700 border border-slate-700 rounded-xl font-medium text-white transition-all shadow-sm mb-3 text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
              <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
              <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
            </svg>
            Continuer avec Microsoft
          </button>
          {/* Google */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#1e293b] hover:bg-slate-700 border border-slate-700 rounded-xl font-medium text-white transition-all shadow-sm mb-8 text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-500 text-xs">ou avec email</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium">{error}</div>
            )}

            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2">Nom Complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                required
                className="w-full bg-[#020617] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                className="w-full bg-[#020617] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="relative">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2">Mot de passe</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
                required
                className="w-full bg-[#020617] border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-3.5 pr-12 text-white placeholder-slate-600 focus:outline-none transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="mt-4 mb-3">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-3">Plan sélectionné :</label>
              <div className="grid grid-cols-3 gap-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`py-4 rounded-xl border text-center transition-all relative overflow-hidden flex flex-col items-center justify-center ${plan === p.id ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "bg-[#020617] border-slate-800 hover:border-slate-700"}`}
                  >
                  {p.id === 'pro' && (
                    <div className="absolute top-0 right-0 bg-cyan-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase">
                      PRO
                    </div>
                  )}
                  {p.id === 'free' && (
  <div className="absolute top-0 right-0 bg-slate-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase">
    3 scans
  </div>
)}
                    <div className={`text-xs font-bold mb-1 ${plan === p.id ? 'text-white' : 'text-slate-400'}`}>{p.name}</div>
                    <div className={`text-2xl font-black ${plan === p.id ? 'text-cyan-400' : 'text-white'}`}>{p.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] mt-3 flex items-center justify-center gap-2.5 text-base"
            >
              {loading ? (
                "Création du compte..."
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Créer mon compte & payer
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center text-sm text-slate-400">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
              Se connecter
            </Link>
            <div className="mt-5 text-xs text-slate-500 flex items-center justify-center gap-2 opacity-80 border-t border-slate-800 pt-5">
              <Lock className="w-3.5 h-3.5" />
              Paiement sécurisé par Stripe
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}