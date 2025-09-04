'use client';
import { useEffect, useState } from 'react';
export default function PromoBar(){
  const slides = [
    { id: 1, label: '✨ GET  OFF YOUR FIRST ORDER WHEN YOU SIGN UP!', href:'/login' },
    { id: 2, label: '👜 Handmade Bags' },
    { id: 3, label: '📱 Tech Accessories' },
    { id: 4, label: '🌟 Custom Collection' },
  ];
  const [idx,setIdx] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setIdx(i=> (i+1)%slides.length),4500); return ()=>clearInterval(t); },[]);
  return (
    <div className='top-promo'>
      <div style={{display:'flex',width:'100%',transform:	ranslateX(-%),transition:'transform .45s ease'}}>
        {slides.map(s=> <div key={s.id} className='slide' style={{minWidth:'100%'}}>{s.href ? <a href={s.href} style={{color:'#FFD700',textDecoration:'underline'}}>{s.label}</a> : s.label}</div>)}
      </div>
      <div style={{position:'absolute',top:'50%',left:8,transform:'translateY(-50%)'}}><button onClick={()=>setIdx((idx-1+slides.length)%slides.length)} style={{background:'transparent',border:'none',color:'#fff',fontSize:18}}>&#10094;</button></div>
      <div style={{position:'absolute',top:'50%',right:8,transform:'translateY(-50%)'}}><button onClick={()=>setIdx((idx+1)%slides.length)} style={{background:'transparent',border:'none',color:'#fff',fontSize:18}}>&#10095;</button></div>
    </div>
  );
}