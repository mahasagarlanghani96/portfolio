import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mahasagar Langhani — Quality Leadership & Technical Delivery",
    short_name: "ML Portfolio",
    description:
      "Senior QA Lead and Project Manager portfolio showcasing quality engineering and technical delivery expertise.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1a",
    theme_color: "#06b6d4",
  };
}
