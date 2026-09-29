const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL || "https://mern-20251103-api.vercel.app",
  stripeKey: process.env.NEXT_PUBLIC_STRIPE_KEY || "",
  bestSellerId: process.env.NEXT_PUBLIC_BEST_SELLER_ID || null,
};

export default config;