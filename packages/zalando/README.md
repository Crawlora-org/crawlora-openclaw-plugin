# Zalando by Crawlora

Public Zalando data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Zalando or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/zalando --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-zalando": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-zalando` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-zalando --runtime --json
```

## Example

“Retrieve public Zalando data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_zalando_search` | Use Crawlora to access public Zalando data. |

## Parameters

These are the exact generated input schemas.

### crawlora_zalando_search

```json
{
  "type": "object",
  "required": [
    "q",
    "market"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "q parameter."
    },
    "market": {
      "anyOf": [
        {
          "type": "string",
          "const": "at"
        },
        {
          "type": "string",
          "const": "be"
        },
        {
          "type": "string",
          "const": "ch"
        },
        {
          "type": "string",
          "const": "cz"
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
          "const": "ee"
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
          "const": "hr"
        },
        {
          "type": "string",
          "const": "hu"
        },
        {
          "type": "string",
          "const": "ie"
        },
        {
          "type": "string",
          "const": "it"
        },
        {
          "type": "string",
          "const": "lt"
        },
        {
          "type": "string",
          "const": "lu"
        },
        {
          "type": "string",
          "const": "lv"
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
          "const": "pl"
        },
        {
          "type": "string",
          "const": "ro"
        },
        {
          "type": "string",
          "const": "se"
        },
        {
          "type": "string",
          "const": "si"
        },
        {
          "type": "string",
          "const": "sk"
        }
      ],
      "description": "market parameter."
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
