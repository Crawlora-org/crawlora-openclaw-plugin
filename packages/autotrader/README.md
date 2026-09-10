# Autotrader by Crawlora

Public Autotrader data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Autotrader or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/autotrader --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-autotrader": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-autotrader` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-autotrader --runtime --json
```

## Example

“Retrieve public Autotrader data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_autotrader_search` | Use Crawlora to access public Autotrader data. |

## Parameters

These are the exact generated input schemas.

### crawlora_autotrader_search

```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "query parameter."
    },
    "zip": {
      "type": "string",
      "description": "zip parameter."
    },
    "radius": {
      "type": "integer",
      "description": "radius parameter."
    },
    "make": {
      "type": "string",
      "description": "make parameter."
    },
    "model": {
      "type": "string",
      "description": "model parameter."
    },
    "trim": {
      "type": "string",
      "description": "trim parameter."
    },
    "condition": {
      "anyOf": [
        {
          "type": "string",
          "const": "new"
        },
        {
          "type": "string",
          "const": "used"
        },
        {
          "type": "string",
          "const": "certified"
        },
        {
          "type": "string",
          "const": "3p_cert"
        }
      ],
      "description": "condition parameter."
    },
    "body_style": {
      "anyOf": [
        {
          "type": "string",
          "const": "convertible"
        },
        {
          "type": "string",
          "const": "coupe"
        },
        {
          "type": "string",
          "const": "hatchback"
        },
        {
          "type": "string",
          "const": "sedan"
        },
        {
          "type": "string",
          "const": "suv"
        },
        {
          "type": "string",
          "const": "truck"
        },
        {
          "type": "string",
          "const": "van"
        },
        {
          "type": "string",
          "const": "wagon"
        }
      ],
      "description": "body_style parameter."
    },
    "seller_type": {
      "anyOf": [
        {
          "type": "string",
          "const": "dealer"
        },
        {
          "type": "string",
          "const": "private"
        }
      ],
      "description": "seller_type parameter."
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
