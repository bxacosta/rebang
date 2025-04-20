import {bangs} from "./bang";
import "./global.css";
import {getTheme, THEME_META, toggleTheme} from "./theme.ts";

function noSearchDefaultPageRender() {
    const theme = getTheme();
    const app = document.querySelector<HTMLDivElement>("#app")!;

    app.innerHTML = `
      <main class="main-container">
        <button id="theme-toggle" type="button" title="${THEME_META[theme].message}" class="icon-button" 
          aria-label="Toggle dark mode">
          <img src="${THEME_META[theme].icon}" alt="${THEME_META[theme].message}" />
        </button>
        <section class="content-container">
          <h1>Und*ck</h1>
          <p>
            DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables
            <a href="https://duckduckgo.com/bang.html" target="_blank">all of DuckDuckGo's bangs.</a>
          </p>
          <div class="url-container">
            <input type="text" class="url-input" value="${window.location.origin}?q=%s" readonly/>
            <button id="copy-button" class="icon-button" aria-label="Copy URL">
              <img src="/clipboard.svg" alt="Copy" />
            </button>
          </div>
        </section>
        <footer class="footer">
          <a href="https://github.com/bxacosta/rebang" target="_blank">github</a>
          •
          <a href="https://github.com/t3dotgg/unduck" target="_blank">original</a>
        </footer>
      </main>
    `;

    const copyButton = app.querySelector<HTMLButtonElement>("#copy-button")!;
    const themeToggle = app.querySelector<HTMLButtonElement>("#theme-toggle")!;

    const copyIcon = copyButton.querySelector("img")!;
    const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;

    copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(urlInput.value);
        copyIcon.src = "/clipboard-check.svg";

        setTimeout(() => {
            copyIcon.src = "/clipboard.svg";
        }, 2000);
    });

    themeToggle.addEventListener("click", () => toggleTheme(themeToggle));
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";
const defaultBang = bangs.find((bang) => bang.trigger === LS_DEFAULT_BANG);

function getBangRedirectUrl() {
    const url = new URL(window.location.href);
    const query = url.searchParams.get("q")?.trim() ?? "";

    if (!query) {
        noSearchDefaultPageRender();
        return null;
    }

    const match = query.match(/!(\S+)/i);

    const bangCandidate = match?.[1]?.toLowerCase();
    const selectedBang = bangs.find((bang) => bang.trigger === bangCandidate) ?? defaultBang;

    // Remove the first bang from the query
    const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

    // If the query is just the !bang, redirect to base domain
    if (cleanQuery === "")
        return selectedBang ? `https://${selectedBang.domain}` : null;

    // The format of the url is:
    // https://www.google.com/search?q={{{s}}}
    const searchUrl = selectedBang?.url.replace(
        "{{{s}}}",
        // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
    );
    if (!searchUrl) return null;

    return searchUrl;
}

function doRedirect() {
    const searchUrl = getBangRedirectUrl();
    if (!searchUrl) return;
    window.location.replace(searchUrl);
}

doRedirect();
