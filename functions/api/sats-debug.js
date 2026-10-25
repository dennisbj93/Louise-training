/* Midlertidig: finder YouTube-id'et bag SATS' "Start video" for appens øvelser. */
const SLUGS = ["glute-bridge", "hip-thrust-one-leg", "glute-bridge-one-leg", "glute-bridge-band", "hip-thrust-barbell"];

export async function onRequestGet() {
  const rows = [];
  for (const slug of SLUGS) {
    try {
      const html = await (await fetch(`https://www.sats.dk/ovelser/${slug}`, { headers: { "user-agent": "Mozilla/5.0 (Louise-training)" } })).text();
      const m = html.match(/"youTube"\s*:\s*\{[^}]*?"id"\s*:\s*"([A-Za-z0-9_-]{6,20})"/) || html.match(/(vimeo\.com\/[^"\\ ]{0,40}|youtu[^"\\ ]{0,60}|"media":.{0,200})/);
      rows.push(`<li>${slug} = ${m ? m[1] : "NONE"}</li>`);
    } catch (e) { rows.push(`<li>${slug} = ERROR ${e}</li>`); }
  }
  return new Response(`<!doctype html><title>ids</title><ul>${rows.join("")}</ul>`, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}
