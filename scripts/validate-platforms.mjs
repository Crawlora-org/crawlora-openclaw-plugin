import {spawnSync} from 'node:child_process';
import {platforms} from './platforms.mjs';
for(const {slug} of platforms){
 const result=spawnSync(process.execPath,['../../node_modules/openclaw/openclaw.mjs','plugins','validate','--entry','./dist/index.js'],{cwd:new URL(`../packages/${slug}/`,import.meta.url),stdio:'inherit'});
 if(result.status!==0)process.exit(result.status??1);
}
