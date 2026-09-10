# Justeat by Crawlora

Public Justeat data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Justeat or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/justeat --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-justeat": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-justeat` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-justeat --runtime --json
```

## Example

“Retrieve public Justeat data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_justeat_search` | Use Crawlora to access public Justeat data. |

## Parameters

These are the exact generated input schemas.

### crawlora_justeat_search

```json
{
  "type": "object",
  "required": [
    "postcode"
  ],
  "properties": {
    "postcode": {
      "type": "string",
      "description": "postcode parameter."
    },
    "limit": {
      "type": "integer",
      "description": "limit parameter."
    },
    "filter": {
      "type": "string",
      "description": "filter parameter."
    },
    "sort_by": {
      "anyOf": [
        {
          "type": "string",
          "const": "best_match"
        },
        {
          "type": "string",
          "const": "review_rating"
        },
        {
          "type": "string",
          "const": "distance"
        },
        {
          "type": "string",
          "const": "delivery_time"
        },
        {
          "type": "string",
          "const": "minimum_order_value"
        },
        {
          "type": "string",
          "const": "delivery_fee"
        }
      ],
      "description": "sort_by parameter."
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
