import {
  unstable_createContext,
  type unstable_RouterContext,
} from "react-router";
import type { AppConfigArg } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/config-types";
import type { ShopifyApp } from "@shopify/shopify-app-remix/server";
import { ShopifyAppContext } from "~/contexts/shopifyApp";
import type { Route } from "../routes/+types/app";

export const ShopifyAuthContext: unstable_RouterContext<
  Awaited<ReturnType<ShopifyApp<AppConfigArg>["authenticate"]["admin"]>>
> =
  unstable_createContext<
    Awaited<ReturnType<ShopifyApp<AppConfigArg>["authenticate"]["admin"]>>
  >();

export const ShopifyAdminMiddleware: Route.unstable_MiddlewareFunction = async (
  { request, params, context },
  next
) => {
  const shopifyApp = context.get(ShopifyAppContext);
  context.set(ShopifyAuthContext, await shopifyApp.authenticate.admin(request));
  await next();
};
