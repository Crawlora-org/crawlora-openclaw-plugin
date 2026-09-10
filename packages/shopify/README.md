# Shopify by Crawlora

Public Shopify data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Shopify or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/shopify --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-shopify": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-shopify` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-shopify --runtime --json
```

## Example

“Retrieve public Shopify data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_shopify_collection_products` | Use Crawlora to access public Shopify data. |

## Parameters

These are the exact generated input schemas.

### crawlora_shopify_collection_products

```json
{
  "type": "object",
  "required": [
    "handle",
    "url"
  ],
  "properties": {
    "handle": {
      "type": "string",
      "description": "handle path parameter."
    },
    "url": {
      "type": "string",
      "description": "url parameter."
    },
    "page": {
      "type": "integer",
      "description": "page parameter."
    },
    "limit": {
      "type": "integer",
      "description": "limit parameter."
    },
    "sortBy": {
      "anyOf": [
        {
          "type": "string",
          "const": "sortLTH"
        },
        {
          "type": "string",
          "const": "sortHTL"
        },
        {
          "type": "string",
          "const": "newest"
        }
      ],
      "description": "sortBy parameter."
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
