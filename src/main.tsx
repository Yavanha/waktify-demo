import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { NuqsAdapter } from "nuqs/adapters/react";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/config/query-client.config";
// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </QueryClientProvider>
  </StrictMode>
);
