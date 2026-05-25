import { redirect } from "next/navigation";
import { getClientPortalState, getClientSimulatorState, getCurrentClient, toPortalClient } from "@/lib/neon";
import PortalDashboard from "./portal-dashboard";

export const dynamic = "force-dynamic";

export default async function CustomerPage() {
  const client = await getCurrentClient();

  if (!client) {
    redirect("/sign-in");
  }

  const [portalState, simulatorState] = await Promise.all([
    getClientPortalState(client.id),
    getClientSimulatorState(client.id)
  ]);

  return (
    <PortalDashboard
      client={toPortalClient(client)}
      initialSimulatorState={simulatorState}
      initialState={portalState}
    />
  );
}
