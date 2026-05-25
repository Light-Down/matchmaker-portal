import { redirect } from "next/navigation";
import { getCurrentClient, markConsultationRequested } from "@/lib/neon";

const whatsappNumber = "4915151941586";
const whatsappMessage =
  "Hi Marko, mein Onboarding ist ausgefüllt. Lass uns bitte das Vorgespräch planen.";

export async function GET() {
  const client = await getCurrentClient();

  if (!client) {
    redirect("/sign-in");
  }

  await markConsultationRequested(client.id);

  redirect(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  );
}
