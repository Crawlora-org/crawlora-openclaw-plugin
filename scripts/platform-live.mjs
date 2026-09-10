import {platforms} from './platforms.mjs';
if(!process.env.CRAWLORA_API_KEY)throw new Error('Set CRAWLORA_API_KEY; these calls use API credits.');
const cases={amazon:['crawlora_amazon_search',{k:'coffee grinder'}],youtube:['crawlora_youtube_transcript',{id:'jNQXAC9IVRw'}],google:['crawlora_google_news',{q:'OpenClaw',count:3}],sec:['crawlora_sec_company_search',{q:'AAPL'}],bing:['crawlora_bing_search',{q:'battery recycling',count:3}],ebay:['crawlora_ebay_search',{q:'mechanical keyboard'}],'yahoo-finance':['crawlora_yahoo_finance_ticker_quote',{ticker:'AAPL'}],greenhouse:['crawlora_jobs_greenhouse_board',{token:'stripe'}],lever:['crawlora_jobs_lever_postings',{company:'spotify'}],ashby:['crawlora_jobs_ashby_board',{org:'openai'}],jobs:['crawlora_jobs_company_search',{slug:'stripe'}],spotify:['crawlora_spotify_search',{q:'ambient focus',limit:3}],tiktok:['crawlora_tiktok_post',{id:'7350000000000000000'}],reddit:['crawlora_reddit_search',{q:'web scraping',limit:3}],github:['crawlora_github_search_repositories',{q:'browser automation',per_page:3}],pinterest:['crawlora_pinterest_search',{query:'minimalist kitchen'}],airbnb:['crawlora_airbnb_search',{location:'Lisbon'}],booking:['crawlora_booking_search',{query:'Tokyo',checkin:'2026-10-10',checkout:'2026-10-12',adults:2}],yelp:['crawlora_yelp_search',{term:'ramen',location:'San Francisco',limit:3}],zillow:['crawlora_zillow_search',{location:'Austin, TX'}],imdb:['crawlora_imdb_search',{query:'science fiction',limit:3}],steam:['crawlora_steam_app',{appid:'440'}],coingecko:['crawlora_coingecko_markets',{vs_currency:'usd',limit:3}],polymarket:['crawlora_polymarket_events',{limit:3,closed:'false'}],kalshi:['crawlora_kalshi_events',{limit:3,status:'open'}],'apple-books':['crawlora_apple_books_search',{term:'machine learning',limit:3}], 'apple-jobs':['crawlora_apple_jobs_search',{q:'machine learning',page:1}],opensea:['crawlora_opensea_collection',{slug:'boredapeyachtclub'}]};
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
