import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
const ROOT='public';
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.xml':'application/xml','.txt':'text/plain','.svg':'image/svg+xml'};
createServer(async (req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  let f=join(ROOT,p);
  try{ const s=await stat(f); if(s.isDirectory()) f=join(f,'index.html'); }
  catch{ try{ await stat(join(ROOT,p,'index.html')); f=join(ROOT,p,'index.html'); }catch{ f=join(ROOT,'404.html'); res.statusCode=404; } }
  try{ const b=await readFile(f); res.setHeader('Content-Type',MIME[extname(f)]||'application/octet-stream'); res.end(b); }
  catch{ res.statusCode=404; res.end('404'); }
}).listen(4321,()=>console.log('http://localhost:4321'));
