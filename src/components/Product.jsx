import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useCartStore } from "../store/useCartStore";
import ProductList from "../products/ProductList";

// Fungsi untuk membuat slug dari title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Hapus karakter khusus
    .replace(/\s+/g, '-')     // Ganti spasi dengan dash
    .replace(/-+/g, '-');     // Hapus dash berlebih
};

export default function ProductsPage() {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Navigasi ke halaman detail produk
  const openProductDetail = (product) => {
    const slug = createSlug(product.title);
    navigate(`/products/${slug}`, { state: { product } });
  };

  const handleAddToCart = (product, qty) => {
    const productToAdd = {
      id: product.id?.toString(),
      title: product.title || "Untitled Product",
      price: product.price,
      qty: qty,
      image: product.image || "",
      category: product.category || "",
      description: product.description || ""
    };

    addToCart(productToAdd);
    alert(`Added ${qty} x ${product.title} to cart!`);
  };

  return (
    <div className="bg-white px-12 pt-12">
      <h2 className="inline-block relative text-2xl font-bold text-gray-900 left-0 btn btn-primary">
        <span className="relative z-1 px-4 py-2">Products</span>
      </h2>
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <ProductList
          products={products}
          loading={loading}
          error={error}
          onProductClick={openProductDetail}
          onRetry={fetchProducts}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}