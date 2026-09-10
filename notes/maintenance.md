# Maintainer notes

## Initial build (2026-09-10)

This standalone repository supersedes the native plugin scaffold in `Crawlora-org/crawlora-openclaw-skill/plugins/crawlora`. That repository continues to host the skill/MCP integration documentation. Skills are instruction bundles; they are not automatically MCP servers.

The first build was tested with Node 24.16.0, OpenClaw 2026.9.3, TypeBox 1.3.18, Crawlora SDK 1.41.0-sdk.1, and ClawHub CLI 0.23.3. All 33 tests passed, covering every one of the 23 registered tools. Live Bing search and SEC company search succeeded with a maintainer smoke key. No key belongs in source, test fixtures, artifacts, or release output.

Use an isolated OpenClaw state/config when testing installs (`OPENCLAW_STATE_DIR` and `OPENCLAW_CONFIG_PATH`). A local npm-pack install requires both `--force` (trust this locally built archive) and `--accept-capabilities` (consent to its tools). A public ClawHub install still needs the capability consent. The manifest id is `crawlora`; the package name is `@crawlora-org/openclaw-plugin`. Configuration belongs under `plugins.entries.crawlora.config`.

The real `npm-pack:` installation resolved runtime dependencies and reported `status: loaded`, all 23 tool names, and the sensitive API-key UI hint. Do not replace this proof with source-only imports.

ClawHub CLI 0.23.3's Plugin Inspector passed its 2026.9.3 check with one P2 `manifest-unknown-fields` finding for `categories` and `uiHints`. This is a metadata-inspector mismatch, not a runtime failure: the current ClawHub publishing docs require category selection in the root manifest; the shipped OpenClaw manifest loader explicitly reads `raw.uiHints`, and runtime inspection preserved `configUiHints.apiKey.sensitive: true`. Keep both fields; recheck the warning on inspector upgrades rather than deleting functional configuration hints.

Sources:

- https://docs.openclaw.ai/plugins/tool-plugins
- https://docs.openclaw.ai/plugins/building-plugins
- https://docs.openclaw.ai/clawhub/publishing

## Contract and billing details

Tool names have a `crawlora_` prefix to avoid collisions. The adapter calls SDK operation ids (dash-separated), not MCP tool names. Google, eBay, Maps, and Trends require the SDK's named body parameter wrappers; HTTP contract tests verify the serialized body.

Keep the API base URL pinned: SDK environment overrides must not redirect API keys to arbitrary hosts. Construct a client per call so configuration reloads cannot reuse another key. Pass the tool abort signal. Keep automatic retries disabled unless the billing consequences have been explicitly addressed. Return domain responses under `data` because OpenClaw grades some top-level status/error fields as execution outcomes.

The plugin's hiring-signals surface intentionally supports five providers; do not describe it as the full upstream provider set. SEC tools validate ticker/CIK before a request; provider-specific hiring arguments are likewise checked before a credit-consuming call.
