import type { AppLoadContext } from "react-router";
import { createRequestHandler, unstable_createContext } from "react-router";
import { ExecutionContext } from "~/contexts/execution";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
  export interface Future {
    unstable_viteEnvironmentApi: true;
    unstable_middleware: true;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const map = new Map();
    map.set(ExecutionContext, {
      cloudflare: {
        env,
        ctx,
      },
    });
    return requestHandler(request, map);
  },
} satisfies ExportedHandler<Env>;

export { TestDurableObject } from "app/durableObjects/test";
