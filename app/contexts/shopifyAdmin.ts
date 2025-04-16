import type { ShopifyApp } from "@shopify/shopify-app-remix/server";
import type { AppConfigArg } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/config-types";
import {
  unstable_createContext,
  type unstable_RouterContext,
} from "react-router";

export const ShopifyAdminContext: unstable_RouterContext<
  ShopifyApp<AppConfigArg>["authenticate"]["admin"]
> = unstable_createContext<ShopifyApp<AppConfigArg>["authenticate"]["admin"]>();
