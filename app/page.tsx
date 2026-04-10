"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Link as LinkIcon, Smartphone, Palette, Mail, Zap, FileText, Monitor, Cpu, HardDrive, Server, Code, Database, Globe, Wifi, Check } from "lucide-react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'fr'|'en'>('fr');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fr = lang === 'fr';

  const NAV_LINKS = [
    { label: fr ? 'Fonctionnalités' : 'Features',    href: "#features" },
    { label: fr ? 'Tarifs' : 'Pricing',              href: "#pricing" },
    { label: fr ? 'Télécharger' : 'Download',        href: "#download" },
    { label: fr ? 'Prérequis' : 'Requirements',      href: "#requirements" },
  ];

  const FEATURES = [
    {
      icon: <LinkIcon className="w-8 h-8 text-cyan-400" />,
      title: fr ? 'Détection de liens brisés' : 'Broken link detection',
      desc: fr ? 'Crawl complet de toutes vos pages. Chaque lien interne et externe est testé — 404, timeouts, erreurs serveur détectés instantanément.' : 'Complete crawl of all your pages. Every internal and external link is tested — 404s, timeouts, server errors detected instantly.',
      color: "cyan",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-400" />,
      title: fr ? 'Tests multi-appareils' : 'Multi-device testing',
      desc: fr ? 'iPhone SE, iPhone 14 Pro, iPad, iPad Pro, Desktop HD. Débordements, textes trop petits, cibles tactiles — tout est vérifié.' : 'iPhone SE, iPhone 14 Pro, iPad, iPad Pro, Desktop HD. Overflows, small text, touch targets — everything is checked.',
      color: "blue",
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-400" />,
      title: fr ? 'Extraction de palette' : 'Palette extraction',
      desc: fr ? 'Aspire automatiquement logos, couleurs HEX, variables CSS, typographies et réseaux sociaux depuis n\'importe quel site.' : 'Automatically extracts logos, HEX colors, CSS variables, typography and social networks from any website.',
      color: "purple",
    },
    {
      icon: <Mail className="w-8 h-8 text-cyan-400" />,
      title: fr ? 'Collecte de contacts' : 'Contact harvesting',
      desc: fr ? 'Emails (incluant obfusqués Cloudflare), téléphones, adresses postales extraits depuis toutes les pages de contact.' : 'Emails (including Cloudflare obfuscated), phones, postal addresses extracted from all contact pages.',
      color: "cyan",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: fr ? 'Performance & vitesse' : 'Performance & speed',
      desc: fr ? 'Pages lentes identifiées, erreurs console listées, inventaire complet avec temps de réponse pour chaque URL crawlée.' : 'Slow pages identified, console errors listed, complete inventory with response times for each crawled URL.',
      color: "blue",
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-400" />,
      title: fr ? 'Rapports PDF / JSON / HTML' : 'PDF / JSON / HTML Reports',
      desc: fr ? 'Export professionnel en un clic. Partagez vos rapports clients en PDF, JSON brut ou HTML interactif.' : 'Professional export in one click. Share client reports in PDF, raw JSON or interactive HTML.',
      color: "purple",
    },
  ];

  const REQUIREMENTS = [
    { icon: <Monitor className="w-6 h-6 text-slate-300" />, label: fr ? 'Système' : 'System', value: "Windows 10 / 11 (64-bit)" },
    { icon: <Cpu className="w-6 h-6 text-slate-300" />, label: "RAM", value: fr ? '8 GB minimum, 16 GB recommandé' : '8 GB minimum, 16 GB recommended' },
    { icon: <HardDrive className="w-6 h-6 text-slate-300" />, label: fr ? 'Stockage' : 'Storage', value: fr ? '2 GB d\'espace libre' : '2 GB free space' },
    { icon: <Server className="w-6 h-6 text-slate-300" />, label: "Node.js", value: fr ? 'v18 ou supérieur' : 'v18 or higher' },
    { icon: <Code className="w-6 h-6 text-slate-300" />, label: "Python", value: fr ? '3.10 ou supérieur' : '3.10 or higher' },
    { icon: <Database className="w-6 h-6 text-slate-300" />, label: "Redis", value: fr ? 'Inclus dans l\'installateur' : 'Included in installer' },
    { icon: <Globe className="w-6 h-6 text-slate-300" />, label: fr ? 'Navigateur' : 'Browser', value: fr ? 'Chromium inclus (Playwright)' : 'Chromium included (Playwright)' },
    { icon: <Wifi className="w-6 h-6 text-slate-300" />, label: fr ? 'Connexion' : 'Connection', value: fr ? 'Internet requis pour les scans' : 'Internet required for scans' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[200px] pointer-events-none z-0" />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white font-black text-xl tracking-tight">Inspe<span className="text-cyan-400">k</span>t</span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(fr ? 'en' : 'fr')} className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all">
              {fr ? 'EN' : 'FR'}
            </button>
            <Link href="/login" className="hidden md:block text-slate-400 hover:text-white text-sm font-medium transition-colors">
              {fr ? 'Connexion' : 'Login'}
            </Link>
            <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg text-sm font-bold transition-all shadow-lg shadow-cyan-900/30">
              {fr ? 'Démarrer gratuitement' : 'Get started free'}
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-32 px-6 text-center z-10">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tight mb-4 opacity-90">
            Inspe<span className="text-cyan-400">k</span>t
          </h1>
          <div className="relative flex items-center justify-center my-6 h-40 w-full">
            <div className="absolute w-48 h-48 border border-slate-800 rounded-full" />
            <div className="relative w-32 h-32 rounded-full border border-cyan-500/40 bg-[#020617] overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:8px_8px] opacity-60" />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_75%,rgba(34,211,238,0.5)_100%)] animate-spin" style={{ animationDuration: '2.5s' }} />
              <div className="absolute left-1/2 top-0 bottom-1/2 w-[1.5px] bg-cyan-400 origin-bottom animate-spin shadow-[0_0_10px_#22d3ee]" style={{ animationDuration: '2.5s' }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
              <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute bottom-8 right-8 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1.2s' }} />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {fr ? 'Nouveau — Version 1.0 disponible' : 'New — Version 1.0 available'}
        </div>

        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none relative z-10">
          {fr ? 'Le diagnostic' : 'The intelligent'}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            {fr ? 'web intelligent' : 'web diagnostic'}
          </span>
        </h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed relative z-10">
          {fr ? "Analysez automatiquement n'importe quel site web — liens brisés, compatibilité mobile, extraction de contacts et palette de couleurs. En quelques minutes." : "Automatically analyze any website — broken links, mobile compatibility, contact extraction and color palette. In minutes."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a href="#download" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            {fr ? 'Télécharger Inspekt' : 'Download Inspekt'}
          </a>
          <a href="#features" className="px-8 py-4 bg-slate-900/60 border border-slate-700 hover:border-slate-500 rounded-xl font-bold text-lg transition-all">
            {fr ? 'Voir les fonctionnalités' : 'See features'}
          </a>
        </div>

        <div className="mt-24 grid grid-cols-3 max-w-lg mx-auto gap-8 relative z-10">
          {[["500+", fr ? "Pages crawlées/scan" : "Pages crawled/scan"], ["6", fr ? "Appareils testés" : "Devices tested"], ["100%", fr ? "Automatisé" : "Automated"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{val}</div>
              <div className="text-slate-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">{fr ? 'Fonctionnalités' : 'Features'}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">{fr ? 'Tout ce dont vous avez besoin' : 'Everything you need'}</h2>
            <p className="text-slate-400 max-w-xl mx-auto">{fr ? "Un seul outil pour auditer, extraire et analyser n'importe quel site web automatiquement." : "One tool to audit, extract and analyze any website automatically."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className={`group p-6 rounded-2xl border bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 ${f.color === "cyan" ? "border-slate-800 hover:border-cyan-500/30" : f.color === "blue" ? "border-slate-800 hover:border-blue-500/30" : "border-slate-800 hover:border-purple-500/30"}`}>
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 relative z-10">
        <h2 className="text-4xl font-black text-center mb-4">{fr ? 'Choisissez votre plan' : 'Choose your plan'}</h2>
        <p className="text-slate-400 text-center mb-16">{fr ? "Commencez aujourd'hui, aucune carte requise pour l'essai." : "Start today, no card required for the trial."}</p>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <p className="text-slate-400 text-sm mb-6">{fr ? 'Parfait pour démarrer' : 'Perfect to get started'}</p>
            <div className="text-5xl font-black mb-1">16$</div>
            <div className="text-slate-400 text-sm mb-8">{fr ? '/ mois' : '/ month'}</div>
            <ul className="space-y-4 text-sm text-slate-300 mb-8 flex-1">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? '50 scans / mois' : '50 scans / month'}</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Rapport PDF' : 'PDF Report'}</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Assurance qualité' : 'Quality assurance'}</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Support par email' : 'Email support'}</li>
            </ul>
            <a href="/register" className="block text-center py-3 rounded-xl border border-cyan-500 text-cyan-400 font-bold hover:bg-cyan-500/10 transition">
              {fr ? 'Commencer' : 'Get started'}
            </a>
          </div>
          <div className="rounded-2xl border-2 border-cyan-500 bg-slate-900/60 p-8 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="absolute top-4 right-4 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              {fr ? 'POPULAIRE' : 'POPULAR'}
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-slate-400 text-sm mb-6">{fr ? 'Pour les professionnels' : 'For professionals'}</p>
            <div className="text-5xl font-black mb-1 text-cyan-400">32$</div>
            <div className="text-slate-400 text-sm mb-8">{fr ? '/ mois' : '/ month'}</div>
            <ul className="space-y-4 text-sm text-slate-300 mb-8 flex-1">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Scans illimités' : 'Unlimited scans'}</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Rapport PDF avancé' : 'Advanced PDF report'}</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Assurance qualité complète' : 'Full quality assurance'}</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Extraction intelligence' : 'Intelligence extraction'}</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-cyan-400" /> {fr ? 'Support prioritaire' : 'Priority support'}</li>
            </ul>
            <a href="/register" className="block text-center py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition">
              {fr ? 'Commencer' : 'Get started'}
            </a>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-700/50 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)]" />
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Zap className="w-10 h-10 text-cyan-400" />
              </div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">{fr ? 'Téléchargement' : 'Download'}</span>
              <h2 className="text-4xl font-black mt-3 mb-4">{fr ? 'Prêt à inspecter ?' : 'Ready to inspect?'}</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                {fr ? 'Téléchargez Inspekt et commencez votre premier audit en moins de 5 minutes. Redis, Chromium et le moteur d\'analyse sont inclus.' : 'Download Inspekt and start your first audit in less than 5 minutes. Redis, Chromium and the analysis engine are included.'}
              </p>
              <a href="https://github.com/nextflowinc/inspekt/releases/download/v1.0.0/Inspekt.Setup.1.0.0.exe" download className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] inline-flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Windows 64-bit — v1.0.0
              </a>
              <p className="text-slate-600 text-xs mt-4">{fr ? 'Taille : ~1.8 GB · Windows 10/11 uniquement' : 'Size: ~1.8 GB · Windows 10/11 only'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="relative py-32 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">{fr ? 'Prérequis' : 'Requirements'}</span>
            <h2 className="text-4xl font-black mt-3 mb-4">{fr ? 'Configuration requise' : 'System requirements'}</h2>
            <p className="text-slate-400">{fr ? 'Vérifiez que votre machine est compatible avant de télécharger.' : 'Check your machine is compatible before downloading.'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REQUIREMENTS.map((r) => (
              <div key={r.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
                <div className="mb-3">{r.icon}</div>
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">{r.label}</div>
                <div className="text-white text-sm font-semibold">{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-6 border-t border-slate-800/60 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">Inspe<span className="text-cyan-400">k</span>t</span>
            <span className="text-slate-600 text-sm">© 2026</span>
            <span className="text-slate-500 text-sm hidden sm:block">• {fr ? 'Créé par' : 'Created by'} <span className="text-white font-semibold">NextFlow</span></span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-slate-400 hover:text-white text-sm transition-colors">{fr ? 'Connexion' : 'Login'}</Link>
            <Link href="/register" className="text-slate-400 hover:text-white text-sm transition-colors">{fr ? 'Inscription' : 'Register'}</Link>
            <a href="#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">{fr ? 'Tarifs' : 'Pricing'}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
