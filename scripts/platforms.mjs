// Reviewed first-batch package definitions; tools stay in src/index.ts.
export const platforms = [
 {slug:'amazon',title:'Amazon',tools:['crawlora_amazon_search','crawlora_amazon_product'],example:'Search Amazon for noise cancelling headphones and inspect a matching product.',summary:'Amazon product search and product details through Crawlora.'},
 {slug:'youtube',title:'YouTube',tools:['crawlora_youtube_transcript'],example:'Get the transcript of YouTube video dQw4w9WgXcQ.',summary:'YouTube video transcripts through Crawlora.'},
 {slug:'google',title:'Google',tools:['crawlora_google_search','crawlora_google_news','crawlora_google_videos','crawlora_google_trends_explore','crawlora_google_map_search'],example:'Find coffee shops in San Francisco and search for recent coffee industry news.',summary:'Google search, news, videos, Maps, and Trends through Crawlora.'},
 {slug:'sec',version:'1.0.1',schemaMetadata:true,title:'SEC EDGAR',tools:['crawlora_sec_company_search','crawlora_sec_company_intelligence','crawlora_sec_financials','crawlora_sec_filings','crawlora_sec_filing_sections','crawlora_sec_full_text_search','crawlora_sec_insider'],example:'Resolve AAPL, then get annual financials and recent SEC filings.',summary:'SEC EDGAR company research, financial statements, filings, and insider transactions through Crawlora.'},
];
