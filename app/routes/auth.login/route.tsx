import {
  Form,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import {
  Button,
  Card,
  FormLayout,
  Page,
  AppProvider as PolarisAppProvider,
  Text,
  TextField,
} from "@shopify/polaris";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import { useState } from "react";

import type { Route } from "./+types/route";
import { loginErrorMessage } from "./error.server";
import { ShopifyAppContext } from "~/contexts/shopifyApp";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const shopifyApp = context.get(ShopifyAppContext);
  const errors = loginErrorMessage(await shopifyApp.login(request));

  return { errors, polarisTranslations };
};

export const action = async ({ request, context }: Route.ActionArgs) => {
  const shopifyApp = context.get(ShopifyAppContext);
  const errors = loginErrorMessage(await shopifyApp.login(request));

  return {
    errors,
  };
};

export default function Auth() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;

  return (
    <PolarisAppProvider i18n={loaderData.polarisTranslations}>
      <Page>
        <Card>
          <Form method="post">
            <FormLayout>
              <Text variant="headingMd" as="h2">
                Log in
              </Text>
              <TextField
                type="text"
                name="shop"
                label="Shop domain"
                helpText="example.myshopify.com"
                value={shop}
                onChange={setShop}
                autoComplete="on"
                error={errors.shop}
              />
              <Button submit>Log in</Button>
            </FormLayout>
          </Form>
        </Card>
      </Page>
    </PolarisAppProvider>
  );
}
