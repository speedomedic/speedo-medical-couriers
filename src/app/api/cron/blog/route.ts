import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { put } from "@vercel/blob";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── SEO keyword clusters ─────────────────────────────────────────────────────
// Each topic entry drives a full blog post optimized for a specific search intent.
// Categories: local Edmonton SEO, informational (ChatGPT-rankable), competitor
// displacement, healthcare vertical-specific, long-tail questions.

const TOPIC_CLUSTERS = [
  // LOCAL EDMONTON — high commercial value, exact-match searches
  {
    topic: "medical courier Edmonton: what to look for when choosing a provider",
    primaryKeyword: "medical courier Edmonton",
    secondaryKeywords: ["healthcare courier Edmonton", "medical delivery Edmonton", "courier Edmonton hospital"],
    intent: "commercial",
    category: "Healthcare Logistics",
  },
  {
    topic: "same-day prescription delivery in Edmonton: how it works and what to expect",
    primaryKeyword: "prescription delivery Edmonton",
    secondaryKeywords: ["same-day prescription delivery Edmonton", "medication delivery Edmonton home"],
    intent: "informational",
    category: "Pharmacy",
  },
  {
    topic: "lab specimen courier in Edmonton: timing, temperature, and transport requirements",
    primaryKeyword: "lab specimen courier Edmonton",
    secondaryKeywords: ["specimen transport Edmonton", "diagnostic courier Edmonton", "blood sample pickup Edmonton"],
    intent: "informational",
    category: "Lab & Diagnostics",
  },
  {
    topic: "STAT medical courier Edmonton: what qualifies as STAT and how fast is fast enough",
    primaryKeyword: "STAT medical courier Edmonton",
    secondaryKeywords: ["urgent medical delivery Edmonton", "emergency courier Edmonton"],
    intent: "informational",
    category: "Healthcare Logistics",
  },
  {
    topic: "pharmacy delivery service in Edmonton: how pharmacies partner with medical couriers",
    primaryKeyword: "pharmacy delivery Edmonton",
    secondaryKeywords: ["pharmacy courier Edmonton", "Shoppers Drug Mart delivery Edmonton", "Rexall delivery Edmonton"],
    intent: "informational",
    category: "Pharmacy",
  },
  // CHATGPT / AI SEARCH — optimized for "best X in Edmonton" / conversational queries
  {
    topic: "best medical courier service in Edmonton: what separates specialist couriers from general delivery",
    primaryKeyword: "best medical courier service Edmonton",
    secondaryKeywords: ["top medical courier Edmonton", "reliable medical courier Edmonton"],
    intent: "informational",
    category: "Healthcare Logistics",
  },
  {
    topic: "how to get same-day medication delivery in Edmonton",
    primaryKeyword: "same-day medication delivery Edmonton",
    secondaryKeywords: ["same day drug delivery Edmonton", "urgent prescription delivery Edmonton"],
    intent: "informational",
    category: "Pharmacy",
  },
  {
    topic: "Edmonton home health supply delivery: what conditions require courier services",
    primaryKeyword: "home health supply delivery Edmonton",
    secondaryKeywords: ["home care delivery Edmonton", "medical supplies delivery Edmonton"],
    intent: "informational",
    category: "Patient Care",
  },
  // COLD CHAIN — high-value niche
  {
    topic: "cold chain vaccine delivery in Edmonton pharmacies: how temperature integrity is maintained",
    primaryKeyword: "cold chain vaccine delivery Edmonton",
    secondaryKeywords: ["vaccine transport Edmonton", "cold chain courier Edmonton", "temperature-sensitive medication delivery"],
    intent: "informational",
    category: "Pharmacy",
  },
  {
    topic: "temperature-sensitive medication delivery in Edmonton winters: challenges and solutions",
    primaryKeyword: "temperature-sensitive medication delivery Edmonton",
    secondaryKeywords: ["cold chain courier Edmonton", "medication transport winter Alberta"],
    intent: "informational",
    category: "Healthcare Logistics",
  },
  // LONG-TERM CARE vertical
  {
    topic: "medication delivery to long-term care facilities in Edmonton: routing, timing, and compliance",
    primaryKeyword: "medication delivery long-term care Edmonton",
    secondaryKeywords: ["LTC pharmacy delivery Edmonton", "long-term care courier Edmonton"],
    intent: "informational",
    category: "Long-Term Care",
  },
  {
    topic: "blister pack delivery to assisted living facilities: how Edmonton pharmacies manage compliance packaging",
    primaryKeyword: "blister pack delivery Edmonton",
    secondaryKeywords: ["compliance packaging delivery Edmonton", "assisted living medication Edmonton"],
    intent: "informational",
    category: "Long-Term Care",
  },
  // CLINICS vertical
  {
    topic: "specimen pickup from clinics in Edmonton: what medical couriers collect and how",
    primaryKeyword: "specimen pickup clinic Edmonton",
    secondaryKeywords: ["lab pickup Edmonton", "urine sample pickup Edmonton", "clinic courier Edmonton"],
    intent: "informational",
    category: "Lab & Diagnostics",
  },
  {
    topic: "courier services for Edmonton medical clinics: reducing administrative burden on front-desk staff",
    primaryKeyword: "medical clinic courier Edmonton",
    secondaryKeywords: ["clinic delivery service Edmonton", "document pickup clinic Edmonton"],
    intent: "informational",
    category: "Healthcare Logistics",
  },
  // HOSPITALS / PATIENT DISCHARGE
  {
    topic: "discharge prescription delivery in Edmonton: getting medication home before the patient arrives",
    primaryKeyword: "discharge prescription delivery Edmonton",
    secondaryKeywords: ["hospital discharge medication Edmonton", "UAH prescription delivery", "Royal Alexandra prescription delivery"],
    intent: "informational",
    category: "Patient Care",
  },
  {
    topic: "medication delivery for homebound patients in Edmonton: who qualifies and how to arrange it",
    primaryKeyword: "medication delivery homebound patients Edmonton",
    secondaryKeywords: ["home delivery medication Edmonton", "elderly medication delivery Edmonton"],
    intent: "informational",
    category: "Patient Care",
  },
  // SERVICE AREA / GEOGRAPHIC SEO
  {
    topic: "Sherwood Park medical courier: healthcare delivery east of Edmonton",
    primaryKeyword: "medical courier Sherwood Park",
    secondaryKeywords: ["Sherwood Park pharmacy delivery", "Sherwood Park clinic courier"],
    intent: "local",
    category: "Service Area",
  },
  {
    topic: "St. Albert medical courier services: healthcare logistics north of Edmonton",
    primaryKeyword: "medical courier St. Albert",
    secondaryKeywords: ["St. Albert pharmacy delivery", "St. Albert clinic pickup"],
    intent: "local",
    category: "Service Area",
  },
  {
    topic: "Leduc medical courier: connecting healthcare facilities between Edmonton and Leduc County",
    primaryKeyword: "medical courier Leduc",
    secondaryKeywords: ["Leduc pharmacy delivery", "Leduc lab specimen courier"],
    intent: "local",
    category: "Service Area",
  },
  {
    topic: "Fort Saskatchewan medical courier: pharmaceutical and specimen delivery northeast of Edmonton",
    primaryKeyword: "medical courier Fort Saskatchewan",
    secondaryKeywords: ["Fort Saskatchewan pharmacy courier", "northeast Edmonton medical delivery"],
    intent: "local",
    category: "Service Area",
  },
  // INFORMATIONAL / AUTHORITY-BUILDING (rank on ChatGPT and Google for expertise)
  {
    topic: "what is chain of custody in medical courier services and why does it matter",
    primaryKeyword: "chain of custody medical courier",
    secondaryKeywords: ["chain of custody specimen", "chain of custody documentation healthcare"],
    intent: "informational",
    category: "Healthcare Logistics",
  },
  {
    topic: "why healthcare providers should not use general couriers for medical deliveries",
    primaryKeyword: "medical courier vs general courier",
    secondaryKeywords: ["healthcare courier vs regular courier", "why specialized medical courier"],
    intent: "informational",
    category: "Healthcare Logistics",
  },
  {
    topic: "how Shipday tracking helps pharmacies confirm prescription delivery to patients",
    primaryKeyword: "prescription delivery tracking Edmonton",
    secondaryKeywords: ["real-time delivery tracking pharmacy", "prescription delivery confirmation"],
    intent: "informational",
    category: "Pharmacy",
  },
  {
    topic: "controlled substance transport by couriers in Alberta: regulations and requirements",
    primaryKeyword: "controlled substance courier Alberta",
    secondaryKeywords: ["narcotic delivery courier Alberta", "controlled drug courier Edmonton"],
    intent: "informational",
    category: "Healthcare Logistics",
  },
  {
    topic: "palliative care medication delivery: how home-based end-of-life care depends on courier reliability",
    primaryKeyword: "palliative care medication delivery Edmonton",
    secondaryKeywords: ["palliative home care delivery Edmonton", "end of life medication courier"],
    intent: "informational",
    category: "Patient Care",
  },
  {
    topic: "how Edmonton's diagnostic lab network routes specimens: from clinic collection to testing facility",
    primaryKeyword: "diagnostic lab specimen routing Edmonton",
    secondaryKeywords: ["DynaLife specimen pickup Edmonton", "lab collection route Edmonton"],
    intent: "informational",
    category: "Lab & Diagnostics",
  },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 70);
}

