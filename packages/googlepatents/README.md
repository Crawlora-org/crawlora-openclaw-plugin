# Googlepatents by Crawlora

Public Googlepatents data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Googlepatents or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/googlepatents --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-googlepatents": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-googlepatents` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-googlepatents --runtime --json
```

## Example

“Retrieve public Googlepatents data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_googlepatents_search` | Use Crawlora to access public Googlepatents data. |

## Parameters

These are the exact generated input schemas.

### crawlora_googlepatents_search

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "q parameter."
    },
    "inventor": {
      "type": "string",
      "description": "inventor parameter."
    },
    "assignee": {
      "type": "string",
      "description": "assignee parameter."
    },
    "country": {
      "type": "string",
      "description": "country parameter."
    },
    "status": {
      "anyOf": [
        {
          "type": "string",
          "const": "GRANT"
        },
        {
          "type": "string",
          "const": "APPLICATION"
        }
      ],
      "description": "status parameter."
    },
    "type": {
      "anyOf": [
        {
          "type": "string",
          "const": "PATENT"
        },
        {
          "type": "string",
          "const": "DESIGN"
        }
      ],
      "description": "type parameter."
    },
    "language": {
      "anyOf": [
        {
          "type": "string",
          "const": "ENGLISH"
        },
        {
          "type": "string",
          "const": "GERMAN"
        },
        {
          "type": "string",
          "const": "CHINESE"
        },
        {
          "type": "string",
          "const": "FRENCH"
        },
        {
          "type": "string",
          "const": "SPANISH"
        },
        {
          "type": "string",
          "const": "ARABIC"
        },
        {
          "type": "string",
          "const": "JAPANESE"
        },
        {
          "type": "string",
          "const": "KOREAN"
        },
        {
          "type": "string",
          "const": "PORTUGUESE"
        },
        {
          "type": "string",
          "const": "RUSSIAN"
        },
        {
          "type": "string",
          "const": "ITALIAN"
        },
        {
          "type": "string",
          "const": "DUTCH"
        },
        {
          "type": "string",
          "const": "SWEDISH"
        },
        {
          "type": "string",
          "const": "FINNISH"
        },
        {
          "type": "string",
          "const": "NORWEGIAN"
        },
        {
          "type": "string",
          "const": "DANISH"
        }
      ],
      "description": "language parameter."
    },
    "date_field": {
      "anyOf": [
        {
          "type": "string",
          "const": "priority"
        },
        {
          "type": "string",
          "const": "filing"
        },
        {
          "type": "string",
          "const": "publication"
        }
      ],
      "description": "date_field parameter."
    },
    "before": {
      "type": "string",
      "description": "before parameter."
    },
    "after": {
      "type": "string",
      "description": "after parameter."
    },
    "sort": {
      "anyOf": [
        {
          "type": "string",
          "const": "relevance"
        },
        {
          "type": "string",
          "const": "new"
        },
        {
          "type": "string",
          "const": "old"
        }
      ],
      "description": "sort parameter."
    },
    "num": {
      "type": "integer",
      "description": "num parameter."
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
