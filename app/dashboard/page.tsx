"use client";

import { Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogOut, Activity, ArrowLeft } from "lucide-react";

function DashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success");

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <Activity className="w-8 h-8 text-cyan-400 animate-spin" />
        <span className="ml-3 text-sm">Chargement...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 relative overflow-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex items-center justify-between mb-10 bg-slate-900/50 p-4 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-lg font-black shadow-lg shadow-cyan-500/20 text-black">I</div>
            <span className="font-black text-2xl tracking-tight text-white">Inspe<span className="text-cyan-400">k</span>t</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm hidden md:block">
              Connecté : <strong className="text-white">{session?.user?.email}</strong>
            </span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-semibold">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </header>
        {isSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-2xl mb-8 flex items-center gap-4">
            <span className="text-3xl">🎉</span>
            <div>
              <h3 className="font-bold text-lg">Paiement réussi !</h3>
              <p className="text-sm text-white opacity-90">Votre compte Inspekt est actif.</p>
            </div>
          </div>
        )}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center backdrop-blur-sm min-h-[450px]">
            <div className="relative w-28 h-28 mb-8">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 border-2 border-cyan-500/20 rounded-full"></div>
              <Activity className="absolute top-1/2 left-1/2 w-12 h-12 text-cyan-400 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-3xl font-black mb-4">Bonjour {session?.user?.name} 👋</h2>
            <p className="text-slate-400 max-w-md text-lg mb-8">Votre espace Inspekt est prêt.</p>
            <Link href="/" className="flex items-center gap-2 text-cyan-400 bg-cyan-950/40 px-6 py-3 rounded-xl border border-cyan-800/50 font-semibold text-sm hover:bg-cyan-900/60 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Retourner à l'accueil
            </Link>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Statut du compte
            </h3>
            <p className="text-slate-400 text-sm mb-3">Plan : <strong className="text-white">{(session?.user as any)?.plan || "Starter"}</strong></p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>
      <DashboardContent />
    </Suspense>
  );
}