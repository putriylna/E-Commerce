import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Product from "./components/Product";
import ProductDetailPage from "./products/ProductDetail";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/products/:titleSlug"
              element={<ProductDetailPage />}
            />
            <Route path="/products" element={<Product />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
