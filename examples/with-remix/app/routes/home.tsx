import React from "react";
import { PageLayout } from "../components/PageLayout";
import { homeCards } from "../data/cards";

export function meta() {
  return [
    { title: "RSuite + Remix" },
    { name: "description", content: "RSuite example running on Remix (React Router v7)" },
  ];
}

export default function Home() {
  return (
    <PageLayout
      codePath="app/routes/home.tsx"
      cards={homeCards}
    >
      <picture>
        <source srcSet="/remix-dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="/remix.svg" alt="Remix" width={240} height={40} />
      </picture>
      <img src="/rsuite.svg" alt="React Suite Logo" width={60} height={60} />
    </PageLayout>
  );
}
