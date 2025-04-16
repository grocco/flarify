import {
  Form,
  redirect,
  useLoaderData,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "./+types/route";
import { ExecutionContext } from "~/contexts/execution";
import { ShopifyAppMiddleware } from "~/middleware/shopifyApp";
import { ShopifyAppContext } from "~/contexts/shopifyApp";
import styles from "./styles.module.css";

export const unstable_middleware = [ShopifyAppMiddleware];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ request, context }: Route.LoaderArgs) {
  const shopifyApp = context.get(ShopifyAppContext);
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  const login = shopifyApp.login;
  return {
    showForm: Boolean(login),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { showForm } = useLoaderData<typeof loader>();
  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>A short heading about [your app]</h1>
        <p className={styles.text}>
          A tagline about [your app] that describes your value proposition.
        </p>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Shop domain</span>
              <input className={styles.input} type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              Log in
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
        </ul>
      </div>
    </div>
  );
}
