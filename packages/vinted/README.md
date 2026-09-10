# Vinted by Crawlora

Public Vinted data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Vinted or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/vinted --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-vinted": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-vinted` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-vinted --runtime --json
```

## Example

“Retrieve public Vinted data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_vinted_catalog` | Use Crawlora to access public Vinted data. |

## Parameters

These are the exact generated input schemas.

### crawlora_vinted_catalog

```json
{
  "type": "object",
  "required": [
    "search_text"
  ],
  "properties": {
    "search_text": {
      "type": "string",
      "description": "search_text parameter."
    },
    "price_from": {
      "type": "number",
      "description": "price_from parameter."
    },
    "price_to": {
      "type": "number",
      "description": "price_to parameter."
    },
    "order": {
      "anyOf": [
        {
          "type": "string",
          "const": "relevance"
        },
        {
          "type": "string",
          "const": "newest_first"
        },
        {
          "type": "string",
          "const": "price_high_to_low"
        },
        {
          "type": "string",
          "const": "price_low_to_high"
        }
      ],
      "description": "order parameter."
    },
    "page": {
      "type": "integer",
      "description": "page parameter."
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
