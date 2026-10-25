# Louise-training

Fuldkropsprogram over 6 uger som en lille webapp: tre træningspas, ugeplan, intervaltimer (30 sek arbejde / 30 sek pause, 5 runder) og progression.

Hele appen ligger i `index.html` og kræver ingen build. Åbn filen i en browser, eller udgiv den med GitHub Pages (Settings → Pages → Deploy from a branch → vælg branch og `/ (root)`).

## Personlig til Louise

- Velkomst efter tidspunkt på dagen og "Dagens træning" ud fra startdato og ugedag.
- Afkrydsning: et pas markeres som gennemført, når timeren er færdig, eller med "Jeg har trænet i dag". Fremskridt (antal pas, dage i træk, uge 1–6) gemmes i browseren på telefonen.
- Påmindelser: banner i appen efter det valgte klokkeslæt, notifikationer når appen er åben eller i baggrunden, og en kalenderfil (.ics) med alle 36 pas og alarm, som virker på alle telefoner.
- Kan lægges på hjemmeskærmen og virker uden net (`manifest.webmanifest`, `sw.js`).
- Elegant rosa/plum-stil med Cormorant Garamond og Jost, i både lyst og mørkt tema.
- "Print programmet" udskriver dagens pas på én side med figurer, trin og afkrydsning af runder.
- Kalender over alle 6 uger med gennemførte og manglende dage, plus en liste over alle gennemførte dage.
- Guide til "Føj til hjemmeskærm" på iPhone (og knap til at installere på Android).
