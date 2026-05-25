"use client";

import { useEffect, useState } from "react";
import ProfileSetup from "./profile-setup";
import MatchBoard from "./match-board";
import ChatArena, { type ChatMessage } from "./chat-arena";
import SessionReport from "./session-report";
import { simulatorCharacters } from "@/lib/simulator-content";

interface SimulatorViewProps {
  clientName: string;
  activeChats: Record<
    string,
    {
      messages: ChatMessage[];
      status: "active" | "completed" | "ghosted";
    }
  >;
  setActiveChats: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          messages: ChatMessage[];
          status: "active" | "completed" | "ghosted";
        }
      >
    >
  >;
  onResetScenario: (characterId: string) => void;
  onSaveProfile: (profile: { name: string; age: number; bio: string }) => void;
  userProfile: { name: string; age: number; bio: string } | null;
  setUserProfile: (profile: { name: string; age: number; bio: string } | null) => void;
  onRegisterFinishedRun: (characterId: string, outcome: "date" | "ghosted") => void;
}

export default function SimulatorView({
  clientName,
  activeChats,
  onResetScenario,
  onSaveProfile,
  setActiveChats,
  userProfile,
  setUserProfile,
  onRegisterFinishedRun
}: SimulatorViewProps) {
  const [currentScreen, setCurrentScreen] = useState<"setup" | "dashboard" | "chat" | "report">("dashboard");
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Go straight to setup if no profile exists
  useEffect(() => {
    if (!userProfile) {
      setCurrentScreen("setup");
    }
  }, [userProfile]);

  // Calculations for stats dashboard
  const getStats = () => {
    let totalScoreSum = 0;
    let userMsgCount = 0;
    let ghostedCount = 0;

    Object.entries(activeChats).forEach(([_, chat]) => {
      if (chat.status === "ghosted") {
        ghostedCount++;
      }
      chat.messages.forEach((msg) => {
        if (msg.sender === "user" && msg.coaching?.score) {
          totalScoreSum += msg.coaching.score;
          userMsgCount++;
        }
      });
    });

    const avgScore = userMsgCount > 0 ? Math.round(totalScoreSum / userMsgCount) : 0;
    
    let datePotential = "Mittel";
    if (avgScore > 80) datePotential = "Sehr hoch";
    else if (avgScore > 65) datePotential = "Hoch";
    else if (avgScore > 45) datePotential = "Mittel";
    else if (avgScore > 0) datePotential = "Niedrig";

    let confidence = 0;
    if (userMsgCount > 0) {
      confidence = Math.min(100, Math.round(avgScore * 0.7 + userMsgCount * 3));
    }

    let ghostRisk = "Gering";
    if (ghostedCount > 0 || (avgScore > 0 && avgScore < 50)) {
      ghostRisk = "Hoch";
    } else if (avgScore > 0 && avgScore < 70) {
      ghostRisk = "Mittel";
    }

    return {
      avgScore,
      datePotential,
      confidence,
      ghostRisk
    };
  };

  const handleSaveProfile = (profile: { name: string; age: number; bio: string }) => {
    setUserProfile(profile);
    onSaveProfile(profile);
    setCurrentScreen("dashboard");
  };

  const handleSelectCharacter = (characterId: string) => {
    setSelectedCharacterId(characterId);
    
    // Initialize chat if it doesn't exist (starts completely empty)
    if (!activeChats[characterId]) {
      setActiveChats((prev) => ({
        ...prev,
        [characterId]: {
          messages: [],
          status: "active"
        }
      }));
    }
    
    // Check if the chat is already ended to show report directly
    const chat = activeChats[characterId];
    if (chat && (chat.status === "completed" || chat.status === "ghosted")) {
      setCurrentScreen("report");
    } else {
      setCurrentScreen("chat");
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedCharacterId) return;

    const currentChat = activeChats[selectedCharacterId];
    if (!currentChat) return;

    const timeStr = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

    // 1. Create and append User Message
    const userMsgId = `msg-user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: timeStr
    };

    const updatedMessages = [...currentChat.messages, userMsg];

    setActiveChats((prev) => ({
      ...prev,
      [selectedCharacterId]: {
        ...prev[selectedCharacterId],
        messages: updatedMessages
      }
    }));

    setIsTyping(true);

    try {
      // 2. Fetch API for response & coaching
      const response = await fetch("/api/simulator/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          characterId: selectedCharacterId,
          message: text,
          history: currentChat.messages,
          userProfile
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message to simulator API");
      }

      const data = await response.json();

      // 3. Append character response (only if not empty) and coaching results
      const hasResponse = data.response && data.response.trim().length > 0;
      const botMsg: ChatMessage | null = hasResponse ? {
        id: `msg-bot-${Date.now()}`,
        sender: "character",
        text: data.response,
        timestamp: timeStr
      } : null;

      // Attach coaching to the user's message we just sent
      const coachingInfo = data.coaching;
      const updatedMessagesWithBot = updatedMessages.map((m) => {
        if (m.id === userMsgId) {
          return { ...m, coaching: coachingInfo };
        }
        return m;
      });

      let nextStatus: "active" | "completed" | "ghosted" = "active";
      if (coachingInfo?.is_date_agreed) {
        nextStatus = "completed";
      } else if (coachingInfo?.is_ghosted) {
        nextStatus = "ghosted";
      }

      if (currentChat.status === "active") {
        if (nextStatus === "completed") {
          onRegisterFinishedRun(selectedCharacterId, "date");
        } else if (nextStatus === "ghosted") {
          onRegisterFinishedRun(selectedCharacterId, "ghosted");
        }
      }

      setActiveChats((prev) => ({
        ...prev,
        [selectedCharacterId]: {
          messages: botMsg ? [...updatedMessagesWithBot, botMsg] : updatedMessagesWithBot,
          status: nextStatus
        }
      }));

    } catch (e) {
      console.error("Error in messaging simulator flow:", e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRestartScenario = () => {
    if (!selectedCharacterId) return;

    // Reset to an empty conversation history
    setActiveChats((prev) => ({
      ...prev,
      [selectedCharacterId]: {
        messages: [],
        status: "active"
      }
    }));
    onResetScenario(selectedCharacterId);

    setCurrentScreen("chat");
  };

  const getReportData = () => {
    if (!selectedCharacterId) return null;
    const chat = activeChats[selectedCharacterId];
    const character = simulatorCharacters.find((c) => c.id === selectedCharacterId);

    if (!chat || !character) return null;

    // Compile average stats for this session
    let scoreSum = 0;
    let flowSum = 0;
    let humorSum = 0;
    let timingSum = 0;
    let userMsgCount = 0;

    chat.messages.forEach((m) => {
      if (m.sender === "user" && m.coaching) {
        scoreSum += m.coaching.score;
        flowSum += m.coaching.flow_score !== undefined ? m.coaching.flow_score : m.coaching.score;
        humorSum += m.coaching.humor_score !== undefined ? m.coaching.humor_score : m.coaching.score;
        timingSum += m.coaching.timing_score !== undefined ? m.coaching.timing_score : 100;
        userMsgCount++;
      }
    });

    let total = userMsgCount > 0 ? Math.round(scoreSum / userMsgCount) : 0;
    let flow = userMsgCount > 0 ? Math.round(flowSum / userMsgCount) : 0;
    let humor = userMsgCount > 0 ? Math.round(humorSum / userMsgCount) : 0;
    let timing = userMsgCount > 0 ? Math.round(timingSum / userMsgCount) : 0;

    if (chat.status === "ghosted") {
      timing = Math.min(15, timing);
      flow = Math.min(30, flow);
    }

    // Normalize bounds
    const limit = (val: number) => Math.max(0, Math.min(100, val));

    return {
      character,
      scores: {
        total: limit(total),
        flow: limit(flow),
        humor: limit(humor),
        timing: limit(timing)
      },
      messages: chat.messages,
      isDateAgreed: chat.status === "completed"
    };
  };

  const getActiveChatsSummary = () => {
    const summary: Record<string, { lastMessage?: string; status: "active" | "completed" | "ghosted" }> = {};
    Object.entries(activeChats).forEach(([charId, chat]) => {
      const lastMsg = chat.messages[chat.messages.length - 1]?.text;
      summary[charId] = {
        lastMessage: lastMsg,
        status: chat.status
      };
    });
    return summary;
  };


  return (
    <div>
      {currentScreen === "setup" && (
        <ProfileSetup initialName={clientName} onSave={handleSaveProfile} />
      )}

      {currentScreen === "dashboard" && (
        <MatchBoard
          stats={getStats()}
          activeChats={getActiveChatsSummary()}
          onSelectCharacter={handleSelectCharacter}
          userProfile={userProfile}
          onEditProfile={() => setCurrentScreen("setup")}
        />
      )}

      {currentScreen === "chat" && selectedCharacterId && activeChats[selectedCharacterId] && (
        <ChatArena
          character={simulatorCharacters.find((c) => c.id === selectedCharacterId)!}
          messages={activeChats[selectedCharacterId].messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onBack={() => setCurrentScreen("dashboard")}
          onViewReport={() => setCurrentScreen("report")}
          onResetChat={handleRestartScenario}
        />
      )}

      {currentScreen === "report" && selectedCharacterId && (
        <SessionReport
          {...getReportData()!}
          onRestart={handleRestartScenario}
          onBackToBoard={() => setCurrentScreen("dashboard")}
        />
      )}
    </div>
  );
}
