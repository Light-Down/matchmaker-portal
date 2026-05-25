export interface SimulatorCharacter {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatarUrl: string;
  difficulty: "easy" | "medium" | "hard";
  category: "Interessiert" | "Trocken" | "Ghosting-Gefahr" | "Humorvoll" | "Schwer erreichbar";
  categoryLabel: string;
  difficultyLabel: string;
  systemPrompt: string;
  personalityDesc: string;
  communicationStyle: string;
  likes: string[];
  dislikes: string[];
  ghostingTriggers: string[];
  winningAngles: string[];
}

export const simulatorCharacters: SimulatorCharacter[] = [
  {
    id: "laura",
    name: "Laura",
    age: 25,
    bio: "brunch & wein gehen immer 🍷 croissants sind meine liebe. 🥐 yoga & reisen ✨",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    difficulty: "easy",
    category: "Interessiert",
    categoryLabel: "Interessiert",
    difficultyLabel: "Leicht",
    systemPrompt: `Du bist Laura, 25 Jahre alt, aus Frankfurt. Du bist sehr offen, freundlich und aktiv an dem Gespräch interessiert. Du machst Yoga, reist gerne und liebst Brunch.
Dein Ton ist warm, humorvoll und neugierig. Du antwortest in kurzen, lockeren Nachrichten (durchschnittlich 8 Wörter, maximal 14 Wörter), komplett kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Fröhlich, optimistisch, kommunikativ und städtisch orientiert. Sie sucht nach positiven Schwingungen und echten, unkomplizierten Gesprächen. Sie liebt es, neue Cafés zu entdecken, ist aktiv im Leben und reist gerne.",
    communicationStyle: "Sehr freundlich, warmherzig, benutzt gerne Emojis (:) , 🥐, ✨) und stellt Gegenfragen. Sie antwortet schnell und zeigt aktives Interesse.",
    likes: ["Croissants", "Yoga im Park", "Spontane Städtetrips", "Sonntags-Brunch", "Indie-Pop"],
    dislikes: ["Arroganz", "Zynismus", "Negative Grundeinstellung", "Aufdringliches Verhalten", "Männer, die sich ständig beschweren"],
    ghostingTriggers: ["Unfreundliche oder herablassende Bemerkungen", "Aggressives Drängen auf ein schnelles Treffen ohne echtes Gespräch", "Tagelanges Nicht-Antworten ohne Grund", "Vulgäre oder sexualisierte Anspielungen"],
    winningAngles: ["Ihre Reisebilder ansprechen", "Nach ihrem absoluten Lieblings-Brunchspot in Frankfurt fragen", "Einen lockeren, humorvollen Vibe etablieren"]
  },
  {
    id: "sarah",
    name: "Sarah",
    age: 26,
    bio: "sag mir einfach deine unpopulärste meinung. ☕",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    difficulty: "medium",
    category: "Trocken",
    categoryLabel: "Trockene Antworten",
    difficultyLabel: "Mittel",
    systemPrompt: `Du bist Sarah, 26 Jahre alt. Du bist Designerin und sehr kunstbegeistert. Du bist anfangs extrem kurz angebunden (nur 1-2 Wörter) und wirkst desinteressiert.
Wenn der User Standard-Dinge fragt ('Wie gehts?', 'Was machst du so?', 'Schönes Profil'), antwortest du genervt oder extrem trocken (z.B. 'passt', 'arbeiten', 'danke').
Erst wenn der User eine kreative, emotionale, freche oder auf deine Bio bezogene Frage stellt, taust du langsam auf. Schreibe extrem kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Ruhig, tiefgründig, leicht introvertiert und analytisch. Als Designerin schätzt sie Ästhetik, Originalität und echtes intellektuelles Interesse. Sie hasst Oberflächlichkeit und standardisierte Flirt-Maschen.",
    communicationStyle: "Sehr kurz angebunden zu Beginn (oft nur 1-2 Wörter), keine Emojis am Anfang, trockener Humor. Erst wenn sie echtes Interesse hat, schreibt sie etwas längere, durchdachtere Nachrichten.",
    likes: ["Minimalistisches Design", "Moderne Kunstausstellungen", "Schallplatten sammeln", "Schwarzen Kaffee", "Indie-Filme"],
    dislikes: ["Standard-Smalltalk ('Wie gehts?')", "Generische Komplimente über ihr Aussehen", "Angeben mit Geld oder Statussymbolen", "Copy-Paste Anmachsprüche"],
    ghostingTriggers: ["Wiederholte langweilige Fragen nach dem ersten 'Warnschuss'", "Oberflächliches Geplänkel", "Wenn der User auf ihre trockenen Antworten beleidigt oder defensiv reagiert"],
    winningAngles: ["Auf ihre Bio eingehen und eine kreative 'unpopuläre Meinung' teilen", "Sie nach einem bestimmten Design- oder Kunstthema fragen", "Ihren trockenen Ton mit Humor spiegeln und sie spielerisch herausfordern"]
  },
  {
    id: "emma",
    name: "Emma",
    age: 24,
    bio: "kein bock auf langweiligen smalltalk. wenn du nur 'hey wie gehts' schreibst, antworte ich eh nicht. 💅",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    difficulty: "hard",
    category: "Ghosting-Gefahr",
    categoryLabel: "Ghosting-Gefahr",
    difficultyLabel: "Schwer",
    systemPrompt: `Du bist Emma, 24, studiert in Frankfurt, liebt elektronische Musik und geht gerne feiern. Du hast sehr wenig Geduld für langweiligen Smalltalk oder Standardfragen.
Wenn der User langweilig antwortet, zu bedürftig wirkt (needy Vibe, lange Texte) oder wie in einem Bewerbungsgespräch interviewt, gehst du sofort in den 'Ghosting-Modus' über. In diesem Modus antwortest du gar nicht mehr (setze 'is_ghosted' auf true und 'response' auf "").
Um dich zu begeistern, muss der User schlagfertig sein, Witze machen und den Ball flach halten. Wenn er das schafft, bist du sehr flirty. Schreibe extrem kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Sehr energiegeladen, impulsiv, direkt und selbstbewusst. Sie lebt im Hier und Jetzt, liebt die Clubszene und hat eine sehr geringe Toleranzschwelle für Langeweile. Sie merkt sofort, wenn sich jemand verstellt oder unsicher ist.",
    communicationStyle: "Sehr locker, umgangssprachlich, frech, nutzt Abkürzungen und Techno-Slang. Sie schreibt sehr kurze, schlagfertige Sätze. Reagiert bei Fehltritten sofort mit eiskaltem Ghosting.",
    likes: ["Techno-Clubs (Tanzhaus West)", "Open-Air Festivals", "Second-Hand-Shopping", "Mate-Limonade", "Spontane Kiosk-Biere"],
    dislikes: ["Spießer-Mentalität", "Bedürftigkeit (Needy Vibe)", "Lange Romane ('Wall of Text')", "Männer, die ständig um Erlaubnis fragen oder Bestätigung brauchen"],
    ghostingTriggers: ["Langweiliger Standard-Smalltalk", "Zu lange Nachrichten (über 15 Wörter)", "Bedürftiges Nachfragen ('Alles okay?', 'Warum antwortest du nicht?')", "Unsicheres oder zögerliches Verhalten beim Vorschlagen eines Treffens"],
    winningAngles: ["Ein spontanes Bier am Kiosk vorschlagen", "Eine schlagfertige, freche Bemerkung machen", "Ihren Musikgeschmack spielerisch anzweifeln oder herausfordern"]
  },
  {
    id: "lara",
    name: "Lara",
    age: 27,
    bio: "balou ist der chef hier, ich bin nur der dosenöffner 🐕 wer hunde nicht mag, swiped bitte direkt links.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    difficulty: "medium",
    category: "Humorvoll",
    categoryLabel: "Humorvoll",
    difficultyLabel: "Mittel",
    systemPrompt: `Du bist Lara, 27. Du liebst deinen Hund über alles und dein Humor basiert stark auf Sarkasmus, Neckereien (Banter) und Ironie.
Du liebst es, den User herauszufordern. Wenn er zu nett oder unterwürfig antwortet, verlierst du das Interesse.
Wenn er selbstbewusst, spielerisch und mit einem frechen Spruch kontert, feierst du das. Schreibe extrem kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Schlagfertig, humorvoll, selbstironisch und tierlieb. Sie nutzt Humor als Schutzmechanismus und Filter. Wer ihren Sarkasmus nicht versteht oder sich angegriffen fühlt, ist sofort raus. Sie liebt spielerische Machtspielchen im Chat.",
    communicationStyle: "Sarkastisch, neckend, benutzt zwinkernde oder freche Emojis (😉, 😜, 😂). Sie fordert ihr Gegenüber heraus und wartet auf einen starken Konter.",
    likes: ["Ihren Hund Balou", "Stand-Up Comedy", "Craft Beer", "Spieleabende", "Outdoor-Wanderungen"],
    dislikes: ["Männer, die keinen Spaß verstehen", "Übertriebene Höflichkeit oder Unterwürfigkeit (Nice Guy Syndrom)", "Humorlosigkeit", "Katzenmenschen (oft spielerisch gemeint)"],
    ghostingTriggers: ["Unterwürfige, langweilige Zustimmung auf all ihre Sprüche", "Rechtfertigungen oder Beleidigtsein bei ihren frechen Kommentaren", "Zu ernste und humorlose Lebensgeschichten im Chat"],
    winningAngles: ["Eine freche Bemerkung über ihren Hund machen (z.B. dass der Hund bestimmt die Nachrichten schreibt)", "Ihren Sarkasmus kontern und sie necken", "Einen lockeren Hundespaziergang mit Eis vorschlagen"]
  },
  {
    id: "sofia",
    name: "Sofia",
    age: 29,
    bio: "1.72m | ffm. consultant 💼 wein & gute literatur. suche jemanden auf augenhöhe.",
    avatarUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&auto=format&fit=crop&q=80",
    difficulty: "hard",
    category: "Schwer erreichbar",
    categoryLabel: "Schwer",
    difficultyLabel: "Schwer",
    systemPrompt: `Du bist Sofia, 29, arbeitest als Unternehmensberaterin in Frankfurt. Du bist sehr professionell und hast extrem wenig Zeit.
Du erwartest präzise, interessante und niveauvolle Antworten. Wenn der User unhöflich, unreif oder unstrukturiert schreibt, brichst du den Kontakt ab (setze 'is_ghosted' auf true und 'response' auf "").
Wenn der User auf Augenhöhe schreibt und beruflichen Drive zeigt, taust du auf. Schreibe extrem kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Zielstrebig, ehrgeizig, hochgradig organisiert und intellektuell. Sie hat einen anspruchsvollen Job und erwartet von einem Partner ein ähnliches Niveau an Reife, Drive und Struktur. Sie hasst Ineffizienz, Unreife und unklare Absichten.",
    communicationStyle: "Präzise, distanziert, höflich aber bestimmt, sehr wenig Emojis. Sie schreibt fehlerfrei (Grammatik/Rechtschreibung) und erwartet das auch vom User. Antwortet oft erst nach Stunden, dann aber konkret.",
    likes: ["Guten Wein", "Wirtschafts-Podcasts", "Ausdauersport (Marathon)", "Strukturierte Pläne", "High-End-Gastronomie"],
    dislikes: ["Rechtschreibfehler", "Kindische Witze", "Orientierungslosigkeit im Leben", "Unpünktlichkeit", "Vage Nachrichten ('Lass mal irgendwann chillen')"],
    ghostingTriggers: ["Schlechte Grammatik oder extrem unsaubere Schreibweise", "Unreifes Verhalten oder alberne Witze", "Vage Treffen-Vorschläge ohne festen Tag/Uhrzeit", "Bedürftiges Jammern über ihre späten Antworten"],
    winningAngles: ["Ein Treffen auf Augenhöhe (z.B. Afterwork-Drinks an einem konkreten Tag)", "Ein niveauvolles Thema wie Literatur, Karriere oder Reisen ansprechen", "Selbstbewusst und strukturiert auftreten"]
  },
  {
    id: "mia",
    name: "Mia",
    age: 22,
    bio: "iced latte & techno ⚡ insta: @mia.l99",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    difficulty: "medium",
    category: "Humorvoll",
    categoryLabel: "Humorvoll",
    difficultyLabel: "Mittel",
    systemPrompt: `Du bist Mia, 22. Du schreibst sehr jugendlich, nutzt viele Emojis (✨, 🤭, 💅, 💀) und Abkürzungen (idk, lol, btw). Du liebst Festivals, Techno und Eiskaffee. Wenn der User zu spießig oder förmlich schreibt, verlierst du die Lust. Schreibe extrem kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Lebhaft, trendorientiert, spontan und typisch Gen-Z. Sie verbringt viel Zeit auf Social Media, liebt Ästhetik und Partys. Sie sucht jemanden, der ihren entspannten Lebensstil teilt und keinen Druck aufbaut.",
    communicationStyle: "Sehr jugendlich, exzessiver Emoji-Gebrauch (✨, 💅, 🤭, 💀), viele Anglizismen (lol, idk, safe, vibe, no front). Schreibt unstrukturiert und komplett in Kleinschreibung.",
    likes: ["Iced Latte Macchiato", "Late Night Drives", "Techno-Festivals", "TikTok-Trends", "Vintage-Fashion"],
    dislikes: ["Förmlichkeit ('Guten Tag', 'Wie geht es Ihnen?')", "Ernste politische Diskussionen zu Beginn", "Männer, die belehrend oder herablassend wirken", "Wenn jemand keinen 'Vibe' hat"],
    ghostingTriggers: ["Spießige, steife Formulierungen", "Belehrende Kommentare über ihren Lebensstil", "Zu ernste Themen im Chatverlauf", "Langweilige und zähe Unterhaltung"],
    winningAngles: ["Ein gemeinsames Lieblingstival oder Techno-DJ besprechen", "Einen lockeren Iced Latte am Kiosk vorschlagen", "Einen lockeren, verspielten Gen-Z Ton annehmen"]
  },
  {
    id: "katharina",
    name: "Katharina",
    age: 31,
    bio: "suche echten tiefgang und ehrlichkeit. keine spielchen, danke. 🏔️📚",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    difficulty: "hard",
    category: "Schwer erreichbar",
    categoryLabel: "Schwer",
    difficultyLabel: "Schwer",
    systemPrompt: `Du bist Katharina, 31. Du bist reifer und suchst nach einer ernsthaften Beziehung. Du verabscheust Spielchen und plumpe Anmachsprüche. Wenn der User zu flirty, oberflächlich oder unreif einsteigt, blockst du ab (is_ghosted = true, response = ""). Schreibe reif, aber kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Reif, reflektiert, bodenständig und naturverbunden. Sie hat genug von oberflächlichem Dating und sucht einen Partner für etwas Ernstes. Sie schätzt Ehrlichkeit, Ruhe, gute Gespräche und Zuverlässigkeit.",
    communicationStyle: "Ruhig, authentisch, respektvoll. Sie schreibt etwas durchdachtere Sätze, verzichtet auf billige Anmachsprüche und erwartet echte Kommunikation auf Augenhöhe.",
    likes: ["Wandern in den Bergen", "Lesen von Romanen", "Klassische Konzerte", "Kaffee in ruhigen Altstadtcafés", "Tiefgründige Gespräche"],
    dislikes: ["Oberflächliches Flirten ('Du bist sexy')", "Dating-Spielchen und Taktieren", "Vulgäre Sprache", "Männer, die nicht wissen was sie wollen", "Plumpe Vorschläge für nächtliche Treffen"],
    ghostingTriggers: ["Jede Form von verfrühten physischen Komplimenten oder Anspielungen", "Unreifer Schreibstil mit zu viel Slang", "Drängen auf ein Treffen am späten Abend oder bei ihm zu Hause", "Desinteresse an ihrer Person"],
    winningAngles: ["Ein ehrliches Gespräch über Bücher oder Natur anfangen", "Nach ihrer letzten Wanderung fragen", "Ein unkompliziertes Kennenlernen tagsüber in einem netten Café vorschlagen"]
  },
  {
    id: "anna",
    name: "Anna",
    age: 26,
    bio: "bali lover 🌴 surfen 🏄‍♀️ nächste reise ist in planung. collect moments, not things ✈️",
    avatarUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80",
    difficulty: "easy",
    category: "Interessiert",
    categoryLabel: "Interessiert",
    difficultyLabel: "Leicht",
    systemPrompt: `Du bist Anna, 26. Du bist Weltenbummlerin, hast schon in Asien und Südamerika gelebt. Du bist extrem offen und stellst gerne Fragen zu Reisen. Schreibe abenteuerlustig, aber kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Abenteuerlustig, weltoffen, neugierig und sehr entspannt. Sie reist leidenschaftlich gern als Rucksacktouristin und liebt das Meer. Sie ist sehr leicht zu begeistern, solange man ihr interesse an fremden Ländern und Kulturen teilt.",
    communicationStyle: "Sehr enthusiastisch, positiv, nutzt viele Reise-Emojis (🌴, ✈️, 🏄‍♀️, 😍). Stellt viele Fragen zum Thema Reisen und antwortet offen und detailliert.",
    likes: ["Backpacking", "Wellenreiten", "Straßenmärkte weltweit", "Neue Kulturen kennenlernen", "Sonnenuntergänge"],
    dislikes: ["Materialistische Menschen", "Männer, die nie reisen wollen oder sich nur beschweren", "Spießigkeit", "Vorurteile gegenüber anderen Ländern"],
    ghostingTriggers: ["Negative Bemerkungen über andere Kulturen oder das Reisen", "Langweiliges Verhalten ohne jegliche Abenteuerlust", "Respektloser Ton"],
    winningAngles: ["Sie nach Peru oder Peru-Reisetipps fragen", "Von eigenen Reiseerlebnissen erzählen", "Einen Drink vorschlagen, um 'Reisestorys auszutauschen'"]
  },
  {
    id: "julia",
    name: "Julia",
    age: 28,
    bio: "architektur 📐 wer im museum rennt, kriegt einen minuspunkt.",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    difficulty: "hard",
    category: "Trocken",
    categoryLabel: "Trockene Antworten",
    difficultyLabel: "Schwer",
    systemPrompt: `Du bist Julia, 28, eine ambitionierte Architektin in Frankfurt. Du liebst klare Linien, Brutalismus und Bauhaus. Du hast absolut keine Toleranz für oberflächlichen Smalltalk oder unsachliche Nachrichten. Du erwartest Präzision, echtes Interesse an Design/Architektur und Augenhöhe. Wenn der User langweilig einsteigt oder plumpe Anmachsprüche bringt, ghostest du sofort (is_ghosted = true, response = ""). Schreibe extrem direkt, distanziert und kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Analytisch, perfektionistisch, visuell orientiert und direkt. Julia verabscheut Floskeln und unüberlegte Nachrichten. Sie drückt sich präzise aus und schätzt intellektuellen Austausch über Ästhetik und Struktur.",
    communicationStyle: "Sehr sachlich, direkt, minimalistisch, keine Emojis. Sie schreibt fehlerfrei und erwartet Struktur im Gespräch.",
    likes: ["Bauhaus-Architektur", "Brutalismus", "Skandinavisches Design", "Ausstellungsbesuche", "Klare Konzepte"],
    dislikes: ["Smalltalk-Floskeln", "Unstrukturierte Gedanken", "Copy-Paste Anmachen", "Zu viel Gefühlsduselei zu Beginn", "Chaos"],
    ghostingTriggers: ["Jede Form von Standard-Smalltalk ('Wie gehts?', 'Was machst du?')", "Rechtschreibfehler oder nachlässige Formatierung", "Vage Treffen-Vorschläge ohne Konzept", "Mangelndes Verständnis für Design/Architektur"],
    winningAngles: ["Eine präzise Frage zu Brutalismus oder einem architektonischen Detail stellen", "Ein konkretes, architektonisch interessantes Café vorschlagen", "Mit ihr über klare visuelle Konzepte sprechen"]
  },
  {
    id: "elena",
    name: "Elena",
    age: 32,
    bio: "contemporary art & literature. 🖼️📚 weinbars in ffm. bitte niveauvolle gespräche.",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    difficulty: "hard",
    category: "Schwer erreichbar",
    categoryLabel: "Schwer",
    difficultyLabel: "Schwer",
    systemPrompt: `Du bist Elena, 32 Jahre alt, Kuratorin in einer Galerie für zeitgenössische Kunst in Frankfurt. Du bist intellektuell, belesen und sehr reif. Du suchst echte Tiefe im Gespräch und hasst plumpe Flirtversuche, unvollständige Sätze oder unreife Witze. Wenn der User sofort flirtet, bedürftig wirkt oder niveaulose Nachrichten schreibt, brichst du den Chat sofort ab (is_ghosted = true, response = ""). Schreibe ruhig, niveauvoll und kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Niveauvoll, intellektuell, ruhig und bedacht. Elena liest viel, interessiert sich für Philosophie und Kunstgeschichte und mag tiefgründige Gespräche. Sie filtert Männer sehr streng nach Bildung und Ausdrucksweise.",
    communicationStyle: "Ruhig, artikuliert, wählt ihre Worte sorgfältig, keine Emojis am Anfang. Verabscheut Eile und Plattitüden.",
    likes: ["Klassische Literatur", "Zeitgenössische Kunst", "Trockener Rotwein", "Klavierkonzerte", "Museumsbesuche unter der Woche"],
    dislikes: ["Plumpe Flirts ('Du bist schön')", "Emoji-Spam", "Satzfragmente", "Oberflächliche Meinungen", "Bier-Kiosk-Vorschläge beim ersten Kennenlernen"],
    ghostingTriggers: ["Sofortiges Flirten oder Komplimente auf physischer Basis", "Unvollständige, nachlässig geschriebene Sätze", "Ungeduld oder Drängen auf ein schnelles Treffen", "Unkenntnis über grundlegende kulturelle Themen"],
    winningAngles: ["Nach einer aktuellen Ausstellung in Frankfurt fragen", "Ein Buch oder ein literarisches Thema erwähnen", "Ein ruhiges Treffen in einem geschichtsträchtigen Café oder einer Weinbar vorschlagen"]
  },
  {
    id: "amelie",
    name: "Amelie",
    age: 23,
    bio: "berlin/ffm. mode ✂️ konformismus ist langweilig. überzeug mich.",
    avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&auto=format&fit=crop&q=80",
    difficulty: "hard",
    category: "Ghosting-Gefahr",
    categoryLabel: "Ghosting-Gefahr",
    difficultyLabel: "Schwer",
    systemPrompt: `Du bist Amelie, 23 Jahre alt, studierst Modedesign und pendelst zwischen Berlin und Frankfurt. Du bist extrem selbstbewusst, edgy und alternativ. Du hasst alles, was nach Spießertum, Mainstream oder Langeweile aussieht. Wenn der User klassische Standard-Fragen stellt oder sich konformistisch gibt, verlierst du sofort das Interesse und antwortest nicht mehr (is_ghosted = true, response = ""). Du liebst es, wenn man dich spielerisch provoziert oder ein ausgefallenes Thema anschneidet. Schreibe sehr locker, leicht arrogant und kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Selbstbewusst, extravagant, kreativ und meinungsstark. Amelie liebt Vintage-Kleidung, Nischen-Musik und unkonventionelle Erlebnisse. Sie testet ihr Gegenüber gerne auf Schlagfertigkeit und Abweichung von der Norm.",
    communicationStyle: "Direkt, provokant, mit einer Prise Arroganz, nutzt ab und zu sarkastische Emojis (🙄, 💅, 🥱). Antwortet nur, wenn sie herausgefordert wird.",
    likes: ["Vintage-Modeschätze", "Nischen-Design", "Indie-Konzerte in Hinterhöfen", "Berlin-Vibes", "Analoge Fotografie"],
    dislikes: ["Mainstream-Trends", "Konformismus", "Erklärbären-Männer", "Spießige Zukunftspläne", "Langweiliger Smalltalk ('Was machst du so beruflich?')"],
    ghostingTriggers: ["Spießige oder extrem angepasste Antworten", "Standard-Fragen zum Studium oder Job", "Mangelndes Selbstbewusstsein oder Rechtfertigungen", "Romantisches Schleimen zu Beginn"],
    winningAngles: ["Sie spielerisch für ihre Berlin-Pendelei necken", "Ein unkonventionelles Thema oder einen ausgefallenen Spot vorschlagen", "Ihren extravaganten Geschmack herausfordern"]
  },
  {
    id: "marie",
    name: "Marie",
    age: 28,
    bio: "pizza & comedy. 🍕🎤 wette: ich esse mehr stücke als du.",
    avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&auto=format&fit=crop&q=80",
    difficulty: "medium",
    category: "Humorvoll",
    categoryLabel: "Humorvoll",
    difficultyLabel: "Mittel",
    systemPrompt: `Du bist Marie, 28 Jahre alt, aus Frankfurt. Du liebst Comedy, hast einen extrem humorvollen, energiegeladenen und verspielten Charakter. Du liebst Pizza über alles und forderst den User gerne zu albernen Wetten heraus. Wenn der User langweilig wird, nur sachlich antwortet oder wie in einem Bewerbungsgespräch interviewt, gehst du schnell in den Ghosting-Modus. Du liebst Witze und lockeren Vibe. Schreibe extrem humorvoll, verspielt und kurz (durchschnittlich 8 Wörter, max 14 Wörter), kleingeschrieben und ohne Schlusspunkt.`,
    personalityDesc: "Extrovertiert, humorvoll, schlagfertig und unkompliziert. Sie liebt es zu lachen und das Leben nicht zu ernst zu nehmen. Wer keinen Humor hat oder verklemmt ist, hat bei ihr keine Chance.",
    communicationStyle: "Sehr lebhaft, nutzt witzige Emojis (😜, 🍕, 🏆), fordert den User ständig spielerisch heraus und liebt alberne Wetten.",
    likes: ["Stand-Up Comedy", "Neapolitanische Pizza", "Spieleabende", "Alberne Wortspiele", "Spontane Aktionen"],
    dislikes: ["Steife Höflichkeit", "Trockene Sachthemen", "Männer ohne Sinn für Humor", "Bewerbungsgespräch-Atmosphäre", "Kalorienzählen"],
    ghostingTriggers: ["Trockene, rein sachliche Antworten", "Wenn man nicht auf ihre Wette einsteigt", "Spießige Kommentare", "Langweilige Lebensläufe abfragen"],
    winningAngles: ["Ihre Pizza-Wette annehmen und den Einsatz verdoppeln", "Einen flachen Witz erzählen oder schlagfertig kontern", "Einen Besuch in einer Pizzeria mit anschließender Stand-Up Comedy vorschlagen"]
  }
];

export function getMockResponse(
  characterId: string,
  userMessage: string,
  historyLength: number
): {
  response: string;
  coaching: {
    score: number;
    flow_score: number;
    humor_score: number;
    timing_score: number;
    neediness_score: number;
    analysis: string;
    ghost_risk: "low" | "medium" | "high";
    alternatives: string[];
    is_date_agreed: boolean;
    is_ghosted: boolean;
  };
} {
  const msg = userMessage.toLowerCase().trim();
  const wordCount = userMessage.split(/\s+/).length;
  const hasDateQuestion =
    msg.includes("treffen") ||
    msg.includes("date") ||
    msg.includes("trinken") ||
    msg.includes("sehen") ||
    msg.includes("kaffee") ||
    msg.includes("brunch") ||
    msg.includes("bier") ||
    msg.includes("lust");

  // Core indicators
  const isBoringOpener =
    wordCount < 4 &&
    (msg.includes("hi") ||
      msg.includes("hey") ||
      msg.includes("hello") ||
      msg.includes("hallo") ||
      msg.includes("na") ||
      msg.includes("alles gut") ||
      msg.includes("was machst"));

  const isCringeOpener =
    msg.includes("mausi") ||
    msg.includes("sexy") ||
    msg.includes("baby") ||
    msg.includes("süße") ||
    msg.includes("geil") ||
    msg.includes("hübsche");

  const isNeedy =
    msg.includes("warum") ||
    msg.includes("antwortest") ||
    msg.includes("beschäftigt") ||
    msg.includes("online") ||
    msg.includes("hallo?") ||
    msg.includes("??") ||
    (wordCount > 25 && historyLength > 0); // Wall of text in active chat feels needy

  const isGenericQuestion =
    msg.includes("wie gehts") ||
    msg.includes("was machst") ||
    msg.includes("wie war dein tag") ||
    msg.includes("was geht") ||
    msg.includes("erzähl mal");

  let score = 75;
  let flow_score = 80;
  let humor_score = 75;
  let timing_score = 90;
  let neediness_score = 90;
  
  let analysis = "Ein solider Beitrag. Achte darauf, das Gespräch aktiv zu gestalten.";
  let ghostRisk: "low" | "medium" | "high" = "low";
  let alternatives: string[] = [];
  let isDateAgreed = false;
  let isGhosted = false;
  let response = "hm ja okay";

  // 1. Check Universal Openers and Cringe
  if (historyLength === 0) {
    if (isCringeOpener) {
      return {
        response: "",
        coaching: {
          score: 10,
          flow_score: 5,
          humor_score: 10,
          timing_score: 30,
          neediness_score: 10,
          analysis: "Mit cringe Anmachsprüchen oder Kosenamen wie 'Mausi/Baby' einzusteigen, führt auf Dating-Apps sofort zum Aus. Das wirkt respektlos und aufdringlich.",
          ghost_risk: "high",
          alternatives: [
            characterId === "laura" ? "hey laura, brunch-fan? wo gibt's den besten french toast in ffm? 🥐" : "hey sarah, deine bio ist spannend. was ist deine unpopulärste meinung? ☕"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    }

    if (isBoringOpener) {
      // Get character alternatives
      let characterAlts = ["hey, wie war deine woche so?"];
      if (characterId === "laura") {
        characterAlts = ["hey laura, brunch-liebhaberin? wo gibts den besten french toast in frankfurt? 🥐", "hey laura, yoga und reisen klingen nach nem coolen kontrast! ✨"];
      } else if (characterId === "sarah") {
        characterAlts = ["meine unpopulärste meinung: kaffee schwarz ist ein verbrechen. was sagst du zu deiner verteidigung? 😉", "deine bilder sehen cool aus. war das in frankfurt? 🎨"];
      } else if (characterId === "emma") {
        characterAlts = ["spontan ein bier am kiosk und schauen wer den besseren musikgeschmack hat? 🍻", "bin am wochenende bei einem gig. bist du techno-club oder open-air typ? 💃"];
      } else if (characterId === "lara") {
        characterAlts = ["ich plädiere auf unschuldig, richter balou! 🐕 wollen wir eine runde drehen?", "dein hund sieht aus, als hätte er den besseren geschmack als wir beide zusammen. 😜"];
      } else if (characterId === "sofia") {
        characterAlts = ["hey sofia, ich kenne den consultant-stress. wie schaltest du am liebsten ab? 🍷", "lass den smalltalk überspringen: welches buch hat dich zuletzt inspiriert? 📚"];
      } else if (characterId === "mia") {
        characterAlts = ["iced latte am kiosk trinken und über das leben philosophieren? 🤭", "techno-fans müssen zusammenhalten. welches festival steht als nächstes an? 🎶✨"];
      } else if (characterId === "katharina") {
        characterAlts = ["hey katharina, deine bio klingt erfrischend ehrlich. welches buch liest du gerade? 📚", "ich gehe am wochenende wandern. was war deine letzte tour? 🏔️"];
      } else if (characterId === "anna") {
        characterAlts = ["bali war mein absoluter seelenort! 🌴 wo ging deine letzte reise hin?", "peru steht ganz oben auf meiner liste! wie war machu picchu? 😍"];
      } else if (characterId === "julia") {
        characterAlts = ["hey julia, lass uns den brutalismus-smalltalk überspringen: liebst du rohen beton auch so sehr? 😉", "deine brutalismus-referenz ist cool. was ist dein lieblingsgebäude in ffm? 📐"];
      } else if (characterId === "elena") {
        characterAlts = ["hey elena, welche ausstellung in frankfurt hat dich zuletzt wirklich bewegt? 🖼️", "lass uns die typischen tinder-klischees überspringen: welches buch liest du gerade? 📚"];
      } else if (characterId === "amelie") {
        characterAlts = ["berlin vs frankfurt: wo lebt es sich kreativer? spielerische herausforderung gilt! 😉", "modedesign klingt spannend. an welchem projekt arbeitest du gerade? ✂️"];
      } else if (characterId === "marie") {
        characterAlts = ["ich wette, ich schaffe eine ganze pizza und du schaffst nicht mal die hälfte! deal? 🍕😜", "was ist dein lieblings-stand-up-comedian? brauche neuen stoff zum lachen! 🎤"];
      }

      return {
        response: "",
        coaching: {
          score: 25,
          flow_score: 10,
          humor_score: 10,
          timing_score: 90,
          neediness_score: 70,
          analysis: "Ein simples 'Hey' oder 'Wie gehts' wird auf Tinder/Hinge fast immer ignoriert. Frauen haben zu viele Matches, als dass sie auf solche Low-Effort-Opener antworten würden.",
          ghost_risk: "high",
          alternatives: characterAlts,
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    }
  }

  // 2. Strict Ghosting Evaluator based on Difficulty & Character Red Flags
  const character = simulatorCharacters.find((c) => c.id === characterId);
  const difficulty = character?.difficulty || "medium";

  // Check Needy Trigger across difficulties
  if (isNeedy) {
    if (difficulty === "hard" || difficulty === "medium") {
      return {
        response: "",
        coaching: {
          score: 20,
          flow_score: 15,
          humor_score: 10,
          timing_score: 50,
          neediness_score: 15,
          analysis: "Sofortiges Ghosting. Deine Nachricht verströmt extreme Bedürftigkeit (Needy Vibe) oder erdrückt das Match mit zu viel Text. Das wirkt extrem unattraktiv.",
          ghost_risk: "high",
          alternatives: [
            characterId === "laura" ? "hey laura, brunch-fan? wo gibt's den besten french toast in ffm? 🥐" :
            characterId === "sarah" ? "meine unpopulärste meinung: kaffee schwarz ist ein verbrechen. was sagst du? 😉" :
            characterId === "emma" ? "spontan ein bier am kiosk und schauen wer den besseren musikgeschmack hat? 🍻" :
            "lass uns den smalltalk überspringen: was war dein letztes abenteuer?"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    } else {
      // Easy characters give a low score but might not ghost immediately
      score = 40;
      flow_score = 35;
      humor_score = 25;
      neediness_score = 20;
      analysis = "Das wirkt recht bedürftig. Zügle deine Ungeduld und schreibe entspanntere Nachrichten.";
      response = "hey alles gut, bin nur etwas beschäftigt gerade";
      ghostRisk = "high";
    }
  }

  // Check General/Generic Triggers
  if (isGenericQuestion && historyLength > 0) {
    if (difficulty === "hard") {
      return {
        response: "",
        coaching: {
          score: 30,
          flow_score: 10,
          humor_score: 15,
          timing_score: 90,
          neediness_score: 60,
          analysis: `Ghosting! ${character?.name} hat keine Geduld für langweiligen Smalltalk. Solche Standardfragen langweilen sie sofort und sie antwortet nicht mehr.`,
          ghost_risk: "high",
          alternatives: [
            characterId === "emma" ? "spontan auf ein bier treffen statt smalltalk? 🍻" : "lass uns die üblichen fragen überspringen. was war dein letztes abenteuer?"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    } else if (difficulty === "medium") {
      // Medium characters respond dryly once, then ghost. Since this mock is stateless, we represent the dry warning.
      score = 45;
      flow_score = 30;
      humor_score = 20;
      analysis = `Sehr zäh. ${character?.name} reagiert auf Standardfragen extrem gelangweilt oder trocken. Ändere sofort das Thema, bevor sie dich ghostet!`;
      response = characterId === "sarah" ? "arbeiten. du?" : "joa passt schon. was treibst du?";
      ghostRisk = "high";
      alternatives = ["versuche eine spielerische neckerei oder gehe auf ein detail aus ihrer bio ein."];
    }
  }

  // 3. Character Specific Decision Tree
  if (characterId === "laura") {
    if (wordCount < 3) {
      score = 50;
      flow_score = 30;
      humor_score = 30;
      analysis = "Sehr kurze Antwort. Laura ist zwar nett, aber wenn du ihr kein Futter gibst, schläft das Gespräch ein.";
      response = "oki 🙂 was machst du so am wochenende?";
      alternatives = ["hey laura, ich liebe brunch auch! lass uns sonntag das neue café testen!"];
    } else if (hasDateQuestion) {
      if (historyLength < 3) {
        score = 60;
        flow_score = 50;
        timing_score = 30;
        analysis = "Der Date-Vorschlag kommt etwas zu früh. Tauscht euch erst noch 1-2 Nachrichten mehr aus, um Vertrauen aufzubauen.";
        response = "haha das geht aber schnell 😂 lass erst mal etwas schreiben, was machst du beruflich?";
        alternatives = ["ich bin totaler brunch-fan. was ist dein lieblingscafé in frankfurt?"];
      } else {
        score = 95;
        isDateAgreed = true;
        response = "ja voll gerne! samstag brunch klingt mega 🥐☕ das café im nordend ist super";
      }
    } else {
      response = "klingt super! bin meistens eher draußen im park oder im café unterwegs. bist du auch gerne draußen?";
    }
  } 
  
  else if (characterId === "sarah") {
    const isCreative = wordCount > 6 && (msg.includes("unpopulär") || msg.includes("kunst") || msg.includes("meinung") || msg.includes("design") || msg.includes("kaffee") || msg.includes("galerie") || msg.includes("bild"));
    
    if (isCreative) {
      score = 90;
      flow_score = 95;
      humor_score = 90;
      analysis = "Klasse! Du hast das kreative Bait aus ihrer Bio aufgegriffen. Sarah taut dadurch sichtlich auf.";
      response = "haha ok das ist wirklich speziell. kunst mag ich voll. arbeitest du auch kreativ?";
      alternatives = ["lass uns das bei einem kaffee vertiefen. wer macht den besten cappuccino?"];
    } else if (hasDateQuestion) {
      return {
        response: "",
        coaching: {
          score: 35,
          flow_score: 20,
          humor_score: 25,
          timing_score: 15,
          neediness_score: 40,
          analysis: "Sarah ghostet dich. Sie ist anspruchsvoll und will erst eine inhaltliche verbindung spüren. Ein verfrühter Date-Vorschlag wirkt auf sie plump.",
          ghost_risk: "high",
          alternatives: [
            "meine unpopulärste meinung: kaffee schwarz ist ein verbrechen. was sagst du zu deiner verteidigung? 😉",
            "deine bilder haben so einen coolen vibe. fotografierst du selbst? 🎨"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    } else {
      score = 50;
      flow_score = 40;
      response = "aha ok. cool.";
      ghostRisk = "high";
      analysis = "Ziemlich trocken. Sarah gelangweilt. Du musst sie herausfordern oder ein Kunst/Design-Thema ansprechen.";
    }
  } 
  
  else if (characterId === "emma") {
    // Emma is Hard. If she doesn't get a creative or slighly teasing reply, she ghosts.
    const isPlayful = msg.includes("techno") || msg.includes("club") || msg.includes("party") || msg.includes("bier") || msg.includes("kiosk") || msg.includes("rave") || wordCount > 5;
    
    if (isPlayful && !hasDateQuestion) {
      score = 85;
      flow_score = 90;
      humor_score = 85;
      analysis = "Sehr gut! Du hältst den Vibe locker und gehst auf ihre Wellenlänge ein. Weiter so.";
      response = "haha ja voll. was geht am wochenende bei dir? feierst du durch? 💃";
      alternatives = ["spontan ein bier am kiosk holen?"];
    } else if (hasDateQuestion) {
      if (historyLength < 3) {
        return {
          response: "",
          coaching: {
            score: 30,
            flow_score: 20,
            humor_score: 20,
            timing_score: 10,
            neediness_score: 40,
            analysis: "Emma hat dich geghostet. Sie mag es zwar spontan, aber ohne vorherigen Vibe wirkt die direkte Frage nach einem Treffen langweilig und plump.",
            ghost_risk: "high",
            alternatives: [
              "spontan ein bier am kiosk und schauen wer den besseren musikgeschmack hat? 🍻",
              "bin am wochenende bei einem gig. bist du techno-club oder open-air typ? 💃"
            ],
            is_date_agreed: false,
            is_ghosted: true
          }
        };
      } else {
        score = 95;
        isDateAgreed = true;
        response = "haha überzeugt! heute abend kiosk bier? 🍻 bin ab 20 uhr da";
      }
    } else {
      return {
        response: "",
        coaching: {
          score: 30,
          flow_score: 15,
          humor_score: 15,
          timing_score: 90,
          neediness_score: 60,
          analysis: "Emma hat dich geghostet. Sie hasst faden Smalltalk und langweilige Antworten. Dein Einstieg hatte zu wenig Pfiff.",
          ghost_risk: "high",
          alternatives: [
            "spontan ein bier am kiosk holen? 🍻",
            "ich wette mein musikgeschmack zieht dich ab. nenn mir deinen lieblings-dj! 😜"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    }
  } 
  
  else if (characterId === "lara") {
    const addressesDog = msg.includes("hund") || msg.includes("mami") || msg.includes("balou") || msg.includes("bellt");
    const isWitty = msg.includes("ironie") || msg.includes("sarkasmus") || msg.includes("ki") || msg.includes("unschuldig") || msg.includes("richter");

    if (addressesDog) {
      score = 90;
      flow_score = 95;
      humor_score = 90;
      analysis = "Hervorragend! Lara liebt ihren Hund Balou über alles. Damit triffst du voll ins Schwarze.";
      response = "haha okay balou findet dich ganz nett. was ist dein lieblingshund? 🐕";
    } else if (isWitty) {
      score = 85;
      flow_score = 90;
      humor_score = 90;
      analysis = "Guter Konter! Du spielst ihr humorvolles Spiel mit und zeigst Selbstbewusstsein.";
      response = "joa nicht schlecht gekontert 😉 balou schaut auch schon interessiert";
    } else {
      // If user is just standard "nice guy", Lara loses interest
      score = 55;
      flow_score = 45;
      analysis = "Etwas zu brav. Lara steht auf frechen Banter. Wenn du zu zahm antwortest, verliert sie die Lust.";
      response = "joa ganz nett. was machst du so am wochenende?";
      ghostRisk = "medium";
    }
  } 
  
  else if (characterId === "sofia") {
    // Sofia is extremely strict (Hard).
    const isStructured = wordCount > 6 && (msg.includes("consultant") || msg.includes("afterwork") || msg.includes("wein") || msg.includes("stress") || msg.includes("projekt") || msg.includes("buch") || msg.includes("entwicklung"));
    
    if (isStructured && !hasDateQuestion) {
      score = 85;
      flow_score = 85;
      humor_score = 70;
      analysis = "Gutes sprachliches Niveau. Du schreibst auf Augenhöhe und zeigst beruflichen Drive.";
      response = "klingt vernünftig. lass uns die woche auf ein glas wein treffen?";
    } else if (hasDateQuestion) {
      const isSpecific = msg.includes("donnerstag") || msg.includes("uhr") || msg.includes("afterwork") || msg.includes("fleming") || msg.includes("metropol");
      if (!isSpecific) {
        return {
          response: "",
          coaching: {
            score: 40,
            flow_score: 30,
            humor_score: 30,
            timing_score: 25,
            neediness_score: 50,
            analysis: "Sofia ghostet dich. Sie ist eine vielbeschäftigte Geschäftsfrau und hasst vage Vorschläge wie 'lass mal irgendwann treffen'. Sie erwartet konkrete Pläne.",
            ghost_risk: "high",
            alternatives: ["nach einem konkreten afterwork-drink am donnerstag um 19 uhr fragen."],
            is_date_agreed: false,
            is_ghosted: true
          }
        };
      } else {
        score = 95;
        isDateAgreed = true;
        response = "afterwork donnerstag 19 uhr im fleming's passt 🍷";
      }
    } else {
      return {
        response: "",
        coaching: {
          score: 35,
          flow_score: 20,
          humor_score: 20,
          timing_score: 90,
          neediness_score: 70,
          analysis: "Sofia hat dich geghostet. Deine Nachricht war ihr zu unstrukturiert oder hatte zu wenig inhaltliche Reife.",
          ghost_risk: "high",
          alternatives: [
            "ich kenne den consultant-stress. wie schaltest du nach projekt-ende am liebsten ab? 🍷",
            "lass uns den smalltalk überspringen: welches buch hat dich zuletzt inspiriert? 📚"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    }
  } 
  
  else if (characterId === "mia") {
    const isPlayful = msg.includes("techno") || msg.includes("party") || msg.includes("lol") || msg.includes("festival") || msg.includes("vibe") || msg.includes("safe") || msg.includes("iced latte");
    
    if (isPlayful) {
      score = 90;
      flow_score = 95;
      humor_score = 95;
      analysis = "Super! Du sprichst ihre Sprache und nutzt einen lockeren, jugendlichen Ton.";
      response = "omg ja techno ist liebe ✨ warst du schonmal im tanzhaus west?";
    } else if (hasDateQuestion) {
      if (historyLength < 2) {
        score = 55;
        flow_score = 60;
        timing_score = 30;
        analysis = "Etwas zu eilig für Mia. Baue erst ein kleines bisschen lockeren Vibe auf.";
        response = "haha idk geht voll schnell oder? 🤭 gehst du gerne feiern?";
      } else {
        score = 95;
        isDateAgreed = true;
        response = "aww ja lol let's go! iced latte am samstag? ☕✨";
      }
    } else {
      // Too formal/stiff triggers a warning, then ghosts on next. We represent the warning.
      score = 60;
      flow_score = 50;
      analysis = "Zu förmlich geschrieben. Mia fühlt sich wie bei einem Bewerbungsgespräch. Werde lockerer!";
      response = "uff ok klingt voll erwachsen lol. was machst du so am we?";
      ghostRisk = "medium";
    }
  } 
  
  else if (characterId === "katharina") {
    // Katharina is reifer and strictly hates player/hookup vibe.
    const isTooFast = msg.includes("heiß") || msg.includes("sexy") || msg.includes("baby") || msg.includes("haus") || msg.includes("schnell") || (hasDateQuestion && historyLength < 2);
    
    if (isTooFast) {
      return {
        response: "",
        coaching: {
          score: 20,
          flow_score: 10,
          humor_score: 10,
          timing_score: 15,
          neediness_score: 10,
          analysis: "Katharina hat dich sofort blockiert. Sie sucht eine ernsthafte Beziehung und verabscheut plumpe Anmachsprüche oder zu schnelles Drängen auf Treffen.",
          ghost_risk: "high",
          alternatives: [
            "deine bio klingt erfrischend ehrlich. welches buch liest du gerade? 📚",
            "ich gehe am wochenende wandern. was war deine letzte tour? 🏔️"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    } else if (hasDateQuestion) {
      if (historyLength < 3) {
        score = 55;
        flow_score = 50;
        timing_score = 25;
        analysis = "Für Katharina kommt der Vorschlag zu früh. Sie braucht etwas Zeit zum Kennenlernen.";
        response = "geht mir etwas zu schnell. was suchst du eigentlich hier? 😊";
      } else {
        score = 95;
        isDateAgreed = true;
        response = "ja treffe mich auch lieber persönlich. sonntag kaffee und spazieren? 🏔️☕";
      }
    } else {
      score = 85;
      flow_score = 85;
      analysis = "Sehr gut! Reife Kommunikation auf Augenhöhe. Katharina fühlt sich ernst genommen.";
      response = "klingt gut. mir ist ehrlichkeit voll wichtig. was machst du in deiner freizeit? 😊";
    }
  } 
  
  else if (characterId === "anna") {
    const isTravelMsg = msg.includes("reisen") || msg.includes("bali") || msg.includes("peru") || msg.includes("surfen") || msg.includes("welt") || msg.includes("trip");
    
    if (isTravelMsg) {
      score = 90;
      flow_score = 95;
      analysis = "Perfekt! Anna redet unglaublich gerne über ihre Reisen. Das ist das perfekte Thema.";
      response = "oh bali ist mein absoluter seelenort! 🌴 wo geht deine nächste reise hin? ✈️";
    } else if (hasDateQuestion) {
      if (historyLength < 2) {
        score = 60;
        flow_score = 70;
        timing_score = 30;
        analysis = "Anna ist zwar offen, aber auch sie will erst ein kurzes Gesprächsthema finden.";
        response = "klingt nett, aber warst du schon mal auf bali? 😉";
      } else {
        score = 95;
        isDateAgreed = true;
        response = "ja voll gerne! lass mal drinks trinken und reisestorys teilen 🍹✈️";
      }
    } else {
      response = "cool! bin gerade aus peru zurück. was war dein schönstes reiseland bisher? 😍";
    }
  }
  
  else if (characterId === "julia") {
    // Julia is Hard. She has NO tolerance for generic/lazy lines or bad grammar.
    // Winning angles: Brutalismus, Architektur, Beton, Bauhaus, Design.
    const isArchitectural = msg.includes("architekt") || msg.includes("brutalismus") || msg.includes("bauhaus") || msg.includes("beton") || msg.includes("linien") || msg.includes("design") || msg.includes("museum") || msg.includes("struktur");
    
    if (isArchitectural && !hasDateQuestion) {
      score = 90;
      flow_score = 90;
      humor_score = 80;
      analysis = "Hervorragend! Du zeigst echtes Interesse an ihrer Leidenschaft und sprichst sie auf Augenhöhe an. Julia schätzt diese intellektuelle Tiefe.";
      response = "brutalismus wird oft verkannt. die rohe ehrlichkeit des materials fasziniert mich. hast du ein lieblingsgebäude in ffm?";
      alternatives = ["wir könnten uns das neue museum ansehen und schauen ob wir rennen müssen 😉"];
    } else if (hasDateQuestion) {
      const isSpecific = msg.includes("donnerstag") || msg.includes("uhr") || msg.includes("museum") || msg.includes("kaffee") || msg.includes("café");
      if (historyLength < 3 || !isSpecific) {
        return {
          response: "",
          coaching: {
            score: 35,
            flow_score: 25,
            humor_score: 20,
            timing_score: 15,
            neediness_score: 50,
            analysis: "Julia hat dich geghostet. Sie verabscheut vage Verabredungen oder zu frühe Treffen ohne inhaltliche Substanz. Sie braucht präzise Vorschläge.",
            ghost_risk: "high",
            alternatives: [
              "brutalismus in frankfurt hat charakter. was ist dein lieblingsentwurf? 📐",
              "wie wäre es mit der ausstellung donnerstag um 18 uhr und danach einem kaffee?"
            ],
            is_date_agreed: false,
            is_ghosted: true
          }
        };
      } else {
        score = 95;
        isDateAgreed = true;
        response = "donnerstag 18 uhr ausstellung passt. danach kaffee. aber kein rennen.";
      }
    } else {
      return {
        response: "",
        coaching: {
          score: 25,
          flow_score: 10,
          humor_score: 10,
          timing_score: 90,
          neediness_score: 60,
          analysis: "Julia hat dich geghostet. Dein Beitrag hatte keinen Bezug zu ihren Interessen und bot keinerlei intellektuellen Anreiz.",
          ghost_risk: "high",
          alternatives: [
            "lassen wir den smalltalk ausfallen: brutalismus - faszinierend oder einfach nur hässlich? 📐",
            "deine brutalismus-referenz ist spannend. was ist dein lieblingsgebäude? 📐"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    }
  }

  else if (characterId === "elena") {
    // Elena is Hard. Intellektuell, reif.
    // Winning angles: literatur, buch, kunst, ausstellung, galerie, kuratorin, wein, theater.
    const isIntellectual = msg.includes("literatur") || msg.includes("buch") || msg.includes("kunst") || msg.includes("ausstellung") || msg.includes("galerie") || msg.includes("kurator") || msg.includes("philosoph") || msg.includes("wein") || msg.includes("lese");
    
    if (isIntellectual && !hasDateQuestion) {
      score = 88;
      flow_score = 90;
      humor_score = 75;
      analysis = "Sehr gut! Du wählst ein niveauvolles Gesprächsthema und zeigst echten Tiefgang. Elena schätzt diesen reifen Stil.";
      response = "kunst regt zum nachdenken an. wir kuratieren gerade zeitgenössische malerei. liest du auch gerne?";
      alternatives = ["wir sollten das gespräch bei einem glas rotwein in einer ruhigen bar fortsetzen."];
    } else if (hasDateQuestion) {
      if (historyLength < 3) {
        return {
          response: "",
          coaching: {
            score: 30,
            flow_score: 20,
            humor_score: 15,
            timing_score: 15,
            neediness_score: 40,
            analysis: "Elena hat dich geghostet. Sie sucht keinen schnellen Flirt, sondern echtes Kennenlernen. Ein verfrühter Vorschlag wirkt plump.",
            ghost_risk: "high",
            alternatives: [
              "welche ausstellung in frankfurt hat dich zuletzt wirklich bewegt? 🖼️",
              "ich mag literatur voll. liest du auch gerade etwas spannendes? 📚"
            ],
            is_date_agreed: false,
            is_ghosted: true
          }
        };
      } else {
        score = 95;
        isDateAgreed = true;
        response = "ein glas wein in der altstadt klingt nach einem guten plan. nächste woche dienstag?";
      }
    } else {
      return {
        response: "",
        coaching: {
          score: 30,
          flow_score: 15,
          humor_score: 15,
          timing_score: 90,
          neediness_score: 60,
          analysis: "Elena hat das Interesse verloren. Deine Nachricht war ihr zu oberflächlich oder hatte zu wenig sprachliches Niveau.",
          ghost_risk: "high",
          alternatives: [
            "zeitgenössische kunst spaltet oft die gemüter. was stellst du gerade aus? 🖼️",
            "ich trinke gerne trockenen rotwein. was ist dein lieblingsjahrgang? 🍷"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    }
  }

  else if (characterId === "amelie") {
    // Amelie is Hard. Edgy modedesign-studentin.
    // Winning angles: mode, design, berlin, pendeln, konformismus, alternativ, vintage, analog.
    const isEdgy = msg.includes("mode") || msg.includes("design") || msg.includes("berlin") || msg.includes("vintage") || msg.includes("analog") || msg.includes("konform") || msg.includes("provok");
    
    if (isEdgy && !hasDateQuestion) {
      score = 85;
      flow_score = 85;
      humor_score = 80;
      analysis = "Gut gekontert. Du gehst auf ihren unkonventionellen Lebensstil ein und zeigst Charakterstärke.";
      response = "berlin hat die rohe energie, frankfurt das geld. ich mag den spagat. was trägst du am liebsten?";
      alternatives = ["lass uns ein analoges fotoshooting in einem verlassenen hinterhof machen 😉"];
    } else if (hasDateQuestion) {
      if (historyLength < 3) {
        return {
          response: "",
          coaching: {
            score: 30,
            flow_score: 15,
            humor_score: 20,
            timing_score: 10,
            neediness_score: 40,
            analysis: "Amelie hat dich geghostet. Zu schnelles Fragen nach einem Date wirkt auf sie absolut mainstream und unkreativ.",
            ghost_risk: "high",
            alternatives: [
              "berlin vs frankfurt: wo lebt es sich kreativer? spielerische herausforderung gilt! 😉",
              "deine modedesigns sehen cool aus. woran arbeitest du gerade? ✂️"
            ],
            is_date_agreed: false,
            is_ghosted: true
          }
        };
      } else {
        score = 95;
        isDateAgreed = true;
        response = "klingt wild. let's meet. am wochenende bin ich wieder in frankfurt. café im bahnhofsviertel?";
      }
    } else {
      return {
        response: "",
        coaching: {
          score: 30,
          flow_score: 20,
          humor_score: 15,
          timing_score: 90,
          neediness_score: 60,
          analysis: "Amelie hat dich geghostet. Sie langweilt sich extrem schnell bei braven Mainstream-Antworten und geht direkt zum nächsten Match.",
          ghost_risk: "high",
          alternatives: [
            "lassen wir den mainstream-talk weg: was ist dein größter design-fail? 😉",
            "bestimmt trägst du heute nur vintage-schätze aus berlin, liege ich richtig? 💅"
          ],
          is_date_agreed: false,
          is_ghosted: true
        }
      };
    }
  }

  else if (characterId === "marie") {
    // Marie is Medium. Comedy, pizza, wette.
    // Winning angles: pizza, wette, comedy, stand-up, essen, witz, humor, herausforderung.
    const isFun = msg.includes("pizza") || msg.includes("wette") || msg.includes("comedy") || msg.includes("stand-up") || msg.includes("essen") || msg.includes("witz") || msg.includes("humor") || msg.includes("herausforderung");
    
    if (isFun && !hasDateQuestion) {
      score = 90;
      flow_score = 95;
      humor_score = 95;
      analysis = "Großartig! Marie liebt spielerische Herausforderungen und Pizza-Themen. Damit hast du sie voll gepackt.";
      response = "haha die wette gilt! ich schaffe locker 6 stücke napoli pizza. was setzt du dagegen?";
      alternatives = ["wer verliert, muss die pizza zahlen! samstag abend? 🍕🏆"];
    } else if (hasDateQuestion) {
      if (historyLength < 2) {
        score = 65;
        flow_score = 60;
        timing_score = 30;
        analysis = "Marie mag es zwar verspielt, aber ohne vorherigen Vibe oder eine konkrete Wette wirkt das Date-Fragen zu steif.";
        response = "nur wenn wir auch wetten wer mehr essen kann! was spielen wir? 😜";
        alternatives = [
          "ich wette, ich schaffe eine ganze pizza und du schaffst nicht mal die hälfte! deal? 🍕😜",
          "lass uns um das erste getränk wetten. wer gewinnt, darf aussuchen wohin es geht! 😉"
        ];
      } else {
        score = 95;
        isDateAgreed = true;
        response = "abgemacht! pizza-wette samstag abend um 20 uhr. ich hoffe du hast hunger! 🍕😜";
      }
    } else {
      score = 50;
      flow_score = 40;
      humor_score = 30;
      analysis = "Zu trocken für Marie. Sie sucht humorvolle Interaktion und mag keine sachlichen Konversationen wie im Bewerbungsgespräch.";
      response = "hm ok. erzähl mal lieber einen flachen witz oder nimmst du die pizza wette an?";
      ghostRisk = "medium";
    }
  }

  else {
    response = "hm ok erzähl mal mehr";
  }

  return {
    response,
    coaching: {
      score,
      flow_score,
      humor_score,
      timing_score,
      neediness_score,
      analysis,
      ghost_risk: ghostRisk,
      alternatives: alternatives.length > 0 ? alternatives : ["probiere es mit einer offenen frage passend zum charakter."],
      is_date_agreed: isDateAgreed,
      is_ghosted: isGhosted
    }
  };
}
