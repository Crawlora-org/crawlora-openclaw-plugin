# Amazon Jobs by Crawlora

Public Amazon Jobs data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Amazon Jobs or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/amazon-jobs --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-amazon-jobs": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-amazon-jobs` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-amazon-jobs --runtime --json
```

## Example

“Retrieve public Amazon Jobs data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_amazon_jobs_search` | Use Crawlora to access public Amazon Jobs data. |

## Parameters

These are the exact generated input schemas.

### crawlora_amazon_jobs_search

```json
{
  "type": "object",
  "properties": {
    "q": {
      "type": "string",
      "description": "q parameter."
    },
    "category": {
      "anyOf": [
        {
          "type": "string",
          "const": "administrative-support"
        },
        {
          "type": "string",
          "const": "applied-science"
        },
        {
          "type": "string",
          "const": "audio-video-photography-production"
        },
        {
          "type": "string",
          "const": "business-intelligence-data-engineering"
        },
        {
          "type": "string",
          "const": "business-merchant-development"
        },
        {
          "type": "string",
          "const": "buying-planning-instock-management"
        },
        {
          "type": "string",
          "const": "customer-service"
        },
        {
          "type": "string",
          "const": "data-science"
        },
        {
          "type": "string",
          "const": "database-administration"
        },
        {
          "type": "string",
          "const": "design"
        },
        {
          "type": "string",
          "const": "economics"
        },
        {
          "type": "string",
          "const": "editorial-writing-content-management"
        },
        {
          "type": "string",
          "const": "facilities-maintenance-real-estate"
        },
        {
          "type": "string",
          "const": "fgbs"
        },
        {
          "type": "string",
          "const": "fulfillment-center-warehouse-associate"
        },
        {
          "type": "string",
          "const": "fulfillment-operations-management"
        },
        {
          "type": "string",
          "const": "hardware-development"
        },
        {
          "type": "string",
          "const": "human-resources"
        },
        {
          "type": "string",
          "const": "investigation-loss-prevention"
        },
        {
          "type": "string",
          "const": "leadership-development-training"
        },
        {
          "type": "string",
          "const": "legal"
        },
        {
          "type": "string",
          "const": "marketing"
        },
        {
          "type": "string",
          "const": "medical-health-safety"
        },
        {
          "type": "string",
          "const": "operations-it-support-engineering"
        },
        {
          "type": "string",
          "const": "project-program-product-management-non-tech"
        },
        {
          "type": "string",
          "const": "project-program-product-management-technical"
        },
        {
          "type": "string",
          "const": "public-policy"
        },
        {
          "type": "string",
          "const": "public-relations-communications"
        },
        {
          "type": "string",
          "const": "research-science"
        },
        {
          "type": "string",
          "const": "sales-advertising-account-management"
        },
        {
          "type": "string",
          "const": "software-development"
        },
        {
          "type": "string",
          "const": "solutions-architecture"
        },
        {
          "type": "string",
          "const": "supply-chain-transportation-management"
        },
        {
          "type": "string",
          "const": "systems-quality-security-engineering"
        }
      ],
      "description": "category parameter."
    },
    "country": {
      "type": "string",
      "description": "country parameter."
    },
    "page": {
      "type": "integer",
      "description": "page parameter."
    },
    "limit": {
      "type": "integer",
      "description": "limit parameter."
    },
    "sort": {
      "anyOf": [
        {
          "type": "string",
          "const": "relevant"
        },
        {
          "type": "string",
          "const": "recent"
        }
      ],
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
