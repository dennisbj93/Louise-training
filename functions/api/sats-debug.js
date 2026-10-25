/* Midlertidig: finder YouTube-id'et bag SATS' "Start video" for appens øvelser. */
const SLUGS = ["goblet-squat", "chest-press-dumbbell", "front-lunges-dumbbells", "hip-thrust-barbell", "russian-twist", "renegade-row",
  "kettlebell-swing", "seated-shoulder-press-handvaegte", "single-hand-row", "deadlift-straight-leg-dumbbell", "standing-dumbbell-curl",
  "overhead-tricep-extension", "thrusters-with-dumbbell", "step-up-dumbbell", "clean-and-press", "side-lateral-raise",
  "deadlift-single-hand-kettlebell", "dead-bug"];

export async function onRequestGet() {
  const rows = [];
  for (const slug of SLUGS) {
    try {
      const html = await (await fetch(`https://www.sats.dk/ovelser/${slug}`, { headers: { "user-agent": "Mozilla/5.0 (Louise-training)" } })).text();
      const m = html.match(/"youTube"\s*:\s*\{[^}]*?"id"\s*:\s*"([A-Za-z0-9_-]{6,20})"/);
      rows.push(`<li>${slug} = ${m ? m[1] : "NONE"}</li>`);
    } catch (e) { rows.push(`<li>${slug} = ERROR ${e}</li>`); }
  }
  return new Response(`<!doctype html><title>ids</title><ul>${rows.join("")}</ul>`, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}
