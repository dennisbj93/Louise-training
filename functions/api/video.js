/* Cloudflare Pages Function: /api/video?slug=goblet-squat
   Henter SATS' øvelsesside og finder videoens og thumbnailens adresse, så appen kan afspille den direkte. */
const VIDEO_RE = /(?:https?:)?\/\/[^"'\s<>\\)]+?\.(?:mp4|webm|m3u8|mov)(?:\?[^"'\s<>\\)]*)?/gi;
const POSTER_RE = /(?:https?:)?\/\/images\.ctfassets\.net\/[^"'\s<>\\)]+?\.(?:png|jpe?g|webp)/gi;

export function extract(html) {
  const text = html
    .replace(/\\u002F/gi, "/")
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&");
  const abs = (u) => (u.startsWith("//") ? "https:" + u : u);
  const videos = [...new Set((text.match(VIDEO_RE) || []).map(abs))];
  /* Foretræk Contentfuls videohost og mp4, som afspilles overalt (også på iPhone). */
  videos.sort((a, b) => score(b) - score(a));
  const posters = (text.match(POSTER_RE) || []).map(abs);
  const poster = posters.find((u) => /exercise/i.test(u)) || posters[0] || null;
  return { video: videos[0] || null, poster };
}

function score(u) {
  return (u.includes("ctfassets.net") ? 2 : 0) + (/\.mp4(\?|$)/i.test(u) ? 1 : 0);
}

export async function onRequestGet({ request }) {
  const slug = new URL(request.url).searchParams.get("slug") || "";
  if (!/^[a-z0-9-]{2,80}$/.test(slug)) return json({ error: "ugyldig øvelse" }, 400);
  const page = `https://www.sats.dk/ovelser/${slug}`;
  try {
    const res = await fetch(page, {
      headers: { "user-agent": "Mozilla/5.0 (Louise-training)", "accept-language": "da" },
      cf: { cacheTtl: 86400, cacheEverything: true }
    });
    if (!res.ok) return json({ video: null, poster: null, page }, 502, 300);
    const found = extract(await res.text());
    return json({ ...found, page }, found.video ? 200 : 404, found.video ? 86400 : 600);
  } catch (e) {
    return json({ video: null, poster: null, page }, 502, 60);
  }
}

function json(body, status = 200, maxAge = 0) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": `public, max-age=${maxAge}` }
  });
}
