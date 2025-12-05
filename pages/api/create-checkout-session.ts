import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_123", {
  apiVersion: "2025-11-17.clover",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lineItems } = req.body;
  if (!lineItems || !Array.isArray(lineItems)) {
    return res.status(400).json({ error: "Invalid line items" });
  }

  // Add shipping and tax as separate line items
  let shipping = 0;
  let subtotal = 0;
  lineItems.forEach((item: any) => {
    subtotal += (item.price_data.unit_amount / 100) * item.quantity;
  });
  // You may want to pass shipping info from frontend
  shipping = req.body.shipping || 0;
  const tax = subtotal * 0.10;

  const sessionLineItems = [
    ...lineItems,
    shipping > 0
      ? {
          price_data: {
            currency: "usd",
            product_data: { name: "Shipping" },
            unit_amount: Math.round(shipping * 100),
          },
          quantity: 1,
        }
      : null,
    {
      price_data: {
        currency: "usd",
        product_data: { name: "Tax (10%)" },
        unit_amount: Math.round(tax * 100),
      },
      quantity: 1,
    },
  ].filter(Boolean);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: sessionLineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/checkout?success=true`,
      cancel_url: `${req.headers.origin}/checkout?canceled=true`,
    });
    res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
