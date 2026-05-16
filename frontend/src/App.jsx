import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
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
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminNews from './pages/admin/AdminNews';
import AdminNewsForm from './pages/admin/AdminNewsForm';
import AdminOrders from './pages/admin/AdminOrders';
import AdminContacts from './pages/admin/AdminContacts';
import AdminSettings from './pages/admin/AdminSettings';
import { useState } from 'react';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin routes - no Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute><AdminLayout /></ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="san-pham" element={<AdminProducts />} />
              <Route path="san-pham/them" element={<AdminProductForm />} />
              <Route path="san-pham/sua/:id" element={<AdminProductForm />} />
              <Route path="tin-tuc" element={<AdminNews />} />
              <Route path="tin-tuc/them" element={<AdminNewsForm />} />
              <Route path="tin-tuc/sua/:id" element={<AdminNewsForm />} />
              <Route path="don-hang" element={<AdminOrders />} />
              <Route path="lien-he" element={<AdminContacts />} />
              <Route path="cai-dat" element={<AdminSettings />} />
            </Route>

            {/* Public routes */}
            <Route path="/*" element={
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
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
