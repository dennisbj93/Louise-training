# Louise-training

Fuldkropsprogram som en lille webapp: tre træningspas i fast turnus mandag til lørdag (søndag er hviledag), uge efter uge uden slutdato. Med intervaltimer (30 sek arbejde / 30 sek pause, 5 runder) og progression.

Hele appen ligger i `index.html` og kræver ingen build. Åbn filen i en browser, eller udgiv den med GitHub Pages (Settings → Pages → Deploy from a branch → vælg branch og `/ (root)`).

## Personlig til Louise

- Velkomst efter tidspunkt på dagen og "Dagens træning" ud fra startdato og ugedag.
- Afkrydsning: et pas markeres som gennemført, når timeren er færdig, eller med "Jeg har trænet i dag". Fremskridt (pas i alt, dage i træk, pas denne uge) gemmes i browseren på telefonen.
- Påmindelser: banner i appen efter det valgte klokkeslæt, notifikationer når appen er åben eller i baggrunden, og en kalenderfil (.ics) med ugentligt gentagne pas og alarm, som virker på alle telefoner.
- Kan lægges på hjemmeskærmen og virker uden net (`manifest.webmanifest`, `sw.js`).
- Elegant rosa/plum-stil med Cormorant Garamond og Jost, i både lyst og mørkt tema.
- "Print programmet" udskriver dagens pas på én side med figurer, trin og afkrydsning af runder.
- Kalender over de seneste 6 uger med gennemførte og manglende dage, plus en liste over alle gennemførte dage.
- Guide til "Føj til hjemmeskærm" på iPhone (og knap til at installere på Android).
- Øvelserne bruger håndvægte og kettlebell. Hver øvelse viser SATS' video direkte i appen. `functions/api/video.js` er en Cloudflare Pages Function, der henter øvelsens side på sats.dk/ovelser og finder videoens adresse (`/api/video?slug=goblet-squat`). Finder den ingen video, åbnes SATS-siden i stedet.
- App-layout med menu i bunden (I dag, Programmer, Fremskridt, Mere), timer i fuld skærm med ring, og fejring når et pas er gennemført.
