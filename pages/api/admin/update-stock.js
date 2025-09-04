// Admin API - update product stock in public/data/products.json
import fs from 'fs';
import path from 'path';
export default function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  const body = req.body;
  if(!body || !body.id || body.stock === undefined) return res.status(400).json({ error:'Invalid' });
  const file = path.join(process.cwd(),'public','data','products.json');
  const arr = JSON.parse(fs.readFileSync(file,'utf8'));
  const i = arr.findIndex(x=>x.id===body.id);
  if(i===-1) return res.status(404).json({ error:'not found' });
  arr[i].stock = Number(body.stock);
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
  return res.status(200).json({ ok:true });
}