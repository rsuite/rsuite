export type PageCard = {
  href: string;
  title: string;
  description: string;
};

export const homeCards: PageCard[] = [
  {
    href: "https://remix.run/docs",
    title: "Remix Docs",
    description: "Learn the Remix way: routes, loaders, actions, and deployments."
  },
  {
    href: "https://rsuitejs.com/",
    title: "RSuite",
    description: "A suite of React components with great default UX and theming."
  },
  {
    href: "https://vitejs.dev/",
    title: "Vite",
    description: "A modern build tool that provides a faster and leaner development experience."
  },
  {
    href: "https://github.com/rsuite/rsuite/tree/master/examples",
    title: "Examples",
    description: "Browse other RSuite examples in this repository."
  }
];

export const rsuiteCards: PageCard[] = [
  {
    href: "https://rsuitejs.com/components/overview/",
    title: "Components",
    description: "Explore the RSuite component library."
  },
  {
    href: "https://rsuitejs.com/guide/introduction/",
    title: "Guide",
    description: "Theming, styling, and usage patterns."
  },
  {
    href: "https://rsuitejs.com/resources/",
    title: "Resources",
    description: "Icons, templates and resources for building apps."
  },
  {
    href: "https://github.com/rsuite/rsuite",
    title: "GitHub",
    description: "View source code, issues, and contribute."
  }
];
