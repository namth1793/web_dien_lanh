import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import BangGia from './pages/BangGia';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { useState } from 'react';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar onCartClick={() => setCartOpen(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gioi-thieu" element={<About />} />
              <Route path="/dich-vu" element={<Services />} />
              <Route path="/cong-trinh" element={<Projects />} />
              <Route path="/bang-gia" element={<BangGia />} />
              <Route path="/tin-tuc" element={<News />} />
              <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
              <Route path="/san-pham" element={<Products />} />
              <Route path="/san-pham/:slug" element={<ProductDetail />} />
              <Route path="/lien-he" element={<Contact />} />
              <Route path="/gio-hang" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
          <FloatingContact />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
