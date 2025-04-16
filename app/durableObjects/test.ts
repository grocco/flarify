import { DurableObject } from "cloudflare:workers";

export class TestDurableObject extends DurableObject<Env> {
  protected initialized: boolean = false;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.initialized = true;
  }

  async testMethod() {
    return "test method called on durable object";
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    return new Response("OK", { status: 200 });
  }
}
