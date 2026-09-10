# Datasets by Crawlora

Public Datasets data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Datasets or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/datasets --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-datasets": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-datasets` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-datasets --runtime --json
```

## Example

“Retrieve public Datasets data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_datasets_airbnb_markets_search` | Use Crawlora to access public Datasets data. |

## Parameters

These are the exact generated input schemas.

### crawlora_datasets_airbnb_markets_search

```json
{
  "type": "object",
  "properties": {
    "group_by": {
      "anyOf": [
        {
          "type": "string",
          "const": "country"
        },
        {
          "type": "string",
          "const": "market"
        },
        {
          "type": "string",
          "const": "admin1"
        },
        {
          "type": "string",
          "const": "locality"
        },
        {
          "type": "string",
          "const": "room_type"
        },
        {
          "type": "string",
          "const": "property_type"
        }
      ],
      "description": "group_by parameter."
    },
    "country": {
      "type": "string",
      "description": "country parameter."
    },
    "market": {
      "type": "string",
      "description": "market parameter."
    },
    "superhost": {
      "type": "boolean",
      "description": "superhost parameter."
    },
    "guest_favorite": {
      "type": "boolean",
      "description": "guest_favorite parameter."
    },
    "min_rating": {
      "type": "number",
      "description": "min_rating parameter."
    },
    "min_review_count": {
      "type": "integer",
      "description": "min_review_count parameter."
    },
    "active_since": {
      "type": "string",
      "description": "active_since parameter."
    },
    "min_listings": {
      "type": "integer",
      "description": "min_listings parameter."
    },
    "sort": {
      "anyOf": [
        {
          "type": "string",
          "const": "listings_desc"
        },
        {
          "type": "string",
          "const": "superhost_pct_desc"
        },
        {
          "type": "string",
          "const": "rating_desc"
        },
        {
          "type": "string",
          "const": "key_asc"
        }
      ],
      "description": "sort parameter."
    },
    "page": {
      "type": "integer",
      "description": "page parameter."
    },
    "page_size": {
      "type": "integer",
      "description": "page_size parameter."
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
