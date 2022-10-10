declare module "react-helmet";

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  element: React.ReactNode;
}
