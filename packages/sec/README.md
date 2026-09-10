# SEC EDGAR by Crawlora

SEC EDGAR company research, financial statements, filings, and insider transactions through Crawlora. This package exposes 7 curated tools. It is an independent Crawlora integration, not an official SEC EDGAR or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/sec --accept-capabilities
```

The flag consents to the tools listed below. These four platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-sec": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-sec` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-sec --runtime --json
```

## Example

“Resolve AAPL, then get annual financials and recent SEC filings.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_sec_company_search` | Resolve a ticker or company name to SEC EDGAR companies (CIK, ticker, name). |
| `crawlora_sec_company_intelligence` | A company 360 from SEC data: profile, latest financial snapshot, latest 10-K/10-Q/8-K, and recent events. |
| `crawlora_sec_financials` | Normalized SEC financial statements (income, balance sheet, or cash flow) with computed margins and ratios. |
| `crawlora_sec_filings` | List a company SEC EDGAR filings, filtered by form type and date. |
| `crawlora_sec_filing_sections` | Extract 10-K/10-Q/8-K item sections (Risk Factors, MD&A, etc.) from a filing as clean text. |
| `crawlora_sec_full_text_search` | Full-text search across SEC EDGAR filings, filtered by form and date. |
| `crawlora_sec_insider` | Recent insider transactions (Forms 3/4/5) for a company. |

## Parameters

These are the exact generated input schemas. SEC company-specific tools additionally require `ticker` or `cik`.

### crawlora_sec_company_search

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "Ticker symbol or company name, e.g. apple or AAPL."
    }
  }
}
```

### crawlora_sec_company_intelligence

```json
{
  "type": "object",
  "properties": {
    "ticker": {
      "type": "string",
      "description": "Ticker symbol, e.g. AAPL."
    },
    "cik": {
      "type": "string",
      "description": "SEC CIK (alternative to ticker)."
    }
  }
}
```

### crawlora_sec_financials

```json
{
  "type": "object",
  "properties": {
    "ticker": {
      "type": "string",
      "description": "Ticker symbol, e.g. AAPL."
    },
    "cik": {
      "type": "string",
      "description": "SEC CIK (alternative to ticker)."
    },
    "statement": {
      "anyOf": [
        {
          "type": "string",
          "const": "income"
        },
        {
          "type": "string",
          "const": "balance"
        },
        {
          "type": "string",
          "const": "cash_flow"
        }
      ],
      "description": "Financial statement (default income)."
    },
    "period": {
      "anyOf": [
        {
          "type": "string",
          "const": "annual"
        },
        {
          "type": "string",
          "const": "quarterly"
        }
      ],
      "description": "Reporting period (default annual)."
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 20,
      "description": "Number of periods (1-20, default 5)."
    }
  }
}
```

### crawlora_sec_filings

```json
{
  "type": "object",
  "properties": {
    "ticker": {
      "type": "string",
      "description": "Ticker symbol, e.g. AAPL."
    },
    "cik": {
      "type": "string",
      "description": "SEC CIK (alternative to ticker)."
    },
    "form": {
      "type": "string",
      "description": "Form type, e.g. 10-K, 10-Q, 8-K."
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 500,
      "description": "Max filings (1-500, default 50)."
    }
  }
}
```

### crawlora_sec_filing_sections

```json
{
  "type": "object",
  "required": [
    "accession"
  ],
  "properties": {
    "accession": {
      "type": "string",
      "description": "Accession number, e.g. 0000320193-25-000079."
    },
    "ticker": {
      "type": "string",
      "description": "Ticker symbol, e.g. AAPL."
    },
    "cik": {
      "type": "string",
      "description": "SEC CIK (alternative to ticker)."
    },
    "items": {
      "type": "string",
      "description": "Comma-separated item numbers, e.g. 1A,7."
    }
  }
}
```

### crawlora_sec_full_text_search

```json
{
  "type": "object",
  "required": [
    "q"
  ],
  "properties": {
    "q": {
      "type": "string",
      "description": "Search query (supports quoted phrases)."
    },
    "forms": {
      "type": "string",
      "description": "Comma-separated form types, e.g. 10-K."
    }
  }
}
```

### crawlora_sec_insider

```json
{
  "type": "object",
  "properties": {
    "ticker": {
      "type": "string",
      "description": "Ticker symbol, e.g. AAPL."
    },
    "cik": {
      "type": "string",
      "description": "SEC CIK (alternative to ticker)."
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 30,
      "description": "Max transactions (1-30, default 10)."
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
