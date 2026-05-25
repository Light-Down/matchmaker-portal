export type PortalClient = {
  id: string;
  name: string;
  email: string;
  packageName: string;
  currentStep: number;
  nextAction: string;
  nextAppointment: string;
  consultationStatus?: "none" | "requested" | "scheduled" | "completed";
  consultationAt?: string | null;
  consultationNote?: string | null;
  shootingStatus?: "none" | "scheduled" | "completed";
  shootingAt?: string | null;
  shootingNote?: string | null;
};

export const demoClient: PortalClient = {
  id: "demo-max-schmidt",
  name: "Max Schmidt",
  email: "max.schmidt@example.com",
  packageName: "Match-Magnet",
  currentStep: 2,
  nextAction: "Onboarding beantworten",
  nextAppointment: "Vorgespräch noch nicht geplant",
  consultationStatus: "none",
  consultationAt: null,
  consultationNote: null,
  shootingStatus: "none",
  shootingAt: null,
  shootingNote: null
};

export function getInvitedEmails() {
  return (process.env.INVITED_CUSTOMER_EMAILS || demoClient.email)
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getDemoClientForEmail(email: string): PortalClient {
  const normalized = email.trim().toLowerCase();
  return {
    ...demoClient,
    email: normalized,
    name: normalized === demoClient.email ? demoClient.name : "Neuer Kunde"
  };
}
