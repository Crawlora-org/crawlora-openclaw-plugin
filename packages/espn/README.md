# Espn by Crawlora

Public Espn data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Espn or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/espn --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-espn": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-espn` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-espn --runtime --json
```

## Example

“Retrieve public Espn data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_espn_news` | Use Crawlora to access public Espn data. |

## Parameters

These are the exact generated input schemas.

### crawlora_espn_news

```json
{
  "type": "object",
  "required": [
    "sport",
    "league"
  ],
  "properties": {
    "sport": {
      "anyOf": [
        {
          "type": "string",
          "const": "football"
        },
        {
          "type": "string",
          "const": "basketball"
        },
        {
          "type": "string",
          "const": "baseball"
        },
        {
          "type": "string",
          "const": "hockey"
        },
        {
          "type": "string",
          "const": "soccer"
        }
      ],
      "description": "sport parameter."
    },
    "league": {
      "anyOf": [
        {
          "type": "string",
          "const": "nfl"
        },
        {
          "type": "string",
          "const": "college-football"
        },
        {
          "type": "string",
          "const": "nba"
        },
        {
          "type": "string",
          "const": "wnba"
        },
        {
          "type": "string",
          "const": "mens-college-basketball"
        },
        {
          "type": "string",
          "const": "womens-college-basketball"
        },
        {
          "type": "string",
          "const": "mlb"
        },
        {
          "type": "string",
          "const": "nhl"
        },
        {
          "type": "string",
          "const": "eng.1"
        },
        {
          "type": "string",
          "const": "esp.1"
        },
        {
          "type": "string",
          "const": "ita.1"
        },
        {
          "type": "string",
          "const": "ger.1"
        },
        {
          "type": "string",
          "const": "fra.1"
        },
        {
          "type": "string",
          "const": "usa.1"
        },
        {
          "type": "string",
          "const": "uefa.champions"
        }
      ],
      "description": "league parameter."
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
