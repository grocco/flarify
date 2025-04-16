import { ShopifyAppContext } from "~/contexts/shopifyApp";
import type { Route } from "../+types/root";
import { ApiVersion, shopifyApp } from "@shopify/shopify-app-remix/server";
import { ExecutionContext } from "~/contexts/execution";
import { KVSessionStorage } from "@shopify/shopify-app-session-storage-kv";

export const ShopifyAppMiddleware: Route.unstable_MiddlewareFunction = async (
  { request, params, context },
  next
) => {
  const loadContext = context.get(ExecutionContext);
  context.set(
    ShopifyAppContext,
    shopifyApp({
      apiKey: loadContext.cloudflare.env.SHOPIFY_API_KEY,
      apiSecretKey: loadContext.cloudflare.env.SHOPIFY_API_SECRET,
      scopes: loadContext.cloudflare.env.SCOPES?.split(","),
      appUrl: loadContext.cloudflare.env.SHOPIFY_APP_URL,
      isEmbeddedApp: true,
      apiVersion: ApiVersion.April25,
      sessionStorage: new KVSessionStorage(loadContext.cloudflare.env.SESSION),
      future: {
        unstable_newEmbeddedAuthStrategy: true,
        removeRest: true,
      },
    })
  );
  await next();
};
