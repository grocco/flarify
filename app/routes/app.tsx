import { AppProvider } from "@shopify/shopify-app-remix/react";
import { Link, Outlet, useLoaderData } from "react-router";
import { NavMenu, useAppBridge } from "~/shopify/app_bridge";
import type { Route } from "./+types/app";
import polarisCss from "@shopify/polaris/build/esm/styles.css?url";
import { links as rootLinks } from "~/root";
import { ExecutionContext } from "~/contexts/execution";
import { ShopifyAppMiddleware } from "~/middleware/shopifyApp";
import { ShopifyAdminMiddleware } from "~/middleware/shopifyAdmin";

export const unstable_middleware = [
  ShopifyAppMiddleware,
  ShopifyAdminMiddleware,
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const loadContext = context.get(ExecutionContext);
  const { SHOPIFY_API_KEY, SHOPIFY_APP_URL } = loadContext.cloudflare.env;
  return {
    apiKey: SHOPIFY_API_KEY,
    appUrl: SHOPIFY_APP_URL,
  };
};

export default function App() {
  useAppBridge();
  const { apiKey, appUrl } = useLoaderData<typeof loader>();
  return (
    <>
      {/* NOT SURE IF THIS IS NEEDED OR IS IT ALREADY PROVIDED BY APP_PROVIDER? */}
      <script
        dangerouslySetInnerHTML={{
          __html: /* javascript */ `
function processWebVitals(metrics) {
  const monitorUrl = "${appUrl}/shopify/web-vitals";
  const data = JSON.stringify(metrics);
  navigator.sendBeacon(monitorUrl, data);
}

// Register the callback
shopify.webVitals.onReport(processWebVitals);
					`,
        }}
        type="text/javascript"
      />
      <AppProvider isEmbeddedApp={true} apiKey={apiKey}>
        <NavMenu>
          <Link to="/app" rel="home">
            Home
          </Link>
        </NavMenu>
        <Outlet />
      </AppProvider>
    </>
  );
}

export const links: Route.LinksFunction = () => [
  ...rootLinks(),
  {
    rel: "preconnect",
    href: "https://cdn.shopify.com",
  },
  // { as: "script", href: APP_BRIDGE_URL, rel: "preload" },
  {
    href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css",
    precedence: "default",
    rel: "stylesheet",
  },
  { href: polarisCss, precedence: "high", rel: "stylesheet" },
];
