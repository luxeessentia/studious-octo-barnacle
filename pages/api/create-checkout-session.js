// Serverless API to create Stripe Checkout Session
import { stripe } from '../../lib/stripe';
import { initFirebaseAdmin } from '../../lib/firebaseAdmin';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { items, email } = req.body || {};
    if (!items || !Array.isArray(items)) return res.status(400).json({ error: 'Invalid items' });

    const productsFile = path.join(process.cwd(),'public','data','products.json');
    const products = JSON.parse(fs.readFileSync(productsFile,'utf8'));
    const map = Object.fromEntries(products.map(p=>[p.id,p]));

    // server-side stock check
    for(const it of items) {
      const p = map[it.id];
      if(!p) return res.status(400).json({ error: 'Invalid product: ' + it.id });
      if (typeof p.stock === 'number' && p.stock < (it.quantity || 1)) {
  return res.status(400).json({ error: `Insufficient stock for ${it.id}` });
}

    const line_items = items.map(it => {
      const p = map[it.id];
      return {
        price_data: { currency: 'usd', product_data: { name: p.title }, unit_amount: p.price_cents },
        quantity: it.quantity || 1
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: email || undefined,
      success_url: process.env.SUCCESS_URL || 'http://localhost:3000/checkout/success',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:3000/checkout/cancel'
    });

    // Optionally store in Firestore (if admin configured)
    try {
      const admin = initFirebaseAdmin();
      if(admin) {
        const db = admin.firestore();
        await db.collection('orders').add({ stripeSessionId: session.id, email: email || null, items, status: 'pending', createdAt: admin.firestore.FieldValue.serverTimestamp() });
      }
    } catch(e) { console.warn('Could not store order to Firestore', e.message || e); }

    return res.status(200).json({ url: session.url, id: session.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'server error' });
  }
}
