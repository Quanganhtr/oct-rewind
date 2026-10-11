import type { Metadata } from "next";
import { HandoffDeck } from "@/components/handoff/HandoffDeck";

export const metadata: Metadata = {
  title: "Rewind 2026 · Dev handoff",
  description: "Motion and interaction spec for the Rewind 2026 prototype",
};

export default function HandoffPage() {
  return <HandoffDeck />;
}
