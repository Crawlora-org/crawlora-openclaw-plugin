import {platforms} from './platforms.mjs';
if(!process.env.CRAWLORA_API_KEY)throw new Error('Set CRAWLORA_API_KEY; these calls use API credits.');
const cases={amazon:['crawlora_amazon_search',{k:'coffee grinder'}],youtube:['crawlora_youtube_transcript',{id:'jNQXAC9IVRw'}],google:['crawlora_google_news',{q:'OpenClaw',count:3}],sec:['crawlora_sec_company_search',{q:'AAPL'}],bing:['crawlora_bing_search',{q:'battery recycling',count:3}],ebay:['crawlora_ebay_search',{q:'mechanical keyboard'}],'yahoo-finance':['crawlora_yahoo_finance_ticker_quote',{ticker:'AAPL'}],greenhouse:['crawlora_jobs_greenhouse_board',{token:'stripe'}],lever:['crawlora_jobs_lever_postings',{company:'spotify'}],ashby:['crawlora_jobs_ashby_board',{org:'openai'}],jobs:['crawlora_jobs_company_search',{slug:'stripe'}]};
const selected=process.argv.slice(2);
for(const slug of selected)if(!platforms.some(p=>p.slug===slug))throw new Error('Unknown platform: '+slug);
const results=await Promise.allSettled(platforms.filter(p=>!selected.length||selected.includes(p.slug)).map(async({slug})=>{
 const modulePath=process.env.PLATFORM_INSTALLED_ROOT?`${process.env.PLATFORM_INSTALLED_ROOT}/crawlora-${slug}/dist/index.js`:`../packages/${slug}/dist/index.js`;
 const plugin=(await import(modulePath)).default;
 const tools=new Map();plugin.register({config:{},pluginConfig:{},registerTool:t=>tools.set(t.name,t)});
 const [tool,params]=cases[slug];const result=await tools.get(tool).execute('live-platform-smoke',params);
 if(!result.details?.data)throw new Error(`${slug}: missing data`);
 console.log(`${slug}: live response, ${JSON.stringify(result.details.data).length} bytes`);
 return slug;
}));
for(const r of results)if(r.status==='rejected'){console.error(r.reason.message);process.exitCode=1;}
