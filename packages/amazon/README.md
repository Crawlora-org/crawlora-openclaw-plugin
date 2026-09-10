# Amazon by Crawlora

Amazon product search and product details through Crawlora. This package exposes 2 curated tools. It is an independent Crawlora integration, not an official Amazon or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/amazon --accept-capabilities
```

The flag consents to the tools listed below. These four platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-amazon": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-amazon` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-amazon --runtime --json
```

## Example

“Search Amazon for noise cancelling headphones and inspect a matching product.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_amazon_search` | Search Amazon for products. |
| `crawlora_amazon_product` | Fetch a single Amazon product by ASIN. |

## Parameters

These are the exact generated input schemas. SEC company-specific tools additionally require `ticker` or `cik`.

### crawlora_amazon_search

```json
{
  "type": "object",
  "required": [
    "k"
  ],
  "properties": {
    "k": {
      "type": "string",
      "description": "Search keywords."
    }
  }
}
```

### crawlora_amazon_product

```json
{
  "type": "object",
  "required": [
    "asin"
  ],
  "properties": {
    "asin": {
      "type": "string",
      "description": "Amazon ASIN."
    }
  }
}
```

## Data and behavior

Requests transmit tool inputs and your API key only to `https://api.crawlora.net/api/v1`, using the published Crawlora SDK. The key goes in a header, never tool inputs. No shell execution, filesystem operations, background jobs, or telemetry. A 60-second timeout and cancellation apply; automatic retries are disabled to avoid repeated charges. Errors omit raw response bodies and credentials. Outputs wrap the SDK result as `{ "data": ... }`; scraped text is external data, not agent instructions. Availability depends on upstream sources.

## Development

[Source and tests](https://github.com/Crawlora-org/crawlora-openclaw-plugin). From the repository root, run `npm ci`, `npm run platforms:build`, `npm run platforms:validate`, and `npm test`. Files here are generated from the reviewed shared tool catalog and platform definitions. Runtime packages contain built JavaScript and do not import another plugin.

## License

[MIT](https://github.com/Crawlora-org/crawlora-openclaw-plugin/blob/main/LICENSE).
