# Tripadvisor by Crawlora

Public Tripadvisor data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Tripadvisor or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/tripadvisor --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-tripadvisor": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-tripadvisor` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-tripadvisor --runtime --json
```

## Example

“Retrieve public Tripadvisor data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_tripadvisor_search` | Use Crawlora to access public Tripadvisor data. |

## Parameters

These are the exact generated input schemas.

### crawlora_tripadvisor_search

```json
{
  "type": "object",
  "required": [
    "geo_id",
    "type"
  ],
  "properties": {
    "geo_id": {
      "type": "integer",
      "description": "geo_id parameter."
    },
    "type": {
      "type": "string",
      "description": "type parameter."
    },
    "filter_id": {
      "type": "string",
      "description": "filter_id parameter."
    },
    "class": {
      "type": "integer",
      "description": "class parameter."
    },
    "amenities": {
      "type": "string",
      "description": "amenities parameter."
    },
    "price_min": {
      "type": "integer",
      "description": "price_min parameter."
    },
    "price_max": {
      "type": "integer",
      "description": "price_max parameter."
    },
    "pricing_mode": {
      "type": "string",
      "description": "pricing_mode parameter."
    },
    "travelers_choice": {
      "type": "boolean",
      "description": "travelers_choice parameter."
    },
    "travelers_choice_botb": {
      "type": "boolean",
      "description": "travelers_choice_botb parameter."
    },
    "restaurant_date": {
      "type": "string",
      "description": "restaurant_date parameter."
    },
    "restaurant_time": {
      "type": "string",
      "description": "restaurant_time parameter."
    },
    "restaurant_guests": {
      "type": "integer",
      "description": "restaurant_guests parameter."
    },
    "establishment_types": {
      "type": "string",
      "description": "establishment_types parameter."
    },
    "online_options": {
      "type": "string",
      "description": "online_options parameter."
    },
    "offset": {
      "type": "integer",
      "description": "offset parameter."
    },
    "limit": {
      "type": "integer",
      "description": "limit parameter."
    },
    "locale": {
      "type": "string",
      "description": "locale parameter."
    },
    "currency": {
      "type": "string",
      "description": "currency parameter."
    },
    "sort": {
      "type": "string",
      "description": "sort parameter."
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
