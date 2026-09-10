# Deliveroo by Crawlora

Public Deliveroo data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Deliveroo or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/deliveroo --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-deliveroo": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-deliveroo` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-deliveroo --runtime --json
```

## Example

“Retrieve public Deliveroo data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_deliveroo_search` | Use Crawlora to access public Deliveroo data. |

## Parameters

These are the exact generated input schemas.

### crawlora_deliveroo_search

```json
{
  "type": "object",
  "required": [
    "latitude",
    "longitude"
  ],
  "properties": {
    "latitude": {
      "type": "number",
      "description": "latitude parameter."
    },
    "longitude": {
      "type": "number",
      "description": "longitude parameter."
    },
    "market": {
      "anyOf": [
        {
          "type": "string",
          "const": "uk"
        },
        {
          "type": "string",
          "const": "ie"
        },
        {
          "type": "string",
          "const": "fr"
        },
        {
          "type": "string",
          "const": "it"
        },
        {
          "type": "string",
          "const": "be"
        },
        {
          "type": "string",
          "const": "ae"
        },
        {
          "type": "string",
          "const": "kw"
        }
      ],
      "description": "market parameter."
    },
    "limit": {
      "type": "integer",
      "description": "limit parameter."
    },
    "collection": {
      "type": "string",
      "description": "collection parameter."
    },
    "cuisine": {
      "type": "string",
      "description": "cuisine parameter."
    },
    "dietary": {
      "type": "string",
      "description": "dietary parameter."
    },
    "dish": {
      "type": "string",
      "description": "dish parameter."
    },
    "top_rated": {
      "type": "boolean",
      "description": "top_rated parameter."
    },
    "min_rating": {
      "anyOf": [
        {
          "type": "string",
          "const": "3.5"
        },
        {
          "type": "string",
          "const": "4"
        },
        {
          "type": "string",
          "const": "4.5"
        }
      ],
      "description": "min_rating parameter."
    },
    "max_delivery_minutes": {
      "anyOf": [
        {
          "type": "string",
          "const": "20"
        },
        {
          "type": "string",
          "const": "30"
        },
        {
          "type": "string",
          "const": "45"
        }
      ],
      "description": "max_delivery_minutes parameter."
    },
    "max_delivery_fee_pounds": {
      "anyOf": [
        {
          "type": "string",
          "const": "1"
        },
        {
          "type": "string",
          "const": "2"
        },
        {
          "type": "string",
          "const": "3"
        }
      ],
      "description": "max_delivery_fee_pounds parameter."
    },
    "has_offer": {
      "type": "boolean",
      "description": "has_offer parameter."
    },
    "sort": {
      "anyOf": [
        {
          "type": "string",
          "const": "recommended"
        },
        {
          "type": "string",
          "const": "distance"
        },
        {
          "type": "string",
          "const": "time"
        },
        {
          "type": "string",
          "const": "rating"
        }
      ],
      "description": "sort parameter."
    },
    "deliveroos_choice": {
      "type": "boolean",
      "description": "deliveroos_choice parameter."
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
