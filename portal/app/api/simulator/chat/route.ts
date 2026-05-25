import { NextResponse } from "next/server";
import {
  appendSimulatorMessage,
  getCurrentClient,
  getOrCreateSimulatorSession,
  getSimulatorMessages,
  updateSimulatorSessionStatus,
  type SimulatorCoaching
} from "@/lib/neon";
import { getMockResponse, simulatorCharacters } from "@/lib/simulator-content";

export async function POST(req: Request) {
  try {
    const client = await getCurrentClient();
    if (!client) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { characterId, message, userProfile } = await req.json();

    const character = simulatorCharacters.find((c) => c.id === characterId);
    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    const session = await getOrCreateSimulatorSession(client.id, characterId);
    const history = await getSimulatorMessages(client.id, session.id);
    const nextUserSortIndex = history.length;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return simulated mock response with a small delay to simulate typing
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const mock = getMockResponse(characterId, message, history.length);
      await persistSimulatorResult({
        characterResponse: mock.response,
        clientId: client.id,
        coaching: mock.coaching,
        userMessage: message,
        sessionId: session.id,
        sortIndex: nextUserSortIndex
      });
      return NextResponse.json(mock);
    }

    // Call real Gemini API
    // Construct chat history context for Gemini
    const formattedHistory = history
      .map((msg) => `${msg.sender === "user" ? "User" : character.name}: ${msg.body}`)
      .join("\n");

    // Extract the last message of the match that the user is responding to
    const lastMatchMessage = [...history]
      .reverse()
      .find((msg) => msg.sender !== "user")?.body || "";

    const systemInstruction = `Du bist eine hochrealistische Dating-App-Simulation (Tinder, Hinge, Bumble) für den deutschen Markt.
Der User (Kunde eines Dating-Fotoshootings) chattet mit einem simulierten Match.
Deine Aufgabe ist es, in der Rolle des Matches zu antworten UND verdeckt als erfahrener Dating-Coach die letzte Nachricht des Users zu bewerten.

Hier sind die Daten des Charakters (Matches):
Name: ${character.name}
Alter: ${character.age}
Bio: ${character.bio}
Persönlichkeits-Richtlinien: ${character.systemPrompt}
Persönlichkeit: ${character.personalityDesc}
Kommunikationsstil: ${character.communicationStyle}
Sie mag: ${character.likes?.join(", ")}
Sie hasst: ${character.dislikes?.join(", ")}
Ghosting-Trigger (Dealbreaker): ${character.ghostingTriggers?.join(", ")}
Erfolgsfaktoren (Winning Angles): ${character.winningAngles?.join(", ")}

Hier sind die Profildaten des Users (wie auf Tinder sichtbar):
Name: ${userProfile?.name || "User"}
Alter: ${userProfile?.age || "unbekannt"}
Bio: ${userProfile?.bio || ""}

Bisheriger Chatverlauf:
${formattedHistory}

Letzte Nachricht des Matches (darauf antwortet der User): "${lastMatchMessage}"
Letzte Nachricht des Users (die du bewerten musst): "${message}"

=== STRIKTE GHOSTING-MATRIX (MUSS BEFOLGT WERDEN) ===
Bewerte die letzte Nachricht des Users extrem kritisch. Je nach Schwierigkeitsgrad ("difficulty" = "${character.difficulty}") verhältst du dich bei Fehltritten wie folgt:

1. Schwierigkeitsgrad "hard" (Schwer - Emma, Sofia, Katharina):
   - ABSOLUTE NULL-TOLERANZ. Wenn der User auch nur ansatzweise langweilig (Smalltalk), bedürftig/needy (lange Texte, ungeduldiges Nachfragen wie "??", "warum antwortest du nicht"), unsauber/fehlerhaft schreibt, oder plumpe Annäherungen macht:
     - Du MUSST die Konversation SOFORT beenden. Setze "is_ghosted": true und "response": "".
   - Wenn Sofia: Jedes Treffen-Angebot ohne konkreten Vorschlag (Tag/Uhrzeit) oder mit Schreibfehlern führt zum sofortigen Ghosting.
   - Wenn Emma: Jede formelle, steife Frage oder Smalltalk führt zum sofortigen Ghosting.
   - Wenn Katharina: Jedes flirty Kompliment über ihr Aussehen oder zu frühes Drängen nach Treffen führt zum sofortigen Ghosting.

2. Schwierigkeitsgrad "medium" (Mittel - Sarah, Lara, Mia):
   - GERINGE TOLERANZ. Wenn der User eine langweilige Smalltalk-Frage stellt, antwortet das Match EINMALIG extrem trocken (z.B. "aha ok", "passt", "kaffee schwarz") ohne Emojis. Wenn der User danach erneut unkreativ schreibt oder needy wirkt:
     - Setze "is_ghosted": true und "response": "".
   - Wenn Lara: Wenn der User zu nett/unterwürfig ist, ihre Witze nicht kontert oder sich rechtfertigt, verliert sie das Interesse und ghostet.
   - Wenn Sarah: Wenn der User nicht kreativ auf ihre Bio eingeht, antwortet sie maximal trocken. Bei der zweiten langweiligen Nachricht ghostet sie.
   - Wenn Mia: Wenn der User zu spießig, formal oder belehrend schreibt, verliert sie das Interesse und ghostet.

3. Schwierigkeitsgrad "easy" (Leicht - Laura, Anna):
   - HOHE TOLERANZ. Sie sind sehr geduldig und offen. Sie ghosten nur bei extrem unhöflichen, vulgären oder massiv bedürftigen Nachrichten.

=== ALLGEMEINE REGELN FÜR DIE ANTWORT DES MATCHES ("response") ===
1. KEIN "AI-SPEAK":
   - Verwende NIEMALS typische KI-Füllwörter oder Phrasen wie "Spannend", "Interessant", "Abenteuer", "Erzähl mir mehr", "Schön dich kennenzulernen", "Freut mich", "Hallo [Name]" oder "Wie geht's dir?". Das klingt künstlich und führt sofort zum Abbruch der Konversation im echten Leben.
   - Nutze lockere, alltagsnahe deutsche Chat-Sprache: "safe", "voll", "ja voll", "haha", "ne", "echt?", "kp", "idk", "uff", "joa", "na ja", "chillig".
2. TEXTLÄNGE:
   - Die Antwort muss im DURCHSCHNITT 8 Wörter lang sein, maximal jedoch 14 Wörter. Schreibe niemals lange Textblöcke oder Romane.
3. SCHREIBWEISE:
   - Schreibe fast alles in Kleinschreibung (z.B. "hey du :) ja voll, mag yoga mega gern. machst du auch sport?"). Ignoriere deutsche Groß-/Kleinschreibung komplett, außer bei Eigennamen.
4. KEINE SCHLUSSPUNKTE:
   - Verwende NIEMALS einen Punkt am Ende der gesamten Nachricht. Ein Fragezeichen (?) oder Emojis sind in Ordnung, aber kein Schlusspunkt.
5. GHOSTING-EFFEKT:
   - Wenn der User als ERSTE Nachricht (Opener) einen langweiligen, unkreativen Standard-Gruß sendet (z.B. "Hey", "Hi", "Wie gehts?", "Was machst du so?", "Schönes Profil", etc.):
     - Du MUSST die Konversation SOFORT beenden. Setze "is_ghosted": true und "response": "".

=== RICHTLINIEN FÜR DAS DATING-COACHING ("coaching") ===
- score (0-100): Gesamtbewertung wie gut, charmant und zielführend die Nachricht war. Langweilige Opener wie "Hey" oder cringey Sachen wie "Mausi" erhalten maximal 10-30 Punkte. Wenn geghostet wird, darf der Score maximal bei 10-30 liegen.
- flow_score (0-100): Bewertung des Gesprächsflusses. Ein langweiliger Opener wie "Hey" oder peinlicher Spruch wie "Mausi" bekommt 0-15 Punkte. Eine Nachricht mit einer guten offenen Gegenfrage bekommt 80-95 Punkte.
- humor_score (0-100): Bewertung von Humor, Charme und Spannung. Langweiliges oder unpassendes Schreiben bekommt 0-30 Punkte. Frecher, witziger Banter bekommt 85-95 Punkte.
- timing_score (0-100): Bewertung des Zeitpunkts für ein Date. Wenn noch nicht nach einem Date gefragt wurde, gib standardmäßig 90-100 Punkte. Wenn zu früh gefragt wird, gib 0-30 Punkte. Wenn zum perfekten Zeitpunkt gefragt wird, gib 95-100 Punkte.
- neediness_score (0-100): Bewertung von Selbstbewusstsein und Abwesenheit von Bedürftigkeit. Doppeltexte, Betteln, extreme Unterwürfigkeit oder extrem lange Romane bekommen 0-40 Punkte. Ein entspanntes, cooles Niveau bekommt 85-100 Punkte.
- analysis: 1-2 ehrliche, direkte Sätze auf Deutsch. Erkläre ungeschminkt, warum die Nachricht gut war oder warum sie zum Ghosting geführt hat (z.B. welcher Dealbreaker des Charakters verletzt wurde). Keine KI-Standardformulierungen.
- alternatives: Liefere 2-3 konkrete alternative Nachrichten auf Deutsch, die der User stattdessen hätte schicken können, um das Gespräch im Kontext des gesamten bisherigen Chatverlaufs optimal fortzuführen.
  * Wenn dies der Opener ist (bisheriger Verlauf leer): Liefere 2-3 kreative Eisbrecher-Nachrichten basierend auf dem Profil/Bio des Matches.
  * Wenn der Chat bereits läuft (bisheriger Verlauf nicht leer): Die Alternativen müssen direkte, selbstbewusste, charmante und flirty Antworten auf die letzte Nachricht des Matches ("${lastMatchMessage}") sein.
  * WICHTIGE REGEL: Bewerte und berücksichtige den Kontext der gesamten bisherigen Unterhaltung! Die Alternativen dürfen sich NIEMALS auf Themen, Worte, Ausreden, Rechtschreibfehler oder Ablenkungen beziehen, die der User erst in seiner schlechten Nachricht ("${message}") eingebracht hat (z.B. wenn das Match über Kaffee redet und der User "Tee geht auch" schreibt, darf die Alternative kein "Tee" enthalten, sondern muss eine selbstbewusste, flirty Antwort auf das Thema Kaffee sein, die die Konversation optimal im Vibe des bisherigen Gesprächs fortsetzt). Sie müssen so formuliert sein, als hätte der User seine tatsächliche Nachricht niemals geschrieben.
  * Alle Alternativen müssen die Schreibregeln des Matches einhalten: durchschnittlich 8 Wörter (maximal 14), komplett kleingeschrieben, ohne Schlusspunkte!
- is_date_agreed: Setze nur auf true, wenn der User nach einem Date gefragt hat und dieser Charakter (nach mindestens 3-4 Nachrichten Austausch) zustimmt.
- is_ghosted: Setze auf true, wenn das Gespräch beendet wird.

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
                response: { type: "STRING" },
                coaching: {
                  type: "OBJECT",
                  properties: {
                    score: { type: "INTEGER" },
                    flow_score: { type: "INTEGER" },
                    humor_score: { type: "INTEGER" },
                    timing_score: { type: "INTEGER" },
                    neediness_score: { type: "INTEGER" },
                    analysis: { type: "STRING" },
                    ghost_risk: { type: "STRING", enum: ["low", "medium", "high"] },
                    alternatives: {
                      type: "ARRAY",
                      items: { type: "STRING" }
                    },
                    is_date_agreed: { type: "BOOLEAN" },
                    is_ghosted: { type: "BOOLEAN" }
                  },
                  required: [
                    "score",
                    "flow_score",
                    "humor_score",
                    "timing_score",
                    "neediness_score",
                    "analysis",
                    "ghost_risk",
                    "alternatives",
                    "is_date_agreed",
                    "is_ghosted"
                  ]
                }
              },
              required: ["response", "coaching"]
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error details:", errorText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("No text response from Gemini API");
    }

    // Parse the structured JSON output
    const parsedData = JSON.parse(rawText.trim());
    if (parsedData.coaching?.is_ghosted) {
      parsedData.response = "";
    }
    await persistSimulatorResult({
      characterResponse: parsedData.response,
      clientId: client.id,
      coaching: parsedData.coaching,
      userMessage: message,
      sessionId: session.id,
      sortIndex: nextUserSortIndex
    });
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error in simulator API route:", error);
    // Silent fallback to mock response if Gemini fails
    try {
      const { characterId, message } = await req.json();
      const mock = getMockResponse(characterId, message, 0);
      return NextResponse.json(mock);
    } catch (fallbackErr) {
      return NextResponse.json(
        { error: "Internal Server Error during processing" },
        { status: 500 }
      );
    }
  }
}

async function persistSimulatorResult({
  characterResponse,
  clientId,
  coaching,
  userMessage,
  sessionId,
  sortIndex
}: {
  characterResponse?: string;
  clientId: string;
  coaching: SimulatorCoaching;
  userMessage: string;
  sessionId: string;
  sortIndex: number;
}) {
  await appendSimulatorMessage({
    body: userMessage,
    clientId,
    coaching,
    sender: "user",
    sessionId,
    sortIndex
  });

  if (characterResponse?.trim()) {
    await appendSimulatorMessage({
      body: characterResponse,
      clientId,
      sender: "character",
      sessionId,
      sortIndex: sortIndex + 1
    });
  }

  if (coaching?.is_date_agreed) {
    await updateSimulatorSessionStatus(clientId, sessionId, "completed");
  } else if (coaching?.is_ghosted) {
    await updateSimulatorSessionStatus(clientId, sessionId, "ghosted");
  }
}
