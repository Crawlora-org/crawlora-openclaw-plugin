# Tes Job by Crawlora

Public Tes Job data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Tes Job or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/tes-job --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-tes-job": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-tes-job` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-tes-job --runtime --json
```

## Example

“Retrieve public Tes Job data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_tes_job_search` | Use Crawlora to access public Tes Job data. |

## Parameters

These are the exact generated input schemas.

### crawlora_tes_job_search

```json
{
  "type": "object",
  "properties": {
    "keywords": {
      "type": "string",
      "description": "keywords parameter."
    },
    "location": {
      "type": "string",
      "description": "location parameter."
    },
    "radius_miles": {
      "anyOf": [
        {
          "type": "string",
          "const": "3"
        },
        {
          "type": "string",
          "const": "5"
        },
        {
          "type": "string",
          "const": "10"
        },
        {
          "type": "string",
          "const": "15"
        },
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
          "const": "50"
        },
        {
          "type": "string",
          "const": "70"
        },
        {
          "type": "string",
          "const": "100"
        },
        {
          "type": "string",
          "const": "500"
        }
      ],
      "description": "radius_miles parameter."
    },
    "page": {
      "type": "integer",
      "description": "page parameter."
    },
    "page_size": {
      "type": "integer",
      "description": "page_size parameter."
    },
    "sort": {
      "anyOf": [
        {
          "type": "string",
          "const": "relevance"
        },
        {
          "type": "string",
          "const": "newest"
        },
        {
          "type": "string",
          "const": "distance"
        }
      ],
      "description": "sort parameter."
    },
    "contract_type": {
      "anyOf": [
        {
          "type": "string",
          "const": "Full Time"
        },
        {
          "type": "string",
          "const": "Part Time"
        }
      ],
      "description": "contract_type parameter."
    },
    "contract_term": {
      "anyOf": [
        {
          "type": "string",
          "const": "Permanent"
        },
        {
          "type": "string",
          "const": "Fixed Term"
        },
        {
          "type": "string",
          "const": "Casual"
        },
        {
          "type": "string",
          "const": "Maternity Cover"
        },
        {
          "type": "string",
          "const": "Temporary"
        },
        {
          "type": "string",
          "const": "Supply"
        }
      ],
      "description": "contract_term parameter."
    },
    "position": {
      "type": "string",
      "description": "position parameter."
    },
    "subject": {
      "type": "string",
      "description": "subject parameter."
    },
    "workplace": {
      "type": "string",
      "description": "workplace parameter."
    },
    "salary_min": {
      "type": "integer",
      "description": "salary_min parameter."
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
