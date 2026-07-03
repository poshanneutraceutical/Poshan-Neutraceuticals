import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Products from "./components/Products";
import About from "./components/About";
import Ticker from "./components/Ticker";
import Distributor from "./components/Distributor";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Products />
        <About />
        <Ticker />
        <Distributor />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Order Success */}
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919516666660"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={32} />
      </a>
    </>
  );
}