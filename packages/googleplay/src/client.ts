import { CrawloraClient, CrawloraError } from "@crawlora-org/sdk";

export interface PluginConfig { apiKey?: string }

/** Construct per call so config reloads never reuse another API key. */
export async function callCrawlora(
  config: PluginConfig,
  signal: AbortSignal | undefined,
  operation: Parameters<CrawloraClient["request"]>[0],
  params: Record<string, unknown>,
): Promise<{ data: unknown }> {
  signal?.throwIfAborted();
  const apiKey = (config.apiKey || process.env.CRAWLORA_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("Crawlora API key missing. Set plugins.entries.crawlora-googleplay.config.apiKey or CRAWLORA_API_KEY.");
  }
  if (operation.startsWith("sec-") && !["sec-company-search", "sec-full-text-search"].includes(operation)) {
    if (!String(params.ticker ?? "").trim() && !String(params.cik ?? "").trim()) {
      throw new Error("Provide ticker or cik for this SEC tool.");
    }
  }
  if (operation === "jobs-hiring-signals") {
    const required: Record<string, string[]> = {
      greenhouse: ["token"], lever: ["company"], ashby: ["org"],
      smartrecruiters: ["company"], workday: ["tenant", "datacenter", "site"],
    };
    for (const field of required[String(params.provider)] ?? []) {
      if (!String(params[field] ?? "").trim()) throw new Error(`Provide ${field} for ${params.provider}.`);
    }
  }
  const client = new CrawloraClient({
    apiKey,
    // Keep credentials on Crawlora even if the host sets CRAWLORA_BASE_URL.
    baseUrl: "https://api.crawlora.net/api/v1",
    timeout: 60_000,
    retries: 0,
    userAgent: "crawlora-googleplay/1.0.0",
  });
  try {
    // Wrap domain fields so OpenClaw does not grade a domain `status` as failure.
    return { data: await client.request(operation, params, { signal }) };
  } catch (error) {
    signal?.throwIfAborted();
    if (error instanceof CrawloraError) {
      const hint = error.status === 401 || error.status === 403
        ? "Check the Crawlora API key and account permissions."
        : error.status === 429 ? "Rate or credit limit reached; check your Crawlora dashboard."
        : error.status >= 500 ? "Upstream data is temporarily unavailable."
        : error.status === 0 ? "The request timed out or the API could not be reached."
        : "Check the tool parameters.";
      // Raw upstream error bodies and request headers may contain sensitive data.
      throw new Error(`Crawlora ${operation} failed (HTTP ${error.status}). ${hint}`);
    }
    throw new Error(`Crawlora ${operation} failed before a response was available.`);
  }
}
