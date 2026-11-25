import React from "react";
import { PageLayout } from "../components/PageLayout";
import { rsuiteCards } from "../data/cards";

export function meta() {
  return [{ title: "RSuite" }];
}

export default function RSuitePage() {
  return (
    <PageLayout
      codePath="app/routes/rsuite.tsx"
      cards={rsuiteCards}
    >
      <img src="/rsuite.svg" alt="React Suite Logo" width={120} height={120} />
    </PageLayout>
  );
}
