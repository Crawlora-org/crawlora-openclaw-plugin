# Rottentomatoes by Crawlora

Public Rottentomatoes data through Crawlora. This package exposes 1 curated tools. It is an independent Crawlora integration, not an official Rottentomatoes or OpenClaw product.

## Install

Requires OpenClaw **2026.9.3**, Node **>=24.16.0 <25 or >=26.1.0**, and a [Crawlora API key](https://crawlora.net). Requests use your account credits and rate limits.

```sh
openclaw plugins install clawhub:@crawlora-org/rottentomatoes --accept-capabilities
```

The flag consents to the tools listed below. These platform plugins can run together. If you have the overlapping Crawlora starter plugin enabled, first run `openclaw plugins disable crawlora`; this plugin refuses registration while that starter is enabled. Do not re-enable both at once.

Set `CRAWLORA_API_KEY` in your Gateway process environment, or merge this into your existing OpenClaw config:

```json
{
  "plugins": {
    "entries": {
      "crawlora-rottentomatoes": {
        "enabled": true,
        "config": {
          "apiKey": "${CRAWLORA_API_KEY}"
        }
      }
    }
  }
}
```

Restart the Gateway. If using plugin/tool allowlists, add `crawlora-rottentomatoes` to the existing policy. Config takes precedence over the environment. Each platform has its own config entry; all can use the same Crawlora key.

```sh
openclaw plugins inspect crawlora-rottentomatoes --runtime --json
```

## Example

“Retrieve public Rottentomatoes data.”

## Tools

| Tool | Purpose |
| --- | --- |
| `crawlora_rottentomatoes_browse_movies` | Use Crawlora to access public Rottentomatoes data. |

## Parameters

These are the exact generated input schemas.

### crawlora_rottentomatoes_browse_movies

```json
{
  "type": "object",
  "properties": {
    "list": {
      "anyOf": [
        {
          "type": "string",
          "const": "movies_in_theaters"
        },
        {
          "type": "string",
          "const": "movies_at_home"
        },
        {
          "type": "string",
          "const": "movies_coming_soon"
        }
      ],
      "description": "list parameter."
    },
    "sort": {
      "anyOf": [
        {
          "type": "string",
          "const": "popular"
        },
        {
          "type": "string",
          "const": "newest"
        },
        {
          "type": "string",
          "const": "top_box_office"
        },
        {
          "type": "string",
          "const": "a_z"
        },
        {
          "type": "string",
          "const": "critic_highest"
        },
        {
          "type": "string",
          "const": "critic_lowest"
        },
        {
          "type": "string",
          "const": "audience_highest"
        },
        {
          "type": "string",
          "const": "audience_lowest"
        }
      ],
      "description": "sort parameter."
    },
    "genres": {
      "anyOf": [
        {
          "type": "string",
          "const": "action"
        },
        {
          "type": "string",
          "const": "adventure"
        },
        {
          "type": "string",
          "const": "animation"
        },
        {
          "type": "string",
          "const": "anime"
        },
        {
          "type": "string",
          "const": "biography"
        },
        {
          "type": "string",
          "const": "comedy"
        },
        {
          "type": "string",
          "const": "crime"
        },
        {
          "type": "string",
          "const": "documentary"
        },
        {
          "type": "string",
          "const": "drama"
        },
        {
          "type": "string",
          "const": "entertainment"
        },
        {
          "type": "string",
          "const": "faith_and_spirituality"
        },
        {
          "type": "string",
          "const": "fantasy"
        },
        {
          "type": "string",
          "const": "game_show"
        },
        {
          "type": "string",
          "const": "lgbtq"
        },
        {
          "type": "string",
          "const": "health_and_wellness"
        },
        {
          "type": "string",
          "const": "history"
        },
        {
          "type": "string",
          "const": "holiday"
        },
        {
          "type": "string",
          "const": "horror"
        },
        {
          "type": "string",
          "const": "house_and_garden"
        },
        {
          "type": "string",
          "const": "kids_and_family"
        },
        {
          "type": "string",
          "const": "music"
        },
        {
          "type": "string",
          "const": "musical"
        },
        {
          "type": "string",
          "const": "mystery_and_thriller"
        },
        {
          "type": "string",
          "const": "nature"
        },
        {
          "type": "string",
          "const": "news"
        },
        {
          "type": "string",
          "const": "reality"
        },
        {
          "type": "string",
          "const": "romance"
        },
        {
          "type": "string",
          "const": "sci_fi"
        },
        {
          "type": "string",
          "const": "short"
        },
        {
          "type": "string",
          "const": "soap"
        },
        {
          "type": "string",
          "const": "special_interest"
        },
        {
          "type": "string",
          "const": "sports"
        },
        {
          "type": "string",
          "const": "stand_up"
        },
        {
          "type": "string",
          "const": "talk_show"
        },
        {
          "type": "string",
          "const": "travel"
        },
        {
          "type": "string",
          "const": "variety"
        },
        {
          "type": "string",
          "const": "war"
        },
        {
          "type": "string",
          "const": "western"
        }
      ],
      "description": "genres parameter."
    },
    "ratings": {
      "anyOf": [
        {
          "type": "string",
          "const": "g"
        },
        {
          "type": "string",
          "const": "pg"
        },
        {
          "type": "string",
          "const": "pg_13"
        },
        {
          "type": "string",
          "const": "r"
        },
        {
          "type": "string",
          "const": "nc_17"
        },
        {
          "type": "string",
          "const": "nr"
        },
        {
          "type": "string",
          "const": "ur"
        }
      ],
      "description": "ratings parameter."
    },
    "audience": {
      "anyOf": [
        {
          "type": "string",
          "const": "verified_hot"
        },
        {
          "type": "string",
          "const": "upright"
        },
        {
          "type": "string",
          "const": "spilled"
        }
      ],
      "description": "audience parameter."
    },
    "critics": {
      "anyOf": [
        {
          "type": "string",
          "const": "certified_fresh"
        },
        {
          "type": "string",
          "const": "fresh"
        },
        {
          "type": "string",
          "const": "rotten"
        }
      ],
      "description": "critics parameter."
    },
    "affiliates": {
      "anyOf": [
        {
          "type": "string",
          "const": "theaters"
        },
        {
          "type": "string",
          "const": "fandango"
        },
        {
          "type": "string",
          "const": "apple-tv-plus"
        },
        {
          "type": "string",
          "const": "netflix"
        },
        {
          "type": "string",
          "const": "prime-video"
        },
        {
          "type": "string",
          "const": "disney-plus"
        },
        {
          "type": "string",
          "const": "max"
        },
        {
          "type": "string",
          "const": "peacock"
        },
        {
          "type": "string",
          "const": "hulu"
        },
        {
          "type": "string",
          "const": "paramount-plus"
        },
        {
          "type": "string",
          "const": "amc-plus"
        },
        {
          "type": "string",
          "const": "acorn-tv"
        },
        {
          "type": "string",
          "const": "apple-tv"
        }
      ],
      "description": "affiliates parameter."
    },
    "after": {
      "type": "string",
      "description": "after parameter."
    },
    "limit": {
      "type": "integer",
      "description": "limit parameter."
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
