import Link from 'next/link';
export default function Footer(){ return (
  <>
    <footer style={{background:'#fff',padding:'28px 0',borderTop:'1px solid #eee'}}>
      <div className='container'>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
          <div><h4 style={{color:'var(--purple)'}}>Luxe Essentials</h4><p>Minimal luxury — handcrafted & curated essentials.</p></div>
          <div><h4>Shop</h4><Link href='/shop/bags'><a>Handmade Bags</a></Link><br/><Link href='/shop/tech'><a>Tech Accessories</a></Link></div>
          <div><h4>Help</h4><Link href='/orders/track'><a>Orders & Returns</a></Link><br/><Link href='/faq'><a>FAQ</a></Link></div>
          <div><h4>Quick Links</h4><Link href='/about'><a>About Us</a></Link><br/><Link href='/privacy'><a>Privacy Policy</a></Link></div>
        </div>
      </div>
    </footer>
    <div className='footer-note'>📦 FREE STANDARD SHIPPING ON U.S. ORDERS + | FREE EXPRESS SHIPPING ON U.S. ORDERS +</div>
  </>
); }