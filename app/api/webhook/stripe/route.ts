import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// --- IMPORTS PRISMA V7 ---
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Garde la version que tu utilises
});

export async function POST(req: NextRequest) {
  // 1. Récupérer le corps de la requête brute et la signature de sécurité
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    // 2. Vérifier que le message vient bien de Stripe (Sécurité maximale)
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Erreur de signature Webhook:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // 3. Si le paiement est réussi
  if (event.type === "checkout.session.completed") {
    // On récupère l'ID de l'utilisateur qu'on avait passé dans les métadonnées lors de l'inscription
    const userId = session.metadata?.userId;

    if (userId) {
      // On met à jour l'utilisateur dans Supabase : il devient ACTIF !
      await prisma.user.update({
        where: { id: userId },
        data: {
          active: true,
          stripeCustomerId: session.customer as string, // On sauvegarde son ID client Stripe
        },
      });
      console.log(`✅ Utilisateur ${userId} activé avec succès !`);
    }
  }

  // On répond à Stripe que tout s'est bien passé (Code 200)
  return new NextResponse(null, { status: 200 });
}