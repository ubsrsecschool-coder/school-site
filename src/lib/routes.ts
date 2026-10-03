import routesJson from "./routes.json";

export interface RouteMeta {
  path: string;
  label: string;
  nav: boolean;
  index: boolean;
  priority: number;
  title: string;
  description: string;
}

export const routes: RouteMeta[] = routesJson;

export const navRoutes = routes.filter((route) => route.nav);

export const routeMeta = (path: string): RouteMeta | undefined =>
  routes.find((route) => route.path === path);

export const notFoundMeta: Pick<RouteMeta, "title" | "description"> = {
  title: "Page not found | Uma Bharti Sr. Sec. School",
  description: "This page does not exist on the Uma Bharti Senior Secondary School website.",
};
