import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
const OUT='public';
async function walk(d){const out=[];for(const e of await readdir(d,{withFileTypes:true})){const p=join(d,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const files=(await walk(OUT)).filter(f=>f.endsWith('.html'));
const routes=new Set(files.map(f=>{let r='/'+relative(OUT,f).replace(/index\.html$/,'').replace(/\/$/,'');return r===''?'/':r;}));
routes.add('/404');
// Routes servies par des fonctions serverless (voir les rewrites de vercel.json) :
// elles n'existent pas dans /public mais sont bien accessibles en ligne.
for(const r of ['/admin','/admin/commandes','/admin/clients','/admin/produits','/espace','/espace/connexion','/espace/diagnostic']) routes.add(r);
const assets=new Set((await walk(OUT)).map(f=>'/'+relative(OUT,f)));
let bad=0, jsonld=0, jsonldBad=0;
for(const f of files){
  const html=await readFile(f,'utf8');
  const page='/'+relative(OUT,f).replace(/index\.html$/,'').replace(/\/$/,'')||'/';
  for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)){
    const u=m[1].replace(/\/$/,'')||'/';
    if(assets.has(m[1])||assets.has(u)) continue;
    if(!routes.has(u)){ console.log(`  ✗ ${page} → ${m[1]}`); bad++; }
  }
  for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
    jsonld++;
    try{ JSON.parse(m[1]); }catch(e){ jsonldBad++; console.log(`  ✗ JSON-LD invalide dans ${page}: ${e.message}`); }
  }
  // titre / description
  const t=html.match(/<title>([^<]*)<\/title>/)?.[1]||'';
  const d=html.match(/<meta name="description" content="([^"]*)"/)?.[1]||'';
  const h1=[...html.matchAll(/<h1[^>]*>/g)].length;
  if(t.length<25||t.length>75) console.log(`  ⚠ titre ${t.length} car. — ${page}`);
  if(d.length<70||d.length>175) console.log(`  ⚠ description ${d.length} car. — ${page}`);
  if(h1!==1) console.log(`  ⚠ ${h1} balises H1 — ${page}`);
}
console.log(`\n${files.length} pages · ${routes.size} routes · ${jsonld} blocs JSON-LD (${jsonldBad} invalides) · ${bad} liens internes cassés`);
