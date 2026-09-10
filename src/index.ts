import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";

import { callCrawlora } from "./client.js";

/** Native tools backed by the published Crawlora SDK. */
export default defineToolPlugin({
  id: "crawlora",
  name: "Crawlora",
  description:
    "Live, structured web data — search engines, marketplaces, finance, maps, media, and trends.",
  configSchema: Type.Object({
    apiKey: Type.Optional(
      Type.String({
        description:
          "Crawlora API key. Falls back to the CRAWLORA_API_KEY environment variable."
      })
    )
  }),
  tools: (tool) => [
    tool({
      name: "crawlora_google_search",
      description: "Search Google and return organic results.",
      parameters: Type.Object({
        q: Type.String({ description: "Search query." }),
        num: Type.Optional(Type.Integer({ minimum: 10, maximum: 100, description: "Number of results (10-100)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "google-search", {
          searchOption: {
            keyword: params.q,
            country: "us",
            language: "en",
            ...(params.num === undefined ? {} : { limit: params.num })
          }
        });
      }
    }),
    tool({
      name: "crawlora_google_news",
      description: "Search Google News and return news results.",
      parameters: Type.Object({
        q: Type.String({ description: "Search query." }),
        count: Type.Optional(Type.Integer({ minimum: 1, maximum: 50, description: "Results per page (1-50)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "google-news", params);
      }
    }),
    tool({
      name: "crawlora_google_videos",
      description: "Search Google Videos and return video results.",
      parameters: Type.Object({
        q: Type.String({ description: "Search query." }),
        count: Type.Optional(Type.Integer({ minimum: 1, maximum: 50, description: "Results per page (1-50)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "google-videos", params);
      }
    }),
    tool({
      name: "crawlora_bing_search",
      description: "Search Bing and return organic results.",
      parameters: Type.Object({
        q: Type.String({ description: "Search query." }),
        count: Type.Optional(Type.Integer({ minimum: 1, maximum: 50, description: "Number of results (1-50)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "bing-search", params);
      }
    }),
    tool({
      name: "crawlora_amazon_search",
      description: "Search Amazon for products.",
      parameters: Type.Object({
        k: Type.String({ description: "Search keywords." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "amazon-search", params);
      }
    }),
    tool({
      name: "crawlora_amazon_product",
      description: "Fetch a single Amazon product by ASIN.",
      parameters: Type.Object({
        asin: Type.String({ description: "Amazon ASIN." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "amazon-product", params);
      }
    }),
    tool({
      name: "crawlora_ebay_search",
      description: "Search eBay listings.",
      parameters: Type.Object({
        q: Type.String({ description: "Search query." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "ebay-search", { option: { keyword: params.q } });
      }
    }),
    tool({
      name: "crawlora_youtube_transcript",
      description: "Fetch the transcript of a YouTube video.",
      parameters: Type.Object({
        id: Type.String({ description: "YouTube video id." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "youtube-transcript", params);
      }
    }),
    tool({
      name: "crawlora_yahoo_finance_ticker_quote",
      description: "Get a Yahoo Finance quote for a ticker.",
      parameters: Type.Object({
        ticker: Type.String({ description: "Ticker symbol, e.g. NVDA." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "yahoo-finance-ticker-quote", { symbol: params.ticker });
      }
    }),
    tool({
      name: "crawlora_sec_company_search",
      description: "Resolve a ticker or company name to SEC EDGAR companies (CIK, ticker, name).",
      parameters: Type.Object({
        q: Type.String({ description: "Ticker symbol or company name, e.g. apple or AAPL." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "sec-company-search", params);
      }
    }),
    tool({
      name: "crawlora_sec_company_intelligence",
      description: "A company 360 from SEC data: profile, latest financial snapshot, latest 10-K/10-Q/8-K, and recent events.",
      parameters: Type.Object({
        ticker: Type.Optional(Type.String({ description: "Ticker symbol, e.g. AAPL." })),
        cik: Type.Optional(Type.String({ description: "SEC CIK (alternative to ticker)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "sec-company-intelligence", params);
      }
    }),
    tool({
      name: "crawlora_sec_financials",
      description: "Normalized SEC financial statements (income, balance sheet, or cash flow) with computed margins and ratios.",
      parameters: Type.Object({
        ticker: Type.Optional(Type.String({ description: "Ticker symbol, e.g. AAPL." })),
        cik: Type.Optional(Type.String({ description: "SEC CIK (alternative to ticker)." })),
        statement: Type.Optional(Type.Union([
          Type.Literal("income"),
          Type.Literal("balance"),
          Type.Literal("cash_flow")
        ], { description: "Financial statement (default income)." })),
        period: Type.Optional(Type.Union([
          Type.Literal("annual"),
          Type.Literal("quarterly")
        ], { description: "Reporting period (default annual)." })),
        limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 20, description: "Number of periods (1-20, default 5)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "sec-financials", params);
      }
    }),
    tool({
      name: "crawlora_sec_filings",
      description: "List a company SEC EDGAR filings, filtered by form type and date.",
      parameters: Type.Object({
        ticker: Type.Optional(Type.String({ description: "Ticker symbol, e.g. AAPL." })),
        cik: Type.Optional(Type.String({ description: "SEC CIK (alternative to ticker)." })),
        form: Type.Optional(Type.String({ description: "Form type, e.g. 10-K, 10-Q, 8-K." })),
        limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 500, description: "Max filings (1-500, default 50)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "sec-company-submissions", params);
      }
    }),
    tool({
      name: "crawlora_sec_filing_sections",
      description: "Extract 10-K/10-Q/8-K item sections (Risk Factors, MD&A, etc.) from a filing as clean text.",
      parameters: Type.Object({
        accession: Type.String({ description: "Accession number, e.g. 0000320193-25-000079." }),
        ticker: Type.Optional(Type.String({ description: "Ticker symbol, e.g. AAPL." })),
        cik: Type.Optional(Type.String({ description: "SEC CIK (alternative to ticker)." })),
        items: Type.Optional(Type.String({ description: "Comma-separated item numbers, e.g. 1A,7." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "sec-filing-sections", params);
      }
    }),
    tool({
      name: "crawlora_sec_full_text_search",
      description: "Full-text search across SEC EDGAR filings, filtered by form and date.",
      parameters: Type.Object({
        q: Type.String({ description: "Search query (supports quoted phrases)." }),
        forms: Type.Optional(Type.String({ description: "Comma-separated form types, e.g. 10-K." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "sec-full-text-search", params);
      }
    }),
    tool({
      name: "crawlora_sec_insider",
      description: "Recent insider transactions (Forms 3/4/5) for a company.",
      parameters: Type.Object({
        ticker: Type.Optional(Type.String({ description: "Ticker symbol, e.g. AAPL." })),
        cik: Type.Optional(Type.String({ description: "SEC CIK (alternative to ticker)." })),
        limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 30, description: "Max transactions (1-30, default 10)." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "sec-insider", params);
      }
    }),
    tool({
      name: "crawlora_jobs_hiring_signals",
      description: "Aggregate a company's ATS job board into hiring signals: total open roles, department/location breakdowns, remote share, and how many roles are new in the last 7/30 days.",
      parameters: Type.Object({
        provider: Type.Union([
          Type.Literal("greenhouse"),
          Type.Literal("lever"),
          Type.Literal("ashby"),
          Type.Literal("workday"),
          Type.Literal("smartrecruiters")
        ], { description: "ATS provider." }),
        token: Type.Optional(Type.String({ description: "Greenhouse board token." })),
        company: Type.Optional(Type.String({ description: "Lever or SmartRecruiters company slug." })),
        org: Type.Optional(Type.String({ description: "Ashby org slug." })),
        tenant: Type.Optional(Type.String({ description: "Workday tenant." })),
        datacenter: Type.Optional(Type.String({ description: "Workday datacenter shard (wd1, wd3, wd5...)." })),
        site: Type.Optional(Type.String({ description: "Workday career site." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "jobs-hiring-signals", params);
      }
    }),
    tool({
      name: "crawlora_jobs_company_search",
      description: "Find which ATS (Greenhouse, Lever, Ashby, SmartRecruiters) a company uses from its careers slug, with open-role counts.",
      parameters: Type.Object({
        slug: Type.String({ description: "Company careers slug, e.g. stripe." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "jobs-company-search", params);
      }
    }),
    tool({
      name: "crawlora_jobs_greenhouse_board",
      description: "List a company's public Greenhouse job board postings, normalized to a shared Job shape.",
      parameters: Type.Object({
        token: Type.String({ description: "Greenhouse board token (careers URL slug), e.g. stripe." }),
        content: Type.Optional(Type.Boolean({ description: "Include full HTML description per job." }))
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "jobs-greenhouse-board", params);
      }
    }),
    tool({
      name: "crawlora_jobs_lever_postings",
      description: "List a company's public Lever job postings, normalized.",
      parameters: Type.Object({
        company: Type.String({ description: "Lever company slug, e.g. spotify." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "jobs-lever-postings", params);
      }
    }),
    tool({
      name: "crawlora_jobs_ashby_board",
      description: "List an organization's public Ashby job board postings, normalized.",
      parameters: Type.Object({
        org: Type.String({ description: "Ashby org slug, e.g. openai." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "jobs-ashby-board", params);
      }
    }),
    tool({
      name: "crawlora_google_trends_explore",
      description: "Explore Google Trends interest for a query.",
      parameters: Type.Object({
        q: Type.String({ description: "Query or topic to explore." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "google-trends-explore", { request: { keywords: [params.q] } });
      }
    }),
    tool({
      name: "crawlora_google_map_search",
      description: "Search Google Maps for places.",
      parameters: Type.Object({
        q: Type.String({ description: "Place or business search query." })
      }),
      async execute(params, config, context) {
        return callCrawlora(config, context.signal, "google-map-search", { mapSearchOption: { keyword: params.q } });
      }
    })
  ]
});
