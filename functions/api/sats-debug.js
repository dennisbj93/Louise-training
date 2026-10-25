/* Midlertidig: finder YouTube-id'et bag SATS' "Start video" for en liste øvelser. */
export async function onRequestGet({ request }) {
  const slugs = (new URL(request.url).searchParams.get("slugs") || "").split(",").filter(s => /^[a-z0-9-]{2,80}$/.test(s)).slice(0, 30);
  const lines = await Promise.all(slugs.map(async (slug) => {
    try {
      const html = await (await fetch(`https://www.sats.dk/ovelser/${slug}`, { headers: { "user-agent": "Mozilla/5.0 (Louise-training)" } })).text();
      const m = html.match(/"youTube"\s*:\s*\{[^}]*?"id"\s*:\s*"([A-Za-z0-9_-]{6,20})"/);
      return `${slug} = ${m ? m[1] : "NONE"}`;
    } catch (e) { return `${slug} = ERROR`; }
  }));
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
