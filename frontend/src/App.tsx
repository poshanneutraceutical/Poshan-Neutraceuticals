import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Product from "./components/Product";
import About from "./components/About";
import Ticker from "./components/Ticker";
import Distributor from "./components/Distributor";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// --- VERIFY PAGE (Loaded instantly for fast QR scanning) ---
import VerifyPage from "./pages/VerifyPage";

// --- LAZY LOADED PAGES ---
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));

// --- PAGES ---
function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Product />
        <About />
        <Ticker />
        <Distributor />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* NEW VERIFY ROUTE */}
        <Route path="/verify" element={<VerifyPage />} />

        <Route
          path="/cart"
          element={
            <Suspense fallback={<div className="text-white text-center py-20 text-xl">Loading Cart...</div>}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="/checkout"
          element={
            <Suspense fallback={<div className="text-white text-center py-20 text-xl">Loading Checkout...</div>}>
              <Checkout />
            </Suspense>
          }
        />

        <Route
          path="/order-success"
          element={
            <Suspense fallback={<div className="text-white text-center py-20 text-xl">Loading...</div>}>
              <OrderSuccess />
            </Suspense>
          }
        />
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