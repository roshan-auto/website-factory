import type { Metadata } from "next";
import { HomePage } from "../components/hearth-and-bloom/home-page";

export const metadata: Metadata = {
  title: "Hearth & Bloom | Demo Fleet",
  description:
    "Cinematic coffee landing page demo hosted inside the Infynt demo fleet app.",
};

export default function HearthAndBloomPage() {
  return (
    <div className="theme-hearth">
      <HomePage />
    </div>
  );
}
