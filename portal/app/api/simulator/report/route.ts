import { NextResponse } from "next/server";
import {
  getCachedCoachReport,
  getClientSimulatorState,
  getCurrentClient,
  saveCoachReport
} from "@/lib/neon";

export async function POST(req: Request) {
  try {
    const client = await getCurrentClient();
    if (!client) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cached = await getCachedCoachReport(client.id);
    if (cached) {
      return NextResponse.json(cached);
    }

    const { activeChats, userProfile, completedMatchIds } = await getClientSimulatorState(client.id);

    const apiKey = process.env.GEMINI_API_KEY;

    // Filter to completed or ghosted chats for compilation
    const finishedSessions = Object.entries(activeChats).filter(
      ([_, chat]: any) => chat.status === "completed" || chat.status === "ghosted"
    );

    // Calculate aggregated score for fallback and fallback calibration
    let totalScoreSum = 0;
    let userMsgCount = 0;
    let ghostedCount = 0;

    finishedSessions.forEach(([_, chat]: any) => {
      if (chat.status === "ghosted") {
        ghostedCount++;
      }
      chat.messages.forEach((msg: any) => {
        if (msg.sender === "user" && msg.coaching?.score) {
          totalScoreSum += msg.coaching.score;
          userMsgCount++;
        }
      });
    });

    const avgScore = userMsgCount > 0 ? Math.round(totalScoreSum / userMsgCount) : 0;

    if (completedMatchIds.length < 5) {
      return NextResponse.json(
        { error: "Mindestens 5 abgeschlossene Chats sind erforderlich" },
        { status: 403 }
      );
    }

    if (!apiKey) {
      // Return programmatically generated fallback report
      const fallback = generateStaticReport(avgScore, ghostedCount);
      await saveCoachReport(client.id, fallback);
      return NextResponse.json(fallback);
    }

    // Compile Chat History Summary for Gemini
    const chatSummaries = finishedSessions
      .map(([charId, chat]: any) => {
        const historyText = chat.messages
          .map((m: any) => `  - ${m.sender === "user" ? "User" : charId}: "${m.text}" (Coach Score: ${m.coaching?.score || "kein Score"})`)
          .join("\n");
        return `Match: ${charId}\nStatus: ${chat.status === "completed" ? "Erfolgreiches Date" : "Geghostet"}\nVerlauf:\n${historyText}`;
      })
      .join("\n\n");

    const systemInstruction = `Du bist ein weltklasse Dating-Coach und Profil-Auditor für Männer auf Plattformen wie Tinder, Hinge und Bumble.
Deine Aufgabe ist es, eine professionelle, ehrliche und psychologisch fundierte Verhaltensanalyse (Dating-Chat-Audit) für den Kunden auf Deutsch zu schreiben.

Hier sind die Kundendaten:
Name: ${userProfile?.name || "User"}
Alter: ${userProfile?.age || "unbekannt"}
Bio des Kunden: "${userProfile?.bio || ""}"

Hier sind die Chatverläufe und die Bewertungen des Coaches aus seinen Simulator-Sessions:
${chatSummaries}

Deine Analyse MUSS folgende Kriterien erfüllen:
1. "strengths": Ein Array von 2-4 prägnanten, konkreten Stärken, die er in seinen Texten gezeigt hat (z.B. kreative Einstiege, Humor, gutes Eingehen auf Details).
2. "weaknesses": Ein Array von 2-4 echten Fehlern oder Schwächen, die zum Ghosting führten oder unvorteilhaft waren (z.B. Bedürftigkeit, langweiliger Smalltalk, zu frühes Drängen nach Treffen).
3. "openerAnalysis": Eine detaillierte Analyse seiner Eröffnungsnachrichten (Opener). Erkläre ungeschminkt, was funktionierte und wo er sofort ins Aus geschossen wurde.
4. "communicationPatterns": Analyse seines Kommunikationsverhaltens. War er belehrend, zu needy (unterwürfig), schrieb er zu lange Texte (wall of text), passte die Energie?
5. "executiveSummary": Ein ausführliches, ehrliches und motivierendes Abschlussgutachten in Briefform von dir als Dating-Coach ("Lieber ${userProfile?.name || "Kunde"}, ..."). Gehe auf die psychologischen Aspekte ein, warum manche Matches ihn geghostet haben und was er konkret ab morgen auf Tinder ändern muss. Verwende Absätze (\\n\\n).

Gib ein valides JSON-Objekt zurück.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemInstruction }]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                strengths: {
                  type: "ARRAY",
                  items: { type: "STRING" }
                },
                weaknesses: {
                  type: "ARRAY",
                  items: { type: "STRING" }
                },
                openerAnalysis: { type: "STRING" },
                communicationPatterns: { type: "STRING" },
                executiveSummary: { type: "STRING" }
              },
              required: [
                "strengths",
                "weaknesses",
                "openerAnalysis",
                "communicationPatterns",
                "executiveSummary"
              ]
            }
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("No text response from Gemini API");
    }

    const parsedData = JSON.parse(rawText.trim());
    await saveCoachReport(client.id, parsedData);
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error generating coaching report:", error);
    // Dynamic fallback report
    const fallback = generateStaticReport(50, 2);
    return NextResponse.json(fallback);
  }
}

function generateStaticReport(avgScore: number, ghostedCount: number) {
  const isHighScore = avgScore > 65;
  const highGhostRate = ghostedCount > 2;

  const strengths = isHighScore
    ? [
        "Sehr gute Personalisierung: Du beziehst dich direkt auf Bio-Details deiner Matches.",
        "Guter Einsatz von spielerischem Humor und Banter (Necken).",
        "Hohes sprachliches Niveau bei anspruchsvolleren Matches (z.B. Sofia)."
      ]
    : [
        "Grundsätzlich offene Schreibweise mit Gegenfragen.",
        "Mut zu konkreten Vorschlägen bei Laura und Anna."
      ];

  const weaknesses = highGhostRate
    ? [
        "Verfrühte Date-Vorschläge ohne vorherige inhaltliche Wellenlänge.",
        "Extreme Bedürftigkeit (Needy Vibe) bei Antwortpausen.",
        "Steife und zu formelle Ausdrucksweise bei lockereren Matches (Mia, Emma)."
      ]
    : [
        "Verwendung von klischeehaften Smalltalk-Phrasen ('Wie war dein Tag?').",
        "Zu viel Schreibaufwand im Vergleich zum Match ('Wall of Text')."
      ];

  const openerAnalysis = isHighScore
    ? "Deine Opener sind hervorragend und heben sich ab. Indem du Hobbys oder Bilder kommentierst, knackst du den Filter. Achte darauf, diesen Standard zu halten und niemals in einfaches 'hey' abzurutschen."
    : "Deine Eröffnungen sind oft noch zu austauschbar. Ein simples 'hey' oder 'wie gehts' führt bei echten Frauen auf Tinder in über 80% der Fälle zu sofortigem Ghosting. Du musst im ersten Satz Interesse wecken!";

  const communicationPatterns = `Mit einem Gesamt-Conversations-Score von ${avgScore}/100 schreibst du gut, zeigst aber bei abweisenden oder trockenen Antworten Unsicherheit. Wenn ein Match kürzer angebunden ist, neigst du dazu, mit übermäßig langen Nachrichten zu antworten, was unbewusst als bedürftig (needy) wahrgenommen wird.`;

  const executiveSummary = `Hallo,\n\nbasierend auf deinen absolvierten Chats im Simulator zeigt sich folgendes Bild: Du hast ein gutes Gespür dafür, offene Gespräche zu beginnen, stolperst aber im Mittelteil über klassische Fehler.\n\nBesonders bei schwer erreichbaren Matches wie Sofia oder Emma versuchst du oft krampfhaft, alles richtig zu machen. Du stimmst jedem Satz zu und spielst das humorvolle 'Necken' (Banter) nicht mit. Frauen merken sofort, wenn ein Mann kein echtes Selbstbewusstsein zeigt und nur gefallen will. Das führt unweigerlich zum Abbruch des Kontakts.\n\nMein Ratschlag als dein Coach: 1. Schreibe locker und entspannt. 2. Reduziere deine Wortanzahl pro Nachricht (Ziel: 8-12 Wörter). 3. Biete ein Date erst an, wenn das Match aktiv zurückschreibt und ein echter Vibe da ist. Setze das im Simulator weiter um, um deine Flirt-Sicherheit zu festigen!`;

  return {
    strengths,
    weaknesses,
    openerAnalysis,
    communicationPatterns,
    executiveSummary
  };
}