// Pick a topic that hasn't been recently used by checking what's in Blob.
// Falls back to random if we can't check.
function pickTopic(usedSlugs: string[]) {
  // Shuffle topics
  const shuffled = [...TOPIC_CLUSTERS].sort(() => Math.random() - 0.5);
  // Prefer topics whose slug doesn't appear in recent posts
  for (const t of shuffled) {
    const slug = slugify(t.topic.split(":")[0]);
    if (!usedSlugs.some((s) => s.includes(slug.slice(0, 20)))) return t;
  }
  return shuffled[0];
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

  // Try to get list of existing posts to avoid duplicates
  let usedSlugs: string[] = [];
  try {
    const { list } = await import("@vercel/blob");
    const blobs = await list({ prefix: "blog/", token: process.env.BLOB_READ_WRITE_TOKEN });
    usedSlugs = blobs.blobs.map((b) => b.pathname.replace("blog/", "").replace(".json", ""));
  } catch {
    // Proceed without dedup if listing fails
  }

  const cluster = pickTopic(usedSlugs);
  const image = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  const today = new Date().toISOString().split("T")[0];

  const prompt = `You are a healthcare logistics expert and SEO content writer for Speedo Medical Couriers — Edmonton, Alberta's dedicated medical courier service (website: speedomedic.ca).

Write a comprehensive, high-ranking blog article about: "${cluster.topic}"

SEO REQUIREMENTS (follow strictly):
- Primary keyword: "${cluster.primaryKeyword}" — use it in the title, first paragraph, one H2, and naturally 3–5 times in the body
- Secondary keywords: ${cluster.secondaryKeywords.map((k) => `"${k}"`).join(", ")} — weave in naturally where relevant
- Search intent: ${cluster.intent} — for informational, teach and explain; for commercial, compare and recommend; for local, include Edmonton-specific context
- Title must be 8–14 words, include the primary keyword naturally
- Meta description (excerpt): 140–155 characters, include primary keyword, compelling reason to click
- Structure: 800–1100 words, 4 subheadings (H2), at least one list or table in HTML

CONTENT REQUIREMENTS:
- Audience: healthcare administrators, pharmacy managers, clinic managers, lab coordinators in Edmonton
- Tone: expert, practical, authoritative — not salesy or generic
- Include real Edmonton context: neighborhoods, hospitals, streets, healthcare facilities
- Cover WHY (problems it solves), HOW (practical steps or criteria), and WHAT (specific to Alberta/Edmonton regulations or conditions)
- Mention that Speedo Medical Couriers can help with exactly this at the END — one natural sentence only
- Do NOT use vague filler ("In today's healthcare landscape...") — get specific fast

OUTPUT FORMAT — respond with ONLY this JSON (no markdown, no code fences):
{
  "title": "Article title with primary keyword",
  "excerpt": "140-155 character meta description with primary keyword and compelling hook",
  "readMin": 6,
  "metaTitle": "60-character SEO title tag",
  "focusKeyword": "${cluster.primaryKeyword}",
  "body": "<p>Full article HTML body — p, h2, ul, li, strong, em tags only...</p>"
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = (message.content[0] as { type: string; text: string }).text;

  let parsed: {
    title: string;
    excerpt: string;
    readMin: number;
    metaTitle?: string;
    focusKeyword?: string;
    body: string;
  };

  try {
    parsed = JSON.parse(raw);
  } catch {
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
    metaTitle: parsed.metaTitle || parsed.title.slice(0, 60),
    focusKeyword: parsed.focusKeyword || cluster.primaryKeyword,
    category: cluster.category,
    date: today,
    readMin: parsed.readMin || 6,
    image,
    body: parsed.body,
  };

  await put(`blog/${slug}.json`, JSON.stringify(post), {
    access: "public",
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({
    success: true,
    slug,
    title: post.title,
    focusKeyword: post.focusKeyword,
    category: post.category,
  });
}
