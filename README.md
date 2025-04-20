# Unduck

A local first implementation of [DuckDuckGo's bang](https://duckduckgo.com/bangs) redirects.

## How it works

DuckDuckGo performs redirects server-side, which can be slow due to DNS issues. Unduck solves this by:

- Processing all redirects client-side
- Caching JavaScript after first visit
- Eliminating server dependency for redirects

## Browser Setup

To use Unduck, you need to set it as your default search engine in your browser. Use the following URL as your search
engine:

```
https://unduck.iambx.xyz?q=%s
```

For specific browser configuration instructions, refer to these guides:

- **Chrome**: [Set your default search engine in Chrome](https://support.google.com/chrome/answer/95426)
- **Firefox**: [Change your default search settings in Firefox](https://support.mozilla.org/en-US/kb/change-your-default-search-settings-firefox)
- **Edge**: [Change your default search engine in Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/change-your-default-search-engine-in-microsoft-edge-cccaf51c-a4df-a43e-8036-d4d2c527a791)
- **Brave**: [How do I set my default search engine?](https://support.brave.com/hc/en-us/articles/360017479752-How-do-I-set-my-default-search-engine)


## Development

To run this project, you need **Node.js version 22 or higher**.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Credits

This is my personal customization of the [Theo's unduck project](https://github.com/t3dotgg/unduck).
