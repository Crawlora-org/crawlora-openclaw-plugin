# Carmax by Crawlora

Public Carmax data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Carmax or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/carmax --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-carmax": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-carmax` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-carmax --runtime --json
```

## Example

“Retrieve public Carmax data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_carmax_search` | Use Crawlora to access public Carmax data. |

## Parameters

These are the exact generated input schemas.

### crawlora_carmax_search

```json
{
  "type": "object",
  "properties": {
    "make": {
      "type": "string",
      "description": "make parameter."
    },
    "model": {
      "type": "string",
      "description": "model parameter."
    },
    "zip": {
      "type": "string",
      "description": "zip parameter."
    },
    "sort": {
      "type": "string",
      "description": "sort parameter."
    },
    "min_year": {
      "type": "integer",
      "description": "min_year parameter."
    },
    "max_year": {
      "type": "integer",
      "description": "max_year parameter."
    },
    "min_price": {
      "type": "integer",
      "description": "min_price parameter."
    },
    "max_price": {
      "type": "integer",
      "description": "max_price parameter."
    },
    "max_mileage": {
      "type": "integer",
      "description": "max_mileage parameter."
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
