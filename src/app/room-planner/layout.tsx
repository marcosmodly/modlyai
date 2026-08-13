import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Planner | ModlyAI",
  description:
    "Upload a room photo and get AI-powered furniture fit guidance based on your real catalog and room dimensions.",
  alternates: { canonical: "/room-planner" },
};

export default function RoomPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
