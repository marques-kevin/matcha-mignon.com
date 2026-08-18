/**
 * Lighthouse CI — mobile lab run on the static export (`out/`).
 *
 * Intentionally no `collect.settings.preset: "desktop"`: we want Lighthouse’s
 * default mobile emulation (`formFactor: "mobile"`).
 * No `assert` budgets: this job measures cost/scores and fails only if collect crashes.
 */
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: "./out",
      url: [
        "http://localhost/",
        // LHCI’s static server is express.static (no .html rewrite). Next.js
        // export (trailingSlash: false) emits `guide/<slug>.html`.
        "http://localhost/guide/qu-est-ce-que-le-matcha.html",
      ],
      settings: {
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
