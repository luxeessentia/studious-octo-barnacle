import PromoBar from './PromoBar';
import Header from './Header';
import Footer from './Footer';
import '../styles/globals.css';
export default function Layout({ children }) {
  return (<><PromoBar /><Header /><main className='container' style={{paddingTop:16,paddingBottom:160}}>{children}</main><Footer /></>);
}