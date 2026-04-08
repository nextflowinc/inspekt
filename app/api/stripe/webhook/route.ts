import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature invalide:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId  = session.metadata?.userId;
    const plan    = session.metadata?.plan;

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          active:           true,
          plan:             plan || "starter",
          stripeCustomerId: session.customer as string,
        },
      });
      console.log(`Compte activé pour userId=${userId} plan=${plan}`);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId   = subscription.customer as string;
    await prisma.user.updateMany({
      where: { stripeCustomerId: customerId },
      data:  { active: false, plan: null },
    });
  }

  return NextResponse.json({ received: true });
}
