const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const RECEIVER = 'ashish.sagu2007@gmail.com';
// Load simple KEY=value entries from .env without exposing secrets to the browser.
try { for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split(/\r?\n/)) { const match=line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if(match && !match[1].startsWith('#') && !process.env[match[1]]) process.env[match[1]]=match[2].replace(/^['"]|['"]$/g,''); } } catch {}
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.mp4':'video/mp4','.svg':'image/svg+xml','.ico':'image/x-icon'};
const recentSubmissions = new Map();
function sendJson(res, status, body) { res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}); res.end(JSON.stringify(body)); }
function readJson(req) { return new Promise((resolve,reject)=>{let data='';req.on('data',chunk=>{data+=chunk;if(data.length>12000){reject(new Error('Request too large'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(data||'{}'));}catch{reject(new Error('Invalid JSON'));}});req.on('error',reject);}); }
async function handleContact(req,res) {
  const ip=(req.socket.remoteAddress||'unknown').replace(/^::ffff:/,'');
  const now=Date.now();
  if(recentSubmissions.has(ip)&&now-recentSubmissions.get(ip)<30000)return sendJson(res,429,{error:'Please wait a little before sending another message.'});
  let body; try{body=await readJson(req);}catch{return sendJson(res,400,{error:'Please check the form and try again.'});}
  const email=String(body.email||'').trim(); const message=String(body.message||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return sendJson(res,400,{error:'Please enter a valid email address.'});
  if(message.length<3||message.length>5000)return sendJson(res,400,{error:'Please enter a message between 3 and 5,000 characters.'});
  const {SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASS,SMTP_FROM}=process.env;
  if(!SMTP_HOST||!SMTP_PORT||!SMTP_USER||!SMTP_PASS)return sendJson(res,503,{error:'Email delivery is not configured yet. Please email Ashish directly.'});
  try {
    const nodemailer=require('nodemailer');
    const port=Number(SMTP_PORT);
    const transporter=nodemailer.createTransport({host:SMTP_HOST,port,secure:port===465,auth:{user:SMTP_USER,pass:SMTP_PASS}});
    await transporter.sendMail({from:SMTP_FROM||SMTP_USER,to:RECEIVER,replyTo:email,subject:'Portfolio enquiry from '+email,text:`New message from the Ashish portfolio.\n\nVisitor email: ${email}\n\nMessage:\n${message}`});
    recentSubmissions.set(ip,now);
    return sendJson(res,200,{ok:true});
  } catch(err) { console.error('Contact email failed:',err.message); return sendJson(res,502,{error:'Email could not be delivered right now. Please try emailing Ashish directly.'}); }
}
http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,`http://${req.headers.host||'localhost'}`).pathname);}catch{return sendJson(res,400,{error:'Bad request'});}
  if(pathname==='/api/contact'&&req.method==='POST')return handleContact(req,res);
  if(pathname.startsWith('/api/'))return sendJson(res,404,{error:'API route not found'});
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end('Method not allowed');}
  if(pathname==='/')pathname='/index.html';
  const filePath=path.resolve(ROOT,`.${pathname}`);
  if(!filePath.startsWith(ROOT+path.sep)&&filePath!==path.join(ROOT,'index.html')){res.writeHead(403);return res.end('Forbidden');}
  fs.stat(filePath,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404);return res.end('Not found');}
    res.writeHead(200,{'Content-Type':MIME[path.extname(filePath).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD')return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(PORT,'0.0.0.0',()=>console.log(`Ashish portfolio running at http://localhost:${PORT}`));
