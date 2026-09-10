import assert from 'node:assert/strict';
import plugin from '../dist/index.js';
if (!process.env.CRAWLORA_API_KEY) throw new Error('Set CRAWLORA_API_KEY; this test consumes API credits.');
const tools=new Map();
plugin.register({pluginConfig:{},registerTool:tool=>tools.set(tool.name,tool)});
for (const [name,params] of [['crawlora_bing_search',{q:'OpenClaw',count:3}],['crawlora_sec_company_search',{q:'AAPL'}]]) {
 const result=await tools.get(name).execute('live-smoke',params);
 assert.ok(result.details.data);
 console.log(`${name}: live response received (${JSON.stringify(result.details.data).length} bytes)`);
}
