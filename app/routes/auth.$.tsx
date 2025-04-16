import { useLoaderData } from "react-router";
import { ShopifyAdminMiddleware } from "~/middleware/shopifyAdmin";

export const unstable_middleware = [ShopifyAdminMiddleware];
