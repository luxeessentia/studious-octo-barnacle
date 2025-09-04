Luxe Essentials — Next.js scaffold (generated)

Local dev:
1) cd luxe-next-full
2) npm install
3) copy .env.local.example -> .env.local and fill your NEXT_PUBLIC_* values
   - Paste your Firebase Web config values and your Stripe publishable key
   - For local testing you may add STRIPE_SECRET_KEY and FIREBASE_ADMIN_KEY in .env.local but DO NOT commit them
4) npm run dev
5) Open http://localhost:3000

Deployment:
- Push to GitHub
- Add server-only env vars in Vercel (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FIREBASE_ADMIN_KEY, SUCCESS_URL, CANCEL_URL)
- Deploy on Vercel