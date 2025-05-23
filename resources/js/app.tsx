import "./bootstrap";
import "../css/app.css";
import { ThemeProvider } from "@/Components/theme-provider";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
if (typeof global === "undefined") {
  window.global = window;
}


createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App {...props} />
      </ThemeProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
