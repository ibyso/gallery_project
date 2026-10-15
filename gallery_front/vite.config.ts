import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({
        presets: [reactCompilerPreset()],
      }),
    ],

    server: {
      proxy: {
        "/api/festivals": {
          target: "https://apis.data.go.kr",
          changeOrigin: true,

          rewrite: (path) =>
            path.replace(/^\/api\/festivals/, "/B551011/KorService2/searchFestival2"),

          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const originalPath = proxyReq.path;
              const url = new URL(originalPath, "https://apis.data.go.kr");

              if (env.FESTIVAL_API_KEY) {
                url.searchParams.set("serviceKey", env.FESTIVAL_API_KEY);
              }

              proxyReq.path = url.pathname + url.search;
            });
          },
        },
      },
    },
  };
});
