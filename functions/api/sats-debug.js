/* Midlertidig fejlsøgning: viser hvor SATS-siden nævner video, så udtrækket kan rettes. */
export async function onRequestGet({ request }) {
  const slug = new URL(request.url).searchParams.get("slug") || "goblet-squat";
  if (!/^[a-z0-9-]{2,80}$/.test(slug)) return new Response("bad slug", { status: 400 });
  const res = await fetch(`https://www.sats.dk/ovelser/${slug}`, { headers: { "user-agent": "Mozilla/5.0 (Louise-training)" } });
  const html = await res.text();
  const out = [`status ${res.status} length ${html.length}`];
  const re = /.{0,160}(?:video|Video|mp4|m3u8|ctfassets|mux\.com|vimeo|youtube|jwplayer|wistia|brightcove|cloudinary|_next\/static\/chunks\/app|buildId).{0,160}/g;
  let m, n = 0;
  while ((m = re.exec(html)) && n < 60) { out.push(`--- ${n++} @${m.index}\n${m[0]}`); }
  out.push("--- scripts:", ...[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(x => x[1]).slice(0, 40));
  return new Response(out.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
