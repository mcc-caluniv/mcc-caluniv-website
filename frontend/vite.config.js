import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "83c4-2409-40e1-1078-a947-8d1c-ff-6f80-5f99.ngrok-free.app", // Add your ngrok host here
    ],
  },
});
