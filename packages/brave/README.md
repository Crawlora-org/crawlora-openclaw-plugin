# Brave by Crawlora

Public Brave data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Brave or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/brave --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-brave": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-brave` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-brave --runtime --json
```

## Example

“Retrieve public Brave data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_brave_search` | Use Crawlora to access public Brave data. |

## Parameters

These are the exact generated input schemas.

### crawlora_brave_search

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
    "offset": {
      "type": "integer",
      "description": "offset parameter."
    },
    "country": {
      "anyOf": [
        {
          "type": "string",
          "const": "all"
        },
        {
          "type": "string",
          "const": "ar"
        },
        {
          "type": "string",
          "const": "at"
        },
        {
          "type": "string",
          "const": "au"
        },
        {
          "type": "string",
          "const": "be"
        },
        {
          "type": "string",
          "const": "br"
        },
        {
          "type": "string",
          "const": "ca"
        },
        {
          "type": "string",
          "const": "ch"
        },
        {
          "type": "string",
          "const": "cl"
        },
        {
          "type": "string",
          "const": "cn"
        },
        {
          "type": "string",
          "const": "de"
        },
        {
          "type": "string",
          "const": "dk"
        },
        {
          "type": "string",
          "const": "es"
        },
        {
          "type": "string",
          "const": "fi"
        },
        {
          "type": "string",
          "const": "fr"
        },
        {
          "type": "string",
          "const": "gb"
        },
        {
          "type": "string",
          "const": "gr"
        },
        {
          "type": "string",
          "const": "hk"
        },
        {
          "type": "string",
          "const": "id"
        },
        {
          "type": "string",
          "const": "in"
        },
        {
          "type": "string",
          "const": "it"
        },
        {
          "type": "string",
          "const": "jp"
        },
        {
          "type": "string",
          "const": "kr"
        },
        {
          "type": "string",
          "const": "mx"
        },
        {
          "type": "string",
          "const": "my"
        },
        {
          "type": "string",
          "const": "nl"
        },
        {
          "type": "string",
          "const": "no"
        },
        {
          "type": "string",
          "const": "nz"
        },
        {
          "type": "string",
          "const": "ph"
        },
        {
          "type": "string",
          "const": "pl"
        },
        {
          "type": "string",
          "const": "pt"
        },
        {
          "type": "string",
          "const": "ru"
        },
        {
          "type": "string",
          "const": "sa"
        },
        {
          "type": "string",
          "const": "se"
        },
        {
          "type": "string",
          "const": "sg"
        },
        {
          "type": "string",
          "const": "tr"
        },
        {
          "type": "string",
          "const": "tw"
        },
        {
          "type": "string",
          "const": "us"
        },
        {
          "type": "string",
          "const": "za"
        }
      ],
      "description": "country parameter."
    },
    "lang": {
      "anyOf": [
        {
          "type": "string",
          "const": "de-de"
        },
        {
          "type": "string",
          "const": "en-ca"
        },
        {
          "type": "string",
          "const": "en-gb"
        },
        {
          "type": "string",
          "const": "en-in"
        },
        {
          "type": "string",
          "const": "en-us"
        },
        {
          "type": "string",
          "const": "fi-fi"
        },
        {
          "type": "string",
          "const": "fr-ca"
        },
        {
          "type": "string",
          "const": "fr-fr"
        },
        {
          "type": "string",
          "const": "ja-jp"
        },
        {
          "type": "string",
          "const": "pt-br"
        },
        {
          "type": "string",
          "const": "sq-al"
        },
        {
          "type": "string",
          "const": "sw-ke"
        },
        {
          "type": "string",
          "const": "zh-tw"
        }
      ],
      "description": "lang parameter."
    },
    "time_range": {
      "anyOf": [
        {
          "type": "string",
          "const": "any"
        },
        {
          "type": "string",
          "const": "day"
        },
        {
          "type": "string",
          "const": "week"
        },
        {
          "type": "string",
          "const": "month"
        },
        {
          "type": "string",
          "const": "year"
        },
        {
          "type": "string",
          "const": "custom"
        }
      ],
      "description": "time_range parameter."
    },
    "date_from": {
      "type": "string",
      "description": "date_from parameter."
    },
    "date_to": {
      "type": "string",
      "description": "date_to parameter."
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
