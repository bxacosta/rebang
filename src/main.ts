import {bangs} from "./bang";
import {handleThemeToggleButton} from "./theme.ts";

function noSearchDefaultPageRender() {
    const app = document.querySelector<HTMLDivElement>("#app")!;

    app.innerHTML = `
      <div class="container">
        <button id="theme-toggle" type="button" class="icon-button">
          <img src="" alt="">
        </button>
        <main class="content-container">
          <h1>Rebang</h1>
          <p>
            A local-first implementation of <a href="https://duckduckgo.com/bangs" target="_blank">DuckDuckGo's bang</a>
            redirects.
          </p>
          <section class="url-container">
            <input id="url-input" type="text" value="${window.location.origin}?q=%s" readonly/>
            <button id="copy-button" class="icon-button" type="button" aria-label="Copy URL">
              <img src="/clipboard.svg" alt="Copy" />
            </button>
          </section>
          
          <form class="test-container">
            <p>Test</p>
            <input id="test-input" name="q" type="text" role="searchbox"/>
          </form>
        </main>
        <footer class="footer">
          <a href="https://github.com/bxacosta/rebang" target="_blank">github</a>
          •
          <a href="https://github.com/t3dotgg/unduck" target="_blank">original</a>
        </footer>
      </div>
    `;

    const testInput = app.querySelector<HTMLInputElement>("#test-input")!;
    handleTestInput(testInput);

    const themeToggleButton = app.querySelector<HTMLButtonElement>("#theme-toggle")!;
    handleThemeToggleButton(themeToggleButton);

    const copyButton = app.querySelector<HTMLButtonElement>("#copy-button")!;
    const urlInput = app.querySelector<HTMLInputElement>("#url-input")!;
    handleCopyURLButton(copyButton, urlInput);
}

function handleCopyURLButton(button: HTMLButtonElement, input: HTMLInputElement) {
    button.addEventListener("click", async () => {
        await navigator.clipboard.writeText(input.value);

        const iconImage = button.querySelector<HTMLImageElement>("img")!;

        iconImage.src = "/clipboard-check.svg";
        setTimeout(() => {
            iconImage.src = "/clipboard.svg";
        }, 2000);
    });
}

function handleTestInput(input: HTMLInputElement) {
    const testExamples = ["hello world !gtes", "react course !yt", "bxacosta/rebang !ghr", "typescript !g"]
    input.placeholder = testExamples[0];
    let counter = 0;
    setInterval(() => {
        counter++;
        input.placeholder = testExamples[counter % testExamples.length];
    }, 3000);
}

function getBangRedirectUrl() {
    const url = new URL(window.location.href);
    const query = url.searchParams.get("q")?.trim() ?? "";

    if (!query) {
        noSearchDefaultPageRender();
        return null;
    }

    const match = query.match(/!(\S+)/i);

    const defaultBangTrigger = localStorage.getItem("default-bang") ?? "g";
    const defaultBang = bangs.find((bang) => bang.trigger === defaultBangTrigger);

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
