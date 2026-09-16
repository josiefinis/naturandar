import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenser",
  description: "Bild- och datakällor som används på sidan",
};

export default function ReferenserPage() {
  return (
    <div>
      <h1 className="font-display text-fluid-2xl text-accent-yellow">
        Referenser
      </h1>
    </div>
  );
}
