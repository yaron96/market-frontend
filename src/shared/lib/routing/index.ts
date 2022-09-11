import { RouteConfig } from "react-router-config";

interface Context {
  session: boolean;
}

type Guard = (currentRoute: RouteConfig, context: Context) => void;

export function compileGuards(
  routes: RouteConfig[],
  context: Context,
): RouteConfig[] {
  return routes
    .map((route) =>
      route.guards
        ? route.guards.reduce(
            (currentRoute: RouteConfig, guard: Guard) =>
              currentRoute ? guard(currentRoute, context) : undefined,
            route,
          )
        : route,
    )
    .filter(Boolean);
}