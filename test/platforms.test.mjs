import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Value} from 'typebox/value';
import {platforms} from '../scripts/platforms.mjs';
import {cases} from './cases.mjs';

const combined=new Map();
const config={plugins:{entries:Object.fromEntries(platforms.map(p=>['crawlora-'+p.slug,{enabled:true}]))}};
for(const platform of platforms){
 const plugin=(await import(`../packages/${platform.slug}/dist/index.js`)).default;
 const register=(cfg=config)=>{
  const registered=new Map();
  plugin.register({config:cfg,pluginConfig:{apiKey:'platform-key'},registerTool:t=>registered.set(t.name,t)});
  return registered;
 };
 const tools=register();
 for(const [name,tool] of tools){assert.ok(!combined.has(name),'platform names must not collide');combined.set(name,tool);}
 test(`${platform.slug}: isolated tool set and manifest matches registration`,()=>{
  const manifest=JSON.parse(readFileSync(new URL(`../packages/${platform.slug}/openclaw.plugin.json`,import.meta.url)));
  assert.equal(plugin.id,'crawlora-'+platform.slug);
  assert.deepEqual([...tools.keys()].sort(),[...platform.tools].sort());
  assert.deepEqual([...tools.keys()].sort(),manifest.contracts.tools.sort());
 });
 test(`${platform.slug}: prevents starter overlap before registering any tool`,()=>{
  let calls=0;
  assert.throws(()=>plugin.register({config:{plugins:{entries:{crawlora:{enabled:true}}}},registerTool:()=>calls++}),/Disable the Crawlora starter/);
  assert.equal(calls,0);
  assert.equal(register({plugins:{entries:{crawlora:{enabled:false}}}}).size,platform.tools.length);
 });
 for(const [short,params,method,path,body] of cases.filter(c=>platform.tools.includes('crawlora_'+c[0]))){
  test(`${platform.slug}: packaged ${short} serializes the expected SDK request`,async t=>{
   let calls=0;
   t.mock.method(globalThis,'fetch',async (url,options)=>{
    calls++;
    const actual=new URL(url),expected=new URL('https://api.crawlora.net/api/v1'+path);
    assert.equal(actual.origin+actual.pathname,expected.origin+expected.pathname);
    assert.deepEqual([...actual.searchParams].sort(),[...expected.searchParams].sort());
    assert.equal(options.method,method);
    assert.deepEqual(options.body?JSON.parse(options.body):undefined,body);
    assert.equal(new Headers(options.headers).get('x-api-key'),'platform-key');
    return Response.json({code:200,msg:'ok',data:{value:'fixture'}});
   });
   const tool=tools.get('crawlora_'+short);assert.ok(Value.Check(tool.parameters,params));
   const result=await tool.execute('platform-call',params);
   assert.equal(calls,1);assert.ok(result.details.data);
  });
 }
}
test('all eleven platforms coexist with exactly 23 distinct tools',()=>assert.equal(combined.size,23));

for(const platform of platforms.filter(p=>p.schemaMetadata))test(`${platform.slug}: uses the host secret-input contract without unsupported manifest metadata`,()=>{
 const manifest=JSON.parse(readFileSync(new URL(`../packages/${platform.slug}/openclaw.plugin.json`,import.meta.url)));
 assert.deepEqual(manifest.configContracts.secretInputs.paths,[{path:'apiKey',expected:'string'}]);
 assert.equal(manifest.uiHints,undefined);
 assert.equal(manifest.categories,undefined);
 const pkg=JSON.parse(readFileSync(new URL(`../packages/${platform.slug}/package.json`,import.meta.url)));
 assert.equal(manifest.version,pkg.version);
});
