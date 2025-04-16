import { useLoaderData } from "react-router";
import type { Route } from "./+types/app";
import { ExecutionContext } from "~/contexts/execution";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const loadContext = context.get(ExecutionContext);
  const do_id =
    loadContext.cloudflare.env.TEST_DURABLE_OBJECT.idFromName("test-do");
  const DO = loadContext.cloudflare.env.TEST_DURABLE_OBJECT.get(do_id);
  const message = loadContext.cloudflare.env.VALUE_FROM_CLOUDFLARE;
  return {
    testDO: await DO.testMethod(),
    message,
  };
};

export default function AppIndex() {
  const { message, testDO } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{message}</h1>
      <p>{testDO}</p>
    </div>
  );
}
