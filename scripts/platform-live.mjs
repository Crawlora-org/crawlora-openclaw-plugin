import {platforms} from './platforms.mjs';
if(!process.env.CRAWLORA_API_KEY)throw new Error('Set CRAWLORA_API_KEY; these calls use API credits.');
const cases={amazon:['crawlora_amazon_search',{k:'coffee grinder'}],youtube:['crawlora_youtube_transcript',{id:'jNQXAC9IVRw'}],google:['crawlora_google_news',{q:'OpenClaw',count:3}],sec:['crawlora_sec_company_search',{q:'AAPL'}]};
const results=await Promise.allSettled(platforms.map(async({slug})=>{
 const modulePath=process.env.PLATFORM_INSTALLED_ROOT?`${process.env.PLATFORM_INSTALLED_ROOT}/crawlora-${slug}/dist/index.js`:`../packages/${slug}/dist/index.js`;
 const plugin=(await import(modulePath)).default;
 const tools=new Map();plugin.register({config:{},pluginConfig:{},registerTool:t=>tools.set(t.name,t)});
 const [tool,params]=cases[slug];const result=await tools.get(tool).execute('live-platform-smoke',params);
 if(!result.details?.data)throw new Error(`${slug}: missing data`);
 console.log(`${slug}: live response, ${JSON.stringify(result.details.data).length} bytes`);
 return slug;
}));
for(const r of results)if(r.status==='rejected'){console.error(r.reason.message);process.exitCode=1;}
