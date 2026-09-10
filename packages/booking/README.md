# Booking.com by Crawlora

Booking.com public accommodation search through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Booking.com or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/booking --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-booking": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-booking` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-booking --runtime --json
```

## Example

“Search Booking.com hotels in Tokyo for next month.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_booking_search` | Search public Booking.com accommodations. |

## Parameters

These are the exact generated input schemas.

### crawlora_booking_search

```json
{
  "type": "object",
  "required": [
    "query",
    "checkin",
    "checkout"
  ],
  "properties": {
    "query": {
      "type": "string",
      "description": "Destination or property query."
    },
    "checkin": {
      "type": "string",
      "description": "Check-in date (YYYY-MM-DD)."
    },
    "checkout": {
      "type": "string",
      "description": "Check-out date (YYYY-MM-DD)."
    },
    "adults": {
      "type": "number",
      "description": "Number of adults.",
      "minimum": 1
    },
    "rooms": {
      "type": "number",
      "description": "Number of rooms.",
      "minimum": 1
    },
    "children": {
      "type": "number",
      "description": "Number of children.",
      "minimum": 0
    },
    "page": {
      "type": "number",
      "description": "Page number.",
      "minimum": 1
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
