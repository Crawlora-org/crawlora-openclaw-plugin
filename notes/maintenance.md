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

## Published v1.0.0 (2026-09-10)

- ClawHub: https://clawhub.ai/crawlora-org/plugins/openclaw-plugin
- GitHub release: https://github.com/Crawlora-org/crawlora-openclaw-plugin/releases/tag/v1.0.0
- Published source commit: `5ba2320abe4e68a7054fb866da68c20d0107d648` (subsequent maintenance notes are not part of the package allowlist).
- ClawHub release id: `rd7cj69fvf0szg7jtr220j3brn8e5czg`; publication attempt: `zx7f6jkxmwkrbndmys4d6f0ak98e41k2`; final status: `published`.
- Artifact SHA-256: `d7f4260fb3e1be48ad1d92b93e2883b08a9000ecf6dc66e6990c3c44e525a6e6` (7,825 bytes), downloaded and digest-verified through the ClawHub CLI. The same bytes are attached to the GitHub release.
- Security audit outcome: **Safe**. The nonblocking P2 metadata inspector warning described above remains; publication succeeded.
- A fresh profile installed `clawhub:@crawlora-org/openclaw-plugin --accept-capabilities`, then runtime inspection returned `status: loaded`, 23 tools, and all required dependencies installed. A live SEC lookup through that publicly downloaded artifact succeeded.
- The old skill repository now links users to this maintained standalone plugin.

This is a community package published by Crawlora, not an OpenClaw-official plugin. OpenClaw 2026.9.3's trust inspection uses a catch-all `provenance-invalid` reason for recorded community installs that do not satisfy its official-plugin predicate; the install audit, artifact verification, loaded runtime, and empty diagnostics above are the relevant functional checks.

## Platform package split (2026-09-10)

The first four platform packages are `@crawlora-org/amazon` (2 tools), `@crawlora-org/youtube` (1), `@crawlora-org/google` (5), and `@crawlora-org/sec` (7), with runtime ids `crawlora-<platform>` and platform-branded display names. They are curated subsets of the existing starter, not full copies of every corresponding REST endpoint.

`src/index.ts` remains the reviewed tool catalog. `scripts/platforms.mjs` selects tools and identities; `scripts/build-platforms.mjs` uses the TypeScript AST to generate per-package source, compiled JS, manifest, and docs. Each package includes its own compiled shared client and depends only on the public SDK, TypeBox, and the OpenClaw host. There are no imports of another plugin at runtime. Changes to generated files belong in the catalog, client, or generator; CI checks regeneration drift.

Platform packages retain the established `crawlora_<family>_<action>` tool names. They can coexist with one another, but must not run alongside the overlapping starter. Their registration guard rejects an enabled `plugins.entries.crawlora` entry before registering any tools; disable the starter first and do not re-enable it alongside the platform packages.

Release a built `packages/<platform>` directory, not the monorepo root. The root package is the already published starter. Keep each package version and source commit pinned in release receipts. A repeat release must inspect existing registry state before publishing; never overwrite a version after uncertain upload output.

Live pre-release checks: Amazon search, YouTube transcript (`jNQXAC9IVRw`), Google News, and SEC company search succeeded. Google organic search returned HTTP 503 on two separate queries (`OpenClaw` and `coffee`); the adapter's HTTP contract test passed and its error mapping surfaced the upstream failure correctly. Treat this as a known service-availability limitation, not a passing live search check. The standard platform smoke uses Google News; do not misreport it as validating organic search.

All 57 automated tests passed, including each platform's exact HTTP contract, tool inventory, and overlap guard. All four packages passed the real OpenClaw validator and ClawHub Plugin Inspector, retaining only the known P2 metadata warning above. Four local npm-pack installs loaded together with 15 unique tools.

YouTube, Google, and SEC v1.0.0 passed both registry checks and their public security summaries report clean, non-pending, non-stale, and unblocked. Fresh ClawHub installs loaded 1/5/7 tools respectively; exact public downloads matched their release SHA-256 digests. Live calls through those installed artifacts succeeded for YouTube transcripts, Google News, and SEC company lookup. See `notes/releases/platforms-1.0.0.json` for per-package receipts.

Amazon's first upload failed inside ClawHub's Convex inspector with a 512 MB memory limit before creating a package. After confirming the package did not exist, the normal retry created a staged release. That attempt then reported an operational ClawScan judge error: `Judge artifact inspection did not include required file artifact/package.json.` The packed artifact does contain `package/package.json`; this was not a security verdict. ClawHub's published source retries scanner failures with a five-minute backoff, up to three consecutive failures. Preserve the attempt while active; the documented recovery endpoint only accepts failed attempts and reuses retained bytes under fresh checks. Do not duplicate pending uploads or bypass checks.

The GitHub batch release is https://github.com/Crawlora-org/crawlora-openclaw-plugin/releases/tag/platforms-v1.0.0. It contains the three verified public YouTube/Google/SEC artifacts, whose GitHub digests match ClawHub. Amazon is explicitly marked pending there; no Amazon binary is attached while its registry scan is unresolved. Resume with the saved attempt ID, then verify a public download and installation before attaching Amazon or claiming all four published.
