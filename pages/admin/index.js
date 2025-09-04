'use client';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';

export default function Admin(){
  const [isAdmin,setIsAdmin] = useState(false);
  const [reviews,setReviews] = useState([]);
  const [products,setProducts] = useState([]);
  useEffect(()=> {
    const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAILS||'').split(',').map(s=>s.trim()).filter(Boolean);
    const userEmail = localStorage.getItem('admin_email') || null;
    if(userEmail && allowed.includes(userEmail)) setIsAdmin(true);

    fetch('/data/reviews.json').then(r=>r.json()).then(d=> setReviews(d));
    fetch('/data/products.json').then(r=>r.json()).then(d=> setProducts(d.slice(0,50)));
  },[]);

  async function approve(id){
    const res = await fetch('/api/admin/approve-review', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) });
    if(res.ok) { alert('Approved'); const d = await fetch('/data/reviews.json').then(r=>r.json()); setReviews(d); } else alert('Error');
  }
  async function updateStock(id, stock){
    const res = await fetch('/api/admin/update-stock', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, stock }) });
    if(res.ok) { alert('Stock updated'); const d = await fetch('/data/products.json').then(r=>r.json()); setProducts(d.slice(0,50)); } else alert('Error');
  }

  if(!isAdmin) return (<Layout><h1>Admin</h1><p>Restricted. Please login as admin.</p><p>For dev: run <code>localStorage.setItem('admin_email', 'you@yourdomain.com')</code> in console and refresh (set email from NEXT_PUBLIC_ADMIN_EMAILS).</p></Layout>);

  return (
    <Layout>
      <h1>Admin Dashboard</h1>
      <section><h2>Pending Reviews</h2>
        {reviews.filter(r=>!r.approved).length===0 ? <p>No pending reviews</p> : reviews.filter(r=>!r.approved).map(r=>(
          <div key={r.id} style={{padding:8,border:'1px solid #eee',marginBottom:8}}>
            <strong>{r.name}</strong><div>{r.text}</div><button onClick={()=>approve(r.id)} className='btn' style={{marginTop:8}}>Approve</button>
          </div>
        ))}
      </section>

      <section style={{marginTop:24}}><h2>Products (first 50)</h2>
        {products.map(p=>(
          <div key={p.id} style={{padding:8,border:'1px solid #eee',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><strong>{p.title}</strong><div style={{color:'var(--purple)'}}></div></div>
            <div>
              <input type='number' defaultValue={p.stock} style={{width:80}} onBlur={(e)=> updateStock(p.id, Number(e.target.value))} />
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}