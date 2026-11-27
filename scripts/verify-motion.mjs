import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOTS_DIR = path.resolve("docs/screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function startServer() {
  console.log("Starting Next.js production server on port", PORT);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    shell: true,
    stdio: "pipe",
    env: { ...process.env, PORT: String(PORT) },
  });

  server.stdout.on("data", (data) => {
    // console.log(`[server] ${data}`);
  });

  server.stderr.on("data", (data) => {
    // console.error(`[server err] ${data}`);
  });

  // Wait for server to become responsive
  let attempts = 0;
  while (attempts < 30) {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        console.log("Server is ready!");
        return server;
      }
    } catch (e) {
      // wait
    }
    await new Promise((r) => setTimeout(r, 1000));
    attempts++;
  }
  throw new Error("Server failed to start within 30 seconds");
}

async function runTests() {
  let server;
  let browser;

  const results = {
    pagesTested: [],
    consoleErrors: [],
    overflowDetected: [],
    footerReachable: [],
    reducedMotionPassed: false,
    screenshots: [],
    metrics: {},
  };

  try {
    server = await startServer();

    // Launch Chrome / Chromium
    const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    const launchOptions = {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
    if (fs.existsSync(chromePath)) {
      launchOptions.executablePath = chromePath;
    }

    browser = await chromium.launch(launchOptions);

    const pagesToTest = [
      { route: "/", name: "home" },
      { route: "/categories", name: "categories" },
      { route: "/products", name: "products" },
      { route: "/projects", name: "projects" },
      { route: "/configurator", name: "configurator" },
      { route: "/contact", name: "contact" },
    ];

    const viewports = [
      { name: "desktop", width: 1440, height: 900, isMobile: false },
      { name: "mobile", width: 390, height: 844, isMobile: true },
    ];

    for (const vp of viewports) {
      console.log(`\n--- Testing ${vp.name.toUpperCase()} Viewport (${vp.width}x${vp.height}) ---`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
        locale: "ar-EG",
      });

      for (const p of pagesToTest) {
        const page = await context.newPage();
        const pageErrors = [];

        page.on("console", (msg) => {
          if (msg.type() === "error") {
            pageErrors.push(msg.text());
          }
        });

        page.on("pageerror", (err) => {
          pageErrors.push(err.message);
        });

        const targetUrl = `${BASE_URL}${p.route}`;
        console.log(`Navigating to ${targetUrl} [${vp.name}]`);
        await page.goto(targetUrl, { waitUntil: "networkidle" });
        await page.waitForTimeout(600);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        if (overflow) {
          console.warn(`[OVERFLOW] Horizontal overflow detected on ${p.route} (${vp.name})`);
          results.overflowDetected.push(`${p.route} (${vp.name})`);
        }

        // Take Top Screenshot
        const topShot = path.join(SCREENSHOTS_DIR, `${p.name}-${vp.name}-top.png`);
        await page.screenshot({ path: topShot });
        results.screenshots.push(topShot);

        // Smooth scroll through page
        await page.evaluate(async () => {
          const distance = 400;
          const delay = 100;
          while (window.scrollY + window.innerHeight < document.documentElement.scrollHeight) {
            window.scrollBy(0, distance);
            await new Promise((r) => setTimeout(r, delay));
          }
        });

        await page.waitForTimeout(600);

        // Check if footer reached
        const footerVisible = await page.evaluate(() => {
          const footer = document.querySelector("footer");
          if (!footer) return false;
          const rect = footer.getBoundingClientRect();
          return rect.top < window.innerHeight;
        });

        if (footerVisible) {
          results.footerReachable.push(`${p.route} (${vp.name})`);
        } else {
          console.warn(`[FOOTER] Footer was not reachable on ${p.route} (${vp.name})`);
        }

        // Take Bottom Screenshot
        const bottomShot = path.join(SCREENSHOTS_DIR, `${p.name}-${vp.name}-bottom.png`);
        await page.screenshot({ path: bottomShot });
        results.screenshots.push(bottomShot);

        if (pageErrors.length > 0) {
          results.consoleErrors.push({ route: p.route, viewport: vp.name, errors: pageErrors });
        }

        results.pagesTested.push(`${p.route} (${vp.name})`);
        await page.close();
      }

      await context.close();
    }

    // Test with prefers-reduced-motion: reduce
    console.log("\n--- Testing with prefers-reduced-motion: reduce ---");
    const reducedContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
      locale: "ar-EG",
    });

    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await reducedPage.waitForTimeout(500);

    const isVisibleWithoutMotion = await reducedPage.evaluate(() => {
      const heading = document.querySelector("h1");
      if (!heading) return false;
      const style = window.getComputedStyle(heading);
      return style.opacity !== "0" && style.visibility !== "hidden";
    });

    const reducedShot = path.join(SCREENSHOTS_DIR, "home-reduced-motion.png");
    await reducedPage.screenshot({ path: reducedShot });
    results.screenshots.push(reducedShot);

    results.reducedMotionPassed = isVisibleWithoutMotion;
    console.log("Reduced motion heading visible:", isVisibleWithoutMotion);
    await reducedPage.close();
    await reducedContext.close();

    // Performance Metrics on Home Page (Mobile)
    console.log("\n--- Collecting Performance Metrics (Mobile) ---");
    const perfContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      locale: "ar-EG",
    });
    const perfPage = await perfContext.newPage();
    await perfPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await perfPage.waitForTimeout(1000);

    const perfMetrics = await perfPage.evaluate(() => {
      const navEntry = performance.getEntriesByType("navigation")[0];
      const paintEntries = performance.getEntriesByType("paint");
      const fcpEntry = paintEntries.find((e) => e.name === "first-contentful-paint");

      return {
        domContentLoaded: navEntry ? Math.round(navEntry.domContentLoadedEventEnd - navEntry.startTime) : null,
        loadTime: navEntry ? Math.round(navEntry.loadEventEnd - navEntry.startTime) : null,
        fcp: fcpEntry ? Math.round(fcpEntry.startTime) : null,
      };
    });

    results.metrics = perfMetrics;
    console.log("Performance Metrics:", perfMetrics);

    await perfPage.close();
    await perfContext.close();

    console.log("\nAll Playwright verification completed successfully!");
  } catch (err) {
    console.error("Test execution failed:", err);
  } finally {
    if (browser) await browser.close();
    if (server) {
      console.log("Stopping server...");
      server.kill("SIGTERM");
    }
  }

  // Save report
  fs.writeFileSync("docs/playwright-results.json", JSON.stringify(results, null, 2));
}

runTests();
