import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import Stripe from "stripe";

// --- LES NOUVEAUX IMPORTS PRISMA V7 ---
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// ── FIX PRISMA V7 : Singleton & Adaptateur ──
const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
// ─────────────────────────────────────────────

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

// Map plan -> Stripe Price ID (à remplacer par tes vrais IDs Stripe)
const PRICE_IDS: Record<string, string> = {
  starter:    process.env.STRIPE_PRICE_STARTER!,
  pro:        process.env.STRIPE_PRICE_PRO!,
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, plan } = await req.json();

    // Vérifications
    if (!name || !email || !password || !plan) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Le mot de passe doit faire au moins 8 caractères." }, { status: 400 });
    }

    // Vérifier si l'email existe déjà
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 400 });
    }

    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 12);

    // Créer l'utilisateur (inactif jusqu'au paiement)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        plan,
        active: false,
      },
    });

    // Créer une session Stripe Checkout
    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Plan invalide." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode:                 "subscription",
      customer_email:       email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url:  `${process.env.NEXTAUTH_URL}/register?cancelled=true`,
      metadata: { userId: user.id, plan },
    });

    return NextResponse.json({ checkoutUrl: session.url });

  } catch (error: any) {
    console.error("Erreur inscription:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}