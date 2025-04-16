import { useLoaderData } from "react-router";
import { ShopifyAdminMiddleware } from "~/middleware/shopifyAdmin";
import { ShopifyAppMiddleware } from "~/middleware/shopifyApp";
import type { Route } from "../+types/root";

export const unstable_middleware = [ShopifyAdminMiddleware];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  return {
    message: "Hello from the loader!",
  };
};
export default function App() {
  const { message } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
