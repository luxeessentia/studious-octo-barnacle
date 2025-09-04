import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

export default function Home() {
  const [bags,setBags] = useState([]); const [tech,setTech]=useState([]); const [customs,setCustoms]=useState([]); const [clothes,setClothes]=useState([]); const [beauty,setBeauty]=useState([]); const [reviews,setReviews]=useState([]);
  useEffect(()=>{ fetch('/data/products.json').then(r=>r.json()).then(d=>{ setBags(d.filter(x=>x.category==='Handmade Bags').slice(0,6)); setTech(d.filter(x=>x.category==='Tech Accessories').slice(0,4)); setCustoms(d.filter(x=>x.category==='Custom Collection').slice(0,4)); setClothes(d.filter(x=>x.category==='Clothing').slice(0,4)); setBeauty(d.filter(x=>x.category==='Beauty/Makeup').slice(0,4)); }); fetch('/data/reviews.json').then(r=>r.json()).then(d=>setReviews(d.filter(r=>r.approved))); },[]);
  function addToCart(p){ const cart=JSON.parse(localStorage.getItem('cart')||'[]'); const ex=cart.find(i=>i.id===p.id); if(ex) ex.quantity++; else cart.push({id:p.id,title:p.title,price_cents:p.price_cents,image:p.images[0],quantity:1}); localStorage.setItem('cart',JSON.stringify(cart)); window.dispatchEvent(new Event('storage')); }

  return (<Layout>
    <section style={{marginTop:12}}><div style={{borderRadius:12,overflow:'hidden'}}><img src='https://images.unsplash.com/photo-1520975913510-6f6f3a8d3d0b?auto=format&fit=crop&w=1600&q=80' alt='hero' style={{width:'100%',height:420,objectFit:'cover'}}/></div></section>

    <section style={{marginTop:18}}><h2 className='section-title'>Featured — Handmade Bags</h2><div className='grid grid-4' style={{marginTop:12}}>{bags.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div></section>

    <section style={{marginTop:18}}><h2 className='section-title'>Featured — Tech Accessories</h2><div className='grid grid-4' style={{marginTop:12}}>{tech.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div></section>

    <section style={{marginTop:18}}><h2 className='section-title'>Featured — Custom Collection</h2><div className='grid grid-4' style={{marginTop:12}}>{customs.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div></section>

    <section style={{marginTop:18}}><h2 className='section-title'>Featured — Clothing & Shoes</h2><div className='grid grid-4' style={{marginTop:12}}>{clothes.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div></section>

    <section style={{marginTop:18}}><h2 className='section-title'>Featured — Beauty / Makeup</h2><div className='grid grid-4' style={{marginTop:12}}>{beauty.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div></section>

    <section style={{marginTop:18}}><h2 className='section-title'>Customer Reviews</h2><div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>{reviews.slice(0,4).map((r,i)=>(<div key={i} style={{padding:12,border:'1px solid #eee',borderRadius:8}}><div style={{fontWeight:800}}>{r.name} <span style={{color:'var(--gold)'}}>{"★".repeat(r.rating)}</span></div><div style={{marginTop:8}}>{r.text}</div></div>))}</div></section>

    <section style={{marginTop:28}}><h3 className='section-title' style={{color:'var(--purple)'}}>Quick Links</h3><div style={{display:'flex',gap:12}}><a href='/about' style={{background:'#fff',padding:12,borderRadius:8,fontWeight:800,color:'#000'}}>About Us</a><a href='/contact' style={{background:'#fff',padding:12,borderRadius:8,fontWeight:800,color:'#000'}}>Contact</a><a href='/faq' style={{background:'#fff',padding:12,borderRadius:8,fontWeight:800,color:'#000'}}>FAQ</a><a href='/privacy' style={{background:'#fff',padding:12,borderRadius:8,fontWeight:800,color:'#000'}}>Privacy Policy</a></div></section>
  </Layout>);
}