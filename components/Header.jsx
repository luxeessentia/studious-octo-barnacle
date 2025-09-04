'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header(){
  const [open,setOpen]=useState(false); const [count,setCount]=useState(0);
  useEffect(()=>{ const sync=()=>{ try{ const c=JSON.parse(localStorage.getItem('cart')||'[]'); setCount(c.reduce((s,i)=>s+(i.quantity||1),0)); }catch(e){setCount(0)} }; sync(); window.addEventListener('storage',sync); return ()=>window.removeEventListener('storage',sync); },[]);
  return (
    <>
      <div className='logo-wrap'><div className='logo'>Luxe Essentials</div></div>
      <nav className='navbar'>
        <div className='inner container' style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button onClick={()=>setOpen(true)} style={{background:'transparent',border:'none',color:'#fff',fontSize:20}}>☰</button>
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <Link href='/'><a className='nav-link'>Home</a></Link>
              <div className='nav-dropdown'>
                <span className='nav-link'>Shop ▾</span>
                <div className='menu'>
                  <Link href='/shop/bags'><a>Handmade Bags</a></Link><br/>
                  <Link href='/shop/tech'><a>Tech Accessories</a></Link><br/>
                  <Link href='/shop/custom'><a>Custom Collection</a></Link><br/>
                  <Link href='/shop/clothing'><a>Clothing</a></Link><br/>
                  <Link href='/shop/footwear'><a>Footwear</a></Link><br/>
                  <Link href='/shop/beauty'><a>Beauty/Makeup</a></Link><br/>
                  <Link href='/shop/jewelry'><a>Jewelry & Accessories</a></Link><br/>
                  <hr/>
                  <Link href='/shop'><a>Shop All</a></Link>
                </div>
              </div>
              <Link href='/about'><a className='nav-link'>About</a></Link>
              <Link href='/faq'><a className='nav-link'>FAQ</a></Link>
              <Link href='/contact'><a className='nav-link'>Contact</a></Link>
            </div>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{display:'none'}} className='search-wrap'><input placeholder='Search…'/></div>
            <Link href='/reviews'><a className='nav-link'>♥</a></Link>
            <Link href='/cart'><a className='nav-link'>🛒 <span style={{background:'var(--gold)',color:'#000',padding:'2px 8px',borderRadius:999,fontWeight:800}}>{count}</span></a></Link>
            <Link href='/login'><a className='nav-link'>Login/Register</a></Link>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{position:'fixed',left:0,top:0,width:300,height:'100vh',background:'#fff',zIndex:2000,padding:18}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>Menu</strong><button onClick={()=>setOpen(false)} style={{background:'transparent',border:'none'}}>✕</button></div>
          <div style={{marginTop:12}}>
            <Link href='/'><a onClick={()=>setOpen(false)}>Home</a></Link><br/>
            <strong style={{display:'block',marginTop:8}}>Shop</strong>
            <Link href='/shop/bags'><a onClick={()=>setOpen(false)}>Handmade Bags</a></Link><br/>
            <Link href='/shop/tech'><a onClick={()=>setOpen(false)}>Tech Accessories</a></Link><br/>
            <Link href='/shop/custom'><a onClick={()=>setOpen(false)}>Custom Collection</a></Link><br/>
            <Link href='/shop/clothing'><a onClick={()=>setOpen(false)}>Clothing</a></Link><br/>
            <Link href='/shop/footwear'><a onClick={()=>setOpen(false)}>Footwear</a></Link><br/>
            <Link href='/shop/beauty'><a onClick={()=>setOpen(false)}>Beauty/Makeup</a></Link><br/>
            <Link href='/shop/jewelry'><a onClick={()=>setOpen(false)}>Jewelry & Accessories</a></Link><br/>
            <Link href='/shop'><a onClick={()=>setOpen(false)}>Shop All</a></Link><br/><br/>
            <Link href='/login'><a onClick={()=>setOpen(false)}>Login / Register</a></Link>
          </div>
        </div>
      )}
    </>
  );
}