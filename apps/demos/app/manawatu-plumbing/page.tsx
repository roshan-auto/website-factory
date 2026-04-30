import type { Metadata } from "next";
import { ManawatuFlowDemo } from "@packages/sections";

export const metadata: Metadata = {
  title: "Manawatu Plumbing | Demo Fleet",
  description:
    "Premium service-business plumbing demo hosted inside the Infynt demo fleet app.",
};

export default function ManawatuPlumbingPage() {
  return (
    <div className="theme-manawatu">
      <ManawatuFlowDemo
        assetBase="/demos/manawatu-plumbing/images/manawatu-flow"
        backLinkHref="/"
        backLinkLabel="Back to demos"
      />
    </div>
  );
}
