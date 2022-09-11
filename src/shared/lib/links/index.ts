import { paths } from "shared/lib/paths";

interface links {
  title: string;
  path: string;
}

export const headerLinks: links[] = [
  {
    title: "How we work",
    path: paths.home(),
  },
  {
    title: "The science",
    path: paths.home(),
  },
  {
    title: "Plans",
    path: paths.home(),
  },
];

export const footerLinks: links[] = [
  {
    title: "About",
    path: paths.home(),
  },
  {
    title: "Contacts",
    path: paths.home(),
  },
];

