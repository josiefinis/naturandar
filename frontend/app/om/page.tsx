import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om sidan",
  description: "Om sidan för naturandar",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="font-display text-fluid-2xl text-accent-yellow">Om</h1>
    </div>
  );
}
