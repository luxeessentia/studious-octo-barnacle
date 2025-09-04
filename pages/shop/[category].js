import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ShopCategory(){
  const router = useRouter();
  const { category } = router.query; // expected slugs: bags, tech, custom, clothing, footwear, beauty, jewelry
  const slugToCategory = {
    bags: 'Handmade Bags',
    tech: 'Tech Accessories',
    custom: 'Custom Collection',
    clothing: 'Clothing',
    footwear: 'Footwear',
    beauty: 'Beauty/Makeup',
    jewelry: 'Jewelry & Accessories'
  };
  const catName = slugToCategory[category] || '';
  const [products,setProducts] = useState([]);
  useEffect(()=>{ if(!catName) return; fetch('/data/products.json').then(r=>r.json()).then(d=> setProducts(d.filter(p=>p.category===catName))); },[catName]);
  function addToCart(p){ const cart=JSON.parse(localStorage.getItem('cart')||'[]'); const ex=cart.find(i=>i.id===p.id); if(ex) ex.quantity++; else cart.push({id:p.id,title:p.title,price_cents:p.price_cents,image:p.images[0],quantity:1}); localStorage.setItem('cart',JSON.stringify(cart)); window.dispatchEvent(new Event('storage')); }
  return (<Layout><div style={{padding:16}}><h1>{catName || 'Shop'}</h1><div className='grid grid-4' style={{marginTop:12}}>{products.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div></div></Layout>);
}
