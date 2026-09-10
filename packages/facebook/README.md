# Facebook by Crawlora

Public Facebook data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Facebook or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/facebook --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-facebook": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-facebook` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-facebook --runtime --json
```

## Example

“Retrieve public Facebook data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_facebook_marketplace_search` | Use Crawlora to access public Facebook data. |

## Parameters

These are the exact generated input schemas.

### crawlora_facebook_marketplace_search

```json
{
  "type": "object",
  "required": [
    "location"
  ],
  "properties": {
    "location": {
      "type": "string",
      "description": "location parameter."
    },
    "query": {
      "type": "string",
      "description": "query parameter."
    },
    "category": {
      "anyOf": [
        {
          "type": "string",
          "const": "vehicles"
        },
        {
          "type": "string",
          "const": "property_rentals"
        },
        {
          "type": "string",
          "const": "classifieds"
        },
        {
          "type": "string",
          "const": "apparel"
        },
        {
          "type": "string",
          "const": "electronics"
        },
        {
          "type": "string",
          "const": "entertainment"
        },
        {
          "type": "string",
          "const": "family"
        },
        {
          "type": "string",
          "const": "free"
        },
        {
          "type": "string",
          "const": "garden_outdoors"
        },
        {
          "type": "string",
          "const": "hobbies"
        },
        {
          "type": "string",
          "const": "home_goods"
        },
        {
          "type": "string",
          "const": "home_improvement"
        },
        {
          "type": "string",
          "const": "musical_instruments"
        },
        {
          "type": "string",
          "const": "office_supplies"
        },
        {
          "type": "string",
          "const": "pet_supplies"
        },
        {
          "type": "string",
          "const": "property_sale"
        },
        {
          "type": "string",
          "const": "sporting_goods"
        },
        {
          "type": "string",
          "const": "toys_games"
        }
      ],
      "description": "category parameter."
    },
    "min_price": {
      "type": "integer",
      "description": "min_price parameter."
    },
    "max_price": {
      "type": "integer",
      "description": "max_price parameter."
    },
    "sort_by": {
      "anyOf": [
        {
          "type": "string",
          "const": "best_match"
        },
        {
          "type": "string",
          "const": "distance_ascend"
        },
        {
          "type": "string",
          "const": "creation_time_descend"
        },
        {
          "type": "string",
          "const": "price_ascend"
        },
        {
          "type": "string",
          "const": "price_descend"
        }
      ],
      "description": "sort_by parameter."
    },
    "days_since_listed": {
      "anyOf": [
        {
          "type": "string",
          "const": "1"
        },
        {
          "type": "string",
          "const": "7"
        },
        {
          "type": "string",
          "const": "30"
        }
      ],
      "description": "days_since_listed parameter."
    },
    "condition": {
      "anyOf": [
        {
          "type": "string",
          "const": "new"
        },
        {
          "type": "string",
          "const": "used_like_new"
        },
        {
          "type": "string",
          "const": "used_good"
        },
        {
          "type": "string",
          "const": "used_fair"
        }
      ],
      "description": "condition parameter."
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
