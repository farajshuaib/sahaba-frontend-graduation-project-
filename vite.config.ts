import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-polyfill-node";
import dns from "dns";

const production = process.env.NODE_ENV === "production";

if (!production) {
  dns.setDefaultResultOrder("verbatim");
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
    global: "globalThis",
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    !production &&
      nodePolyfills({
        include: [
          "node_modules/**/*.js",
          new RegExp("node_modules/.vite/.*js"),
        ],
      }),
  ],

  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: ["jss-plugin-globalThis"],
      plugins: [nodePolyfills()],
    },
    // ↓ Needed for build if using WalletConnect and other providers
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
});
