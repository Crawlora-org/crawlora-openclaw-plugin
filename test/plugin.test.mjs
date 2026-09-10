import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Value } from 'typebox/value';
import plugin from '../dist/index.js';
import { callCrawlora } from '../dist/client.js';
import { getToolPluginMetadata } from 'openclaw/plugin-sdk/tool-plugin';

function tools(config = {apiKey: 'test-key'}) {
  const registered = new Map();
  plugin.register({pluginConfig: config, registerTool: tool => registered.set(tool.name, tool)});
  return registered;
}
import { cases } from './cases.mjs';

function checkUrl(actual, expected) {
 const a=new URL(actual), b=new URL('https://api.crawlora.net/api/v1'+expected);
 assert.equal(a.origin+a.pathname,b.origin+b.pathname);
 assert.deepEqual([...a.searchParams].sort(),[...b.searchParams].sort());
}

test('every registered tool has a request contract test and unique metadata', () => {
 const metadata=getToolPluginMetadata(plugin);
 assert.equal(metadata.tools.length,23);
 assert.deepEqual([...tools().keys()].sort(),cases.map(x=>'crawlora_'+x[0]).sort());
 assert.deepEqual(metadata.tools.map(x=>x.name).sort(),[...tools().keys()].sort());
});
for (const [name,params,method,path,body] of cases) {
 test(`${name}: schema, SDK request, authentication and structured result`,async t=>{
  let calls=0;
  t.mock.method(globalThis,'fetch',async (url,options)=>{
   calls++; checkUrl(url,path); assert.equal(options.method,method);
   assert.equal(new Headers(options.headers).get('x-api-key'),'test-key');
   assert.deepEqual(options.body ? JSON.parse(options.body) : undefined,body);
   return Response.json({code:200,msg:'ok',data:{value:'fixture',status:'active'}});
  });
  const tool=tools().get('crawlora_'+name);
  assert.ok(Value.Check(tool.parameters,params));
  const result=await tool.execute('test-call',params);
  assert.equal(calls,1); assert.ok(result.details.data);
  assert.equal(result.details.status,undefined);
  assert.ok(result.content[0].text.includes('fixture'));
 });
}
test('new configuration uses new credentials; host base URL cannot redirect credentials',async t=>{
 const previous=process.env.CRAWLORA_BASE_URL; t.after(()=>{if(previous===undefined)delete process.env.CRAWLORA_BASE_URL;else process.env.CRAWLORA_BASE_URL=previous;}); process.env.CRAWLORA_BASE_URL='https://example.invalid';
 const seen=[];
 t.mock.method(globalThis,'fetch',async (url,opts)=>{checkUrl(url,'/bing/search?q=test');seen.push(new Headers(opts.headers).get('x-api-key'));return Response.json({ok:true});});
 await tools({apiKey:'first'}).get('crawlora_bing_search').execute('a',{q:'test'});
 await tools({apiKey:'second'}).get('crawlora_bing_search').execute('b',{q:'test'});
 assert.deepEqual(seen,['first','second']);
});
test('environment key fallback and missing key fail before network access',async t=>{
 const previous=process.env.CRAWLORA_API_KEY; t.after(()=>{if(previous===undefined)delete process.env.CRAWLORA_API_KEY;else process.env.CRAWLORA_API_KEY=previous;}); process.env.CRAWLORA_API_KEY='env-key';
 let calls=0;
 t.mock.method(globalThis,'fetch',async (_url,opts)=>{calls++;assert.equal(new Headers(opts.headers).get('x-api-key'),'env-key');return Response.json({ok:true});});
 await callCrawlora({},undefined,'bing-search',{q:'test'});
 process.env.CRAWLORA_API_KEY='';
 await assert.rejects(callCrawlora({},undefined,'bing-search',{q:'test'}),/API key missing/);
 assert.equal(calls,1);
});
test('rejects invalid number and enum values through declared schemas',()=>{
 const list=tools();
 for (const [name,params] of [['google_search',{q:'x',num:1}],['bing_search',{q:'x',count:1.5}],['sec_financials',{ticker:'AAPL',statement:'invalid'}],['jobs_hiring_signals',{provider:'invalid'}]]) {
  assert.equal(Value.Check(list.get('crawlora_'+name).parameters,params),false);
 }
});
test('conditional SEC and ATS parameters are checked before billing a request',async t=>{
 const fetch=t.mock.method(globalThis,'fetch',()=>{throw new Error('must not fetch');});
 await assert.rejects(callCrawlora({apiKey:'key'},undefined,'sec-financials',{}),/ticker or cik/);
 await assert.rejects(callCrawlora({apiKey:'key'},undefined,'jobs-hiring-signals',{provider:'workday',tenant:'x'}),/datacenter/);
 assert.equal(fetch.mock.callCount(),0);
});
test('pre-aborted calls never fetch; active calls pass cancellation to SDK',async t=>{
 const controller=new AbortController();controller.abort();
 await assert.rejects(callCrawlora({apiKey:'key'},controller.signal,'bing-search',{q:'test'}),{name:'AbortError'});
 const live=new AbortController();
 t.mock.method(globalThis,'fetch',async (_url,{signal})=>new Promise((resolve,reject)=>{
  signal.addEventListener('abort',()=>reject(signal.reason),{once:true});
  live.abort();
 }));
 await assert.rejects(callCrawlora({apiKey:'key'},live.signal,'bing-search',{q:'test'}),{name:'AbortError'});
});
for (const status of [401,403,429,503]) test(`HTTP ${status} is actionable, redacted, and not retried`,async t=>{
 const fetch=t.mock.method(globalThis,'fetch',async ()=>Response.json({code:status,msg:'sensitive-api-key'}, {status}));
 await assert.rejects(callCrawlora({apiKey:'key'},undefined,'bing-search',{q:'test'}),error=>error.message.includes(`HTTP ${status}`)&&!error.message.includes('sensitive-api-key'));
 assert.equal(fetch.mock.callCount(),1);
});
