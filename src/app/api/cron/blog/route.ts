import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { put } from "@vercel/blob";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TOPICS = [
  "chain of custody documentation for specimen transport",
  "cold-chain compliance for Edmonton pharmacies delivering vaccines",
  "STAT courier response times and why they matter for patient outcomes",
  "medication delivery to homebound patients in Edmonton",
  "how AHS facilities manage inter-site medical transport",
  "best practices for blister pack delivery to long-term care facilities",
  "biohazard courier training requirements in Alberta",
  "choosing a medical courier for diagnostic lab specimen pickups",
  "pharmacy delivery logistics: how to reduce missed deliveries",
  "medical equipment courier requirements and best practices",
  "Edmonton healthcare geography and courier route planning",
  "controlled substance delivery protocols for couriers",
  "temperature-sensitive medication delivery in Alberta winters",
  "how medical couriers support home-based palliative care",
  "the role of couriers in Alberta's rural healthcare access problem",
];

const CATEGORIES = [
  "Lab & Diagnostics",
  "Pharmacy",
  "Long-Term Care",
  "Healthcare Logistics",
  "Service Area",
  "Hospitals & AHS",
  "Patient Care",
];

const IMAGES = [
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=80",
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 70);
}

export async function GET(req: NextRequest) {
  // Verify cron secret in production
  const authHeader = req.headers.get("authorization");
  if (
    process.env.NODE_ENV === "production" &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN not set" }, { status: 500 });
  }

  const today = new Date().toISOString().split("T")[0];
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const image = IMAGES[Math.floor(Math.random() * IMAGES.length)];

  const prompt = `You are a healthcare logistics expert writing for the Speedo Medical Couriers blog — Edmonton, Alberta's dedicated medical courier service.

Write a professional, informative blog article about: "${topic}"

Requirements:
- Audience: healthcare administrators, pharmacy managers, clinic managers, lab coordinators in Edmonton
- Tone: expert, practical, authoritative — not salesy
- Length: 600–900 words in the body
- Include 3–4 subheadings using <h2> tags
- Write in HTML format (body only — no <html>/<body>/<head> tags, just <p>, <h2>, <ul>, <strong> etc.)
- Mention Edmonton and Alberta context where relevant
- At the end, subtly mention that Speedo Medical Couriers can help (1 sentence max, natural not pushy)

Respond with ONLY a JSON object in this exact format (no markdown fences):
{
  "title": "Article title (compelling, specific, 8-14 words)",
  "excerpt": "2-sentence excerpt that summarizes the article value (used as meta description)",
  "readMin": 5,
  "body": "<p>Full article body in HTML...</p>"
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = (message.content[0] as { type: string; text: string }).text;

  let parsed: { title: string; excerpt: string; readMin: number; body: string };
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Try to extract JSON from the response
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: "Failed to parse Claude response", raw }, { status: 500 });
    }
    parsed = JSON.parse(match[0]);
  }

  const slug = slugify(parsed.title);
  const post = {
    slug,
    title: parsed.title,
    excerpt: parsed.excerpt,
    category,
    date: today,
    readMin: parsed.readMin || 5,
    image,
    body: parsed.body,
  };

  await put(`blog/${slug}.json`, JSON.stringify(post), {
    access: "public",
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ success: true, slug, title: post.title });
}
