import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

const tunnel_port = process.env["CLOUDFLARE_TUNNEL_PORT"];
const tunnel_url = new URL(
  process.env["CLOUDFLARE_TUNNEL_URL"] || "http://localhost"
).hostname;

const server = {
  port: parseInt(tunnel_port || "3000"),
  allowedHosts: [tunnel_url],
};
console.log({ server });
export default defineConfig({
  server,
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [
      {
        find: "@remix-run/react",
        replacement: fileURLToPath(
          new URL("node_modules/react-router/dist/production", import.meta.url)
        ),
      },
    ],
  },
});
