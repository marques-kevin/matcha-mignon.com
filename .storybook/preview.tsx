import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../lib/fonts";
import "../app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-sans antialiased`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      options: {
        canvas: { name: "Canvas", value: "#f7f5f0" },
        surface: { name: "Surface", value: "#ffffff" },
        inverse: { name: "Inverse", value: "#2e3d22" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "canvas" },
  },
};

export default preview;
