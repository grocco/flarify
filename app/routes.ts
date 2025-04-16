import { type RouteConfig, index } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
  // index("routes/home.tsx")
  ...(await flatRoutes()),
] satisfies RouteConfig;
