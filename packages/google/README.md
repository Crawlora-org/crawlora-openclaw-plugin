# Google by Crawlora

Google search, news, videos, Maps, and Trends through Crawlora. Live check on 2026-09-10: Google News succeeded; organic search returned upstream HTTP 503 on two queries. Organic search availability is currently limited. This package exposes 5 curated tools. It is an independent Crawlora integration, not an official Google or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/google --accept-capabilities
```

The flag consents to the tools listed below. These four platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-google": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-google` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-google --runtime --json
```

## Example

“Find coffee shops in San Francisco and search for recent coffee industry news.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_google_search` | Search Google and return organic results. |
| `crawlora_google_news` | Search Google News and return news results. |
| `crawlora_google_videos` | Search Google Videos and return video results. |
| `crawlora_google_trends_explore` | Explore Google Trends interest for a query. |
| `crawlora_google_map_search` | Search Google Maps for places. |

## Parameters

These are the exact generated input schemas. SEC company-specific tools additionally require `ticker` or `cik`.

### crawlora_google_search

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "Search query."
    },
    "num": {
      "type": "integer",
      "minimum": 10,
      "maximum": 100,
      "description": "Number of results (10-100)."
    }
  }
}
```

### crawlora_google_news

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "Search query."
    },
    "count": {
      "type": "integer",
      "minimum": 1,
      "maximum": 50,
      "description": "Results per page (1-50)."
    }
  }
}
```

### crawlora_google_videos

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "Search query."
    },
    "count": {
      "type": "integer",
      "minimum": 1,
      "maximum": 50,
      "description": "Results per page (1-50)."
    }
  }
}
```

### crawlora_google_trends_explore

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "Query or topic to explore."
    }
  }
}
```

### crawlora_google_map_search

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "Place or business search query."
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
